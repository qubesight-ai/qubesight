-- Lockdown: telephony_connections is backend-only (Edge Functions via service_role).
DROP POLICY IF EXISTS "Members read safe telephony connection metadata" ON public.telephony_connections;

-- Revoke historical column-level and table-level grants reproducibly.
REVOKE ALL (account_sid, api_key_sid, vault_secret_id) ON public.telephony_connections FROM anon, authenticated;
REVOKE ALL ON public.telephony_connections FROM anon, authenticated;

ALTER TABLE public.telephony_connections ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.telephony_connections TO service_role;

COMMENT ON TABLE public.telephony_connections IS 'Backend-only table. Contains Twilio provider identifiers and a Vault secret pointer. No anon/authenticated access; reachable exclusively through Edge Functions using service_role, which return masked metadata only.';