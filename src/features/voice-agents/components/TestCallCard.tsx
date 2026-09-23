import { lazy, Suspense, useState } from "react";
import { Headphones, Loader2, Mic } from "lucide-react";
import { toast } from "sonner";
import type { Agent } from "@/types/dashboard";
import { createVoiceAgentTestSession, type VoiceAgentTestSession } from "@/lib/voiceAgentTestCall";
import { testCallBlocker } from "../testCall";

const TestCallRoom = lazy(() => import("./TestCallRoom"));

export default function TestCallCard({ agent }: { agent: Agent }) {
  const [busy, setBusy] = useState(false);
  const [session, setSession] = useState<VoiceAgentTestSession | null>(null);
  const blocker = testCallBlocker(agent);

  const start = async () => {
    if (blocker) {
      toast.error(blocker);
      return;
    }

    setBusy(true);
    try {
      setSession(await createVoiceAgentTestSession(agent.id));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo iniciar la prueba.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <section className="admin-panel p-6 border-emerald-200 bg-emerald-50/40">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex items-start gap-3">
            <span className="rounded-full bg-emerald-100 p-2 text-emerald-700 mt-0.5">
              <Headphones size={20} />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Prueba una llamada</h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Habla con tu agente desde el navegador antes de conectar un número telefónico.
              </p>
              {blocker && <p className="text-xs text-amber-700 mt-2">Antes de probar: {blocker}</p>}
            </div>
          </div>

          <button
            type="button"
            className="admin-primary shrink-0"
            disabled={busy || Boolean(blocker)}
            onClick={start}
          >
            {busy ? <Loader2 className="animate-spin" size={16} /> : <Mic size={16} />}
            {busy ? "Preparando…" : "Probar agente"}
          </button>
        </div>
      </section>

      {session && (
        <Suspense fallback={null}>
          <TestCallRoom agentName={agent.name} session={session} onClose={() => setSession(null)} />
        </Suspense>
      )}
    </>
  );
}
