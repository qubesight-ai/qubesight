import { useState } from "react";
import { Activity, Loader2, Play, RefreshCw, Square } from "lucide-react";
import { toast } from "sonner";
import { manageAgent, type ProvisioningAction } from "@/lib/agentProvisioning";
import type { Agent } from "@/types/dashboard";

import { provisioningLabels as labels } from "@/features/agents/provisioningStatus";

export default function AgentRuntimeActions({
  agent,
  onChanged,
  showLabels = false,
}: {
  agent: Agent;
  onChanged: () => void;
  showLabels?: boolean;
}) {
  const [busy, setBusy] = useState<ProvisioningAction | null>(null);
  const stale = agent.deployed_revision !== agent.deployment_revision;

  const run = async (action: ProvisioningAction) => {
    if (action === "stop" && !window.confirm(`¿Detener ${agent.name} y retirar su webhook?`)) {
      return;
    }
    setBusy(action);
    try {
      const result = await manageAgent(agent.id, action);
      toast.success(
        action === "status"
          ? `Estado real: ${labels[result.state]}`
          : `Operación completada: ${labels[result.state]}`,
      );
      onChanged();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo administrar el agente.");
      onChanged();
    } finally {
      setBusy(null);
    }
  };

  const working = busy !== null || agent.provisioning_status === "provisioning";
  return (
    <div className="flex flex-col items-start gap-2 min-w-[170px]">
      <span
        className={
          agent.provisioning_status === "running" && !stale ? "status-pill" : "status-pill inactive"
        }
        title={agent.last_provisioning_error ?? undefined}
      >
        {labels[agent.provisioning_status]}
        {stale && agent.provisioning_status === "running" ? " · cambios pendientes" : ""}
      </span>
      <div className={showLabels ? "grid grid-cols-2 gap-2 w-full" : "flex flex-wrap gap-1"}>
        <button
          className={showLabels ? "icon-action w-full justify-center gap-2 px-2" : "icon-action"}
          title={agent.provisioning_status === "running" && !stale ? "Reconciliar" : "Desplegar"}
          disabled={working || agent.status !== "active"}
          onClick={() => run("reconcile")}
        >
          {busy === "reconcile" ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Play size={16} />
          )}
          {showLabels && <span className="text-xs">Desplegar</span>}
        </button>
        <button
          className={showLabels ? "icon-action w-full justify-center gap-2 px-2" : "icon-action"}
          title="Reiniciar"
          disabled={working || agent.provisioning_status === "not_deployed"}
          onClick={() => run("restart")}
        >
          {busy === "restart" ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <RefreshCw size={16} />
          )}
          {showLabels && <span className="text-xs">Reiniciar</span>}
        </button>
        <button
          className={showLabels ? "icon-action w-full justify-center gap-2 px-2" : "icon-action"}
          title="Comprobar estado real"
          disabled={working || agent.provisioning_status === "not_deployed"}
          onClick={() => run("status")}
        >
          {busy === "status" ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Activity size={16} />
          )}
          {showLabels && <span className="text-xs">Estado</span>}
        </button>
        <button
          className={showLabels ? "icon-action w-full justify-center gap-2 px-2" : "icon-action"}
          title="Detener"
          disabled={working || ["not_deployed", "stopped"].includes(agent.provisioning_status)}
          onClick={() => run("stop")}
        >
          {busy === "stop" ? <Loader2 className="animate-spin" size={16} /> : <Square size={16} />}
          {showLabels && <span className="text-xs">Detener</span>}
        </button>
      </div>
    </div>
  );
}
