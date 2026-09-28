import { z } from "https://esm.sh/zod@3.25.76";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const claimsSchema = z
  .object({
    iss: z.literal("qubesight"),
    aud: z.literal("voice-agent-runtime"),
    sub: z.string().uuid(),
    organization_id: z.string().uuid(),
    room_name: z.string().min(1).max(200),
    mode: z.literal("browser_test"),
    iat: z.number().int().nonnegative(),
    exp: z.number().int().positive(),
    jti: z.string().uuid(),
  })
  .strict();

export type VoiceAgentRuntimeClaims = z.infer<typeof claimsSchema>;

function runtimeSecret() {
  const secret = Deno.env.get("VOICE_AGENT_RUNTIME_TOKEN_SECRET") ?? "";
  if (secret.length < 32) {
    throw new Error("VOICE_AGENT_RUNTIME_TOKEN_SECRET no está configurada correctamente");
  }
  return secret;
}

function encodeBase64Url(value: Uint8Array) {
  return btoa(String.fromCharCode(...value))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
}

function encodeJson(value: unknown) {
  return encodeBase64Url(encoder.encode(JSON.stringify(value)));
}

async function importHmacKey(usage: KeyUsage) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(runtimeSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    [usage],
  );
}

export async function issueVoiceAgentRuntimeToken(
  claims: Omit<VoiceAgentRuntimeClaims, "iss" | "aud" | "iat" | "exp" | "jti">,
  ttlSeconds = 900,
) {
  const now = Math.floor(Date.now() / 1000);
  const payload = claimsSchema.parse({
    ...claims,
    iss: "qubesight",
    aud: "voice-agent-runtime",
    iat: now,
    exp: now + ttlSeconds,
    jti: crypto.randomUUID(),
  });
  const unsigned = `${encodeJson({ alg: "HS256", typ: "JWT" })}.${encodeJson(payload)}`;
  const signature = await crypto.subtle.sign(
    "HMAC",
    await importHmacKey("sign"),
    encoder.encode(unsigned),
  );
  return `${unsigned}.${encodeBase64Url(new Uint8Array(signature))}`;
}

export async function verifyVoiceAgentRuntimeToken(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3 || parts.some((part) => !part)) throw new Error("Token inválido");

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const header = JSON.parse(decoder.decode(decodeBase64Url(encodedHeader)));
  if (header?.alg !== "HS256" || header?.typ !== "JWT") throw new Error("Token inválido");

  const validSignature = await crypto.subtle.verify(
    "HMAC",
    await importHmacKey("verify"),
    decodeBase64Url(encodedSignature),
    encoder.encode(`${encodedHeader}.${encodedPayload}`),
  );
  if (!validSignature) throw new Error("Token inválido");

  const claims = claimsSchema.parse(JSON.parse(decoder.decode(decodeBase64Url(encodedPayload))));
  const now = Math.floor(Date.now() / 1000);
  if (claims.exp <= now || claims.iat > now + 60 || claims.exp - claims.iat > 900) {
    throw new Error("Token vencido");
  }
  return claims;
}
