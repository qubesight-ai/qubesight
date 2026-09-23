import type { Agent } from "@/types/dashboard";

export type VoiceAgentTestSession = {
  serverUrl: string;
  participantToken: string;
  roomName: string;
  expiresIn: number;
};

export type VoiceAgentTestSessionPayload = {
  server_url?: unknown;
  participant_token?: unknown;
  room_name?: unknown;
  expires_in?: unknown;
  error?: unknown;
};

export function testCallBlocker(agent: Agent): string | null {
  if (agent.configuration_status === "draft") {
    return "Genera el agente antes de probar una llamada.";
  }
  if (!agent.greeting.trim() || !agent.system_prompt.trim()) {
    return "La configuración generada está incompleta. Genera el agente nuevamente.";
  }
  return null;
}

export function parseVoiceAgentTestSession(
  payload: VoiceAgentTestSessionPayload,
): VoiceAgentTestSession {
  if (
    typeof payload.server_url !== "string" ||
    !payload.server_url.startsWith("wss://") ||
    typeof payload.participant_token !== "string" ||
    payload.participant_token.length < 20 ||
    typeof payload.room_name !== "string" ||
    !payload.room_name.startsWith("qs-test-") ||
    typeof payload.expires_in !== "number" ||
    !Number.isFinite(payload.expires_in) ||
    payload.expires_in <= 0
  ) {
    throw new Error("El servicio de prueba devolvió una respuesta inválida.");
  }

  return {
    serverUrl: payload.server_url,
    participantToken: payload.participant_token,
    roomName: payload.room_name,
    expiresIn: payload.expires_in,
  };
}
