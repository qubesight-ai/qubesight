import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Agent } from "@/types/dashboard";

type Props = {
  agent: Agent;
  orgId: string;
  close: () => void;
  saved: () => void;
};

export default function AgentEditor({ agent, orgId, close, saved }: Props) {
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

  return (
    <div className="modal-layer" onMouseDown={close}>
      <div className="editor" onMouseDown={(event) => event.stopPropagation()}>
        <button className="editor-close" onClick={close}>
          <X />
        </button>

        <p className="text-[10px] tracking-widest text-blue-600">
          {agent.id ? "EDITAR CONFIGURACIÓN" : "NUEVO AGENTE"}
        </p>

        <h2 className="text-2xl font-semibold mt-1 mb-1">
          {agent.id ? `Editar ${agent.name}` : "Crear agente de voz"}
        </h2>

        <p className="text-sm text-slate-500 mb-6">
          Guarda la configuración y luego pulsa Desplegar para aplicarla en el VPS.
        </p>

        <div className="editor-grid">
          <label>
            Nombre
            <input value={form.name} onChange={(event) => set("name", event.target.value)} />
          </label>

          <label>
            Estado
            <select value={form.status} onChange={(event) => set("status", event.target.value)}>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </label>

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

          <label className="wide">
            Número Twilio
            <input
              value={form.twilio_phone || ""}
              onChange={(event) => set("twilio_phone", event.target.value)}
            />
          </label>

          <label className="wide">
            Objetivo
            <input
              value={form.objective}
              onChange={(event) => set("objective", event.target.value)}
            />
          </label>

          <label className="wide">
            Mensaje de bienvenida
            <textarea
              rows={2}
              value={form.greeting}
              onChange={(event) => set("greeting", event.target.value)}
            />
          </label>

          <label className="wide">
            Prompt del sistema
            <textarea
              rows={6}
              value={form.system_prompt}
              onChange={(event) => set("system_prompt", event.target.value)}
            />
          </label>
        </div>

        <footer>
          <button onClick={close}>Cancelar</button>

          <button
            className="admin-primary"
            disabled={busy || !form.name || !form.system_prompt}
            onClick={submit}
          >
            {busy && <Loader2 className="animate-spin" size={16} />}
            Guardar cambios
          </button>
        </footer>
      </div>
    </div>
  );
}
