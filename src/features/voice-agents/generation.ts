import type { Agent } from "@/types/dashboard";

export type AgentBehavior = {
  tone: string;
  response_style: string;
  confirm_sensitive_actions: boolean;
  unknown_information: string;
};

export type AgentEscalationRules = {
  when_requested: boolean;
  when_uncertain: boolean;
  when_upset: boolean;
  summary: string;
};

export function generationBlocker(agent: Agent): string | null {
  if (!agent.agent_type) return "Selecciona el tipo de agente y guarda la información.";
  if (agent.business_name.trim().length < 2) return "Agrega el nombre del negocio.";
  if (agent.business_description.trim().length < 10) {
    return "Describe brevemente a qué se dedica el negocio.";
  }
  if (agent.assistant_description.trim().length < 10) {
    return "Describe qué debe hacer el agente.";
  }
  return null;
}

export function normalizeBehavior(value: unknown): AgentBehavior | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const source = value as Record<string, unknown>;
  if (
    typeof source.tone !== "string" ||
    typeof source.response_style !== "string" ||
    typeof source.confirm_sensitive_actions !== "boolean" ||
    typeof source.unknown_information !== "string"
  ) {
    return null;
  }
  return {
    tone: source.tone,
    response_style: source.response_style,
    confirm_sensitive_actions: source.confirm_sensitive_actions,
    unknown_information: source.unknown_information,
  };
}

export function normalizeLeadFields(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string").slice(0, 8)
    : [];
}

export function normalizeEscalationRules(value: unknown): AgentEscalationRules | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const source = value as Record<string, unknown>;
  if (
    typeof source.when_requested !== "boolean" ||
    typeof source.when_uncertain !== "boolean" ||
    typeof source.when_upset !== "boolean" ||
    typeof source.summary !== "string"
  ) {
    return null;
  }
  return {
    when_requested: source.when_requested,
    when_uncertain: source.when_uncertain,
    when_upset: source.when_upset,
    summary: source.summary,
  };
}
