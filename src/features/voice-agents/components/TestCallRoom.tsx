import { useState } from "react";
import { LiveKitRoom, RoomAudioRenderer, useRoomContext } from "@livekit/components-react";
import { Loader2, Mic, PhoneOff, Volume2 } from "lucide-react";
import type { VoiceAgentTestSession } from "@/lib/voiceAgentTestCall";

type TestCallRoomProps = {
  agentName: string;
  session: VoiceAgentTestSession;
  onClose: () => void;
};

function RoomControls({ agentName }: { agentName: string }) {
  const room = useRoomContext();

  return (
    <div className="text-center">
      <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-blue-100 text-blue-700">
        <Volume2 className="animate-pulse" size={34} />
      </span>
      <h3 className="mt-5 text-xl font-semibold">Habla con {agentName}</h3>
      <p className="mt-2 text-sm text-slate-500">
        La prueba usa el micrófono de este dispositivo. No consume una línea telefónica.
      </p>
      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-emerald-700">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        Micrófono conectado
      </div>
      <button
        type="button"
        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white"
        onClick={() => room.disconnect()}
      >
        <PhoneOff size={17} /> Terminar prueba
      </button>
    </div>
  );
}

export default function TestCallRoom({ agentName, session, onClose }: TestCallRoomProps) {
  const [connected, setConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-label="Prueba de llamada">
      <section className="editor max-w-lg">
        <LiveKitRoom
          token={session.participantToken}
          serverUrl={session.serverUrl}
          connect
          audio
          video={false}
          onConnected={() => setConnected(true)}
          onDisconnected={onClose}
          onError={() => setConnectionError("No se pudo conectar la prueba de voz.")}
          onMediaDeviceFailure={() =>
            setConnectionError("Permite el acceso al micrófono para probar el agente.")
          }
        >
          <RoomAudioRenderer />
          {connectionError ? (
            <div className="py-8 text-center">
              <Mic className="mx-auto text-red-500" size={34} />
              <h3 className="mt-4 text-lg font-semibold">No pudimos iniciar la prueba</h3>
              <p className="mt-2 text-sm text-slate-500">{connectionError}</p>
              <button type="button" className="admin-primary mt-6" onClick={onClose}>
                Cerrar
              </button>
            </div>
          ) : connected ? (
            <RoomControls agentName={agentName} />
          ) : (
            <div className="flex flex-col items-center py-12 text-center">
              <Loader2 className="animate-spin text-blue-600" size={34} />
              <h3 className="mt-4 text-lg font-semibold">Conectando la llamada…</h3>
              <p className="mt-2 text-sm text-slate-500">
                Preparando una sesión privada y temporal.
              </p>
            </div>
          )}
        </LiveKitRoom>
      </section>
    </div>
  );
}
