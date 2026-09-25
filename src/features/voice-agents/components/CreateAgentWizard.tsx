import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { AgentType } from "@/types/dashboard";
import { normalizeAgent } from "../agentModel";
import { getAgentTemplate } from "../agentTemplates";
import { createAgentSchema, type CreateAgentValues } from "../schemas/createAgent";
import AgentTypeSelector from "./AgentTypeSelector";

type CreateAgentWizardProps = {
  organizationId: string;
  onCancel: () => void;
  onCreated: (agentId: string) => void;
};

export default function CreateAgentWizard({
  organizationId,
  onCancel,
  onCreated,
}: CreateAgentWizardProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [agentType, setAgentType] = useState<AgentType | null>(null);
  const [form, setForm] = useState<Omit<CreateAgentValues, "agent_type">>({
    name: "",
    business_name: "",
    business_description: "",
    assistant_description: "",
    language: "Español",
    voice_name: "Sofia",
  });
  const [busy, setBusy] = useState(false);

  const chooseType = (type: AgentType) => {
    setAgentType(type);
    const template = getAgentTemplate(type);
    setForm((current) => ({
      ...current,
      name: current.name || template?.suggestedName || "",
    }));
  };

  const set = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const continueToDescription = () => {
    if (!agentType) {
      toast.error("Escoge el tipo de agente que necesitas.");
      return;
    }
    setStep(2);
  };

  const createAgent = async () => {
    const parsed = createAgentSchema.safeParse({ ...form, agent_type: agentType });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Revisa los datos del agente.");
      return;
    }

    setBusy(true);
    const values = parsed.data;
    const { data, error } = await supabase
      .from("voice_agents")
      .insert({
        organization_id: organizationId,
        name: values.name,
        status: "inactive",
        agent_type: values.agent_type,
        business_name: values.business_name,
        business_description: values.business_description,
        assistant_description: values.assistant_description,
        objective: values.assistant_description,
        language: values.language,
        voice_name: values.voice_name,
        greeting: "",
      })
      .select("*")
      .single();
    setBusy(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    const agent = normalizeAgent(data);
    toast.success("Borrador creado. Ahora puedes personalizarlo.");
    onCreated(agent.id);
  };

  return (
    <section className="admin-panel p-6 max-w-5xl mx-auto">
      <button
        type="button"
        className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-2 mb-5"
        onClick={step === 1 ? onCancel : () => setStep(1)}
      >
        <ArrowLeft size={16} />
        {step === 1 ? "Volver a agentes" : "Cambiar tipo de agente"}
      </button>

      <div className="flex items-center gap-2 mb-6" aria-label={`Paso ${step} de 2`}>
        <span className="h-2 flex-1 rounded-full bg-blue-600" />
        <span
          className={`h-2 flex-1 rounded-full ${step === 2 ? "bg-blue-600" : "bg-slate-200"}`}
        />
      </div>

      {step === 1 ? (
        <>
          <p className="text-[10px] tracking-[.18em] text-blue-600">PASO 1 DE 2</p>
          <h2 className="text-2xl font-semibold mt-1">¿Qué tipo de agente necesitas?</h2>
          <p className="text-sm text-slate-500 mt-2 mb-7">
            Escoge el resultado principal. Podrás personalizar sus capacidades después.
          </p>
          <AgentTypeSelector value={agentType} onChange={chooseType} />
          <div className="mt-7 flex justify-end">
            <button type="button" className="admin-primary" onClick={continueToDescription}>
              Continuar <ArrowRight size={16} />
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-[10px] tracking-[.18em] text-blue-600">PASO 2 DE 2</p>
          <h2 className="text-2xl font-semibold mt-1">Describe tu agente</h2>
          <p className="text-sm text-slate-500 mt-2 mb-7">
            Escríbelo con tus propias palabras. No necesitas conocer términos técnicos.
          </p>

          <div className="editor-grid">
            <label>
              Nombre del agente
              <input value={form.name} onChange={(event) => set("name", event.target.value)} />
            </label>
            <label>
              Nombre del negocio
              <input
                value={form.business_name}
                onChange={(event) => set("business_name", event.target.value)}
              />
            </label>
            <label className="wide">
              ¿A qué se dedica tu negocio?
              <textarea
                rows={3}
                value={form.business_description}
                onChange={(event) => set("business_description", event.target.value)}
                placeholder="Por ejemplo: Somos una clínica dental en San José que atiende familias y emergencias."
              />
            </label>
            <label className="wide">
              ¿Qué quieres que haga el agente?
              <textarea
                rows={7}
                value={form.assistant_description}
                onChange={(event) => set("assistant_description", event.target.value)}
                placeholder="Por ejemplo: Quiero que responda llamadas, explique nuestros servicios, recopile datos de pacientes y ayude con solicitudes de cita."
              />
            </label>
            <label>
              Idioma principal
              <select
                value={form.language}
                onChange={(event) => set("language", event.target.value)}
              >
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
          </div>

          <div className="mt-7 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button type="button" className="px-4 py-2 text-sm" onClick={() => setStep(1)}>
              Atrás
            </button>
            <button type="button" className="admin-primary" disabled={busy} onClick={createAgent}>
              {busy ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
              Crear borrador
            </button>
          </div>
        </>
      )}
    </section>
  );
}
