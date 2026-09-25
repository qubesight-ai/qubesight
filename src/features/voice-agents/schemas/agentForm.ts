import { z } from "zod";

export const agentFormSchema = z.object({
  name: z.string().trim().min(2, "Escribe un nombre para el agente.").max(80),
  agent_type: z.enum(["customer_service", "sales_prospecting", "marketing"]).nullable(),
  business_name: z.string().trim().min(2, "Escribe el nombre del negocio.").max(120),
  business_description: z.string().trim().max(2000),
  assistant_description: z
    .string()
    .trim()
    .min(10, "Describe brevemente qué debe hacer el agente.")
    .max(4000),
  voice_name: z.string().trim().min(2, "Selecciona una voz.").max(80),
  language: z.string().trim().min(2, "Selecciona un idioma.").max(80),
  greeting: z.string().trim().max(1000),
});

export type AgentFormValues = z.infer<typeof agentFormSchema>;
