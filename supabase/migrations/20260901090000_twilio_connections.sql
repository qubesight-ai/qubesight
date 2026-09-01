-- QubeSight: secure Twilio connections and existing phone-number selection.
-- Credentials are written only by the authenticated Edge Function.
-- The API Key Secret is encrypted in Supabase Vault and never exposed to clients.

create extension if not exists supabase_vault with schema vault;

create table public.telephony_connections (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  provider text not null default 'twilio' check (provider in ('twilio')),
  account_sid text not null check (account_sid ~ '^AC[0-9A-Fa-f]{32}$'),
  api_key_sid text not null check (api_key_sid ~ '^SK[0-9A-Fa-f]{32}$'),
  vault_secret_id uuid not null,
  status text not null default 'pending' check (status in ('pending','verified','error','revoked')),
  verified_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, provider)
);

create table public.phone_numbers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  telephony_connection_id uuid not null references public.telephony_connections(id) on delete cascade,
  provider_number_sid text not null check (provider_number_sid ~ '^PN[0-9A-Fa-f]{32}$'),
  phone_number text not null check (phone_number ~ '^\\+[1-9][0-9]{6,14}$'),
  friendly_name text not null default '',
  capabilities jsonb not null default '{}'::jsonb,
  current_voice_url text,
  selected boolean not null default false,
  assigned_agent_id uuid references public.voice_agents(id) on delete set null,
  webhook_status text not null default 'not_configured'
    check (webhook_status in ('not_configured','external','configured','error')),
  last_synced_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (telephony_connection_id, provider_number_sid)
);

create index telephony_connections_org_idx
  on public.telephony_connections(organization_id);
create index phone_numbers_org_idx
  on public.phone_numbers(organization_id);
create unique index phone_numbers_one_selected_per_org_idx
  on public.phone_numbers(organization_id)
  where selected;

alter table public.telephony_connections enable row level security;
alter table public.phone_numbers enable row level security;

create policy "Members read safe telephony connection metadata"
on public.telephony_connections for select to authenticated
using (public.is_org_member(organization_id) or public.is_admin());

create policy "Members read organization phone numbers"
on public.phone_numbers for select to authenticated
using (public.is_org_member(organization_id) or public.is_admin());

-- No client-side writes. The authenticated Edge Function validates ownership,
-- then performs mutations using the service role.
revoke all on public.telephony_connections from anon, authenticated;
revoke all on public.phone_numbers from anon, authenticated;

grant select (
  id, organization_id, provider, account_sid, api_key_sid, status,
  verified_at, created_by, created_at, updated_at
) on public.telephony_connections to authenticated;

grant select on public.phone_numbers to authenticated;

create or replace function public.vault_store_twilio_secret(
  p_secret text,
  p_existing_id uuid default null,
  p_name text default null
)
returns uuid
language plpgsql
security definer
set search_path = public, vault
as $$
declare
  secret_id uuid;
begin
  if p_secret is null or char_length(p_secret) < 8 or char_length(p_secret) > 512 then
    raise exception 'Invalid secret';
  end if;

  secret_id := p_existing_id;

  if secret_id is null and p_name is not null then
    select id into secret_id from vault.secrets where name = p_name limit 1;
  end if;

  if secret_id is null then
    select vault.create_secret(p_secret, p_name, 'QubeSight Twilio API Key Secret')
      into secret_id;
  else
    perform vault.update_secret(
      secret_id,
      p_secret,
      coalesce(p_name, (select name from vault.secrets where id = secret_id)),
      'QubeSight Twilio API Key Secret'
    );
  end if;

  return secret_id;
end;
$$;

create or replace function public.vault_read_twilio_secret(p_secret_id uuid)
returns text
language sql
stable
security definer
set search_path = public, vault
as $$
  select decrypted_secret
  from vault.decrypted_secrets
  where id = p_secret_id
  limit 1;
$$;

create or replace function public.vault_delete_twilio_secret(p_secret_id uuid)
returns void
language plpgsql
security definer
set search_path = public, vault
as $$
begin
  delete from vault.secrets where id = p_secret_id;
end;
$$;

create or replace function public.select_twilio_phone_number(
  p_organization_id uuid,
  p_provider_number_sid text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.phone_numbers
    where organization_id = p_organization_id
      and provider_number_sid = p_provider_number_sid
  ) then
    raise exception 'Phone number not found';
  end if;

  update public.phone_numbers
    set selected = false, updated_at = now()
    where organization_id = p_organization_id and selected;

  update public.phone_numbers
    set selected = true, updated_at = now()
    where organization_id = p_organization_id
      and provider_number_sid = p_provider_number_sid;
end;
$$;

revoke all on function public.vault_store_twilio_secret(text,uuid,text) from public, anon, authenticated;
revoke all on function public.vault_read_twilio_secret(uuid) from public, anon, authenticated;
revoke all on function public.vault_delete_twilio_secret(uuid) from public, anon, authenticated;
revoke all on function public.select_twilio_phone_number(uuid,text) from public, anon, authenticated;

grant execute on function public.vault_store_twilio_secret(text,uuid,text) to service_role;
grant execute on function public.vault_read_twilio_secret(uuid) to service_role;
grant execute on function public.vault_delete_twilio_secret(uuid) to service_role;
grant execute on function public.select_twilio_phone_number(uuid,text) to service_role;
