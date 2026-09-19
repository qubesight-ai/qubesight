-- Return generated agents to draft when customer-owned source information changes.
-- Server generation updates only generated fields and explicitly sets generated status.

create or replace function public.bump_voice_agent_deployment_revision()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  configuration_changed boolean;
  generation_source_changed boolean;
begin
  configuration_changed := row(
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
  );

  generation_source_changed := row(
    new.name,
    new.voice_name,
    new.language,
    new.agent_type,
    new.business_name,
    new.business_description,
    new.assistant_description,
    new.capabilities
  ) is distinct from row(
    old.name,
    old.voice_name,
    old.language,
    old.agent_type,
    old.business_name,
    old.business_description,
    old.assistant_description,
    old.capabilities
  );

  if configuration_changed then
    new.deployment_revision := old.deployment_revision + 1;
    if old.provisioning_status in ('running', 'degraded') then
      new.provisioning_status := 'stopped';
    end if;
  end if;

  -- Browser users cannot set lifecycle fields. A server-side generation changes
  -- draft -> generated in the same update, so that transition is preserved.
  if generation_source_changed and new.configuration_status = old.configuration_status then
    new.configuration_status := 'draft';
    new.published_at := null;
  end if;

  new.updated_at := now();
  return new;
end;
$$;

revoke all on function public.bump_voice_agent_deployment_revision() from public, anon, authenticated;
