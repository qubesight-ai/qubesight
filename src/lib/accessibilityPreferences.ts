export type AccessibilityPreferences = {
  calm: boolean;
  contrast: boolean;
  links: boolean;
  textSize: "standard" | "large" | "larger";
};
export const defaultAccessibilityPreferences: AccessibilityPreferences = {
  calm: true,
  contrast: false,
  links: false,
  textSize: "standard",
};
export function parseAccessibilityPreferences(value: string | null): AccessibilityPreferences {
  try {
    const parsed: unknown = JSON.parse(value ?? "null");
    if (!parsed || typeof parsed !== "object") return { ...defaultAccessibilityPreferences };
    const data = parsed as Record<string, unknown>;
    return {
      calm: typeof data.calm === "boolean" ? data.calm : true,
      contrast: data.contrast === true,
      links: data.links === true,
      textSize:
        data.textSize === "large" || data.textSize === "larger" ? data.textSize : "standard",
    };
  } catch {
    return { ...defaultAccessibilityPreferences };
  }
}
