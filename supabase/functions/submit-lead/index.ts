import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const clean = (v: unknown, max: number): string | null => {
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (!t) return null;
  return t.slice(0, max);
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const raw = await req.json().catch(() => null);
    if (!raw || typeof raw !== "object") return json({ error: "Cuerpo inválido" }, 400);

    // Honeypot: bots fill hidden fields.
    if (clean((raw as Record<string, unknown>).website, 200)) {
      return json({ ok: true, deduped: true });
    }

    const interest = clean((raw as Record<string, unknown>).interest, 120);
    if (!interest) return json({ error: "Selecciona un interés" }, 400);

    const name = clean((raw as Record<string, unknown>).name, 100);
    const company = clean((raw as Record<string, unknown>).company, 120);
    const contact = clean((raw as Record<string, unknown>).contact, 160);
    const language = clean((raw as Record<string, unknown>).language, 8) ?? "es";

    if (!contact) return json({ error: "Indica un correo o teléfono" }, 400);
    const looksEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact);
    const looksPhone = /^[+()\d][\d\s().-]{6,}$/.test(contact);
    if (!looksEmail && !looksPhone) return json({ error: "Correo o teléfono no válido" }, 400);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        name,
        company,
        contact,
        interest,
        language,
        source: "final_cta",
        user_agent: (req.headers.get("user-agent") ?? "").slice(0, 300) || null,
      })
      .select("id, created_at")
      .single();

    if (error) {
      if (error.message.includes("duplicate lead")) {
        return json({ ok: true, deduped: true });
      }
      console.error("lead insert failed:", error.message);
      return json({ error: "No pudimos guardar tus datos" }, 500);
    }

    // Notify the advisor by email (best effort — never blocks the user).
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const notifyTo = Deno.env.get("LEAD_NOTIFY_EMAIL");
    if (resendKey && notifyTo) {
      const row = (label: string, value: string | null) =>
        `<tr><td style="padding:6px 12px;color:#6b7280;font-size:13px">${label}</td><td style="padding:6px 12px;color:#111827;font-size:14px;font-weight:600">${
          (value ?? "—").replace(/[<>&]/g, "")
        }</td></tr>`;
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: Deno.env.get("LEAD_FROM_EMAIL") ?? "QubeSight <onboarding@resend.dev>",
            to: [notifyTo],
            subject: `Nuevo lead QubeSight — ${interest}`,
            html: `<div style="font-family:Arial,Helvetica,sans-serif;background:#ffffff;padding:24px">
              <h2 style="margin:0 0 4px;color:#111827">Nuevo lead desde qubesight.lat</h2>
              <p style="margin:0 0 16px;color:#6b7280;font-size:13px">Recibido ${
              new Date(lead.created_at).toLocaleString("es-CR", { timeZone: "America/Costa_Rica" })
            }</p>
              <table style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px">
                ${row("Interés", interest)}
                ${row("Nombre", name)}
                ${row("Empresa", company)}
                ${row("Contacto", contact)}
                ${row("Idioma", language)}
              </table>
            </div>`,
          }),
        });
        if (!res.ok) {
          console.error(`resend failed [${res.status}]: ${await res.text()}`);
        } else {
          await supabase.from("leads").update({ notified_at: new Date().toISOString() }).eq("id", lead.id);
        }
      } catch (e) {
        console.error("resend error:", e instanceof Error ? e.message : String(e));
      }
    }

    return json({ ok: true, id: lead.id });
  } catch (e) {
    console.error("submit-lead error:", e instanceof Error ? e.message : String(e));
    return json({ error: "Error inesperado" }, 500);
  }
});
