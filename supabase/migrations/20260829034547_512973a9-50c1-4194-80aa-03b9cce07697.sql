CREATE TABLE public.rate_limit_counters (
  subject_key text NOT NULL,
  action text NOT NULL,
  window_start timestamptz NOT NULL,
  window_seconds integer NOT NULL,
  request_count integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (subject_key, action, window_start)
);

REVOKE ALL ON public.rate_limit_counters FROM anon, authenticated;
GRANT ALL ON public.rate_limit_counters TO service_role;

ALTER TABLE public.rate_limit_counters ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_rate_limit_counters_window ON public.rate_limit_counters (window_start);

CREATE OR REPLACE FUNCTION public.consume_rate_limit(
  p_subject_key text,
  p_action text,
  p_limit integer,
  p_window_seconds integer
)
RETURNS TABLE (allowed boolean, current_count integer, retry_after_seconds integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_now timestamptz := now();
  v_window_start timestamptz;
  v_count integer;
BEGIN
  IF p_subject_key IS NULL OR length(p_subject_key) = 0 OR p_action IS NULL THEN
    RAISE EXCEPTION 'invalid rate limit arguments';
  END IF;
  IF p_limit < 1 OR p_window_seconds < 1 THEN
    RAISE EXCEPTION 'invalid rate limit configuration';
  END IF;

  v_window_start := to_timestamp(floor(extract(epoch FROM v_now) / p_window_seconds) * p_window_seconds);

  INSERT INTO public.rate_limit_counters AS r (subject_key, action, window_start, window_seconds, request_count, updated_at)
  VALUES (p_subject_key, p_action, v_window_start, p_window_seconds, 1, v_now)
  ON CONFLICT (subject_key, action, window_start)
  DO UPDATE SET request_count = r.request_count + 1, updated_at = v_now
  RETURNING r.request_count INTO v_count;

  RETURN QUERY SELECT
    v_count <= p_limit,
    v_count,
    GREATEST(1, CEIL(EXTRACT(EPOCH FROM ((v_window_start + make_interval(secs => p_window_seconds)) - v_now)))::integer);
END;
$$;

REVOKE ALL ON FUNCTION public.consume_rate_limit(text, text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_rate_limit(text, text, integer, integer) TO service_role;

CREATE OR REPLACE FUNCTION public.purge_rate_limit_counters()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.rate_limit_counters WHERE window_start < now() - interval '1 day';
$$;

REVOKE ALL ON FUNCTION public.purge_rate_limit_counters() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.purge_rate_limit_counters() TO service_role;