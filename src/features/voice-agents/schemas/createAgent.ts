import { z } from "zod";

export const createAgentSchema = z.object({
  agent_type: z.enum(["customer_service", "sales_prospecting", "marketing"]),
  name: z.string().trim().min(2, "Escribe un nombre para el agente.").max(80),
  business_name: z.string().trim().min(2, "Escribe el nombre del negocio.").max(120),
  business_description: z
    .string()
    .trim()
    .min(10, "Cuéntanos brevemente a qué se dedica el negocio.")
    .max(2000),
  assistant_description: z
    .string()
    .trim()
    .min(20, "Describe con un poco más de detalle qué debe hacer el agente.")
    .max(4000),
  language: z.string().trim().min(2).max(80),
  voice_name: z.string().trim().min(2).max(80),
});

export type CreateAgentValues = z.infer<typeof createAgentSchema>;
