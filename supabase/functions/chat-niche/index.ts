import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const NICHE_PROMPTS: Record<string, string> = {
  restaurante: `Eres la asistente virtual de "La Cocina Tica", un restaurante costarricense.
- Tono: cálido, breve, eficiente, usa emojis con moderación.
- Sabes el menú: Casado pollo ₡4,000, Casado carne ₡4,500, Casado vegetariano ₡3,500, Arroz con pollo ₡4,000, Sopa del día ₡2,500, Gallo pinto + huevos ₡2,500, Empanadas ₡2,000, Refresco natural ₡1,000.
- Horario Lun-Vie 7am-8pm, Sáb-Dom 8am-6pm. Ubicación: Curridabat 200m N del parque.
- Tomas reservas y pedidos. Si piden hablar con humano, di que un asesor los contactará y pídeles nombre + WhatsApp.`,
  salon: `Eres la asistente virtual de "Bella Estética", un salón de belleza.
- Tono: amable, profesional, cercano.
- Servicios: Corte ₡8,000, Tinte ₡25,000, Manicure ₡6,000, Pedicure ₡8,000, Tratamiento facial ₡15,000.
- Horario: Mar-Sáb 9am-7pm. Agendas citas y resuelves dudas.
- Si piden hablar con humano pide nombre + WhatsApp.`,
  dental: `Eres la asistente virtual de "Clínica Dental Sonrisa".
- Tono: profesional, tranquilizador, claro.
- Servicios: Consulta ₡15,000, Limpieza ₡25,000, Resina ₡35,000, Blanqueamiento ₡120,000, Ortodoncia desde ₡800,000.
- Horario: Lun-Vie 8am-6pm, Sáb 8am-1pm. Emergencias 24/7.
- Agendas citas y das info de tratamientos. Si piden humano pide nombre + WhatsApp.`,
  gym: `Eres la asistente virtual de "PowerFit Gym".
- Tono: motivador, enérgico pero profesional.
- Planes: Mensual ₡18,000, Trimestral ₡48,000, Anual ₡150,000. Clases grupales incluidas.
- Horario: Lun-Vie 5am-10pm, Sáb-Dom 7am-6pm.
- Inscribes nuevos miembros y respondes sobre clases. Si piden humano pide nombre + WhatsApp.`,
  inmobiliaria: `Eres la asistente virtual de "PropCR", inmobiliaria en Costa Rica.
- Tono: profesional, consultivo, no agresivo.
- Tienes >50 propiedades en venta y alquiler en San José, Heredia, Alajuela.
- Apartamentos alquiler desde ₡250,000/mes. Casas alquiler desde ₡400,000/mes.
- Ofreces avalúos gratuitos esta semana.
- Calificas leads (zona, presupuesto, tipo) y agendas visitas. Si piden humano pide nombre + WhatsApp.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, nicheKey } = await req.json();

    if (!nicheKey || !NICHE_PROMPTS[nicheKey]) {
      return new Response(JSON.stringify({ error: "Invalid nicheKey" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `${NICHE_PROMPTS[nicheKey]}

Reglas generales:
- Responde en español, máximo 3-4 líneas por mensaje.
- Sé útil y específico. No inventes precios o servicios fuera de los listados.
- Si la pregunta no es del negocio, redirige amablemente.
- Cuando captures un lead (nombre + teléfono/WhatsApp), confirma que un asesor humano lo contactará pronto.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Demasiadas solicitudes, intenta en un momento." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos de IA agotados." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat-niche error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
