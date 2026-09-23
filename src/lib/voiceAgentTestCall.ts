import { supabase } from "@/integrations/supabase/client";
import { readFunctionError } from "@/lib/functionError";
import {
  parseVoiceAgentTestSession,
  type VoiceAgentTestSession,
  type VoiceAgentTestSessionPayload,
} from "@/features/voice-agents/testCall";

export type { VoiceAgentTestSession } from "@/features/voice-agents/testCall";

export async function createVoiceAgentTestSession(agentId: string): Promise<VoiceAgentTestSession> {
  const { data, error } = await supabase.functions.invoke("voice-agent-test-session", {
    body: { agent_id: agentId },
  });

  if (error) {
    const details = await readFunctionError((error as { context?: unknown }).context);
    if (details.status === 429) {
      throw new Error(details.message ?? "Alcanzaste el límite de pruebas. Espera un momento.");
    }
    if (details.message) throw new Error(details.message);
    throw new Error("No se pudo iniciar la prueba de llamada.");
  }

  if (!data || data.error) {
    throw new Error(
      typeof data?.error === "string" ? data.error : "No se pudo crear la sesión de prueba.",
    );
  }

  return parseVoiceAgentTestSession(data as VoiceAgentTestSessionPayload);
}
