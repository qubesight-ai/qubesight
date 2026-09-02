import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useMatildaDemo } from "@/hooks/useMatildaDemo";
import { createMatildaSession, sendMatildaAudio } from "@/lib/matildaDemoApi";

vi.mock("@/lib/matildaDemoApi", () => ({
  createMatildaSession: vi.fn(),
  deleteMatildaSession: vi.fn(),
  getMatildaAudio: vi.fn(),
  sendMatildaAudio: vi.fn(),
  MatildaDemoApiError: class MatildaDemoApiError extends Error {
    constructor(
      public status?: number,
      message?: string,
    ) {
      super(message);
    }
  },
}));

const session = (expires_at = "2099-01-01T00:00:00Z") => ({
  session_id: "session",
  remaining_turns: 5,
  expires_at,
});

describe("useMatildaDemo y Turnstile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sin token no crea la sesión", async () => {
    const { result } = renderHook(() => useMatildaDemo());
    await act(() => result.current.start());
    expect(createMatildaSession).not.toHaveBeenCalled();
    expect(result.current.session).toBeNull();
  });

  it("una sesión expirada impide enviar una grabación", async () => {
    vi.mocked(createMatildaSession).mockResolvedValue(session("2000-01-01T00:00:00Z"));
    const { result } = renderHook(() => useMatildaDemo());
    await act(() => result.current.start("expired-token"));
    await act(() => result.current.sendAudio(new Blob(["audio"])));
    expect(sendMatildaAudio).not.toHaveBeenCalled();
    expect(result.current.error).toContain("sesión expiró");
  });

  it("reiniciar exige un token nuevo antes de crear otra sesión", async () => {
    vi.mocked(createMatildaSession).mockResolvedValue(session());
    const { result } = renderHook(() => useMatildaDemo());
    await act(() => result.current.start("primer-token"));
    act(() => result.current.reset());
    await act(() => result.current.start());
    expect(createMatildaSession).toHaveBeenCalledTimes(1);
    await act(() => result.current.start("segundo-token"));
    expect(createMatildaSession).toHaveBeenCalledTimes(2);
    expect(createMatildaSession).toHaveBeenLastCalledWith("segundo-token");
  });
});
