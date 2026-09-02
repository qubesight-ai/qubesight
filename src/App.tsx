import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
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
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TranslationProvider>
        <TooltipProvider>
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
                  <Route path="/dashboard" element={<Dashboard />} />
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
