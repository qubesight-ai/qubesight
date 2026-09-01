import { useCallback, useEffect, useRef, useState } from "react";
import {
  createMatildaSession,
  deleteMatildaSession,
  getMatildaAudio,
  MatildaDemoApiError,
  type MatildaSession,
  sendMatildaAudio,
} from "@/lib/matildaDemoApi";

export type MatildaStatus =
  | "ready"
  | "requesting-permission"
  | "listening"
  | "sending"
  | "transcribing"
  | "thinking"
  | "preparing-voice"
  | "playing"
  | "unavailable"
  | "limit-reached"
  | "error";
export type ConversationMessage = { id: string; role: "visitor" | "matilda"; content: string };
const isValid = (value: MatildaSession | null): value is MatildaSession =>
  value !== null && Date.parse(value.expires_at) > Date.now();
const metric = (name: string) =>
  window.dispatchEvent(new CustomEvent("matilda-demo-metric", { detail: { name } }));

export function useMatildaDemo() {
  const [session, setSession] = useState<MatildaSession | null>(null);
  const [status, setStatus] = useState<MatildaStatus>("ready");
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pollAbort = useRef(false);
  const start = useCallback(
    async (turnstileToken?: string) => {
      setError(null);
      if (isValid(session)) return session;
      if (!turnstileToken) {
        setError("Completa la verificación antes de iniciar la demostración.");
        return null;
      }
      try {
        const next = await createMatildaSession(turnstileToken);
        setSession(next);
        metric("demo_started");
        setStatus("ready");
        return next;
      } catch (cause) {
        setSession(null);
        setError(cause instanceof Error ? cause.message : "La demostración no está disponible.");
        setStatus("unavailable");
        metric("demo_error");
        return null;
      }
    },
    [session],
  );
  const poll = useCallback(async (messageId: string, active: MatildaSession) => {
    const startAt = Date.now();
    pollAbort.current = false;
    while (!pollAbort.current && Date.now() - startAt < 45000 && isValid(active)) {
      await new Promise((resolve) => window.setTimeout(resolve, 750));
      if (pollAbort.current) return;
      try {
        const audio = await getMatildaAudio(messageId);
        if (audio.audio_status === "ready" && audio.audio_url) {
          setAudioUrl(audio.audio_url);
          setStatus("ready");
          metric("audio_ready");
          return;
        }
        if (audio.audio_status === "failed") {
          setError("La respuesta de voz no está disponible en este momento.");
          setStatus("ready");
          return;
        }
      } catch {
        setError("La respuesta de voz no está disponible en este momento.");
        setStatus("ready");
        return;
      }
    }
    if (!pollAbort.current) {
      setError("La sesión expiró. Completa una nueva verificación para continuar.");
      setSession(null);
      setStatus("ready");
    }
  }, []);
  const sendAudio = useCallback(
    async (audio: Blob) => {
      if (!audio.size || ["sending", "transcribing", "thinking"].includes(status)) return;
      if (!isValid(session)) {
        setSession(null);
        setError("La sesión expiró. Completa una nueva verificación para continuar.");
        setStatus("ready");
        return;
      }
      const active = session;
      setAudioUrl(null);
      setError(null);
      setStatus("sending");
      try {
        setStatus("transcribing");
        const message = await sendMatildaAudio(active.session_id, audio);
        setMessages((items) => [
          ...items,
          { id: `${message.message_id}-visitor`, role: "visitor", content: message.transcript },
          { id: `${message.message_id}-matilda`, role: "matilda", content: message.reply },
        ]);
        const next = { ...active, remaining_turns: message.remaining_turns };
        setSession(next);
        metric("message_completed");
        if (message.remaining_turns <= 0) {
          setStatus("limit-reached");
          metric("demo_limit_reached");
          return;
        }
        if (message.audio_status === "ready" && message.audio_url) {
          setAudioUrl(message.audio_url);
          setStatus("ready");
          return;
        }
        if (message.audio_status === "failed") {
          setError("La respuesta de voz no está disponible en este momento.");
          setStatus("ready");
          return;
        }
        setStatus("preparing-voice");
        void poll(message.message_id, next);
      } catch (cause) {
        const apiError = cause as MatildaDemoApiError;
        if (apiError.status === 429) {
          setStatus("limit-reached");
          metric("demo_limit_reached");
        } else {
          if (apiError.status === 403 || apiError.status === 404) setSession(null);
          setError(cause instanceof Error ? cause.message : "No fue posible enviar la grabación.");
          setStatus("error");
          metric("demo_error");
        }
      }
    },
    [poll, session, status],
  );
  const reset = useCallback(() => {
    pollAbort.current = true;
    if (session) void deleteMatildaSession(session.session_id);
    setSession(null);
    setMessages([]);
    setAudioUrl(null);
    setError(null);
    setStatus("ready");
  }, [session]);
  useEffect(
    () => () => {
      pollAbort.current = true;
    },
    [],
  );
  return { session, status, setStatus, messages, audioUrl, error, start, sendAudio, reset };
}
