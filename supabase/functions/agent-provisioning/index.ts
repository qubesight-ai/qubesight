import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";
import { z } from "https://esm.sh/zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Expose-Headers": "retry-after",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const RATE_SECRET = Deno.env.get("RATE_LIMIT_HASH_SECRET") ?? "";
const PROVISIONER_URL = (Deno.env.get("AGENT_PROVISIONER_URL") ?? "").replace(/\/$/, "");
const PROVISIONER_SECRET = Deno.env.get("AGENT_PROVISIONER_HMAC_SECRET") ?? "";
const RUNTIME_PUBLIC_BASE = (Deno.env.get("AGENT_RUNTIME_PUBLIC_BASE_URL") ?? "").replace(
  /\/$/,
  "",
);
const CALL_INGEST_SECRET = Deno.env.get("AGENT_CALL_INGEST_HMAC_SECRET") ?? "";

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const requestSchema = z.object({
  action: z.enum(["reconcile", "restart", "status", "stop"]),
  agent_id: z.string().uuid(),
  request_id: z.string().uuid().optional(),
});

type Action = z.infer<typeof requestSchema>["action"];
type AgentRow = {
  id: string;
  organization_id: string;
  name: string;
  status: "active" | "inactive" | "suspended";
  voice_name: string;
  language: string;
  objective: string;
  greeting: string;
  system_prompt: string;
  deployment_revision: number;
  provisioning_status: string;
};

class HttpError extends Error {
  status: number;
  retryAfter?: number;
  constructor(status: number, message: string, retryAfter?: number) {
    super(message);
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json", ...headers },
  });
}

function clientIp(req: Request) {
  return (
    (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
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

async function enforceRateLimit(req: Request, action: Action, userId: string) {
  if (!RATE_SECRET) throw new HttpError(503, "Protección antiabuso no configurada.");
  const settings: Record<Action, [number, number]> = {
    reconcile: [6, 600],
    restart: [6, 600],
    status: [60, 60],
    stop: [4, 600],
  };
  const [limit, windowSeconds] = settings[action];
  const [userKey, ipKey] = await Promise.all([
    hmacHex(RATE_SECRET, `provision:user:${userId}`),
    hmacHex(RATE_SECRET, `provision:ip:${clientIp(req)}`),
  ]);

  for (const [scope, subject, scopedLimit] of [
    ["user", userKey, limit],
    ["ip", ipKey, limit * 3],
  ] as const) {
    const { data, error } = await admin.rpc("consume_rate_limit", {
      p_subject_key: subject,
      p_action: `agent:${action}:${scope}`,
      p_limit: scopedLimit,
      p_window_seconds: windowSeconds,
    });
    if (error) throw new HttpError(503, "Servicio temporalmente no disponible.");
    const row = Array.isArray(data) ? data[0] : data;
    if (!row?.allowed) {
      const retry = Math.max(1, Number(row?.retry_after_seconds ?? windowSeconds));
      throw new HttpError(429, "Demasiadas solicitudes. Intenta nuevamente más tarde.", retry);
    }
  }
}

async function ownerContext(token: string) {
  const { data: userData, error: userError } = await admin.auth.getUser(token);
  const userId = userData?.user?.id;
  if (userError || !userId) throw new HttpError(401, "Autenticación requerida.");

  const { data: membership, error } = await admin
    .from("organization_members")
    .select("organization_id,member_role")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !membership) throw new HttpError(403, "No perteneces a una organización.");
  if (membership.member_role !== "owner") {
    throw new HttpError(403, "Sólo el propietario puede desplegar agentes.");
  }
  return { userId, organizationId: membership.organization_id as string };
}

async function loadAgent(agentId: string, organizationId: string): Promise<AgentRow> {
  const { data, error } = await admin
    .from("voice_agents")
    .select(
      "id,organization_id,name,status,voice_name,language,objective,greeting,system_prompt,deployment_revision,provisioning_status",
    )
    .eq("id", agentId)
    .eq("organization_id", organizationId)
    .maybeSingle();
  if (error) throw new HttpError(500, "No se pudo consultar el agente.");
  if (!data) throw new HttpError(404, "Agente no encontrado.");
  return data as AgentRow;
}

async function readTwilioContext(
  organizationId: string,
  agentId: string,
  mode: "reconcile" | "stop",
) {
  const { data: connection, error: connectionError } = await admin
    .from("telephony_connections")
    .select("id,account_sid,api_key_sid,vault_secret_id,status")
    .eq("organization_id", organizationId)
    .eq("provider", "twilio")
    .maybeSingle();
  if (connectionError) throw new HttpError(500, "No se pudo consultar la conexión de Twilio.");
  if (!connection || connection.status !== "verified") {
    if (mode === "stop") return null;
    throw new HttpError(409, "Conecta y verifica Twilio antes de desplegar el agente.");
  }

  let phoneQuery = admin
    .from("phone_numbers")
    .select("id,provider_number_sid,phone_number,assigned_agent_id")
    .eq("organization_id", organizationId);
  phoneQuery =
    mode === "reconcile"
      ? phoneQuery.eq("selected", true)
      : phoneQuery.eq("assigned_agent_id", agentId);
  const { data: phone, error: phoneError } = await phoneQuery.maybeSingle();
  if (phoneError) throw new HttpError(500, "No se pudo consultar el número de Twilio.");
  if (!phone) {
    if (mode === "stop") return null;
    throw new HttpError(409, "Selecciona un número de Twilio.");
  }
  if (phone.assigned_agent_id && phone.assigned_agent_id !== agentId) {
    throw new HttpError(409, "El número seleccionado ya está asignado a otro agente.");
  }

  const { data: secret, error: secretError } = await admin.rpc("vault_read_twilio_secret", {
    p_secret_id: connection.vault_secret_id,
  });
  if (secretError || typeof secret !== "string") {
    throw new HttpError(500, "La credencial cifrada de Twilio no está disponible.");
  }
  try {
    const parsed = JSON.parse(secret) as { api_key_secret?: unknown; auth_token?: unknown };
    if (typeof parsed.api_key_secret !== "string") {
      throw new Error("invalid credentials");
    }
    const authToken =
      typeof parsed.auth_token === "string" && /^[0-9A-Fa-f]{32}$/.test(parsed.auth_token)
        ? parsed.auth_token
        : null;
    if (mode === "reconcile" && !authToken) {
      throw new HttpError(409, "Reconecta Twilio para configurar la validación de webhooks.");
    }
    return {
      connection,
      phone,
      apiKeySecret: parsed.api_key_secret,
      authToken,
    };
  } catch (error) {
    if (error instanceof HttpError) throw error;
    if (mode === "stop" && secret.length >= 8) {
      return { connection, phone, apiKeySecret: secret, authToken: null };
    }
    throw new HttpError(409, "Reconecta Twilio para configurar la validación de webhooks.");
  }
}

function assertServerConfiguration() {
  if (!PROVISIONER_URL.startsWith("https://")) {
    throw new HttpError(503, "El provisioner seguro no está configurado.");
  }
  if (PROVISIONER_SECRET.length < 32) {
    throw new HttpError(503, "La firma del provisioner no está configurada.");
  }
  if (!RUNTIME_PUBLIC_BASE.startsWith("https://")) {
    throw new HttpError(503, "La URL pública de agentes no está configurada.");
  }
  if (CALL_INGEST_SECRET.length < 32) {
    throw new HttpError(503, "La ingestión segura de llamadas no está configurada.");
  }
}

async function callProvisioner(payload: Record<string, unknown>) {
  assertServerConfiguration();
  const body = JSON.stringify(payload);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = await hmacHex(PROVISIONER_SECRET, `${timestamp}.${body}`);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000);
  try {
    const response = await fetch(`${PROVISIONER_URL}/v1/agents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-QubeSight-Timestamp": timestamp,
        "X-QubeSight-Signature": signature,
        "X-QubeSight-Request-Id": String(payload.request_id ?? ""),
      },
      body,
      signal: controller.signal,
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result || typeof result !== "object") {
      throw new HttpError(502, "El VPS rechazó la operación de despliegue.");
    }
    return result as Record<string, unknown>;
  } catch (error) {
    if (error instanceof HttpError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new HttpError(504, "El VPS tardó demasiado en responder.");
    }
    throw new HttpError(502, "No se pudo contactar el provisioner del VPS.");
  } finally {
    clearTimeout(timeout);
  }
}

async function updateTwilioWebhook(
  accountSid: string,
  apiKeySid: string,
  apiKeySecret: string,
  numberSid: string,
  voiceUrl: string | null,
) {
  const form = new URLSearchParams();
  form.set("VoiceUrl", voiceUrl ?? "");
  form.set("VoiceMethod", "POST");
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/IncomingPhoneNumbers/${encodeURIComponent(numberSid)}.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${apiKeySid}:${apiKeySecret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form,
    },
  );
  if (!response.ok) throw new HttpError(502, "Twilio no pudo actualizar el webhook del número.");
}

async function beginOperation(action: Action, agent: AgentRow, userId: string, requestId?: string) {
  const bucket = Math.floor(Date.now() / 30_000);
  const idempotencyKey =
    action === "reconcile"
      ? `reconcile:${agent.id}:${agent.deployment_revision}`
      : action === "status"
        ? `status:${agent.id}:${bucket}`
        : `${action}:${agent.id}:${requestId ?? crypto.randomUUID()}`;

  const { data: inserted, error } = await admin
    .from("agent_provisioning_operations")
    .insert({
      organization_id: agent.organization_id,
      voice_agent_id: agent.id,
      requested_by: userId,
      action,
      idempotency_key: idempotencyKey,
      requested_revision: agent.deployment_revision,
      status: "running",
      started_at: new Date().toISOString(),
    })
    .select("id")
    .maybeSingle();

  if (!error && inserted) return { id: inserted.id as string, cached: null };
  if (error?.code !== "23505") throw new HttpError(500, "No se pudo registrar la operación.");

  const { data: existing } = await admin
    .from("agent_provisioning_operations")
    .select("id,status,result,error_message")
    .eq("organization_id", agent.organization_id)
    .eq("idempotency_key", idempotencyKey)
    .maybeSingle();
  if (existing?.status === "succeeded")
    return { id: existing.id as string, cached: existing.result };
  if (existing?.status === "running") {
    throw new HttpError(409, "Esta operación ya está en ejecución.");
  }
  if (existing?.status === "failed") {
    const { error: retryError } = await admin
      .from("agent_provisioning_operations")
      .update({
        status: "running",
        result: null,
        error_message: null,
        started_at: new Date().toISOString(),
        finished_at: null,
      })
      .eq("id", existing.id)
      .eq("status", "failed");
    if (!retryError) return { id: existing.id as string, cached: null };
  }
  throw new HttpError(409, existing?.error_message || "No se pudo reintentar la operación.");
}

async function finishOperation(id: string, result: unknown, error?: string) {
  await admin
    .from("agent_provisioning_operations")
    .update({
      status: error ? "failed" : "succeeded",
      result: error ? null : result,
      error_message: error ?? null,
      finished_at: new Date().toISOString(),
    })
    .eq("id", id);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  let operationId: string | null = null;
  let agentId: string | null = null;
  try {
    const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
    const { userId, organizationId } = await ownerContext(token);
    const parsed = requestSchema.safeParse(await req.json());
    if (!parsed.success) throw new HttpError(400, "Solicitud de despliegue inválida.");
    const { action, request_id: requestId } = parsed.data;
    agentId = parsed.data.agent_id;
    await enforceRateLimit(req, action, userId);
    const agent = await loadAgent(agentId, organizationId);
    const operation = await beginOperation(action, agent, userId, requestId);
    if (operation.cached) return json(operation.cached);
    operationId = operation.id;

    if (action === "reconcile" && agent.status !== "active") {
      throw new HttpError(409, "Activa el agente antes de desplegarlo.");
    }

    const twilio =
      action === "reconcile" || action === "stop"
        ? await readTwilioContext(organizationId, agent.id, action)
        : null;
    const runtimeBaseUrl = `${RUNTIME_PUBLIC_BASE}/agents/${agent.id}`;
    const callIngestSecret = await hmacHex(CALL_INGEST_SECRET, `agent:${agent.id}`);

    await admin
      .from("voice_agents")
      .update({
        provisioning_status: action === "status" ? agent.provisioning_status : "provisioning",
        last_provisioning_error: null,
      })
      .eq("id", agent.id)
      .eq("organization_id", organizationId);

    const result = await callProvisioner({
      action,
      request_id: operationId,
      agent_id: agent.id,
      revision: agent.deployment_revision,
      runtime_base_url: runtimeBaseUrl,
      ...(action === "reconcile"
        ? {
            config: {
              name: agent.name,
              voice_name: agent.voice_name,
              language: agent.language,
              objective: agent.objective,
              greeting: agent.greeting,
              system_prompt: agent.system_prompt,
              twilio_phone: twilio?.phone.phone_number,
              twilio_account_sid: twilio?.connection.account_sid,
              twilio_auth_token: twilio?.authToken,
              call_ingest_hmac_secret: callIngestSecret,
            },
          }
        : {}),
    });

    const runtimeState = String(result.state ?? "error");
    if (!["running", "degraded", "stopped"].includes(runtimeState)) {
      throw new HttpError(502, "El VPS devolvió un estado de agente inválido.");
    }

    if (action === "reconcile" && twilio) {
      const webhookUrl = `${runtimeBaseUrl}/incoming-call`;
      await updateTwilioWebhook(
        twilio.connection.account_sid,
        twilio.connection.api_key_sid,
        twilio.apiKeySecret,
        twilio.phone.provider_number_sid,
        webhookUrl,
      );
      await admin
        .from("phone_numbers")
        .update({
          assigned_agent_id: agent.id,
          current_voice_url: webhookUrl,
          webhook_status: "configured",
          updated_at: new Date().toISOString(),
        })
        .eq("id", twilio.phone.id)
        .eq("organization_id", organizationId);
    }

    if (action === "stop" && twilio) {
      await updateTwilioWebhook(
        twilio.connection.account_sid,
        twilio.connection.api_key_sid,
        twilio.apiKeySecret,
        twilio.phone.provider_number_sid,
        null,
      );
      await admin
        .from("phone_numbers")
        .update({
          assigned_agent_id: null,
          current_voice_url: null,
          webhook_status: "not_configured",
          updated_at: new Date().toISOString(),
        })
        .eq("id", twilio.phone.id)
        .eq("organization_id", organizationId);
    }

    const now = new Date().toISOString();
    const response = {
      operation_id: operationId,
      agent_id: agent.id,
      state: runtimeState,
      revision: agent.deployment_revision,
      runtime_url: runtimeBaseUrl,
      health: result.health ?? null,
    };
    await admin
      .from("voice_agents")
      .update({
        provisioning_status: runtimeState,
        deployed_revision:
          action === "reconcile" && runtimeState === "running"
            ? agent.deployment_revision
            : undefined,
        runtime_service: typeof result.service_name === "string" ? result.service_name : null,
        runtime_url: runtimeBaseUrl,
        last_health_at: action === "status" || runtimeState === "running" ? now : null,
        last_deployed_at: action === "reconcile" && runtimeState === "running" ? now : undefined,
        last_provisioning_error: null,
      })
      .eq("id", agent.id)
      .eq("organization_id", organizationId);
    await finishOperation(operationId, response);
    return json(response);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message =
      error instanceof HttpError ? error.message : "Error inesperado al administrar el agente.";
    if (operationId) await finishOperation(operationId, null, message);
    if (agentId && operationId) {
      await admin
        .from("voice_agents")
        .update({ provisioning_status: "error", last_provisioning_error: message })
        .eq("id", agentId);
    }
    if (status >= 500) console.error("agent-provisioning error", message);
    const retry = error instanceof HttpError ? error.retryAfter : undefined;
    return json(
      { error: message, ...(retry ? { retry_after_seconds: retry } : {}) },
      status,
      retry ? { "Retry-After": String(retry) } : {},
    );
  }
});
