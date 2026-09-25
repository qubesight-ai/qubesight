-- QubeSight voice-agent product model.
-- Additive only: existing runtime and telephony columns remain untouched.

alter table public.voice_agents
  add column agent_type text
    check (agent_type in ('customer_service', 'sales_prospecting', 'marketing')),
  add column business_name text not null default ''
    check (char_length(business_name) <= 120),
  add column business_description text not null default ''
    check (char_length(business_description) <= 2000),
  add column assistant_description text not null default ''
    check (char_length(assistant_description) <= 4000),
  add column configuration_status text not null default 'draft'
    check (configuration_status in ('draft', 'generated', 'published')),
  add column capabilities jsonb not null default '{}'::jsonb
    check (jsonb_typeof(capabilities) = 'object'),
  add column behavior jsonb not null default '{}'::jsonb
    check (jsonb_typeof(behavior) = 'object'),
  add column lead_fields jsonb not null default '[]'::jsonb
    check (jsonb_typeof(lead_fields) = 'array'),
  add column escalation_rules jsonb not null default '{}'::jsonb
    check (jsonb_typeof(escalation_rules) = 'object'),
  add column published_at timestamptz;

-- Preserve the useful descriptions already stored on Matilda and Tem without
-- guessing which of the three new product categories each agent belongs to.
update public.voice_agents as agent
set
  business_name = organization.name,
  assistant_description = agent.objective
from public.organizations as organization
where organization.id = agent.organization_id;

comment on column public.voice_agents.agent_type is
  'Customer-facing template category. Null means an existing agent has not been classified yet.';
comment on column public.voice_agents.assistant_description is
  'Plain-language description supplied by the customer.';
comment on column public.voice_agents.configuration_status is
  'Draft/generation/publication lifecycle, separate from operational status.';
comment on column public.voice_agents.capabilities is
  'Validated customer-facing capabilities; runtime implementation details stay server-side.';

-- The provisioning migration deliberately replaced table-level writes with
-- safe column grants. Extend those grants only to customer-owned fields.
-- configuration_status and published_at remain server-owned lifecycle fields.
revoke insert, update on public.voice_agents from authenticated;
grant insert (
  organization_id,
  name,
  status,
  twilio_phone,
  voice_name,
  language,
  objective,
  greeting,
  system_prompt,
  agent_type,
  business_name,
  business_description,
  assistant_description,
  capabilities,
  behavior,
  lead_fields,
  escalation_rules
) on public.voice_agents to authenticated;
grant update (
  name,
  status,
  twilio_phone,
  voice_name,
  language,
  objective,
  greeting,
  system_prompt,
  agent_type,
  business_name,
  business_description,
  assistant_description,
  capabilities,
  behavior,
  lead_fields,
  escalation_rules,
  updated_at
) on public.voice_agents to authenticated;

-- Keep the existing revision mechanism accurate while the old provisioner is
-- still present. Publishing and timestamps alone do not create a new revision.
create or replace function public.bump_voice_agent_deployment_revision()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if row(
    new.name,
    new.status,
    new.twilio_phone,
    new.voice_name,
    new.language,
    new.objective,
    new.greeting,
    new.system_prompt,
    new.agent_type,
    new.business_name,
    new.business_description,
    new.assistant_description,
    new.capabilities,
    new.behavior,
    new.lead_fields,
    new.escalation_rules
  ) is distinct from row(
    old.name,
    old.status,
    old.twilio_phone,
    old.voice_name,
    old.language,
    old.objective,
    old.greeting,
    old.system_prompt,
    old.agent_type,
    old.business_name,
    old.business_description,
    old.assistant_description,
    old.capabilities,
    old.behavior,
    old.lead_fields,
    old.escalation_rules
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

revoke all on function public.bump_voice_agent_deployment_revision() from public, anon, authenticated;
