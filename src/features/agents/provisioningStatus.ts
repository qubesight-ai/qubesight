import type { Agent, ProvisioningStatus } from "@/types/dashboard";

export const provisioningLabels: Record<ProvisioningStatus, string> = {
  not_deployed: "Sin desplegar",
  provisioning: "Desplegando",
  running: "En ejecución",
  degraded: "Degradado",
  stopped: "Detenido",
  error: "Error",
};

/** true cuando la configuración guardada aún no está aplicada en el runtime. */
export function hasPendingDeploy(agent: Pick<Agent, "deployment_revision" | "deployed_revision">) {
  return agent.deployed_revision === null || agent.deployment_revision > agent.deployed_revision;
}

export function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("es-CR", { dateStyle: "medium", timeStyle: "short" });
}
