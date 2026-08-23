-- QubeSight Voice Admin: authentication, organizations and tenant data.
-- Preserves the existing public.leads table.

create type public.app_role as enum ('client', 'admin');
create type public.member_role as enum ('owner', 'member');
create type public.resource_status as enum ('active', 'inactive', 'suspended');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text,
  avatar_url text,
  role public.app_role not null default 'client',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  industry text,
  status public.resource_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  member_role public.member_role not null default 'member',
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.voice_agents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  status public.resource_status not null default 'active',
  twilio_phone text,
  voice_name text not null default 'Sofia',
  language text not null default 'Español',
  objective text not null default '',
  greeting text not null default '',
  system_prompt text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.calls (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  voice_agent_id uuid references public.voice_agents(id) on delete set null,
  external_call_id text unique,
  caller_phone text,
  direction text not null default 'inbound' check (direction in ('inbound','outbound')),
  status text not null default 'completed',
  result text,
  duration_seconds integer not null default 0 check (duration_seconds >= 0),
  transcript text,
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create index organization_members_user_idx on public.organization_members(user_id);
create index voice_agents_org_idx on public.voice_agents(organization_id);
create index calls_org_started_idx on public.calls(organization_id, started_at desc);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$ begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end; $$;

create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_org_member(target_org uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.organization_members m where m.organization_id=target_org and m.user_id=auth.uid()); $$;

create or replace function public.is_org_owner(target_org uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.organization_members m where m.organization_id=target_org and m.user_id=auth.uid() and m.member_role='owner'); $$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'); $$;

create or replace function public.create_organization(org_name text, org_industry text default null)
returns uuid language plpgsql security definer set search_path = public
as $$ declare new_id uuid; begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if exists(select 1 from public.organization_members where user_id=auth.uid()) then raise exception 'User already belongs to an organization'; end if;
  insert into public.organizations(name, industry) values(trim(org_name), nullif(trim(org_industry),'')) returning id into new_id;
  insert into public.organization_members(organization_id,user_id,member_role) values(new_id,auth.uid(),'owner');
  return new_id;
end; $$;

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.voice_agents enable row level security;
alter table public.calls enable row level security;

create policy "Users read own profile" on public.profiles for select to authenticated using (id=auth.uid() or public.is_admin());
create policy "Users update own safe profile" on public.profiles for update to authenticated using (id=auth.uid()) with check (id=auth.uid());
create policy "Members read organizations" on public.organizations for select to authenticated using (public.is_org_member(id) or public.is_admin());
create policy "Owners update organizations" on public.organizations for update to authenticated using (public.is_org_owner(id) or public.is_admin());
create policy "Members read memberships" on public.organization_members for select to authenticated using (user_id=auth.uid() or public.is_org_member(organization_id) or public.is_admin());
create policy "Members read agents" on public.voice_agents for select to authenticated using (public.is_org_member(organization_id) or public.is_admin());
create policy "Owners insert agents" on public.voice_agents for insert to authenticated with check (public.is_org_owner(organization_id) or public.is_admin());
create policy "Owners update agents" on public.voice_agents for update to authenticated using (public.is_org_owner(organization_id) or public.is_admin()) with check (public.is_org_owner(organization_id) or public.is_admin());
create policy "Owners delete agents" on public.voice_agents for delete to authenticated using (public.is_org_owner(organization_id) or public.is_admin());
create policy "Members read calls" on public.calls for select to authenticated using (public.is_org_member(organization_id) or public.is_admin());

grant select on public.profiles to authenticated;
grant update (full_name, phone, avatar_url, updated_at) on public.profiles to authenticated;
grant select, update on public.organizations to authenticated;
grant select on public.organization_members to authenticated;
grant select, insert, update, delete on public.voice_agents to authenticated;
grant select on public.calls to authenticated;
grant execute on function public.create_organization(text,text) to authenticated;
