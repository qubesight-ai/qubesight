-- QubeSight Chatbot Builder MVP.
-- Run after 20260824010000_voice_admin_foundation.sql.

create table public.chatbots (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 120),
  description text not null default '',
  status public.resource_status not null default 'inactive',
  personality text not null default 'Amable, clara y profesional',
  objective text not null default '',
  welcome_message text not null default '',
  system_prompt text not null default '',
  business_hours text not null default '',
  handoff_instructions text not null default '',
  required_fields jsonb not null default '[]'::jsonb,
  faqs jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index chatbots_org_idx on public.chatbots(organization_id);
alter table public.chatbots enable row level security;

create policy "Members read chatbots" on public.chatbots for select to authenticated
using (public.is_org_member(organization_id) or public.is_admin());
create policy "Owners insert chatbots" on public.chatbots for insert to authenticated
with check (public.is_org_owner(organization_id) or public.is_admin());
create policy "Owners update chatbots" on public.chatbots for update to authenticated
using (public.is_org_owner(organization_id) or public.is_admin())
with check (public.is_org_owner(organization_id) or public.is_admin());
create policy "Owners delete chatbots" on public.chatbots for delete to authenticated
using (public.is_org_owner(organization_id) or public.is_admin());

grant select, insert, update, delete on public.chatbots to authenticated;
