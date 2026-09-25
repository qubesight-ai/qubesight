import type { AgentType } from "@/types/dashboard";

export type AgentCapabilities = {
  faq: boolean;
  lead_capture: boolean;
  appointments: boolean;
  human_transfer: boolean;
  whatsapp_followup: boolean;
};

const defaultsByType: Record<AgentType, AgentCapabilities> = {
  customer_service: {
    faq: true,
    lead_capture: true,
    appointments: true,
    human_transfer: true,
    whatsapp_followup: false,
  },
  sales_prospecting: {
    faq: true,
    lead_capture: true,
    appointments: true,
    human_transfer: true,
    whatsapp_followup: false,
  },
  marketing: {
    faq: true,
    lead_capture: true,
    appointments: false,
    human_transfer: true,
    whatsapp_followup: false,
  },
};

const fallbackCapabilities: AgentCapabilities = {
  faq: true,
  lead_capture: true,
  appointments: false,
  human_transfer: true,
  whatsapp_followup: false,
};

export function defaultCapabilities(type: AgentType | null): AgentCapabilities {
  return type ? defaultsByType[type] : fallbackCapabilities;
}

export function normalizeCapabilities(value: unknown, type: AgentType | null): AgentCapabilities {
  const defaults = defaultCapabilities(type);
  if (!value || typeof value !== "object" || Array.isArray(value)) return defaults;

  const source = value as Record<string, unknown>;
  return {
    faq: typeof source.faq === "boolean" ? source.faq : defaults.faq,
    lead_capture:
      typeof source.lead_capture === "boolean" ? source.lead_capture : defaults.lead_capture,
    appointments:
      typeof source.appointments === "boolean" ? source.appointments : defaults.appointments,
    human_transfer:
      typeof source.human_transfer === "boolean" ? source.human_transfer : defaults.human_transfer,
    whatsapp_followup:
      typeof source.whatsapp_followup === "boolean"
        ? source.whatsapp_followup
        : defaults.whatsapp_followup,
  };
}
