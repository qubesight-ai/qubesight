import { describe, expect, it } from "vitest";
import { agentTemplates, getAgentTemplate } from "@/features/voice-agents/agentTemplates";
import { createAgentSchema } from "@/features/voice-agents/schemas/createAgent";

describe("create voice agent", () => {
  it("offers exactly the three supported product templates", () => {
    expect(agentTemplates.map((template) => template.type)).toEqual([
      "customer_service",
      "sales_prospecting",
      "marketing",
    ]);
    expect(getAgentTemplate("sales_prospecting")?.suggestedName).toBe("Asistente de ventas");
  });

  it("accepts a complete plain-language agent description", () => {
    const result = createAgentSchema.safeParse({
      agent_type: "customer_service",
      name: "Sofia",
      business_name: "Clínica Sonrisa",
      business_description: "Clínica dental familiar ubicada en San José.",
      assistant_description:
        "Responder llamadas, explicar servicios y recibir solicitudes de citas dentales.",
      language: "Español",
      voice_name: "Sofia",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an unsupported agent type", () => {
    const result = createAgentSchema.safeParse({
      agent_type: "custom_runtime",
      name: "Sofia",
      business_name: "Clínica Sonrisa",
      business_description: "Clínica dental familiar ubicada en San José.",
      assistant_description:
        "Responder llamadas, explicar servicios y recibir solicitudes de citas dentales.",
      language: "Español",
      voice_name: "Sofia",
    });

    expect(result.success).toBe(false);
  });
});
