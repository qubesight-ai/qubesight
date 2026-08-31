import { beforeEach, describe, expect, it, vi } from "vitest";
import { createMatildaSession } from "@/lib/matildaDemoApi";

describe("createMatildaSession", () => {
  beforeEach(() => { vi.stubEnv("VITE_MATILDA_DEMO_API_URL", "https://matilda.qubesightprojects.fun"); vi.stubGlobal("fetch", vi.fn()); });

  it("envía el token de Turnstile como multipart/form-data", async () => {
    const fetchMock = vi.mocked(fetch); fetchMock.mockResolvedValue(new Response(JSON.stringify({ session_id: "session", remaining_turns: 5, expires_at: "2099-01-01T00:00:00Z" }), { status: 200 }));
    await createMatildaSession("turnstile-token");
    const [, init] = fetchMock.mock.calls[0];
    expect(init?.method).toBe("POST");
    expect(init?.body).toBeInstanceOf(FormData);
    expect((init?.body as FormData).get("turnstile_token")).toBe("turnstile-token");
  });

  it("no crea una sesión sin token", async () => {
    expect(() => createMatildaSession("")).toThrow("Completa la verificación");
    expect(fetch).not.toHaveBeenCalled();
  });
});
