-- Automatic multi-tenant onboarding for QubeSight.
-- Keeps RLS and the existing membership model intact.
-- New users receive one initial organization and become its owner atomically.

alter table public.profiles
  add column if not exists active_organization_id uuid
  references public.organizations(id) on delete set null;

create index if not exists profiles_active_organization_idx
  on public.profiles(active_organization_id);

-- Existing users that already belong to an organization keep their existing data.
-- We only select one existing membership as the active organization when none is set.
update public.profiles as profile
set active_organization_id = membership.organization_id
from (
  select distinct on (member.user_id)
    member.user_id,
    member.organization_id
  from public.organization_members as member
  order by member.user_id, member.created_at, member.organization_id
) as membership
where membership.user_id = profile.id
  and profile.active_organization_id is null;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  new_organization_id uuid;
  requested_organization_name text;
  fallback_name text;
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;

  select member.organization_id
  into new_organization_id
  from public.organization_members as member
  where member.user_id = new.id
  order by member.created_at, member.organization_id
  limit 1;

  if new_organization_id is null then
    requested_organization_name :=
      nullif(btrim(coalesce(new.raw_user_meta_data ->> 'organization_name', '')), '');

    fallback_name :=
      nullif(btrim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), '');

    if requested_organization_name is null or char_length(requested_organization_name) < 2 then
      requested_organization_name :=
        case
          when fallback_name is not null and char_length(fallback_name) >= 2
            then fallback_name || ' - Empresa'
          else 'Mi empresa'
        end;
    end if;

    insert into public.organizations (name)
    values (left(requested_organization_name, 120))
    returning id into new_organization_id;

    insert into public.organization_members (
      organization_id,
      user_id,
      member_role
    )
    values (
      new_organization_id,
      new.id,
      'owner'
    );
  end if;

  update public.profiles
  set active_organization_id = coalesce(active_organization_id, new_organization_id),
      updated_at = now()
  where id = new.id;

  return new;
end;
$$;

-- Preserve the legacy/manual organization creation flow for old accounts,
-- while making the newly created organization active automatically.
create or replace function public.create_organization(
  org_name text,
  org_industry text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if exists (
    select 1
    from public.organization_members
    where user_id = auth.uid()
  ) then
    raise exception 'User already belongs to an organization';
  end if;

  insert into public.organizations (name, industry)
  values (
    trim(org_name),
    nullif(trim(org_industry), '')
  )
  returning id into new_id;

  insert into public.organization_members (
    organization_id,
    user_id,
    member_role
  )
  values (
    new_id,
    auth.uid(),
    'owner'
  );

  update public.profiles
  set active_organization_id = new_id,
      updated_at = now()
  where id = auth.uid();

  return new_id;
end;
$$;

create or replace function public.set_active_organization(target_org uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if not exists (
    select 1
    from public.organization_members
    where user_id = auth.uid()
      and organization_id = target_org
  ) then
    raise exception 'Organization membership required';
  end if;

  update public.profiles
  set active_organization_id = target_org,
      updated_at = now()
  where id = auth.uid();
end;
$$;

revoke all on function public.set_active_organization(uuid) from public, anon;
grant execute on function public.set_active_organization(uuid) to authenticated;

-- Keep direct browser updates limited to safe profile fields.
revoke update on public.profiles from authenticated;
grant update (full_name, phone, avatar_url, updated_at) on public.profiles to authenticated;
grant select on public.profiles to authenticated;
