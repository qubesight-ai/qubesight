import { Mic2, Plus, Settings2 } from "lucide-react";
import AgentRuntimeActions from "@/components/dashboard/AgentRuntimeActions";
import type { Agent } from "@/types/dashboard";

type Props = {
  agents: Agent[];
  onEdit: (agent: Agent) => void;
  onNew: () => void;
  onChanged: () => void;
};

export default function AgentsPanel({ agents, onEdit, onNew, onChanged }: Props) {
  return (
    <div className="admin-panel">
      <div className="panel-head">
        <div>
          <h2>Agentes de voz</h2>
          <p>Prompt, voz, número y comportamiento por cliente</p>
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
          <p className="text-sm text-slate-400">Crea el primero para comenzar</p>
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

              <Data label="VOZ E IDIOMA" value={`${agent.voice_name} · ${agent.language}`} />

              <Data label="NÚMERO TWILIO" value={agent.twilio_phone || "Sin asignar"} />

              <AgentRuntimeActions agent={agent} onChanged={onChanged} />

              <button
                className="icon-action"
                onClick={() => onEdit(agent)}
                aria-label={`Editar ${agent.name}`}
              >
                <Settings2 size={17} />
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function Data({ label, value }: { label: string; value: string }) {
  return (
    <div className="hidden lg:block">
      <small className="text-[9px] tracking-wider text-slate-400 block">{label}</small>
      <strong className="text-xs">{value}</strong>
    </div>
  );
}
