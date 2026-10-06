import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";
import { AccessToken, LiveKitAPI } from "npm:livekit-server-sdk@2.19.1";
import { issueVoiceAgentRuntimeToken } from "../_shared/voiceAgentRuntimeToken.ts";

// Public landing-page voice demo: anonymous visitors talk to the fixed demo agent
// (PUBLIC_DEMO_VOICE_AGENT_ID) through the shared matilda-realtime-agent worker.
// Uses the worker's existing browser_test contract (qs-test- room prefix) so no worker change is needed.
const MAX_CALL_SECONDS = 120;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Expose-Headers": "retry-after",
};

const admin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { auth: { persistSession: false, autoRefreshToken: false } },
);

class RateLimitError extends Error {
  constructor(
    message: string,
    public retryAfter: number,
  ) {
    super(message);
  }
}

function json(body: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json", ...extra },
  });
}

async function anonymize(value: string) {
  const secret = Deno.env.get("RATE_LIMIT_HASH_SECRET");
  if (!secret) throw new Error("RATE_LIMIT_HASH_SECRET missing");
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function clientIp(req: Request) {
  return (
    (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

async function consume(subject: string, action: string, limit: number, window: number) {
  const { data, error } = await admin.rpc("consume_rate_limit", {
    p_subject_key: subject,
    p_action: action,
    p_limit: limit,
    p_window_seconds: window,
  });
  if (error) throw new RateLimitError("Servicio temporalmente no disponible.", 30);
  const row = Array.isArray(data) ? data[0] : data;
  if (!row?.allowed) {
    throw new RateLimitError(
      "Alcanzaste el límite de llamadas de demostración. Inténtalo más tarde.",
      Math.max(1, Math.ceil(Number(row?.retry_after_seconds ?? window))),
    );
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  try {
    const ipHash = await anonymize(`voice-demo:ip:${clientIp(req)}`);
    await consume(ipHash, "voice-demo:ip:hour", 3, 3600);
    await consume(ipHash, "voice-demo:ip:day", 8, 86400);
    await consume("voice-demo:global", "voice-demo:global:day", 300, 86400);

    const agentId = Deno.env.get("PUBLIC_DEMO_VOICE_AGENT_ID") ?? "";
    const livekitUrl = Deno.env.get("LIVEKIT_URL");
    const apiKey = Deno.env.get("LIVEKIT_API_KEY");
    const apiSecret = Deno.env.get("LIVEKIT_API_SECRET");
    const agentName = Deno.env.get("LIVEKIT_AGENT_NAME");
    if (!agentId || !livekitUrl || !apiKey || !apiSecret || !agentName) {
      throw new Error("Demo no configurada");
    }

    const { data: agent, error } = await admin
      .from("voice_agents")
      .select("id,organization_id,configuration_status,greeting,system_prompt")
      .eq("id", agentId)
      .maybeSingle();
    if (error) throw error;
    if (!agent || agent.configuration_status === "draft" || !agent.system_prompt?.trim()) {
      return json({ error: "La demostración no está disponible en este momento." }, 503);
    }

    const roomName = `qs-test-demo-${crypto.randomUUID()}`;
    const runtimeToken = await issueVoiceAgentRuntimeToken(
      {
        sub: agent.id,
        organization_id: agent.organization_id,
        room_name: roomName,
        mode: "browser_test",
      },
      600,
    );
    const metadata = JSON.stringify({
      voice_agent_id: agent.id,
      agent_id: agent.id,
      organization_id: agent.organization_id,
      mode: "browser_test",
      runtime_token: runtimeToken,
    });

    const api = new LiveKitAPI({
      host: livekitUrl.replace(/^wss:/, "https:"),
      apiKey,
      secret: apiSecret,
    });
    await api.room.createRoom({ name: roomName, emptyTimeout: 30, maxParticipants: 2 });
    await api.agentDispatch.createDispatch(roomName, agentName, { metadata });

    const token = new AccessToken(apiKey, apiSecret, {
      identity: `web-visitor-${crypto.randomUUID()}`,
      name: "Visitante web",
      ttl: "3m",
    });
    token.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: false,
    });

    // Hard server-side cap: close the room after the maximum demo duration.
    const closeRoom = new Promise<void>((resolve) =>
      setTimeout(async () => {
        try {
          await api.room.deleteRoom(roomName);
        } catch {
          // room already closed
        }
        resolve();
      }, (MAX_CALL_SECONDS + 5) * 1000),
    );
    // deno-lint-ignore no-explicit-any
    (globalThis as any).EdgeRuntime?.waitUntil?.(closeRoom);

    return json(
      {
        server_url: livekitUrl,
        participant_token: await token.toJwt(),
        room_name: roomName,
        max_seconds: MAX_CALL_SECONDS,
      },
      201,
    );
  } catch (error) {
    if (error instanceof RateLimitError) {
      return json({ error: error.message }, 429, { "Retry-After": String(error.retryAfter) });
    }
    console.error(
      "voice-demo-session error",
      error instanceof Error ? `${error.name}: ${error.message}` : "unknown_error",
    );
    return json({ error: "No se pudo iniciar la llamada de demostración." }, 500);
  }
});
