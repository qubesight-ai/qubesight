export type MatildaSession = { session_id: string; remaining_turns: number; expires_at: string };
export type MatildaMessage = { message_id: string; transcript: string; reply: string; remaining_turns: number; audio_status: "processing" | "ready" | "failed"; audio_url: string | null };
export type MatildaAudioStatus = Pick<MatildaMessage, "audio_status" | "audio_url">;

export class MatildaDemoApiError extends Error {
  constructor(public readonly status?: number, message = "No fue posible conectar con Matilda.") { super(message); this.name = "MatildaDemoApiError"; }
}

const baseUrl = () => import.meta.env.VITE_MATILDA_DEMO_API_URL?.replace(/\/$/, "");
const url = (path: string) => { const base = baseUrl(); if (!base) throw new MatildaDemoApiError(undefined, "La demostración aún no está disponible."); return `${base}${path}`; };
const publicMessages: Record<number, string> = { 400: "La grabación no pudo procesarse. Intenta de nuevo.", 403: "No fue posible verificar esta demostración.", 404: "La sesión ya no está disponible. Inicia una nueva conversación.", 409: "Matilda todavía está procesando tu mensaje.", 413: "La grabación es demasiado grande. Intenta una respuesta más corta.", 422: "El formato de audio no es compatible con la demostración.", 429: "Alcanzaste el límite de esta demostración.", 502: "Matilda no está disponible temporalmente.", 504: "Matilda tardó demasiado en responder. Intenta de nuevo." };

async function request<T>(path: string, init: RequestInit): Promise<T> {
  let response: Response;
  try { response = await fetch(url(path), init); } catch { throw new MatildaDemoApiError(undefined, "No se pudo conectar con Matilda. Revisa tu conexión e intenta de nuevo."); }
  if (!response.ok) throw new MatildaDemoApiError(response.status, publicMessages[response.status] ?? "No fue posible conectar con Matilda. Intenta nuevamente.");
  return response.json() as Promise<T>;
}

export const createMatildaSession = (turnstileToken: string) => {
  if (!turnstileToken) throw new MatildaDemoApiError(400, "Completa la verificación antes de iniciar la demostración.");
  const form = new FormData();
  form.append("turnstile_token", turnstileToken);
  return request<MatildaSession>("/web-demo/session", { method: "POST", body: form });
};
export const sendMatildaAudio = (sessionId: string, audio: Blob) => { const form = new FormData(); form.append("session_id", sessionId); form.append("audio", audio, `matilda-message.${audio.type.includes("ogg") ? "ogg" : "webm"}`); return request<MatildaMessage>("/web-demo/message", { method: "POST", body: form }); };
export const getMatildaAudio = async (messageId: string): Promise<MatildaAudioStatus> => { let response: Response; try { response = await fetch(url(`/web-demo/message/${encodeURIComponent(messageId)}/audio`)); } catch { throw new MatildaDemoApiError(undefined, "No se pudo consultar la respuesta de voz."); } if (response.status === 202 || response.ok) return response.json() as Promise<MatildaAudioStatus>; throw new MatildaDemoApiError(response.status, publicMessages[response.status] ?? "La respuesta de voz no está disponible en este momento."); };
export const deleteMatildaSession = async (sessionId: string) => { try { await fetch(url(`/web-demo/session/${encodeURIComponent(sessionId)}`), { method: "DELETE" }); } catch { /* Server expiry is sufficient. */ } };
