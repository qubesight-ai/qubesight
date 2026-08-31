import { describe, expect, it } from "vitest";
import { canStartMatildaRecording } from "@/lib/matildaTurnstile";

describe("protección de grabación de Matilda", () => {
  it("un token expirado o un error de Turnstile impiden grabar", () => {
    expect(canStartMatildaRecording(true, "error", true)).toBe(false);
    expect(canStartMatildaRecording(true, "waiting", true)).toBe(false);
    expect(canStartMatildaRecording(true, "ready", true)).toBe(true);
  });
});
