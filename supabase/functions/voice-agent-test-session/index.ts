import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";
import { z } from "https://esm.sh/zod@3.25.76";
import { AccessToken, LiveKitAPI } from "npm:livekit-server-sdk@2.19.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Expose-Headers": "retry-after",
};

const requestSchema = z.object({ agent_id: z.string().uuid() }).strict();
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

class RateLimitError extends Error {
  retryAfter: number;

  constructor(message: string, retryAfter: number) {
    super(message);
    this.retryAfter = Math.max(1, Math.ceil(retryAfter));
  }
}

function json(body: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json", ...extraHeaders },
  });
}

let hmacKeyPromise: Promise<CryptoKey> | null = null;

function getHmacKey() {
  if (!hmacKeyPromise) {
    const secret = Deno.env.get("RATE_LIMIT_HASH_SECRET");
    if (!secret) throw new Error("RATE_LIMIT_HASH_SECRET no está configurada");
    hmacKeyPromise = crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
  }
  return hmacKeyPromise;
}

async function anonymize(value: string) {
  const signature = await crypto.subtle.sign(
    "HMAC",
    await getHmacKey(),
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for") ?? "";
  return (
    forwarded.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

async function consumeRateLimit(subjectKey: string, action: string, limit: number, window: number) {
  const { data, error } = await admin.rpc("consume_rate_limit", {
    p_subject_key: subjectKey,
    p_action: action,
    p_limit: limit,
    p_window_seconds: window,
  });
  if (error) throw new RateLimitError("Servicio temporalmente no disponible.", 30);
  const row = Array.isArray(data) ? data[0] : data;
  if (!row?.allowed) {
    throw new RateLimitError(
      "Alcanzaste el límite de pruebas. Espera un momento.",
      Number(row?.retry_after_seconds ?? window),
    );
  }
}

async function enforceRateLimit(req: Request, userId: string) {
  const [userHash, ipHash] = await Promise.all([
    anonymize(`voice-test:user:${userId}`),
    anonymize(`voice-test:ip:${clientIp(req)}`),
  ]);
  await consumeRateLimit(userHash, "voice-agent-test:user", 10, 3600);
  await consumeRateLimit(ipHash, "voice-agent-test:ip", 30, 3600);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  const bearer = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
  if (!bearer) return json({ error: "Autenticación requerida" }, 401);

  const { data: userData, error: userError } = await admin.auth.getUser(bearer);
  const userId = userData?.user?.id;
  if (userError || !userId) return json({ error: "Autenticación requerida" }, 401);

  try {
    const parsedRequest = requestSchema.safeParse(await req.json());
    if (!parsedRequest.success) return json({ error: "Solicitud inválida" }, 400);

    await enforceRateLimit(req, userId);

    const { data: agent, error: agentError } = await admin
      .from("voice_agents")
      .select("id,organization_id,name,configuration_status,greeting,system_prompt")
      .eq("id", parsedRequest.data.agent_id)
      .maybeSingle();
    if (agentError) throw agentError;
    if (!agent) return json({ error: "Agente no encontrado" }, 404);

    const [{ data: membership }, { data: profile }] = await Promise.all([
      admin
        .from("organization_members")
        .select("member_role")
        .eq("organization_id", agent.organization_id)
        .eq("user_id", userId)
        .maybeSingle(),
      admin.from("profiles").select("role").eq("id", userId).maybeSingle(),
    ]);
    if (membership?.member_role !== "owner" && profile?.role !== "admin") {
      return json({ error: "No tienes permiso para probar este agente" }, 403);
    }

    if (
      agent.configuration_status === "draft" ||
      !agent.greeting?.trim() ||
      !agent.system_prompt?.trim()
    ) {
      return json({ error: "Genera el agente antes de probar una llamada" }, 409);
    }

    const livekitUrl = Deno.env.get("LIVEKIT_URL");
    const livekitApiKey = Deno.env.get("LIVEKIT_API_KEY");
    const livekitApiSecret = Deno.env.get("LIVEKIT_API_SECRET");
    const livekitAgentName = Deno.env.get("LIVEKIT_AGENT_NAME");
    if (!livekitUrl || !livekitApiKey || !livekitApiSecret || !livekitAgentName) {
      throw new Error("LiveKit no está configurado");
    }

    const roomName = `qs-test-${agent.id}-${crypto.randomUUID()}`;
    const participantIdentity = `dashboard-${userId}-${crypto.randomUUID()}`;
    const metadata = JSON.stringify({
      agent_id: agent.id,
      organization_id: agent.organization_id,
      mode: "browser_test",
    });

    const api = new LiveKitAPI({
      host: livekitUrl.replace(/^wss:/, "https:"),
      apiKey: livekitApiKey,
      secret: livekitApiSecret,
    });
    await api.agentDispatch.createDispatch(roomName, livekitAgentName, { metadata });

    const accessToken = new AccessToken(livekitApiKey, livekitApiSecret, {
      identity: participantIdentity,
      name: "Prueba desde QubeSight",
      ttl: "10m",
    });
    accessToken.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: false,
    });

    return json(
      {
        server_url: livekitUrl,
        participant_token: await accessToken.toJwt(),
        room_name: roomName,
        expires_in: 600,
      },
      201,
    );
  } catch (error) {
    if (error instanceof RateLimitError) {
      return json({ error: error.message }, 429, { "Retry-After": String(error.retryAfter) });
    }
    console.error(
      "voice-agent-test-session error",
      error instanceof Error ? error.name : "unknown_error",
    );
    return json({ error: "No se pudo preparar la prueba de llamada." }, 500);
  }
});
