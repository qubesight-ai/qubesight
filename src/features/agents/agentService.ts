import { supabase } from "@/integrations/supabase/client";
import type { Agent } from "@/types/dashboard";

export const emptyAgent: Agent = {
  id: "",
  name: "",
  status: "active",
  twilio_phone: "",
  voice_name: "Sofia",
  language: "Español",
  objective: "",
  greeting: "",
  system_prompt: "",
  deployment_revision: 1,
  deployed_revision: null,
  provisioning_status: "not_deployed",
  runtime_service: null,
  runtime_url: null,
  last_health_at: null,
  last_deployed_at: null,
  last_provisioning_error: null,
};

export type AgentConfig = Pick<
  Agent,
  | "name"
  | "status"
  | "twilio_phone"
  | "voice_name"
  | "language"
  | "objective"
  | "greeting"
  | "system_prompt"
>;

function toPayload(form: AgentConfig) {
  return {
    name: form.name,
    status: form.status,
    twilio_phone: form.twilio_phone || null,
    voice_name: form.voice_name,
    language: form.language,
    objective: form.objective,
    greeting: form.greeting,
    system_prompt: form.system_prompt,
  };
}

/** Actualiza sólo campos de configuración (nunca organization_id). */
export async function updateAgent(agentId: string, form: AgentConfig) {
  const { error } = await supabase.from("voice_agents").update(toPayload(form)).eq("id", agentId);
  if (error) throw new Error(error.message);
}

export async function createAgent(organizationId: string, form: AgentConfig) {
  const { data, error } = await supabase
    .from("voice_agents")
    .insert({ ...toPayload(form), organization_id: organizationId })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return data.id as string;
}

export async function fetchAgent(agentId: string): Promise<Agent | null> {
  const { data, error } = await supabase
    .from("voice_agents")
    .select("*")
    .eq("id", agentId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as unknown as Agent) ?? null;
}
