import { useState } from "react";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import AgentRuntimeActions from "@/components/dashboard/AgentRuntimeActions";
import type { Agent } from "@/types/dashboard";

type Props = {
  agent: Agent;
  orgId: string;
  close: () => void;
  saved: () => void;
  onRuntimeChanged: () => void;
};

export default function AgentEditor({ agent, orgId, close, saved, onRuntimeChanged }: Props) {
  const [form, setForm] = useState(agent);
  const [busy, setBusy] = useState(false);

  const set = (key: keyof Agent, value: string) =>
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

  const submit = async () => {
    setBusy(true);

    const payload = {
      organization_id: orgId,
      name: form.name,
      status: form.status,
      twilio_phone: form.twilio_phone || null,
      voice_name: form.voice_name,
      language: form.language,
      objective: form.objective,
      greeting: form.greeting,
      system_prompt: form.system_prompt,
    };

    const { error } = agent.id
      ? await supabase.from("voice_agents").update(payload).eq("id", agent.id)
      : await supabase.from("voice_agents").insert(payload);

    setBusy(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(agent.id ? "Agente actualizado" : "Agente creado");

    saved();
  };

  const dirty =
    form.name !== agent.name ||
    form.status !== agent.status ||
    form.twilio_phone !== agent.twilio_phone ||
    form.voice_name !== agent.voice_name ||
    form.language !== agent.language ||
    form.objective !== agent.objective ||
    form.greeting !== agent.greeting ||
    form.system_prompt !== agent.system_prompt;

  return (
    <div className="agent-config-form space-y-6">
      <section className="admin-panel p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={close}
              className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-white text-slate-500 transition hover:text-slate-900"
              aria-label="Volver a agentes"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <p className="text-[10px] tracking-[0.18em] text-blue-600">
                {agent.id ? "CONFIGURACIÓN DEL AGENTE" : "NUEVO AGENTE"}
              </p>

              <h2 className="mt-1 text-2xl font-semibold">
                {agent.id ? form.name || agent.name : "Crear agente de voz"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Configura comportamiento, voz y telefonía. Guarda los cambios antes de desplegar una
                nueva revisión.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {dirty && <span className="text-xs text-amber-600">Cambios sin guardar</span>}

            <button
              type="button"
              className="admin-primary"
              disabled={busy || !form.name || !form.system_prompt}
              onClick={submit}
            >
              {busy ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Guardar cambios
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <section className="admin-panel p-5 md:p-6">
            <div className="mb-5">
              <h3 className="font-semibold">Configuración general</h3>
              <p className="mt-1 text-sm text-slate-500">
                Información principal y estado operativo del agente.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label>
                Nombre
                <input value={form.name} onChange={(event) => set("name", event.target.value)} />
              </label>

              <label>
                Estado
                <select value={form.status} onChange={(event) => set("status", event.target.value)}>
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                  <option value="suspended">Suspendido</option>
                </select>
              </label>

              <label className="md:col-span-2">
                Objetivo
                <input
                  value={form.objective}
                  onChange={(event) => set("objective", event.target.value)}
                  placeholder="Ej. Calificar leads y agendar citas"
                />
              </label>
            </div>
          </section>

          <section className="admin-panel p-5 md:p-6">
            <div className="mb-5">
              <h3 className="font-semibold">Voz e idioma</h3>
              <p className="mt-1 text-sm text-slate-500">
                Define la voz y el idioma principal utilizados por el agente.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label>
                Voz
                <input
                  value={form.voice_name}
                  onChange={(event) => set("voice_name", event.target.value)}
                />
              </label>

              <label>
                Idioma
                <input
                  value={form.language}
                  onChange={(event) => set("language", event.target.value)}
                />
              </label>
            </div>
          </section>

          <section className="admin-panel p-5 md:p-6">
            <div className="mb-5">
              <h3 className="font-semibold">Conversación</h3>
              <p className="mt-1 text-sm text-slate-500">
                Configura el saludo inicial y las instrucciones del sistema.
              </p>
            </div>

            <div className="space-y-5">
              <label className="block">
                Mensaje de bienvenida
                <textarea
                  rows={3}
                  value={form.greeting}
                  onChange={(event) => set("greeting", event.target.value)}
                />
              </label>

              <label className="block">
                Prompt del sistema
                <textarea
                  rows={10}
                  value={form.system_prompt}
                  onChange={(event) => set("system_prompt", event.target.value)}
                />
              </label>
            </div>
          </section>

          <section className="admin-panel p-5 md:p-6">
            <div className="mb-5">
              <h3 className="font-semibold">Telefonía</h3>
              <p className="mt-1 text-sm text-slate-500">Número actualmente asociado al agente.</p>
            </div>

            <label className="block">
              Número Twilio
              <input
                value={form.twilio_phone || ""}
                onChange={(event) => set("twilio_phone", event.target.value)}
                placeholder="+1..."
              />
            </label>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="admin-panel p-5">
            <h3 className="font-semibold">Estado del runtime</h3>

            {!agent.id ? (
              <p className="mt-3 text-sm text-slate-500">
                Guarda el agente primero. Después podrás desplegarlo y administrar su runtime.
              </p>
            ) : (
              <>
                <dl className="mt-4 space-y-4 text-sm">
                  <RuntimeRow label="Provisioning" value={agent.provisioning_status} />

                  <RuntimeRow
                    label="Revisión"
                    value={`${agent.deployed_revision ?? "—"} / ${agent.deployment_revision}`}
                  />

                  <RuntimeRow label="Servicio" value={agent.runtime_service || "Sin asignar"} />

                  <RuntimeRow label="Último deploy" value={formatDate(agent.last_deployed_at)} />

                  <RuntimeRow
                    label="Último health check"
                    value={formatDate(agent.last_health_at)}
                  />
                </dl>

                {agent.last_provisioning_error && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3">
                    <p className="text-xs font-medium text-red-700">Último error de provisioning</p>
                    <p className="mt-1 break-words text-xs text-red-600">
                      {agent.last_provisioning_error}
                    </p>
                  </div>
                )}
              </>
            )}
          </section>

          {agent.id && (
            <section className="admin-panel p-5">
              <h3 className="font-semibold">Runtime y despliegue</h3>

              <p className="mt-1 mb-4 text-sm text-slate-500">
                Estas acciones utilizan la capa de provisioning existente.
              </p>

              <AgentRuntimeActions agent={agent} onChanged={onRuntimeChanged} />
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

function RuntimeRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-slate-400">{label}</dt>
      <dd className="mt-1 break-words font-medium text-slate-700">{value}</dd>
    </div>
  );
}

function formatDate(value: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}
