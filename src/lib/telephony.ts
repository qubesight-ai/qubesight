import { supabase } from "@/integrations/supabase/client";

export type TelephonyConnection = {
  id: string;
  provider: "twilio";
  status: "pending" | "verified" | "error" | "revoked";
  account_sid_masked: string;
  api_key_sid_masked: string;
  verified_at: string | null;
  webhook_validation_configured: boolean;
};

export type TelephonyPhoneNumber = {
  provider_number_sid: string;
  phone_number: string;
  friendly_name: string;
  capabilities: Record<string, boolean>;
  current_voice_url: string | null;
  selected: boolean;
  webhook_status: "not_configured" | "external" | "configured" | "error";
  last_synced_at: string;
};

export type TelephonyState = {
  connection: TelephonyConnection | null;
  numbers: TelephonyPhoneNumber[];
};

async function invokeTelephony(body: Record<string, unknown>): Promise<TelephonyState> {
  const { data, error } = await supabase.functions.invoke("twilio-connection", { body });

  if (error) {
    const context = (error as { context?: Response }).context;
    if (context) {
      try {
        const payload = await context.clone().json();
        if (payload?.error) throw new Error(String(payload.error));
      } catch (parsed) {
        if (parsed instanceof Error && parsed.message !== "Unexpected end of JSON input") {
          throw parsed;
        }
      }
    }
    throw new Error("No se pudo contactar el servicio de telefonía.");
  }

  if (!data || data.error) {
    throw new Error(data?.error || "Respuesta inválida del servicio de telefonía.");
  }
  return data as TelephonyState;
}

export const getTelephonyState = () => invokeTelephony({ action: "status" });

export const connectTwilio = (
  accountSid: string,
  apiKeySid: string,
  apiKeySecret: string,
  authToken: string,
) =>
  invokeTelephony({
    action: "connect",
    account_sid: accountSid,
    api_key_sid: apiKeySid,
    api_key_secret: apiKeySecret,
    auth_token: authToken,
  });

export const refreshTwilioNumbers = () => invokeTelephony({ action: "refresh" });

export const selectTwilioNumber = (providerNumberSid: string) =>
  invokeTelephony({ action: "select", provider_number_sid: providerNumberSid });

export const disconnectTwilio = () => invokeTelephony({ action: "disconnect" });
