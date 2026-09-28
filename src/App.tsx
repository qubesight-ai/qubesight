import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { TranslationProvider } from "@/hooks/useTranslation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import DemoTemplateShell from "./components/layout/DemoTemplateShell";

const queryClient = new QueryClient();
const Index = lazy(() => import("./pages/Index"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudy"));
const Restaurantes = lazy(() => import("./pages/demos/Restaurantes"));
const Salones = lazy(() => import("./pages/demos/Salones"));
const Dental = lazy(() => import("./pages/demos/Dental"));
const Gimnasios = lazy(() => import("./pages/demos/Gimnasios"));
const Inmobiliarias = lazy(() => import("./pages/demos/Inmobiliarias"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentFailure = lazy(() => import("./pages/PaymentFailure"));
const LogoResponsiveTest = lazy(() => import("./pages/LogoResponsiveTest"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const PageFallback = () => (
  <div className="min-h-screen grid place-items-center text-sm text-slate-500">
    Cargando QubeSight…
  </div>
);

type WaterRipple = {
  id: number;
  x: number;
  y: number;
};

const WaterRippleOverlay = () => {
  const [ripples, setRipples] = useState<WaterRipple[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0 && event.pointerType === "mouse") return;

      const id = nextId.current++;
      const ripple = { id, x: event.clientX, y: event.clientY };

      setRipples((current) => [...current.slice(-4), ripple]);

      window.setTimeout(() => {
        setRipples((current) => current.filter((item) => item.id !== id));
      }, 1900);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div className="touchwiz-water-layer" aria-hidden="true">
      <svg className="touchwiz-water-defs" width="0" height="0">
        <defs>
          <filter id="touchwiz-ripple-wobble" x="-40%" y="-40%" width="180%" height="180%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.018"
              numOctaves="2"
              seed="9"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="9"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation="0.35" />
          </filter>
        </defs>
      </svg>

      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="touchwiz-water-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        >
          <span className="touchwiz-water-lens" />
          <span className="touchwiz-water-dimple" />

          <svg className="touchwiz-water-rings" viewBox="0 0 420 420">
            <g filter="url(#touchwiz-ripple-wobble)">
              <circle className="touchwiz-water-ring ring-one" cx="210" cy="210" r="42" />
              <circle className="touchwiz-water-ring ring-two" cx="210" cy="210" r="74" />
              <circle className="touchwiz-water-ring ring-three" cx="210" cy="210" r="108" />
              <circle className="touchwiz-water-ring ring-four" cx="210" cy="210" r="146" />
            </g>
          </svg>

          <span className="touchwiz-water-caustic caustic-one" />
          <span className="touchwiz-water-caustic caustic-two" />
        </div>
      ))}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TranslationProvider>
        <TooltipProvider>
          <WaterRippleOverlay />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/case-study/:slug" element={<CaseStudyPage />} />
                <Route
                  path="/restaurantes"
                  element={
                    <DemoTemplateShell>
                      <Restaurantes />
                    </DemoTemplateShell>
                  }
                />
                <Route
                  path="/salones"
                  element={
                    <DemoTemplateShell>
                      <Salones />
                    </DemoTemplateShell>
                  }
                />
                <Route
                  path="/dental"
                  element={
                    <DemoTemplateShell>
                      <Dental />
                    </DemoTemplateShell>
                  }
                />
                <Route
                  path="/gimnasios"
                  element={
                    <DemoTemplateShell>
                      <Gimnasios />
                    </DemoTemplateShell>
                  }
                />
                <Route
                  path="/inmobiliarias"
                  element={
                    <DemoTemplateShell>
                      <Inmobiliarias />
                    </DemoTemplateShell>
                  }
                />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/failure" element={<PaymentFailure />} />
                <Route path="/dev/logo-test" element={<LogoResponsiveTest />} />
                <Route path="/login" element={<Auth mode="login" />} />
                <Route path="/register" element={<Auth mode="register" />} />
                <Route path="/forgot-password" element={<Auth mode="forgot" />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard/*" element={<Dashboard />} />
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </TranslationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
