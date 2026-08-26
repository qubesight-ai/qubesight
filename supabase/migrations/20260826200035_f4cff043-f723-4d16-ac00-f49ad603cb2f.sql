ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notified_at timestamptz;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS user_agent text;
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_contact_idx ON public.leads (contact);

GRANT SELECT ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

DROP POLICY IF EXISTS "Admins read leads" ON public.leads;
CREATE POLICY "Admins read leads" ON public.leads FOR SELECT TO authenticated USING (public.is_admin());

CREATE OR REPLACE FUNCTION public.validate_lead()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.name := NULLIF(btrim(NEW.name), '');
  NEW.company := NULLIF(btrim(NEW.company), '');
  NEW.contact := NULLIF(btrim(NEW.contact), '');
  NEW.interest := btrim(NEW.interest);

  IF NEW.interest IS NULL OR length(NEW.interest) = 0 OR length(NEW.interest) > 120 THEN
    RAISE EXCEPTION 'invalid interest';
  END IF;
  IF NEW.name IS NOT NULL AND length(NEW.name) > 100 THEN RAISE EXCEPTION 'name too long'; END IF;
  IF NEW.company IS NOT NULL AND length(NEW.company) > 120 THEN RAISE EXCEPTION 'company too long'; END IF;
  IF NEW.contact IS NOT NULL AND length(NEW.contact) > 160 THEN RAISE EXCEPTION 'contact too long'; END IF;

  IF NEW.contact IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.leads l
    WHERE l.contact = NEW.contact
      AND l.interest = NEW.interest
      AND l.created_at > now() - interval '10 minutes'
  ) THEN
    RAISE EXCEPTION 'duplicate lead';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_lead_before_insert ON public.leads;
CREATE TRIGGER validate_lead_before_insert
BEFORE INSERT ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.validate_lead();