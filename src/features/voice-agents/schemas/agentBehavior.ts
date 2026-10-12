import { z } from "zod";

export const agentBehaviorSchema = z.object({
  behavior: z.object({
    tone: z.string().trim().min(2, "Describe el tono del agente.").max(200),
    response_style: z.string().trim().min(2, "Describe el estilo de respuesta.").max(200),
    confirm_sensitive_actions: z.boolean(),
    unknown_information: z.string().trim().min(2, "Indica qué hacer cuando no sabe algo.").max(500),
  }),
  escalation_rules: z.object({
    when_requested: z.boolean(),
    when_uncertain: z.boolean(),
    when_upset: z.boolean(),
    summary: z.string().trim().min(2, "Explica cuándo pasar con una persona.").max(500),
  }),
});

export type AgentBehaviorValues = z.infer<typeof agentBehaviorSchema>;
