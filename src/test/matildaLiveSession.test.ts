import { beforeEach, describe, expect, it, vi } from "vitest";
import { createMatildaLiveSession, matildaCallErrorCode } from "@/lib/matildaLiveSession";

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke } } }));
const session = { server_url: "wss://demo.example.test", participant_token: "mock-participant", room_name: "qs-test-demo-example", max_seconds: 20 };

describe("public Matilda session boundary", () => {
  beforeEach(() => invoke.mockReset());
  it("invokes only the existing function with an empty body and cancellation signal", async () => {
    invoke.mockResolvedValue({ data: session, error: null });
    const controller = new AbortController();
    expect(await createMatildaLiveSession(controller.signal)).toEqual(session);
    expect(invoke).toHaveBeenCalledWith("voice-demo-session", { body: {}, signal: controller.signal });
  });
  it.each(["qs-test-private-agent", "other-demo-example", ""])("rejects non-public room prefix %s", async (room_name) => {
    invoke.mockResolvedValue({ data: { ...session, room_name }, error: null });
    await expect(createMatildaLiveSession(new AbortController().signal)).rejects.toMatchObject({ code: "invalid-session" });
  });
  it.each(["https://demo.example.test", "ws://demo.example.test", "wss://user:pass@demo.example.test", "not-a-url"])("rejects unsafe URL %s", async (server_url) => {
    invoke.mockResolvedValue({ data: { ...session, server_url }, error: null });
    await expect(createMatildaLiveSession(new AbortController().signal)).rejects.toMatchObject({ code: "invalid-session" });
  });
  it.each([0, -1, 1.5, Infinity, NaN, "20"])("rejects invalid duration %s", async (max_seconds) => {
    invoke.mockResolvedValue({ data: { ...session, max_seconds }, error: null });
    await expect(createMatildaLiveSession(new AbortController().signal)).rejects.toMatchObject({ code: "invalid-session" });
  });
  it("rejects incomplete session data", async () => {
    invoke.mockResolvedValue({ data: { participant_token: "mock" }, error: null });
    await expect(createMatildaLiveSession(new AbortController().signal)).rejects.toMatchObject({ code: "invalid-session" });
  });
  it("does not expose an internal function error", async () => {
    invoke.mockResolvedValue({ data: null, error: { context: new Response(JSON.stringify({ error: "internal-provider-details" }), { status: 429 }) } });
    await expect(createMatildaLiveSession(new AbortController().signal)).rejects.toMatchObject({ code: "rate-limit", message: "rate-limit" });
  });
  it("ignores a session received after cancellation", async () => {
    const controller = new AbortController(); controller.abort();
    invoke.mockResolvedValue({ data: session, error: null });
    await expect(createMatildaLiveSession(controller.signal)).rejects.toMatchObject({ name: "AbortError" });
  });
  it.each([["NotAllowedError", "permission"], ["NotFoundError", "microphone-missing"], ["NotReadableError", "microphone-busy"]])("maps %s safely", (name, code) => {
    expect(matildaCallErrorCode(new DOMException("internal details", name))).toBe(code);
  });
});