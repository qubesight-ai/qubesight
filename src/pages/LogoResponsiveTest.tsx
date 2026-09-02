import { useState } from "react";
import LogoCube from "@/components/LogoCube";

const COMMON_WIDTHS = [
  { label: "iPhone SE", width: 320 },
  { label: "Mobile S", width: 360 },
  { label: "iPhone 12/13", width: 390 },
  { label: "iPhone Pro Max", width: 414 },
  { label: "Mobile L", width: 480 },
  { label: "Tablet S", width: 640 },
  { label: "iPad", width: 768 },
  { label: "iPad Pro", width: 1024 },
  { label: "Laptop", width: 1280 },
  { label: "Desktop", width: 1440 },
  { label: "Wide", width: 1920 },
];

const NAVBAR_HEIGHT = 80;

const LogoResponsiveTest = () => {
  const [showGuides, setShowGuides] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="font-display text-3xl font-bold">Logo Responsive Test</h1>
          <p className="text-sm text-muted-foreground">
            Visualiza el LogoCube en anchos comunes simulando el navbar (h: {NAVBAR_HEIGHT}px).
            Verifica que el ícono mantiene su <code>aspect-square</code> y el texto colapsa por
            debajo de 640px (sm).
          </p>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showGuides}
              onChange={(e) => setShowGuides(e.target.checked)}
            />
            Mostrar guías de alineación
          </label>
        </header>

        <div className="grid gap-6">
          {COMMON_WIDTHS.map(({ label, width }) => (
            <div key={width} className="space-y-2">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-sm font-semibold">{label}</h2>
                <span className="text-xs text-muted-foreground tabular-nums">{width}px</span>
              </div>

              <div
                className="relative mx-auto border border-border rounded-lg overflow-hidden bg-background"
                style={{ width: `${width}px`, maxWidth: "100%" }}
              >
                {/* Simulated navbar */}
                <div
                  className="relative flex items-center justify-between px-4 border-b border-border"
                  style={{ height: `${NAVBAR_HEIGHT}px` }}
                >
                  {showGuides && (
                    <>
                      <div className="absolute inset-x-0 top-1/2 h-px bg-primary/20 pointer-events-none" />
                      <div className="absolute inset-y-0 left-4 w-px bg-primary/20 pointer-events-none" />
                    </>
                  )}
                  <LogoCube />
                  <div className="text-xs text-muted-foreground/60">nav</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoResponsiveTest;
