import { supabase } from "@/integrations/supabase/client";
import { readFunctionError } from "@/lib/functionError";

export class VoiceAgentGenerationRateLimitError extends Error {
  retryAfterSeconds: number;

  constructor(message: string, retryAfterSeconds: number) {
    super(message);
    this.name = "VoiceAgentGenerationRateLimitError";
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export async function generateVoiceAgent(agentId: string): Promise<void> {
  const { data, error } = await supabase.functions.invoke("voice-agent-generate", {
    body: { agent_id: agentId },
  });

  if (error) {
    const details = await readFunctionError((error as { context?: unknown }).context);
    if (details.status === 429) {
      throw new VoiceAgentGenerationRateLimitError(
        details.message ?? "Alcanzaste el límite de generaciones. Espera un momento.",
        details.retryAfterSeconds ?? 30,
      );
    }
    if (details.message) throw new Error(details.message);
    throw new Error("No se pudo contactar el generador del agente.");
  }

  if (!data || data.error)
    throw new Error(data?.error ?? "La generación no devolvió un resultado.");
}
