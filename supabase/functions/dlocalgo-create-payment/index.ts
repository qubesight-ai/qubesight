// dLocal Go - Create Payment edge function
// Public endpoint (no JWT). Validates input and proxies to dLocal Go.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Production endpoint. Switch to https://api-sbx.dlocalgo.com if running on sandbox keys.
const DLOCALGO_BASE_URL = Deno.env.get("DLOCALGO_BASE_URL") ?? "https://api.dlocalgo.com";

interface PayerInput {
  name?: string;
  email?: string;
  phone?: string;
  document?: string;
  document_type?: string;
}

interface CreatePaymentBody {
  amount: number;
  currency?: string;
  country?: string;
  description?: string;
  order_id?: string;
  payer?: PayerInput;
  success_url?: string;
  back_url?: string;
}

function bad(msg: string, status = 400) {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function isFiniteNumber(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n) && n > 0;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return bad("Method not allowed", 405);

  const API_KEY = Deno.env.get("DLOCALGO_API_KEY");
  const SECRET_KEY = Deno.env.get("DLOCALGO_SECRET_KEY");
  if (!API_KEY) return bad("DLOCALGO_API_KEY is not configured", 500);
  if (!SECRET_KEY) return bad("DLOCALGO_SECRET_KEY is not configured", 500);

  let body: CreatePaymentBody;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid JSON body");
  }

  // Validation
  if (!isFiniteNumber(body.amount)) return bad("amount must be a positive number");
  if (body.amount > 100000) return bad("amount exceeds allowed maximum");

  const currency = (body.currency ?? "USD").toUpperCase();
  if (!/^[A-Z]{3}$/.test(currency)) return bad("currency must be a 3-letter ISO code");

  const country = body.country ? body.country.toUpperCase() : undefined;
  if (country && !/^[A-Z]{2}$/.test(country)) return bad("country must be a 2-letter ISO code");

  const description = (body.description ?? "QubeSight").slice(0, 100);
  const order_id = (
    body.order_id ?? `qs_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  ).slice(0, 128);

  const origin = req.headers.get("origin") ?? "https://qubesight.lat";
  const success_url = body.success_url ?? `${origin}/payment/success`;
  const back_url = body.back_url ?? `${origin}/payment/failure`;
  const projectRef = Deno.env.get("SUPABASE_URL")?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  const notification_url = projectRef
    ? `https://${projectRef}.supabase.co/functions/v1/dlocalgo-webhook`
    : undefined;

  const payload: Record<string, unknown> = {
    amount: body.amount,
    currency,
    description,
    order_id,
    success_url,
    back_url,
  };
  if (country) payload.country = country;
  if (notification_url) payload.notification_url = notification_url;
  if (body.payer && (body.payer.name || body.payer.email)) {
    payload.payer = {
      ...(body.payer.name ? { name: body.payer.name.slice(0, 100) } : {}),
      ...(body.payer.email ? { email: body.payer.email.slice(0, 100) } : {}),
      ...(body.payer.phone ? { phone: body.payer.phone.slice(0, 100) } : {}),
      ...(body.payer.document ? { document: body.payer.document } : {}),
      ...(body.payer.document_type ? { document_type: body.payer.document_type } : {}),
    };
  }

  const auth = `Bearer ${API_KEY}:${SECRET_KEY}`;
  let dlRes: Response;
  try {
    dlRes = await fetch(`${DLOCALGO_BASE_URL}/v1/payments`, {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("dLocal Go network error:", e);
    return bad("Failed to reach dLocal Go", 502);
  }

  const text = await dlRes.text();
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  if (!dlRes.ok) {
    console.error("dLocal Go error:", dlRes.status, data);
    return new Response(
      JSON.stringify({
        error: "dLocal Go rejected the payment request",
        status: dlRes.status,
        details: data,
      }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const out = data as { id?: string; redirect_url?: string; status?: string; order_id?: string };
  return new Response(
    JSON.stringify({
      id: out.id,
      redirect_url: out.redirect_url,
      status: out.status,
      order_id: out.order_id,
    }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
