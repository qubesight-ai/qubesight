import { useNavigate } from "react-router-dom";
import type { Agent } from "@/types/dashboard";
import AgentsList from "../components/AgentsList";

export default function AgentsPage({ agents }: { agents: Agent[] }) {
  const navigate = useNavigate();

  return (
    <AgentsList
      agents={agents}
      onNew={() => navigate("/dashboard/agents/new")}
      onEdit={(agent) => navigate(`/dashboard/agents/${agent.id}`)}
    />
  );
}
