REVOKE TRUNCATE, REFERENCES, TRIGGER, MAINTAIN ON public.telephony_connections FROM service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.telephony_connections TO service_role;