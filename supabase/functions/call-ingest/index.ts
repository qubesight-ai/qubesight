import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";
import { z } from "https://esm.sh/zod@3.25.76";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const INGEST_SECRET = Deno.env.get("AGENT_CALL_INGEST_HMAC_SECRET") ?? "";
const RATE_SECRET = Deno.env.get("RATE_LIMIT_HASH_SECRET") ?? "";

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const payloadSchema = z.object({
  agent_id: z.string().uuid(),
  external_call_id: z.string().regex(/^CA[0-9A-Fa-f]{32}$/),
  caller_phone: z
    .string()
    .regex(/^\+[1-9][0-9]{6,14}$/)
    .or(z.literal("")),
  status: z.enum(["completed", "failed", "no-answer"]),
  result: z.string().trim().max(2_000),
  duration_seconds: z.number().int().min(0).max(86_400),
  transcript: z.string().max(30_000),
  started_at: z.string().datetime({ offset: true }),
  ended_at: z.string().datetime({ offset: true }),
});

class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

async function hmacHex(secret: string, value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(left: string, right: string) {
  if (!/^[0-9a-f]{64}$/.test(left) || !/^[0-9a-f]{64}$/.test(right)) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

async function authenticate(req: Request, rawBody: string, agentId: string) {
  if (INGEST_SECRET.length < 32) throw new HttpError(503, "Ingest service unavailable.");
  const timestampText = req.headers.get("X-QubeSight-Timestamp") ?? "";
  const supplied = (req.headers.get("X-QubeSight-Signature") ?? "").toLowerCase();
  const timestamp = Number(timestampText);
  if (!Number.isInteger(timestamp) || Math.abs(Date.now() / 1000 - timestamp) > 300) {
    throw new HttpError(401, "Invalid request signature.");
  }
  const agentSecret = await hmacHex(INGEST_SECRET, `agent:${agentId}`);
  const expected = await hmacHex(agentSecret, `${timestampText}.${rawBody}`);
  if (!timingSafeEqual(expected, supplied)) throw new HttpError(401, "Invalid request signature.");
}

function clientIp(req: Request) {
  return (
    (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

async function enforceRateLimit(req: Request, agentId: string) {
  if (RATE_SECRET.length < 32) throw new HttpError(503, "Ingest service unavailable.");
  const [agentKey, ipKey] = await Promise.all([
    hmacHex(RATE_SECRET, `call-ingest:agent:${agentId}`),
    hmacHex(RATE_SECRET, `call-ingest:ip:${clientIp(req)}`),
  ]);
  for (const [scope, key, limit] of [
    ["agent", agentKey, 180],
    ["ip", ipKey, 540],
  ] as const) {
    const { data, error } = await admin.rpc("consume_rate_limit", {
      p_subject_key: key,
      p_action: `call-ingest:${scope}`,
      p_limit: limit,
      p_window_seconds: 60,
    });
    if (error) throw new HttpError(503, "Ingest service unavailable.");
    const row = Array.isArray(data) ? data[0] : data;
    if (!row?.allowed) throw new HttpError(429, "Too many requests.");
  }
}

serve(async (req) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const contentLength = Number(req.headers.get("content-length") ?? "0");
    if (contentLength > 64_000) throw new HttpError(413, "Payload too large.");
    const rawBody = await req.text();
    if (rawBody.length > 64_000) throw new HttpError(413, "Payload too large.");
    let decoded: unknown;
    try {
      decoded = JSON.parse(rawBody);
    } catch {
      throw new HttpError(400, "Invalid call payload.");
    }
    const parsed = payloadSchema.safeParse(decoded);
    if (!parsed.success) throw new HttpError(400, "Invalid call payload.");
    const call = parsed.data;
    await authenticate(req, rawBody, call.agent_id);
    await enforceRateLimit(req, call.agent_id);

    const { data: agent, error: agentError } = await admin
      .from("voice_agents")
      .select("id,organization_id")
      .eq("id", call.agent_id)
      .maybeSingle();
    if (agentError) throw new HttpError(500, "Unable to resolve agent.");
    if (!agent) throw new HttpError(404, "Agent not found.");

    const { data: existing, error: existingError } = await admin
      .from("calls")
      .select("voice_agent_id")
      .eq("external_call_id", call.external_call_id)
      .maybeSingle();
    if (existingError) throw new HttpError(500, "Unable to reconcile call.");
    if (existing && existing.voice_agent_id !== agent.id) {
      throw new HttpError(409, "Call identifier already belongs to another agent.");
    }

    const { error } = await admin.from("calls").upsert(
      {
        organization_id: agent.organization_id,
        voice_agent_id: agent.id,
        external_call_id: call.external_call_id,
        caller_phone: call.caller_phone || null,
        direction: "inbound",
        status: call.status,
        result: call.result,
        duration_seconds: call.duration_seconds,
        transcript: call.transcript,
        started_at: call.started_at,
        ended_at: call.ended_at,
      },
      { onConflict: "external_call_id" },
    );
    if (error) throw new HttpError(500, "Unable to store call.");
    return json({ accepted: true });
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    if (status >= 500) {
      console.error("call-ingest failure", error instanceof Error ? error.message : "unknown");
    }
    return json(
      { error: error instanceof HttpError ? error.message : "Unexpected ingest failure." },
      status,
    );
  }
});
