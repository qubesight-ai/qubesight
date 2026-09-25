import { describe, expect, it } from "vitest";
import { parseAgentType, parseConfigurationStatus } from "@/features/voice-agents/agentModel";

describe("voice agent product values", () => {
  it("accepts only the three supported agent types", () => {
    expect(parseAgentType("customer_service")).toBe("customer_service");
    expect(parseAgentType("sales_prospecting")).toBe("sales_prospecting");
    expect(parseAgentType("marketing")).toBe("marketing");
    expect(parseAgentType("unknown")).toBeNull();
  });

  it("falls back safely when a configuration status is unknown", () => {
    expect(parseConfigurationStatus("published")).toBe("published");
    expect(parseConfigurationStatus("legacy")).toBe("draft");
    expect(parseConfigurationStatus(undefined)).toBe("draft");
  });
});
