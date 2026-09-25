import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import type { Agent } from "@/types/dashboard";
import { normalizeCapabilities, type AgentCapabilities } from "../capabilities";

type CapabilitiesSettingsProps = {
  agent: Agent;
  onSaved: () => void;
};

const options: Array<{
  key: keyof AgentCapabilities;
  label: string;
  description: string;
  available: boolean;
}> = [
  {
    key: "faq",
    label: "Responder preguntas",
    description: "Explica servicios y responde consultas frecuentes.",
    available: true,
  },
  {
    key: "lead_capture",
    label: "Capturar clientes potenciales",
    description: "Solicita y guarda los datos necesarios para dar seguimiento.",
    available: true,
  },
  {
    key: "appointments",
    label: "Recibir solicitudes de cita",
    description: "Pregunta por fecha y hora preferidas. La conexión al calendario vendrá después.",
    available: true,
  },
  {
    key: "human_transfer",
    label: "Transferir a una persona",
    description: "Escala solicitudes complejas o cuando el cliente lo pida.",
    available: true,
  },
  {
    key: "whatsapp_followup",
    label: "Seguimiento por WhatsApp",
    description: "Estará disponible cuando conectemos WhatsApp.",
    available: false,
  },
];

export default function CapabilitiesSettings({ agent, onSaved }: CapabilitiesSettingsProps) {
  const [capabilities, setCapabilities] = useState(() =>
    normalizeCapabilities(agent.capabilities, agent.agent_type),
  );
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setCapabilities(normalizeCapabilities(agent.capabilities, agent.agent_type));
  }, [agent]);

  const toggle = (key: keyof AgentCapabilities) => {
    setCapabilities((current) => ({ ...current, [key]: !current[key] }));
  };

  const save = async () => {
    setBusy(true);
    const { error } = await supabase
      .from("voice_agents")
      .update({ capabilities: capabilities as unknown as Json })
      .eq("id", agent.id);
    setBusy(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Capacidades actualizadas");
    onSaved();
  };

  return (
    <section className="admin-panel p-6">
      <h2 className="text-lg font-semibold">¿Qué puede hacer?</h2>
      <p className="text-sm text-slate-500 mt-1 mb-5">
        Activa solamente las tareas que quieres permitirle.
      </p>

      <div className="divide-y">
        {options.map((option) => (
          <label
            key={option.key}
            className={`py-4 flex items-start justify-between gap-4 ${
              option.available ? "cursor-pointer" : "opacity-50"
            }`}
          >
            <span>
              <strong className="block text-sm">{option.label}</strong>
              <span className="block text-xs text-slate-500 mt-1">{option.description}</span>
            </span>
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-blue-600"
              checked={capabilities[option.key]}
              disabled={!option.available}
              onChange={() => toggle(option.key)}
            />
          </label>
        ))}
      </div>

      <button type="button" className="admin-primary mt-5" disabled={busy} onClick={save}>
        {busy ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
        Guardar capacidades
      </button>
    </section>
  );
}
