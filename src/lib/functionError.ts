export type FunctionErrorDetails = {
  status?: number;
  retryAfterSeconds?: number;
  message?: string;
};

export async function readFunctionError(context: unknown): Promise<FunctionErrorDetails> {
  if (!context || typeof context !== "object") return {};

  const source = context as Record<string, unknown>;
  const status = typeof source.status === "number" ? source.status : undefined;
  const headers = source.headers as { get?: (name: string) => string | null } | undefined;
  const retryAfter = Number(headers?.get?.("retry-after"));
  let payload: unknown = source;

  if (typeof source.json === "function") {
    try {
      payload = await (source.json as () => Promise<unknown>)();
    } catch {
      payload = null;
    }
  } else if (source.body && typeof source.body === "object") {
    payload = source.body;
  }

  const message =
    payload &&
    typeof payload === "object" &&
    typeof (payload as { error?: unknown }).error === "string"
      ? (payload as { error: string }).error
      : undefined;

  return {
    status,
    retryAfterSeconds: Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : undefined,
    message,
  };
}
