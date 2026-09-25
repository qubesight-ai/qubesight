import type { Database } from "@/integrations/supabase/types";
import type {
  Agent,
  AgentConfigurationStatus,
  AgentType,
  ProvisioningStatus,
} from "@/types/dashboard";

type VoiceAgentRow = Database["public"]["Tables"]["voice_agents"]["Row"];

const agentTypes = new Set<AgentType>(["customer_service", "sales_prospecting", "marketing"]);
const configurationStatuses = new Set<AgentConfigurationStatus>([
  "draft",
  "generated",
  "published",
]);
const provisioningStatuses = new Set<ProvisioningStatus>([
  "not_deployed",
  "provisioning",
  "running",
  "degraded",
  "stopped",
  "error",
]);

export function parseAgentType(value: unknown): AgentType | null {
  return typeof value === "string" && agentTypes.has(value as AgentType)
    ? (value as AgentType)
    : null;
}

export function parseConfigurationStatus(value: unknown): AgentConfigurationStatus {
  return typeof value === "string" && configurationStatuses.has(value as AgentConfigurationStatus)
    ? (value as AgentConfigurationStatus)
    : "draft";
}

export function parseProvisioningStatus(value: unknown): ProvisioningStatus {
  return typeof value === "string" && provisioningStatuses.has(value as ProvisioningStatus)
    ? (value as ProvisioningStatus)
    : "not_deployed";
}

export function normalizeAgent(row: VoiceAgentRow): Agent {
  return {
    ...row,
    agent_type: parseAgentType(row.agent_type),
    provisioning_status: parseProvisioningStatus(row.provisioning_status),
    business_name: row.business_name ?? "",
    business_description: row.business_description ?? "",
    assistant_description: row.assistant_description ?? row.objective,
    configuration_status: parseConfigurationStatus(row.configuration_status),
    capabilities: row.capabilities ?? {},
    behavior: row.behavior ?? {},
    lead_fields: row.lead_fields ?? [],
    escalation_rules: row.escalation_rules ?? {},
    published_at: row.published_at ?? null,
  };
}
