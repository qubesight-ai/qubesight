export type ResourceStatus = "active" | "inactive" | "suspended";
export type ProvisioningStatus =
  "not_deployed" | "provisioning" | "running" | "degraded" | "stopped" | "error";

export type Agent = {
  id: string;
  name: string;
  status: ResourceStatus;
  twilio_phone: string | null;
  voice_name: string;
  language: string;
  objective: string;
  greeting: string;
  system_prompt: string;
  deployment_revision: number;
  deployed_revision: number | null;
  provisioning_status: ProvisioningStatus;
  runtime_service: string | null;
  runtime_url: string | null;
  last_health_at: string | null;
  last_deployed_at: string | null;
  last_provisioning_error: string | null;
};

export type Call = {
  id: string;
  caller_phone: string | null;
  status: string;
  result: string | null;
  duration_seconds: number;
  started_at: string;
  voice_agents: { name: string } | null;
};

export type Chatbot = {
  id: string;
  name: string;
  description: string;
  status: ResourceStatus;
  personality: string;
  objective: string;
  welcome_message: string;
  system_prompt: string;
  business_hours: string;
  handoff_instructions: string;
  required_fields: string[];
  faqs: { question: string; answer: string }[];
};

export type Organization = { id: string; name: string; industry: string | null };
export type Profile = { full_name: string; role: string };
export type DashboardSection =
  "overview" | "agents" | "chatbots" | "telephony" | "calls" | "profile";
