import { Loader2, Mic, Phone, PhoneOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { useMatildaLiveCall } from "@/hooks/useMatildaLiveCall";
import { matildaCallErrorMessage } from "@/lib/matildaLiveSession";

type Call = ReturnType<typeof useMatildaLiveCall>;
type Props = { call: Call; spanish: boolean; className?: string };

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/** Start/stop control for the live LiveKit voice call with Matilda. */
const MatildaLiveCallButton = ({ call, spanish, className }: Props) => {
  const active = call.status === "live" || call.status === "connecting";
  return (
    <div className={className}>
      {active ? (
        <Button type="button" variant="destructive" onClick={call.hangUp}>
          {call.status === "connecting" ? <Loader2 className="animate-spin" /> : <PhoneOff />}
          {call.status === "connecting"
            ? spanish
              ? "Cancelar · Conectando…"
              : "Cancel · Connecting…"
            : `${spanish ? "Colgar" : "Hang up"} · ${fmt(call.remaining)}`}
        </Button>
      ) : (
        <Button type="button" variant="default" onClick={() => void call.start()}>
          <Phone />
          {spanish ? "Hablar con Matilda por voz" : "Talk to Matilda by voice"}
        </Button>
      )}
      {call.roomConnected && (
        <div className="mt-2 space-y-1 text-xs opacity-80" role="status" aria-live="polite">
          <p>{spanish ? "Conectado a la sala" : "Connected to the room"}</p>
          <p>
            {call.agentSpeaking
              ? spanish
                ? "Matilda está hablando…"
                : "Matilda is speaking…"
              : call.agentConnected
                ? spanish
                  ? "Matilda conectada"
                  : "Matilda connected"
                : spanish
                  ? "Esperando a Matilda…"
                  : "Waiting for Matilda…"}
          </p>
          <p className="flex items-center justify-center gap-1">
            <Mic className="h-3 w-3" />
            {call.microphoneActive
              ? spanish
                ? "Micrófono activo"
                : "Microphone active"
              : spanish
                ? "Permite el acceso al micrófono"
                : "Allow microphone access"}
          </p>
        </div>
      )}
      {call.audioBlocked && (
        <Button
          type="button"
          variant="outline"
          className="mt-2"
          onClick={() => void call.resumeAudio()}
        >
          <Volume2 /> {spanish ? "Activar audio" : "Enable audio"}
        </Button>
      )}
      {call.status === "ended" && (
        <p className="mt-2 text-xs opacity-80" role="status">
          {call.endReason === "expired"
            ? spanish
              ? "La sesión expiró. Puedes iniciar una nueva llamada."
              : "The session expired. You can start a new call."
            : spanish
              ? "Llamada finalizada."
              : "Call ended."}
        </p>
      )}
      {call.error && (
        <p className="mt-2 text-xs text-destructive" role="alert">
          {matildaCallErrorMessage(call.error, spanish)}
        </p>
      )}
      {!active && !call.error && (
        <p className="mt-2 text-xs opacity-70">
          {spanish
            ? "Llamada de hasta 2 minutos. Al iniciar, permite el acceso a tu micrófono; no compartas datos confidenciales."
            : "Up to 2 minutes. When starting, allow access to your microphone; don't share confidential data."}
        </p>
      )}
    </div>
  );
};

export default MatildaLiveCallButton;
