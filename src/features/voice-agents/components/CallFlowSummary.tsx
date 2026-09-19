import { ArrowDown, CheckCircle2, PhoneCall, UserRoundCheck } from "lucide-react";
import type { Agent } from "@/types/dashboard";
import { normalizeCapabilities } from "../capabilities";

export default function CallFlowSummary({ agent }: { agent: Agent }) {
  const capabilities = normalizeCapabilities(agent.capabilities, agent.agent_type);
  const actions = [
    capabilities.faq && "Responde preguntas",
    capabilities.lead_capture && "Recopila información",
    capabilities.appointments && "Recibe solicitudes de cita",
    capabilities.human_transfer && "Transfiere cuando es necesario",
  ].filter((value): value is string => Boolean(value));

  return (
    <section className="admin-panel p-6">
      <h2 className="text-lg font-semibold">Así funcionará una llamada</h2>
      <p className="text-sm text-slate-500 mt-1 mb-5">Un resumen sencillo del comportamiento.</p>

      <FlowStep icon={PhoneCall} title="Alguien llama" detail="El agente contesta con su saludo." />
      <FlowArrow />
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <strong className="text-sm text-blue-900">{agent.name} atiende</strong>
        <ul className="mt-3 space-y-2">
          {actions.map((action) => (
            <li key={action} className="flex items-center gap-2 text-xs text-blue-800">
              <CheckCircle2 size={14} /> {action}
            </li>
          ))}
        </ul>
      </div>
      <FlowArrow />
      <FlowStep
        icon={UserRoundCheck}
        title="Guarda el resultado"
        detail="QubeSight registra el resumen y la información recopilada."
      />
    </section>
  );
}

function FlowArrow() {
  return (
    <div className="grid place-items-center py-2 text-slate-300">
      <ArrowDown size={18} />
    </div>
  );
}

function FlowStep({
  icon: Icon,
  title,
  detail,
}: {
  icon: typeof PhoneCall;
  title: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4 flex items-start gap-3">
      <span className="w-9 h-9 shrink-0 rounded-xl bg-slate-100 text-slate-600 grid place-items-center">
        <Icon size={17} />
      </span>
      <span>
        <strong className="block text-sm">{title}</strong>
        <span className="block text-xs text-slate-500 mt-1">{detail}</span>
      </span>
    </div>
  );
}
