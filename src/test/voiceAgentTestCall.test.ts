import { describe, expect, it } from "vitest";
import type { Agent } from "@/types/dashboard";
import { parseVoiceAgentTestSession, testCallBlocker } from "@/features/voice-agents/testCall";

const generatedAgent = {
  configuration_status: "generated",
  greeting: "Hola, ¿cómo puedo ayudarte?",
  system_prompt: "Instrucciones internas completas",
} as Agent;

describe("voice agent test call", () => {
  it("requires a complete generated configuration", () => {
    expect(testCallBlocker(generatedAgent)).toBeNull();
    expect(testCallBlocker({ ...generatedAgent, configuration_status: "draft" })).toContain(
      "Genera el agente",
    );
    expect(testCallBlocker({ ...generatedAgent, system_prompt: "" })).toContain("incompleta");
  });

  it("accepts only bounded LiveKit session responses", () => {
    expect(
      parseVoiceAgentTestSession({
        server_url: "wss://example.livekit.cloud",
        participant_token: "a-secure-temporary-token",
        room_name: "qs-test-agent-session",
        expires_in: 600,
      }),
    ).toEqual({
      serverUrl: "wss://example.livekit.cloud",
      participantToken: "a-secure-temporary-token",
      roomName: "qs-test-agent-session",
      expiresIn: 600,
    });

    expect(() =>
      parseVoiceAgentTestSession({
        server_url: "https://example.livekit.cloud",
        participant_token: "short",
        room_name: "untrusted-room",
        expires_in: 0,
      }),
    ).toThrow("respuesta inválida");
  });
});
