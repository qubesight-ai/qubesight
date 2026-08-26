import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "@/hooks/useTranslation";
import Index from "./pages/Index";
import CaseStudyPage from "./pages/CaseStudy";
import Restaurantes from "./pages/demos/Restaurantes";
import Salones from "./pages/demos/Salones";
import Dental from "./pages/demos/Dental";
import Gimnasios from "./pages/demos/Gimnasios";
import Inmobiliarias from "./pages/demos/Inmobiliarias";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import LogoResponsiveTest from "./pages/LogoResponsiveTest";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import DemoTemplateShell from "./components/layout/DemoTemplateShell";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TranslationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/case-study/:slug" element={<CaseStudyPage />} />
            <Route path="/restaurantes" element={<DemoTemplateShell><Restaurantes /></DemoTemplateShell>} />
            <Route path="/salones" element={<DemoTemplateShell><Salones /></DemoTemplateShell>} />
            <Route path="/dental" element={<DemoTemplateShell><Dental /></DemoTemplateShell>} />
            <Route path="/gimnasios" element={<DemoTemplateShell><Gimnasios /></DemoTemplateShell>} />
            <Route path="/inmobiliarias" element={<DemoTemplateShell><Inmobiliarias /></DemoTemplateShell>} />
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
        </BrowserRouter>
      </TooltipProvider>
    </TranslationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
