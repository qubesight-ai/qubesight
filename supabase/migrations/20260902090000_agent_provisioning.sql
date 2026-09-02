-- QubeSight Agent Provisioning Layer.
-- Runtime state is server-owned. Browser clients may read it but cannot forge it.

alter table public.voice_agents
  add column deployment_revision bigint not null default 1 check (deployment_revision > 0),
  add column deployed_revision bigint,
  add column provisioning_status text not null default 'not_deployed'
    check (provisioning_status in (
      'not_deployed', 'provisioning', 'running', 'degraded', 'stopped', 'error'
    )),
  add column runtime_service text,
  add column runtime_url text,
  add column last_health_at timestamptz,
  add column last_deployed_at timestamptz,
  add column last_provisioning_error text;

create table public.agent_provisioning_operations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  voice_agent_id uuid not null references public.voice_agents(id) on delete cascade,
  requested_by uuid references auth.users(id) on delete set null,
  action text not null check (action in ('reconcile', 'restart', 'status', 'stop')),
  idempotency_key text not null check (char_length(idempotency_key) between 16 and 180),
  requested_revision bigint not null check (requested_revision > 0),
  status text not null default 'pending'
    check (status in ('pending', 'running', 'succeeded', 'failed')),
  result jsonb,
  error_message text,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz not null default now(),
  unique (organization_id, idempotency_key)
);

create index agent_provisioning_operations_agent_created_idx
  on public.agent_provisioning_operations(voice_agent_id, created_at desc);

create unique index phone_numbers_one_agent_assignment_idx
  on public.phone_numbers(assigned_agent_id)
  where assigned_agent_id is not null;

alter table public.agent_provisioning_operations enable row level security;

create policy "Members read agent provisioning operations"
on public.agent_provisioning_operations for select to authenticated
using (public.is_org_member(organization_id) or public.is_admin());

revoke all on public.agent_provisioning_operations from anon, authenticated;
grant select on public.agent_provisioning_operations to authenticated;

-- Existing table-level write grants allowed a client to set future server-owned
-- columns. Replace them with explicit safe-column grants.
revoke insert, update on public.voice_agents from authenticated;
grant insert (
  organization_id, name, status, twilio_phone, voice_name, language,
  objective, greeting, system_prompt
) on public.voice_agents to authenticated;
grant update (
  name, status, twilio_phone, voice_name, language, objective, greeting,
  system_prompt, updated_at
) on public.voice_agents to authenticated;

create or replace function public.bump_voice_agent_deployment_revision()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if row(
    new.name, new.status, new.twilio_phone, new.voice_name, new.language,
    new.objective, new.greeting, new.system_prompt
  ) is distinct from row(
    old.name, old.status, old.twilio_phone, old.voice_name, old.language,
    old.objective, old.greeting, old.system_prompt
  ) then
    new.deployment_revision := old.deployment_revision + 1;
    if old.provisioning_status in ('running', 'degraded') then
      new.provisioning_status := 'stopped';
    end if;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create trigger bump_voice_agent_deployment_revision
before update on public.voice_agents
for each row execute function public.bump_voice_agent_deployment_revision();

revoke all on function public.bump_voice_agent_deployment_revision() from public, anon, authenticated;

