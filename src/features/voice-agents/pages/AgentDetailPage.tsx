import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { Agent } from "@/types/dashboard";
import { getAgentTemplate } from "../agentTemplates";
import AgentForm from "../components/AgentForm";
import AgentStatusBadge from "../components/AgentStatusBadge";
import CallFlowSummary from "../components/CallFlowSummary";
import CapabilitiesSettings from "../components/CapabilitiesSettings";
import GenerateAgentCard from "../components/GenerateAgentCard";
import GeneratedPlanSummary from "../components/GeneratedPlanSummary";
import TestCallCard from "../components/TestCallCard";

type AgentDetailPageProps = {
  agents: Agent[];
  organizationId: string;
  onChanged: () => void;
};

export default function AgentDetailPage({
  agents,
  organizationId,
  onChanged,
}: AgentDetailPageProps) {
  const navigate = useNavigate();
  const { agentId } = useParams();
  const agent = agents.find((candidate) => candidate.id === agentId);

  if (!agent) {
    return (
      <section className="admin-panel p-10 text-center">
        <h2 className="text-xl font-semibold">Agente no encontrado</h2>
        <p className="text-sm text-slate-500 mt-2">
          El agente no existe o no pertenece a tu organización.
        </p>
        <button
          type="button"
          className="admin-primary mx-auto mt-6"
          onClick={() => navigate("/dashboard/agents")}
        >
          Volver a agentes
        </button>
      </section>
    );
  }

  const template = agent.agent_type ? getAgentTemplate(agent.agent_type) : null;

  return (
    <div className="space-y-6">
      <section className="admin-panel p-6">
        <button
          type="button"
          className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-2 mb-5"
          onClick={() => navigate("/dashboard/agents")}
        >
          <ArrowLeft size={16} /> Volver a agentes
        </button>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[.18em] text-blue-600">
              {template?.title.toUpperCase() ?? "AGENTE SIN CLASIFICAR"}
            </p>
            <h2 className="text-2xl font-semibold mt-1">{agent.name}</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl">
              {agent.assistant_description || agent.objective || "Describe qué debe hacer."}
            </p>
          </div>
          <AgentStatusBadge status={agent.configuration_status} />
        </div>
      </section>

      <GenerateAgentCard agent={agent} onGenerated={onChanged} />

      <GeneratedPlanSummary agent={agent} />

      <TestCallCard agent={agent} />

      <div className="grid xl:grid-cols-2 gap-6 items-start">
        <CapabilitiesSettings agent={agent} onSaved={onChanged} />
        <CallFlowSummary agent={agent} />
      </div>

      <AgentForm agent={agent} organizationId={organizationId} onSaved={onChanged} />
    </div>
  );
}
