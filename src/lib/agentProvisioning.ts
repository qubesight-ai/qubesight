import { supabase } from "@/integrations/supabase/client";
import type { ProvisioningStatus } from "@/types/dashboard";

export type ProvisioningAction = "reconcile" | "restart" | "status" | "stop";

export type ProvisioningResult = {
  operation_id: string;
  agent_id: string;
  state: ProvisioningStatus;
  revision: number;
  runtime_url: string;
  health: Record<string, unknown> | null;
};

export async function manageAgent(
  agentId: string,
  action: ProvisioningAction,
): Promise<ProvisioningResult> {
  const requestId = action === "restart" || action === "stop" ? crypto.randomUUID() : undefined;
  const { data, error } = await supabase.functions.invoke("agent-provisioning", {
    body: { action, agent_id: agentId, ...(requestId ? { request_id: requestId } : {}) },
  });

  if (error) {
    const context = (error as { context?: Response }).context;
    if (context) {
      try {
        const payload = await context.clone().json();
        if (payload?.error) throw new Error(String(payload.error));
      } catch (parsed) {
        if (parsed instanceof Error && parsed.message !== "Unexpected end of JSON input") {
          throw parsed;
        }
      }
    }
    throw new Error("No se pudo contactar el servicio de despliegue.");
  }
  if (!data || data.error) throw new Error(data?.error || "Respuesta inválida del provisioner.");
  return data as ProvisioningResult;
}
