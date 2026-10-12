import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Agent } from "@/types/dashboard";
import { normalizeBehavior, normalizeEscalationRules } from "../generation";
import { agentBehaviorSchema, type AgentBehaviorValues } from "../schemas/agentBehavior";

type BehaviorSettingsProps = {
  agent: Agent;
  onSaved: () => void;
};

function initialValues(agent: Agent): AgentBehaviorValues {
  const behavior = normalizeBehavior(agent.behavior);
  const escalation = normalizeEscalationRules(agent.escalation_rules);
  return {
    behavior: behavior ?? {
      tone: "",
      response_style: "",
      confirm_sensitive_actions: true,
      unknown_information: "",
    },
    escalation_rules: escalation ?? {
      when_requested: true,
      when_uncertain: true,
      when_upset: true,
      summary: "",
    },
  };
}

export default function BehaviorSettings({ agent, onSaved }: BehaviorSettingsProps) {
  const [values, setValues] = useState(() => initialValues(agent));
  const [busy, setBusy] = useState(false);

  const setBehavior = <Key extends keyof AgentBehaviorValues["behavior"]>(
    key: Key,
    value: AgentBehaviorValues["behavior"][Key],
  ) => setValues((current) => ({ ...current, behavior: { ...current.behavior, [key]: value } }));

  const setEscalation = <Key extends keyof AgentBehaviorValues["escalation_rules"]>(
    key: Key,
    value: AgentBehaviorValues["escalation_rules"][Key],
  ) =>
    setValues((current) => ({
      ...current,
      escalation_rules: { ...current.escalation_rules, [key]: value },
    }));

  const save = async () => {
    const parsed = agentBehaviorSchema.safeParse(values);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Revisa los datos.");
      return;
    }

    setBusy(true);
    const { error } = await supabase
      .from("voice_agents")
      .update({
        behavior: parsed.data.behavior,
        escalation_rules: parsed.data.escalation_rules,
      })
      .eq("id", agent.id);
    setBusy(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Límites y escalamiento guardados");
    onSaved();
  };

  return (
    <section className="admin-panel p-6">
      <h2 className="text-lg font-semibold">Límites y escalamiento</h2>
      <p className="text-sm text-slate-500 mt-1 mb-5">
        Define cómo habla el agente, qué hace cuando no sabe algo y cuándo pasa con una persona.
      </p>

      <div className="editor-grid">
        <label>
          Tono
          <input
            value={values.behavior.tone}
            onChange={(event) => setBehavior("tone", event.target.value)}
          />
        </label>
        <label>
          Estilo de respuesta
          <input
            value={values.behavior.response_style}
            onChange={(event) => setBehavior("response_style", event.target.value)}
          />
        </label>
        <label className="wide">
          Límites: qué hacer cuando no sabe algo
          <textarea
            rows={3}
            value={values.behavior.unknown_information}
            onChange={(event) => setBehavior("unknown_information", event.target.value)}
          />
        </label>
        <label className="wide">
          Cuándo pasar con una persona
          <textarea
            rows={3}
            value={values.escalation_rules.summary}
            onChange={(event) => setEscalation("summary", event.target.value)}
          />
        </label>
      </div>

      <div className="divide-y mt-4">
        {(
          [
            ["confirm", "Confirmar antes de acciones sensibles", values.behavior.confirm_sensitive_actions],
            ["when_requested", "Transferir si el cliente lo pide", values.escalation_rules.when_requested],
            ["when_uncertain", "Transferir si no tiene certeza", values.escalation_rules.when_uncertain],
            ["when_upset", "Transferir si el cliente se molesta", values.escalation_rules.when_upset],
          ] as const
        ).map(([key, label, checked]) => (
          <label key={key} className="py-3 flex items-center justify-between gap-4 cursor-pointer">
            <span className="text-sm">{label}</span>
            <input
              type="checkbox"
              className="h-4 w-4 accent-blue-600"
              checked={checked}
              onChange={(event) =>
                key === "confirm"
                  ? setBehavior("confirm_sensitive_actions", event.target.checked)
                  : setEscalation(key, event.target.checked)
              }
            />
          </label>
        ))}
      </div>

      <button type="button" className="admin-primary mt-5" disabled={busy} onClick={save}>
        {busy ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
        Guardar límites
      </button>
    </section>
  );
}
