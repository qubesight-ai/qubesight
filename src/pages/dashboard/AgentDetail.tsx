import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, CheckCircle2, Loader2, Mic2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AgentRuntimeActions from "@/components/dashboard/AgentRuntimeActions";
import AgentForm from "@/features/agents/AgentForm";
import {
  createAgent,
  emptyAgent,
  fetchAgent,
  updateAgent,
  type AgentConfig,
} from "@/features/agents/agentService";
import {
  formatDate,
  hasPendingDeploy,
  provisioningLabels,
} from "@/features/agents/provisioningStatus";
import type { Agent } from "@/types/dashboard";

export default function AgentDetail() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { user } = useAuth();
  const [agent, setAgent] = useState<Agent | null>(isNew ? emptyAgent : null);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [loading, setLoading] = useState(!isNew);
  const [notFound, setNotFound] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (isNew || !id) return;
    try {
      const row = await fetchAgent(id);
      if (!row) setNotFound(true);
      else setAgent(row);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [id, isNew]);

  useEffect(() => void load(), [load]);

  useEffect(() => {
    if (!user?.id) return;
    supabase
      .from("organization_members")
      .select("organization_id")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => setOrgId(data?.organization_id ?? null));
  }, [user?.id]);

  const save = async (config: AgentConfig) => {
    setBusy(true);
    try {
      if (isNew) {
        if (!orgId) throw new Error("No se encontró tu organización.");
        const newId = await createAgent(orgId, config);
        toast.success("Agente creado");
        navigate(`/dashboard/agents/${newId}`, { replace: true });
      } else if (id) {
        await updateAgent(id, config);
        toast.success("Configuración guardada");
        await load();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo guardar el agente.");
    } finally {
      setBusy(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen grid place-items-center bg-[#f4f7fb]">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );

  if (notFound || !agent)
    return (
      <div className="min-h-screen grid place-items-center bg-[#f4f7fb] p-6 text-center">
        <div>
          <h1 className="text-xl font-semibold mb-2">Agente no disponible</h1>
          <p className="text-sm text-slate-500 mb-5">
            No encontramos este agente o no pertenece a tu organización.
          </p>
          <button className="admin-primary" onClick={() => navigate("/dashboard")}>
            Volver al panel
          </button>
        </div>
      </div>
    );

  const pending = !isNew && hasPendingDeploy(agent);

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <header className="h-20 bg-white border-b flex items-center gap-3 px-5 md:px-8">
        <button
          className="icon-action"
          onClick={() => navigate("/dashboard")}
          aria-label="Volver al panel"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="agent-icon">
          <Mic2 />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] tracking-[.15em] text-slate-400">AGENTE DE VOZ</p>
          <h1 className="text-xl font-semibold truncate">
            {isNew ? "Crear agente de voz" : agent.name}
          </h1>
        </div>
      </header>

      <div className="p-5 md:p-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
        <AgentForm
          agent={agent}
          busy={busy}
          onSubmit={save}
          onCancel={() => navigate("/dashboard")}
        />

        {!isNew && (
          <aside className="admin-panel p-5 space-y-4">
            <div>
              <h2 className="text-base font-semibold">Estado del despliegue</h2>
              <p className="text-sm text-slate-500">
                {provisioningLabels[agent.provisioning_status]}
              </p>
            </div>

            <div
              className={`rounded-xl p-3 text-sm flex gap-2 ${
                pending ? "bg-amber-50 text-amber-800" : "bg-emerald-50 text-emerald-800"
              }`}
            >
              {pending ? (
                <AlertTriangle size={18} className="shrink-0" />
              ) : (
                <CheckCircle2 size={18} className="shrink-0" />
              )}
              <span>
                {pending
                  ? "Tienes cambios guardados que aún no están desplegados."
                  : "La configuración desplegada está al día."}
              </span>
            </div>

            <dl className="text-sm space-y-2">
              <Row label="Versión guardada" value={`#${agent.deployment_revision}`} />
              <Row
                label="Versión desplegada"
                value={
                  agent.deployed_revision === null
                    ? "Nunca desplegada"
                    : `#${agent.deployed_revision}`
                }
              />
              <Row label="Último despliegue" value={formatDate(agent.last_deployed_at)} />
              <Row label="Última revisión de salud" value={formatDate(agent.last_health_at)} />
              <Row label="Servicio" value={agent.runtime_service || "—"} />
            </dl>

            {agent.last_provisioning_error && (
              <p className="text-xs bg-rose-50 text-rose-700 rounded-xl p-3 break-words">
                {agent.last_provisioning_error}
              </p>
            )}

            <div className="border-t pt-4">
              <p className="text-[10px] tracking-widest text-slate-400 mb-2">ACCIONES</p>
              <AgentRuntimeActions agent={agent} onChanged={load} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-3">
    <dt className="text-slate-500">{label}</dt>
    <dd className="font-medium text-right break-all">{value}</dd>
  </div>
);
