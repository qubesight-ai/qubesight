import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { Agent } from "@/types/dashboard";
import type { AgentConfig } from "./agentService";

export default function AgentForm({
  agent,
  busy,
  onSubmit,
  onCancel,
}: {
  agent: Agent;
  busy: boolean;
  onSubmit: (config: AgentConfig) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Agent>(agent);
  const set = (key: keyof Agent, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="admin-panel p-5 md:p-6">
      <div className="panel-head">
        <div>
          <h2>Configuración</h2>
          <p>Guarda los cambios y luego pulsa Desplegar para aplicarlos en el runtime.</p>
        </div>
      </div>
      <div className="editor-grid">
        <label>
          Nombre
          <input value={form.name} onChange={(e) => set("name", e.target.value)} />
        </label>
        <label>
          Estado
          <select value={form.status} onChange={(e) => set("status", e.target.value)}>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
        </label>
        <label>
          Voz
          <input value={form.voice_name} onChange={(e) => set("voice_name", e.target.value)} />
        </label>
        <label>
          Idioma
          <input value={form.language} onChange={(e) => set("language", e.target.value)} />
        </label>
        <label className="wide">
          Número Twilio
          <input
            value={form.twilio_phone || ""}
            onChange={(e) => set("twilio_phone", e.target.value)}
          />
        </label>
        <label className="wide">
          Objetivo
          <input value={form.objective} onChange={(e) => set("objective", e.target.value)} />
        </label>
        <label className="wide">
          Mensaje de bienvenida
          <textarea
            rows={2}
            value={form.greeting}
            onChange={(e) => set("greeting", e.target.value)}
          />
        </label>
        <label className="wide">
          Prompt del sistema
          <textarea
            rows={6}
            value={form.system_prompt}
            onChange={(e) => set("system_prompt", e.target.value)}
          />
        </label>
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <button onClick={onCancel}>Cancelar</button>
        <button
          className="admin-primary"
          disabled={busy || !form.name || !form.system_prompt}
          onClick={() =>
            onSubmit({
              name: form.name,
              status: form.status,
              twilio_phone: form.twilio_phone,
              voice_name: form.voice_name,
              language: form.language,
              objective: form.objective,
              greeting: form.greeting,
              system_prompt: form.system_prompt,
            })
          }
        >
          {busy && <Loader2 className="animate-spin" size={16} />}Guardar cambios
        </button>
      </div>
    </div>
  );
}
