import { Loader2, Phone, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { useMatildaLiveCall } from "@/hooks/useMatildaLiveCall";

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
              ? "Conectando…"
              : "Connecting…"
            : `${spanish ? "Colgar" : "Hang up"} · ${fmt(call.remaining)}`}
        </Button>
      ) : (
        <Button type="button" variant="default" onClick={() => void call.start()}>
          <Phone />
          {spanish ? "Hablar con Matilda por voz" : "Talk to Matilda by voice"}
        </Button>
      )}
      {call.status === "live" && (
        <p className="mt-2 text-xs opacity-80" role="status">
          {call.agentSpeaking
            ? spanish
              ? "Matilda está hablando…"
              : "Matilda is speaking…"
            : spanish
              ? "Te escucho, habla con naturalidad."
              : "Listening, speak naturally."}
        </p>
      )}
      {call.error && (
        <p className="mt-2 text-xs text-destructive" role="alert">
          {call.error}
        </p>
      )}
      {!active && !call.error && (
        <p className="mt-2 text-xs opacity-70">
          {spanish
            ? "Llamada de hasta 2 minutos. Usa tu micrófono; no compartas datos confidenciales."
            : "Up to 2 minutes. Uses your microphone; don't share confidential data."}
        </p>
      )}
    </div>
  );
};

export default MatildaLiveCallButton;
