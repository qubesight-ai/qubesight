import type { AgentType } from "@/types/dashboard";

export type AgentTemplate = {
  type: AgentType;
  title: string;
  description: string;
  suggestedName: string;
  examples: string[];
};

export const agentTemplates: AgentTemplate[] = [
  {
    type: "customer_service",
    title: "Servicio al cliente",
    description: "Atiende consultas, pedidos, soporte y solicitudes frecuentes.",
    suggestedName: "Asistente de servicio",
    examples: ["Responder preguntas", "Gestionar solicitudes", "Transferir casos complejos"],
  },
  {
    type: "sales_prospecting",
    title: "Ventas y prospección",
    description: "Califica oportunidades, recopila datos y ayuda a avanzar ventas.",
    suggestedName: "Asistente de ventas",
    examples: ["Calificar prospectos", "Explicar servicios", "Registrar oportunidades"],
  },
  {
    type: "marketing",
    title: "Marketing",
    description: "Atiende campañas, identifica intereses y recopila contactos.",
    suggestedName: "Asistente de marketing",
    examples: ["Informar promociones", "Capturar contactos", "Identificar intereses"],
  },
];

export function getAgentTemplate(type: AgentType) {
  return agentTemplates.find((template) => template.type === type);
}
