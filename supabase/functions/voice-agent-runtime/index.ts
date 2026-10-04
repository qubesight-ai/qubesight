import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";
import { z } from "https://esm.sh/zod@3.25.76";
import {
  type VoiceAgentRuntimeClaims,
  verifyVoiceAgentRuntimeToken,
} from "../_shared/voiceAgentRuntimeToken.ts";

const requestSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("config") }).strict(),
  z
    .object({
      action: z.literal("complete"),
      status: z.enum(["completed", "failed"]),
      started_at: z.string().datetime({ offset: true }),
      ended_at: z.string().datetime({ offset: true }),
      transcript: z
        .array(
          z
            .object({
              role: z.enum(["user", "assistant"]),
              text: z.string().trim().min(1).max(2000),
            })
            .strict(),
        )
        .max(100),
    })
    .strict(),
]);

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

serve(async (req) => {
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
  if (!token) return json({ error: "Autenticación requerida" }, 401);

  let claims: VoiceAgentRuntimeClaims;
  try {
    claims = await verifyVoiceAgentRuntimeToken(token);
  } catch {
    return json({ error: "Autenticación requerida" }, 401);
  }

  try {
    const parsed = requestSchema.safeParse(await req.json());
    if (!parsed.success) return json({ error: "Solicitud inválida" }, 400);

    if (parsed.data.action === "config") {
      const { data: agent, error } = await admin
        .from("voice_agents")
        .select(
          "id,organization_id,name,agent_type,business_name,business_description,assistant_description,language,voice_name,greeting,system_prompt,capabilities,behavior,lead_fields,escalation_rules,configuration_status,deployment_revision",
        )
        .eq("id", claims.sub)
        .eq("organization_id", claims.organization_id)
        .maybeSingle();
      if (error) throw error;
      if (!agent) return json({ error: "Agente no encontrado" }, 404);
      if (
        agent.configuration_status === "draft" ||
        !agent.greeting?.trim() ||
        !agent.system_prompt?.trim()
      ) {
        return json({ error: "El agente no está listo para una prueba" }, 409);
      }

      return json({
        agent: {
          id: agent.id,
          name: agent.name,
          agent_type: agent.agent_type,
          business_name: agent.business_name,
          business_description: agent.business_description,
          assistant_description: agent.assistant_description,
          language: agent.language,
          voice_name: agent.voice_name,
          greeting: agent.greeting,
          system_prompt: agent.system_prompt,
          capabilities: agent.capabilities,
          behavior: agent.behavior,
          lead_fields: agent.lead_fields,
          escalation_rules: agent.escalation_rules,
          revision: agent.deployment_revision,
        },
        session: { room_name: claims.room_name, mode: claims.mode },
      });
    }

    const startedAt = new Date(parsed.data.started_at);
    const endedAt = new Date(parsed.data.ended_at);
    const durationSeconds = Math.floor((endedAt.getTime() - startedAt.getTime()) / 1000);
    if (durationSeconds < 0 || durationSeconds > 7200) {
      return json({ error: "Duración inválida" }, 400);
    }

    const { error } = await admin.from("calls").upsert(
      {
        organization_id: claims.organization_id,
        voice_agent_id: claims.sub,
        external_call_id: `LK:${claims.room_name}`,
        caller_phone: null,
        direction: "inbound",
        status: parsed.data.status === "completed" ? "test_completed" : "test_failed",
        result:
          parsed.data.status === "completed"
            ? "Prueba desde navegador completada"
            : "La prueba desde navegador no finalizó correctamente",
        duration_seconds: durationSeconds,
        transcript: JSON.stringify(parsed.data.transcript),
        started_at: startedAt.toISOString(),
        ended_at: endedAt.toISOString(),
      },
      { onConflict: "external_call_id", ignoreDuplicates: true },
    );
    if (error) throw error;

    return json({ stored: true });
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof z.ZodError) {
      return json({ error: "Solicitud inválida" }, 400);
    }
    console.error(
      "voice-agent-runtime error",
      error instanceof Error ? error.name : "unknown_error",
    );
    return json({ error: "Servicio temporalmente no disponible" }, 500);
  }
});
