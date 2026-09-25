import { describe, expect, it } from "vitest";
import type { Agent } from "@/types/dashboard";
import {
  generationBlocker,
  normalizeBehavior,
  normalizeEscalationRules,
  normalizeLeadFields,
} from "@/features/voice-agents/generation";
import { readFunctionError } from "@/lib/functionError";

const agent = {
  agent_type: "customer_service",
  business_name: "Clínica Central",
  business_description: "Clínica dental para familias.",
  assistant_description: "Atender consultas y recibir solicitudes de cita.",
} as Agent;

describe("voice agent generation", () => {
  it("requires the customer-facing information before generation", () => {
    expect(generationBlocker(agent)).toBeNull();
    expect(generationBlocker({ ...agent, agent_type: null })).toContain("tipo de agente");
    expect(generationBlocker({ ...agent, business_description: "" })).toContain("se dedica");
  });

  it("normalizes only the safe generated summary", () => {
    expect(
      normalizeBehavior({
        tone: "Amable",
        response_style: "Breve",
        confirm_sensitive_actions: true,
        unknown_information: "Reconoce que no sabe",
      }),
    ).toEqual({
      tone: "Amable",
      response_style: "Breve",
      confirm_sensitive_actions: true,
      unknown_information: "Reconoce que no sabe",
    });
    expect(normalizeBehavior({ tone: "Amable" })).toBeNull();
    expect(normalizeLeadFields(["nombre", 7, "teléfono"])).toEqual(["nombre", "teléfono"]);
    expect(
      normalizeEscalationRules({
        when_requested: true,
        when_uncertain: true,
        when_upset: true,
        summary: "Transfiere si necesita ayuda.",
      })?.summary,
    ).toBe("Transfiere si necesita ayuda.");
  });

  it("reads Supabase function errors without assuming Response.clone exists", async () => {
    await expect(
      readFunctionError({ status: 409, body: { error: "Completa la información" } }),
    ).resolves.toEqual({
      status: 409,
      retryAfterSeconds: undefined,
      message: "Completa la información",
    });

    await expect(
      readFunctionError({
        status: 429,
        headers: { get: () => "45" },
        json: async () => ({ error: "Espera" }),
      }),
    ).resolves.toEqual({ status: 429, retryAfterSeconds: 45, message: "Espera" });
  });
});
