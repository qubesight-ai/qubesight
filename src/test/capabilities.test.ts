import { describe, expect, it } from "vitest";
import { defaultCapabilities, normalizeCapabilities } from "@/features/voice-agents/capabilities";

describe("voice agent capabilities", () => {
  it("uses safe defaults for each product template", () => {
    expect(defaultCapabilities("customer_service").appointments).toBe(true);
    expect(defaultCapabilities("marketing").appointments).toBe(false);
    expect(defaultCapabilities("sales_prospecting").lead_capture).toBe(true);
  });

  it("preserves valid saved values and fills missing fields", () => {
    const capabilities = normalizeCapabilities(
      { faq: false, lead_capture: true },
      "customer_service",
    );

    expect(capabilities.faq).toBe(false);
    expect(capabilities.lead_capture).toBe(true);
    expect(capabilities.human_transfer).toBe(true);
    expect(capabilities.whatsapp_followup).toBe(false);
  });
});

describe("persisted capabilities", () => {
  it("detects whether every flag is stored in the database row", async () => {
    const { capabilitiesArePersisted } = await import("@/features/voice-agents/capabilities");
    expect(capabilitiesArePersisted({})).toBe(false);
    expect(capabilitiesArePersisted(null)).toBe(false);
    expect(capabilitiesArePersisted({ faq: true })).toBe(false);
    expect(capabilitiesArePersisted(defaultCapabilities("customer_service"))).toBe(true);
  });
});
