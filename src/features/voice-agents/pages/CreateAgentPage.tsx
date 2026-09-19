import { useNavigate } from "react-router-dom";
import CreateAgentWizard from "../components/CreateAgentWizard";

type CreateAgentPageProps = {
  organizationId: string;
  onChanged: () => void;
};

export default function CreateAgentPage({ organizationId, onChanged }: CreateAgentPageProps) {
  const navigate = useNavigate();

  return (
    <CreateAgentWizard
      organizationId={organizationId}
      onCancel={() => navigate("/dashboard/agents")}
      onCreated={(agentId) => {
        onChanged();
        navigate(`/dashboard/agents/${agentId}`);
      }}
    />
  );
}
