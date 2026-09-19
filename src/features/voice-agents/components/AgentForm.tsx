import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Agent } from "@/types/dashboard";
import { normalizeAgent } from "../agentModel";
import { agentFormSchema, type AgentFormValues } from "../schemas/agentForm";

type AgentFormProps = {
  agent: Agent;
  organizationId: string;
  onSaved: (agent: Agent) => void;
};

export default function AgentForm({ agent, organizationId, onSaved }: AgentFormProps) {
  const [form, setForm] = useState<AgentFormValues>({
    name: agent.name,
    agent_type: agent.agent_type,
    business_name: agent.business_name,
    business_description: agent.business_description,
    assistant_description: agent.assistant_description || agent.objective,
    voice_name: agent.voice_name,
    language: agent.language,
    greeting: agent.greeting,
  });
  const [busy, setBusy] = useState(false);

  const set = <Key extends keyof AgentFormValues>(key: Key, value: AgentFormValues[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async () => {
    const parsed = agentFormSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Revisa los datos del agente.");
      return;
    }

    setBusy(true);
    const editableFields = {
      ...parsed.data,
      objective: parsed.data.assistant_description,
    };
    const query = agent.id
      ? supabase.from("voice_agents").update(editableFields).eq("id", agent.id)
      : supabase
          .from("voice_agents")
          .insert({ organization_id: organizationId, ...editableFields });
    const { data, error } = await query.select("*").single();
    setBusy(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(agent.id ? "Agente actualizado" : "Agente creado");
    onSaved(normalizeAgent(data));
  };

  return (
    <section className="admin-panel p-6">
      <h2 className="text-lg font-semibold">Información y estilo</h2>
      <p className="text-sm text-slate-500 mt-2 mb-7">
        Actualiza lo que debe saber el agente y cómo debe presentarse.
      </p>

      <div className="editor-grid">
        <label>
          Nombre del agente
          <input value={form.name} onChange={(event) => set("name", event.target.value)} />
        </label>
        <label>
          Tipo de agente
          <select
            value={form.agent_type ?? ""}
            onChange={(event) =>
              set("agent_type", (event.target.value || null) as AgentFormValues["agent_type"])
            }
          >
            <option value="">Sin clasificar</option>
            <option value="customer_service">Servicio al cliente</option>
            <option value="sales_prospecting">Ventas y prospección</option>
            <option value="marketing">Marketing</option>
          </select>
        </label>
        <label>
          Nombre del negocio
          <input
            value={form.business_name}
            onChange={(event) => set("business_name", event.target.value)}
          />
        </label>
        <label className="wide">
          ¿A qué se dedica el negocio?
          <textarea
            rows={3}
            value={form.business_description}
            onChange={(event) => set("business_description", event.target.value)}
          />
        </label>
        <label className="wide">
          ¿Qué debe hacer este agente?
          <textarea
            rows={6}
            value={form.assistant_description}
            onChange={(event) => set("assistant_description", event.target.value)}
            placeholder="Por ejemplo: atender consultas, explicar servicios, capturar clientes potenciales y transferir casos complejos."
          />
        </label>
        <label>
          Idioma
          <select value={form.language} onChange={(event) => set("language", event.target.value)}>
            <option value="Español">Español</option>
            <option value="English">English</option>
          </select>
        </label>
        <label>
          Voz
          <select
            value={form.voice_name}
            onChange={(event) => set("voice_name", event.target.value)}
          >
            <option value="Sofia">Sofia</option>
          </select>
        </label>
        <label className="wide">
          Saludo inicial
          <textarea
            rows={3}
            value={form.greeting}
            onChange={(event) => set("greeting", event.target.value)}
            placeholder="Hola, gracias por llamar. ¿Cómo puedo ayudarte?"
          />
        </label>
      </div>

      <div className="mt-7 flex justify-end">
        <button type="button" className="admin-primary" disabled={busy} onClick={submit}>
          {busy ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          Guardar información
        </button>
      </div>
    </section>
  );
}
