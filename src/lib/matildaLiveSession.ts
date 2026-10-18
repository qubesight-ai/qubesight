import { z } from "zod";
import { ConnectionError, ConnectionErrorReason } from "livekit-client";
import { supabase } from "@/integrations/supabase/client";
import { readFunctionError } from "@/lib/functionError";

const sessionSchema = z.object({
  server_url: z
    .string()
    .url()
    .refine((value) => {
      try {
        const url = new URL(value);
        return url.protocol === "wss:" && !url.username && !url.password;
      } catch {
        return false;
      }
    }),
  participant_token: z.string().trim().min(1),
  room_name: z.string().startsWith("qs-test-demo-"),
  max_seconds: z.number().int().positive().max(2_147_483),
});

export type MatildaSession = z.infer<typeof sessionSchema>;
export type MatildaCallErrorCode =
  | "session"
  | "invalid-session"
  | "rate-limit"
  | "unavailable"
  | "permission"
  | "microphone-missing"
  | "microphone-busy"
  | "connection"
  | "session-rejected";

export class MatildaCallError extends Error {
  constructor(public readonly code: MatildaCallErrorCode) {
    super(code);
    this.name = "MatildaCallError";
  }
}

export async function createMatildaLiveSession(signal: AbortSignal): Promise<MatildaSession> {
  const { data, error } = await supabase.functions.invoke<unknown>("voice-demo-session", {
    body: {},
    signal,
  });
  if (signal.aborted) throw new DOMException("Cancelled", "AbortError");
  if (error) {
    const details = await readFunctionError(error.context);
    throw new MatildaCallError(
      details.status === 429 ? "rate-limit" : details.status === 503 ? "unavailable" : "session",
    );
  }
  const parsed = sessionSchema.safeParse(data);
  if (!parsed.success) throw new MatildaCallError("invalid-session");
  return parsed.data;
}

export function matildaCallErrorCode(error: unknown): MatildaCallErrorCode {
  if (error instanceof MatildaCallError) return error.code;
  if (error instanceof ConnectionError && error.reason === ConnectionErrorReason.NotAllowed)
    return "session-rejected";
  const name = error instanceof Error || error instanceof DOMException ? error.name : "";
  if (name === "NotAllowedError" || name === "SecurityError") return "permission";
  if (name === "NotFoundError" || name === "DevicesNotFoundError") return "microphone-missing";
  if (name === "NotReadableError" || name === "TrackStartError") return "microphone-busy";
  return "connection";
}

const messages: Record<MatildaCallErrorCode, { es: string; en: string }> = {
  session: {
    es: "No se pudo iniciar la llamada. Inténtalo de nuevo.",
    en: "Unable to start the call. Please try again.",
  },
  "invalid-session": {
    es: "La sesión recibida no es válida. Inténtalo de nuevo.",
    en: "The received session is invalid. Please try again.",
  },
  "rate-limit": {
    es: "Alcanzaste el límite de llamadas de demostración. Inténtalo más tarde.",
    en: "You reached the demo call limit. Please try again later.",
  },
  unavailable: {
    es: "La demostración no está disponible en este momento.",
    en: "The demo is currently unavailable.",
  },
  permission: {
    es: "Permite el acceso al micrófono para hablar con Matilda.",
    en: "Allow microphone access to talk to Matilda.",
  },
  "microphone-missing": {
    es: "No encontramos un micrófono. Conecta uno e inténtalo de nuevo.",
    en: "No microphone found. Connect one and try again.",
  },
  "microphone-busy": {
    es: "No se pudo usar el micrófono. Revisa si otra aplicación lo está usando.",
    en: "Unable to use the microphone. Check whether another app is using it.",
  },
  connection: {
    es: "No se pudo conectar la llamada. Revisa tu conexión e inténtalo de nuevo.",
    en: "Unable to connect the call. Check your connection and try again.",
  },
  "session-rejected": {
    es: "La sesión fue rechazada o expiró. Inicia una nueva llamada.",
    en: "The session was rejected or expired. Start a new call.",
  },
};

export function matildaCallErrorMessage(code: MatildaCallErrorCode, spanish: boolean): string {
  return messages[code][spanish ? "es" : "en"];
}
