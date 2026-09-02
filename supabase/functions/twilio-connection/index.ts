import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Expose-Headers": "retry-after",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const RATE_SECRET = Deno.env.get("RATE_LIMIT_HASH_SECRET") ?? "";
const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

type Action = "status" | "connect" | "refresh" | "select" | "disconnect";
type TwilioNumber = {
  sid: string;
  phone_number: string;
  friendly_name?: string;
  capabilities?: Record<string, boolean>;
  voice_url?: string | null;
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

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function mask(value: string) {
  return value.length > 8 ? `${value.slice(0, 4)}••••${value.slice(-4)}` : "••••";
}

async function hmac(value: string) {
  if (!RATE_SECRET) throw new HttpError(503, "Protección antiabuso no configurada.");
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(RATE_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
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

async function enforceRateLimit(req: Request, action: Action, userId: string) {
  const settings: Record<Action, [number, number]> = {
    status: [60, 60],
    connect: [5, 600],
    refresh: [10, 600],
    select: [20, 60],
    disconnect: [3, 3600],
  };
  const [limit, windowSeconds] = settings[action];
  const [userKey, ipKey] = await Promise.all([
    hmac(`twilio:user:${userId}`),
    hmac(`twilio:ip:${clientIp(req)}`),
  ]);

  for (const [scope, subject] of [
    ["user", userKey],
    ["ip", ipKey],
  ] as const) {
    const { data, error } = await admin.rpc("consume_rate_limit", {
      p_subject_key: subject,
      p_action: `twilio:${action}:${scope}`,
      p_limit: scope === "user" ? limit : limit * 3,
      p_window_seconds: windowSeconds,
    });
    if (error) {
      console.error("twilio rate limit unavailable", action, error.message);
      throw new HttpError(503, "Servicio temporalmente no disponible.");
    }
    const row = Array.isArray(data) ? data[0] : data;
    if (!row?.allowed) {
      const retry = Math.max(1, Number(row?.retry_after_seconds ?? windowSeconds));
      console.warn(
        JSON.stringify({
          event: "twilio_rate_limited",
          action,
          scope,
          subject: subject.slice(0, 12),
          at: new Date().toISOString(),
        }),
      );
      throw new HttpError(429, "Demasiadas solicitudes. Intenta nuevamente más tarde.", retry);
    }
  }
}

async function twilioRequest(accountSid: string, apiKeySid: string, apiKeySecret: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/IncomingPhoneNumbers.json?PageSize=1000`,
      {
        headers: {
          Authorization: `Basic ${btoa(`${apiKeySid}:${apiKeySecret}`)}`,
          Accept: "application/json",
        },
        signal: controller.signal,
      },
    );
    if (response.status === 401 || response.status === 403) {
      throw new HttpError(400, "Credenciales de Twilio inválidas o sin permisos suficientes.");
    }
    if (response.status === 429) {
      const retry = Number(response.headers.get("retry-after")) || 30;
      throw new HttpError(429, "Twilio está limitando temporalmente las solicitudes.", retry);
    }
    if (!response.ok) throw new HttpError(502, "Twilio no pudo verificar la cuenta.");
    const payload = await response.json();
    return (
      Array.isArray(payload?.incoming_phone_numbers) ? payload.incoming_phone_numbers : []
    ) as TwilioNumber[];
  } catch (error) {
    if (error instanceof HttpError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new HttpError(504, "Twilio tardó demasiado en responder.");
    }
    throw new HttpError(502, "No se pudo contactar a Twilio.");
  } finally {
    clearTimeout(timeout);
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
    throw new HttpError(403, "Sólo el propietario puede administrar telefonía.");
  }
  return { userId, organizationId: membership.organization_id as string };
}

async function getConnection(organizationId: string) {
  const { data, error } = await admin
    .from("telephony_connections")
    .select("*")
    .eq("organization_id", organizationId)
    .eq("provider", "twilio")
    .maybeSingle();
  if (error) throw new HttpError(500, "No se pudo consultar la conexión.");
  return data;
}

async function readSecret(secretId: string) {
  const { data, error } = await admin.rpc("vault_read_twilio_secret", {
    p_secret_id: secretId,
  });
  if (error || typeof data !== "string" || !data) {
    throw new HttpError(500, "La credencial cifrada no está disponible.");
  }
  return data;
}

async function syncNumbers(organizationId: string, connectionId: string, numbers: TwilioNumber[]) {
  const rows = numbers
    .filter(
      (number) =>
        /^PN[0-9A-Fa-f]{32}$/.test(number.sid) && /^\+[1-9][0-9]{6,14}$/.test(number.phone_number),
    )
    .map((number) => ({
      organization_id: organizationId,
      telephony_connection_id: connectionId,
      provider_number_sid: number.sid,
      phone_number: number.phone_number,
      friendly_name: text(number.friendly_name, 120),
      capabilities: number.capabilities ?? {},
      current_voice_url: text(number.voice_url, 1000) || null,
      webhook_status: number.voice_url ? "external" : "not_configured",
      last_synced_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

  const currentSids = new Set(rows.map((row) => row.provider_number_sid));
  const { data: existing, error: existingError } = await admin
    .from("phone_numbers")
    .select("id,provider_number_sid")
    .eq("telephony_connection_id", connectionId);
  if (existingError) throw new HttpError(500, "No se pudieron reconciliar los números.");

  const staleIds = (existing ?? [])
    .filter((row) => !currentSids.has(row.provider_number_sid))
    .map((row) => row.id);
  if (staleIds.length) {
    const { error: staleError } = await admin.from("phone_numbers").delete().in("id", staleIds);
    if (staleError) throw new HttpError(500, "No se pudieron reconciliar los números.");
  }

  if (!rows.length) return;
  const { error } = await admin
    .from("phone_numbers")
    .upsert(rows, { onConflict: "telephony_connection_id,provider_number_sid" });
  if (error) {
    console.error("phone number sync failed", error.message);
    throw new HttpError(500, "No se pudieron sincronizar los números.");
  }
}

async function responseState(organizationId: string) {
  const connection = await getConnection(organizationId);
  if (!connection) return { connection: null, numbers: [] };

  const { data: numbers, error } = await admin
    .from("phone_numbers")
    .select(
      "provider_number_sid,phone_number,friendly_name,capabilities,current_voice_url,selected,webhook_status,last_synced_at",
    )
    .eq("organization_id", organizationId)
    .order("phone_number");
  if (error) throw new HttpError(500, "No se pudieron consultar los números.");

  return {
    connection: {
      id: connection.id,
      provider: connection.provider,
      status: connection.status,
      account_sid_masked: mask(connection.account_sid),
      api_key_sid_masked: mask(connection.api_key_sid),
      verified_at: connection.verified_at,
    },
    numbers: numbers ?? [],
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "").trim();

  try {
    const { userId, organizationId } = await ownerContext(token);
    const body = await req.json();
    const action = body?.action as Action;
    if (!["status", "connect", "refresh", "select", "disconnect"].includes(action)) {
      throw new HttpError(400, "Acción inválida.");
    }
    await enforceRateLimit(req, action, userId);

    if (action === "status") return json(await responseState(organizationId));

    if (action === "connect") {
      const accountSid = text(body.account_sid, 34);
      const apiKeySid = text(body.api_key_sid, 34);
      const apiKeySecret = text(body.api_key_secret, 512);
      if (
        !/^AC[0-9A-Fa-f]{32}$/.test(accountSid) ||
        !/^SK[0-9A-Fa-f]{32}$/.test(apiKeySid) ||
        apiKeySecret.length < 8
      ) {
        throw new HttpError(400, "Formato de credenciales inválido.");
      }

      const numbers = await twilioRequest(accountSid, apiKeySid, apiKeySecret);
      const existing = await getConnection(organizationId);
      const { data: secretId, error: vaultError } = await admin.rpc("vault_store_twilio_secret", {
        p_secret: apiKeySecret,
        p_existing_id: existing?.vault_secret_id ?? null,
        p_name: `twilio-${organizationId}`,
      });
      if (vaultError || !secretId) throw new HttpError(500, "No se pudo cifrar la credencial.");

      const { data: connection, error } = await admin
        .from("telephony_connections")
        .upsert(
          {
            organization_id: organizationId,
            provider: "twilio",
            account_sid: accountSid,
            api_key_sid: apiKeySid,
            vault_secret_id: secretId,
            status: "verified",
            verified_at: new Date().toISOString(),
            created_by: userId,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "organization_id,provider" },
        )
        .select("id")
        .single();
      if (error || !connection) throw new HttpError(500, "No se pudo guardar la conexión.");

      await syncNumbers(organizationId, connection.id, numbers);
      return json(await responseState(organizationId));
    }

    const connection = await getConnection(organizationId);
    if (!connection) throw new HttpError(404, "No existe una conexión de Twilio.");

    if (action === "refresh") {
      const secret = await readSecret(connection.vault_secret_id);
      const numbers = await twilioRequest(connection.account_sid, connection.api_key_sid, secret);
      await syncNumbers(organizationId, connection.id, numbers);
      return json(await responseState(organizationId));
    }

    if (action === "select") {
      const numberSid = text(body.provider_number_sid, 34);
      if (!/^PN[0-9A-Fa-f]{32}$/.test(numberSid)) {
        throw new HttpError(400, "Número inválido.");
      }
      const { error } = await admin.rpc("select_twilio_phone_number", {
        p_organization_id: organizationId,
        p_provider_number_sid: numberSid,
      });
      if (error) throw new HttpError(400, "No se pudo seleccionar el número.");
      return json(await responseState(organizationId));
    }

    const secretId = connection.vault_secret_id;
    const { error: deleteError } = await admin
      .from("telephony_connections")
      .delete()
      .eq("id", connection.id)
      .eq("organization_id", organizationId);
    if (deleteError) throw new HttpError(500, "No se pudo eliminar la conexión.");
    const { error: vaultDeleteError } = await admin.rpc("vault_delete_twilio_secret", {
      p_secret_id: secretId,
    });
    if (vaultDeleteError) console.error("Twilio Vault cleanup failed");
    return json({ connection: null, numbers: [] });
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message =
      error instanceof HttpError ? error.message : "Error inesperado al administrar Twilio.";
    if (status >= 500) console.error("twilio-connection error", message);
    const retry = error instanceof HttpError ? error.retryAfter : undefined;
    return json(
      { error: message, ...(retry ? { retry_after_seconds: retry } : {}) },
      status,
      retry ? { "Retry-After": String(retry) } : {},
    );
  }
});
