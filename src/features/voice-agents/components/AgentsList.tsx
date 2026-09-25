import { ArrowRight, Mic2, Plus } from "lucide-react";
import type { Agent } from "@/types/dashboard";

type AgentsListProps = {
  agents: Agent[];
  onEdit: (agent: Agent) => void;
  onNew: () => void;
};

export default function AgentsList({ agents, onEdit, onNew }: AgentsListProps) {
  return (
    <div className="admin-panel">
      <div className="panel-head">
        <div>
          <h2>Agentes de voz</h2>
          <p>Administra los asistentes que atienden a tus clientes.</p>
        </div>
        <button className="admin-primary" onClick={onNew}>
          <Plus size={15} />
          Nuevo agente
        </button>
      </div>
      {agents.length === 0 ? (
        <div className="py-20 text-center">
          <Mic2 className="mx-auto text-slate-300 mb-4" size={38} />
          <h3 className="font-semibold">Aún no tienes agentes</h3>
          <p className="text-sm text-slate-400">Crea el primero para comenzar.</p>
        </div>
      ) : (
        <div className="divide-y">
          {agents.map((agent) => (
            <article key={agent.id} className="agent-row">
              <span className="agent-icon">
                <Mic2 />
              </span>
              <div>
                <span
                  className={agent.status === "active" ? "status-pill" : "status-pill inactive"}
                >
                  {agent.status === "active" ? "Activo" : "Inactivo"}
                </span>
                <h3>{agent.name}</h3>
                <p>{agent.objective || "Sin objetivo configurado"}</p>
              </div>
              <AgentData label="VOZ E IDIOMA" value={`${agent.voice_name} · ${agent.language}`} />
              <AgentData label="NÚMERO" value={agent.twilio_phone || "Sin asignar"} />
              <button
                className="icon-action"
                aria-label={`Abrir ${agent.name}`}
                onClick={() => onEdit(agent)}
              >
                <ArrowRight size={17} />
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function AgentData({ label, value }: { label: string; value: string }) {
  return (
    <div className="hidden lg:block">
      <small className="text-[9px] tracking-wider text-slate-400 block">{label}</small>
      <strong className="text-xs">{value}</strong>
    </div>
  );
}
