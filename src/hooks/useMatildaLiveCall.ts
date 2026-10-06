import { useCallback, useEffect, useRef, useState } from "react";
import { Room, RoomEvent, Track, type RemoteTrack, type TranscriptionSegment } from "livekit-client";
import { supabase } from "@/integrations/supabase/client";

export type LiveCallStatus = "idle" | "connecting" | "live" | "ended" | "error";
export type LiveCallLine = { id: string; speaker: "user" | "agent"; text: string };

type SessionResponse = {
  server_url: string;
  participant_token: string;
  room_name: string;
  max_seconds: number;
};

/** Public landing voice call with Matilda through LiveKit (matilda-realtime-agent). */
export function useMatildaLiveCall() {
  const [status, setStatus] = useState<LiveCallStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [lines, setLines] = useState<LiveCallLine[]>([]);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const room = useRef<Room | null>(null);
  const timer = useRef<number | null>(null);
  const audioEls = useRef<HTMLMediaElement[]>([]);

  const cleanup = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    audioEls.current.forEach((el) => el.remove());
    audioEls.current = [];
    const current = room.current;
    room.current = null;
    if (current) void current.disconnect();
    setAgentSpeaking(false);
  }, []);

  const hangUp = useCallback(() => {
    cleanup();
    setStatus((s) => (s === "live" || s === "connecting" ? "ended" : s));
  }, [cleanup]);

  const start = useCallback(async () => {
    if (room.current) return;
    setError(null);
    setLines([]);
    setStatus("connecting");
    try {
      const { data, error: fnError } = await supabase.functions.invoke<SessionResponse>(
        "voice-demo-session",
        { body: {} },
      );
      if (fnError || !data?.participant_token) {
        let message = "No se pudo iniciar la llamada. Inténtalo de nuevo en un momento.";
        const ctx = (fnError as { context?: Response } | null)?.context;
        if (ctx && typeof ctx.json === "function") {
          const body = await ctx.json().catch(() => null);
          if (body?.error) message = body.error;
        }
        throw new Error(message);
      }

      const lk = new Room({ adaptiveStream: true, dynacast: true });
      room.current = lk;
      lk.on(RoomEvent.TrackSubscribed, (track: RemoteTrack) => {
        if (track.kind === Track.Kind.Audio) {
          const el = track.attach();
          el.style.display = "none";
          document.body.appendChild(el);
          audioEls.current.push(el);
        }
      });
      lk.on(RoomEvent.ActiveSpeakersChanged, (speakers) => {
        setAgentSpeaking(speakers.some((p) => p.identity !== lk.localParticipant.identity));
      });
      lk.on(RoomEvent.TranscriptionReceived, (segments: TranscriptionSegment[], participant) => {
        const speaker = participant?.identity === lk.localParticipant.identity ? "user" : "agent";
        setLines((current) => {
          const next = [...current];
          for (const seg of segments) {
            const idx = next.findIndex((l) => l.id === seg.id);
            const line = { id: seg.id, speaker, text: seg.text } as LiveCallLine;
            if (idx >= 0) next[idx] = line;
            else next.push(line);
          }
          return next.slice(-12);
        });
      });
      lk.on(RoomEvent.Disconnected, () => {
        if (room.current === lk) {
          cleanup();
          setStatus("ended");
        }
      });

      await lk.connect(data.server_url, data.participant_token);
      await lk.startAudio();
      await lk.localParticipant.setMicrophoneEnabled(true);
      setStatus("live");

      const ends = Date.now() + data.max_seconds * 1000;
      setRemaining(data.max_seconds);
      timer.current = window.setInterval(() => {
        const left = Math.max(0, Math.ceil((ends - Date.now()) / 1000));
        setRemaining(left);
        if (left <= 0) hangUp();
      }, 500);
    } catch (err) {
      cleanup();
      const name = err instanceof Error ? err.name : "";
      setError(
        name === "NotAllowedError"
          ? "Necesitamos permiso del micrófono para hablar con Matilda."
          : err instanceof Error && err.message
            ? err.message
            : "No se pudo iniciar la llamada.",
      );
      setStatus("error");
    }
  }, [cleanup, hangUp]);

  useEffect(() => cleanup, [cleanup]);

  return { status, error, remaining, lines, agentSpeaking, start, hangUp };
}
