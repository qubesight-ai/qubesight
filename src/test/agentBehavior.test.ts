import { describe, expect, it } from "vitest";
import { agentBehaviorSchema } from "@/features/voice-agents/schemas/agentBehavior";
import { normalizeBehavior, normalizeEscalationRules } from "@/features/voice-agents/generation";

const valid = {
  behavior: {
    tone: "amable y profesional",
    response_style: "claro y conciso",
    confirm_sensitive_actions: true,
    unknown_information: "Ofrecer hablar con una persona",
  },
  escalation_rules: {
    when_requested: true,
    when_uncertain: true,
    when_upset: false,
    summary: "Transferir si el cliente lo pide",
  },
};

describe("agent behavior and escalation persistence shape", () => {
  it("accepts values that the stored-row normalizers read back unchanged", () => {
    const parsed = agentBehaviorSchema.parse(valid);
    expect(normalizeBehavior(parsed.behavior)).toEqual(valid.behavior);
    expect(normalizeEscalationRules(parsed.escalation_rules)).toEqual(valid.escalation_rules);
  });

  it("rejects empty limits", () => {
    expect(
      agentBehaviorSchema.safeParse({
        ...valid,
        behavior: { ...valid.behavior, unknown_information: " " },
      }).success,
    ).toBe(false);
  });
});
