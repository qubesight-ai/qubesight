import { MessageCircle, ShieldCheck, UserRound } from "lucide-react";
import type { Agent } from "@/types/dashboard";
import { normalizeBehavior, normalizeEscalationRules, normalizeLeadFields } from "../generation";

export default function GeneratedPlanSummary({ agent }: { agent: Agent }) {
  if (agent.configuration_status === "draft") return null;

  const behavior = normalizeBehavior(agent.behavior);
  const fields = normalizeLeadFields(agent.lead_fields);
  const escalation = normalizeEscalationRules(agent.escalation_rules);

  return (
    <section className="admin-panel p-6">
      <h2 className="text-lg font-semibold">Configuración preparada</h2>
      <p className="text-sm text-slate-500 mt-1 mb-5">
        Este es el resumen visible de lo que QubeSight generó.
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-xl border p-4">
          <MessageCircle className="text-blue-600" size={20} />
          <strong className="block text-sm mt-3">Forma de hablar</strong>
          <p className="text-xs text-slate-500 mt-1">
            {behavior ? `${behavior.tone}. ${behavior.response_style}` : "Clara y profesional."}
          </p>
        </div>
        <div className="rounded-xl border p-4">
          <UserRound className="text-blue-600" size={20} />
          <strong className="block text-sm mt-3">Información que recopila</strong>
          <p className="text-xs text-slate-500 mt-1">
            {fields.length ? fields.join(", ") : "No se configuraron datos obligatorios."}
          </p>
        </div>
        <div className="rounded-xl border p-4">
          <ShieldCheck className="text-blue-600" size={20} />
          <strong className="block text-sm mt-3">Ayuda de una persona</strong>
          <p className="text-xs text-slate-500 mt-1">
            {escalation?.summary || "Transferirá cuando la situación lo requiera."}
          </p>
        </div>
      </div>
    </section>
  );
}
