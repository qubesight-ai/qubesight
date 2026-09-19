import { useState } from "react";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { Agent } from "@/types/dashboard";
import { generateVoiceAgent } from "@/lib/voiceAgentGeneration";
import { generationBlocker } from "../generation";

type GenerateAgentCardProps = {
  agent: Agent;
  onGenerated: () => void;
};

export default function GenerateAgentCard({ agent, onGenerated }: GenerateAgentCardProps) {
  const [busy, setBusy] = useState(false);
  const blocker = generationBlocker(agent);
  const alreadyGenerated = agent.configuration_status !== "draft";

  const generate = async () => {
    if (blocker) {
      toast.error(blocker);
      return;
    }

    setBusy(true);
    try {
      await generateVoiceAgent(agent.id);
      toast.success("Agente generado. Ya puedes revisar el resultado.");
      onGenerated();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo generar el agente.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="admin-panel p-6 border-blue-200 bg-blue-50/40">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="flex items-start gap-3">
          <span className="rounded-full bg-blue-100 text-blue-700 p-2 mt-0.5">
            {alreadyGenerated ? <CheckCircle2 size={20} /> : <Sparkles size={20} />}
          </span>
          <div>
            <h2 className="text-lg font-semibold">
              {alreadyGenerated ? "Configuración generada" : "Genera tu agente"}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {alreadyGenerated
                ? "QubeSight preparó el comportamiento interno. Puedes regenerarlo después de cambiar la información."
                : "QubeSight convertirá tu descripción en un agente listo para la prueba de llamada."}
            </p>
            {blocker && <p className="text-xs text-amber-700 mt-2">Antes de generar: {blocker}</p>}
          </div>
        </div>

        <button
          type="button"
          className="admin-primary shrink-0"
          disabled={busy || Boolean(blocker)}
          onClick={generate}
        >
          {busy ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
          {busy ? "Generando…" : alreadyGenerated ? "Generar de nuevo" : "Generar agente"}
        </button>
      </div>
    </section>
  );
}
