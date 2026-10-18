import { describe, expect, it } from "vitest";
import { parseAccessibilityPreferences } from "@/lib/accessibilityPreferences";
describe("accessibility preferences", () => {
  it("starts with a calm site", () => { expect(parseAccessibilityPreferences(null).calm).toBe(true); });
  it("restores visitor settings", () => { expect(parseAccessibilityPreferences('{"calm":false,"contrast":true,"links":true,"textSize":"larger"}')).toEqual({ calm: false, contrast: true, links: true, textSize: "larger" }); });
  it("ignores malformed settings", () => { expect(parseAccessibilityPreferences("invalid").calm).toBe(true); expect(parseAccessibilityPreferences('{"textSize":"huge"}').textSize).toBe("standard"); expect(parseAccessibilityPreferences('{"contrast":"true"}').contrast).toBe(false); });
});
