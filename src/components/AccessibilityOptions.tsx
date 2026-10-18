import { useEffect, useState, type ReactNode } from "react";
import { Accessibility, RotateCcw } from "lucide-react";
import { MotionConfig } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "@/hooks/useTranslation";
import {
  type AccessibilityPreferences,
  defaultAccessibilityPreferences,
  parseAccessibilityPreferences,
} from "@/lib/accessibilityPreferences";
const storageKey = "qubesight-accessibility";
export default function AccessibilityOptions({ children }: { children: ReactNode }) {
  const { language } = useTranslation();
  const spanish = language === "es";
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(() => {
    try {
      return parseAccessibilityPreferences(localStorage.getItem(storageKey));
    } catch {
      return { ...defaultAccessibilityPreferences };
    }
  });
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.calm = String(preferences.calm);
    root.dataset.contrast = String(preferences.contrast);
    root.dataset.links = String(preferences.links);
    root.dataset.textSize = preferences.textSize;
    try {
      localStorage.setItem(storageKey, JSON.stringify(preferences));
    } catch {
      /* Optional display preferences only. */
    }
  }, [preferences]);
  const settings = [
    { key: "calm", label: spanish ? "Reducir movimiento y efectos" : "Reduce motion and effects" },
    { key: "contrast", label: spanish ? "Mayor contraste" : "Higher contrast" },
    { key: "links", label: spanish ? "Subrayar enlaces" : "Underline links" },
  ] as const;
  return (
    <MotionConfig reducedMotion={preferences.calm ? "always" : "user"}>
      <a
        className="qs-skip-link"
        href="#"
        onClick={(event) => {
          event.preventDefault();
          const main = document.querySelector("main");
          if (!main) return;
          main.tabIndex = -1;
          main.focus();
          main.scrollIntoView({ behavior: "instant", block: "start" });
        }}
      >
        {spanish ? "Saltar al contenido" : "Skip to content"}
      </a>
      {children}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="qs-accessibility-trigger"
            aria-label={spanish ? "Opciones de accesibilidad" : "Accessibility options"}
            title={spanish ? "Opciones de accesibilidad" : "Accessibility options"}
          >
            <Accessibility aria-hidden="true" />
          </Button>
        </DialogTrigger>
        <DialogContent className="qs-accessibility-panel" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>{spanish ? "Accesibilidad" : "Accessibility"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {settings.map(({ key, label }) => (
              <div key={key} className="flex min-h-12 items-center justify-between gap-4">
                <label
                  htmlFor={`accessibility-${key}`}
                  className="cursor-pointer text-sm font-medium"
                >
                  {label}
                </label>
                <Switch
                  id={`accessibility-${key}`}
                  checked={preferences[key]}
                  onCheckedChange={(checked) =>
                    setPreferences((current) => ({ ...current, [key]: checked }))
                  }
                />
              </div>
            ))}
          </div>
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">
              {spanish ? "Tamaño del texto" : "Text size"}
            </legend>
            <div className="flex flex-wrap gap-2">
              {(["standard", "large", "larger"] as const).map((size, index) => (
                <Button
                  key={size}
                  variant={preferences.textSize === size ? "default" : "outline"}
                  aria-pressed={preferences.textSize === size}
                  onClick={() => setPreferences((current) => ({ ...current, textSize: size }))}
                >
                  {
                    (spanish
                      ? ["Normal", "Grande", "Más grande"]
                      : ["Standard", "Large", "Larger"])[index]
                  }
                </Button>
              ))}
            </div>
          </fieldset>
          <Button
            variant="outline"
            onClick={() => setPreferences({ ...defaultAccessibilityPreferences })}
          >
            <RotateCcw aria-hidden="true" />
            {spanish ? "Restablecer" : "Reset"}
          </Button>
        </DialogContent>
      </Dialog>
    </MotionConfig>
  );
}
