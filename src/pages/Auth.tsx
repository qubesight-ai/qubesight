import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import LogoCube from "@/components/LogoCube";
import { toast } from "sonner";

export default function Auth({ mode }: { mode: "login" | "register" | "forgot" }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });
        if (error) throw error;
        toast.success("Cuenta creada. Revisa tu correo si se requiere confirmación.");
        navigate("/dashboard");
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/login`,
        });
        if (error) throw error;
        toast.success("Te enviamos las instrucciones de recuperación.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate(params.get("next") || "/dashboard");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo completar la solicitud");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-background">
      <section className="hidden lg:flex relative overflow-hidden border-r border-white/10 p-12 flex-col justify-between">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <Link
          to="/"
          className="relative inline-flex h-10 w-[10.75rem] items-center"
          aria-label="QubeSight"
        >
          <LogoCube />
        </Link>
        <div className="relative max-w-lg">
          <p className="text-primary uppercase tracking-[0.25em] text-xs mb-5">
            Voice automation platform
          </p>
          <h1 className="text-5xl leading-tight mb-6">Tus agentes de voz, bajo control.</h1>
          <p className="text-muted-foreground text-lg">
            Configura el comportamiento, monitorea llamadas y administra tu operación desde un solo
            lugar.
          </p>
        </div>
        <p className="relative text-xs text-muted-foreground">© 2026 QubeSight Digital Boost</p>
      </section>

      <section className="p-6 grid place-items-center">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={16} />
              Volver al sitio
            </Link>
            <Link to="/" className="inline-flex h-9 w-[9.5rem] lg:hidden" aria-label="QubeSight">
              <LogoCube />
            </Link>
          </div>

          <div className="glass-card rounded-2xl p-7 md:p-9">
            <h2 className="text-2xl mb-2">
              {mode === "login"
                ? "Bienvenido de nuevo"
                : mode === "register"
                  ? "Crea tu cuenta"
                  : "Recupera tu acceso"}
            </h2>
            <p className="text-sm text-muted-foreground mb-7">
              {mode === "login"
                ? "Ingresa al panel de tu empresa."
                : mode === "register"
                  ? "Comienza a administrar tus agentes de voz."
                  : "Te enviaremos un enlace seguro por correo."}
            </p>

            <form onSubmit={submit} className="space-y-4">
              {mode === "register" && (
                <label className="block text-sm">
                  Nombre completo
                  <input
                    className="auth-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
              )}
              <label className="block text-sm">
                Correo electrónico
                <input
                  className="auth-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              {mode !== "forgot" && (
                <label className="block text-sm">
                  Contraseña
                  <input
                    className="auth-input"
                    type="password"
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
              )}
              <button
                disabled={busy}
                className="w-full gradient-bg text-primary-foreground rounded-xl py-3 font-medium flex justify-center gap-2"
              >
                {busy && <Loader2 className="animate-spin" size={18} />}
                {mode === "login"
                  ? "Iniciar sesión"
                  : mode === "register"
                    ? "Crear cuenta"
                    : "Enviar enlace"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "login" ? (
                <>
                  <Link className="text-primary" to="/forgot-password">
                    ¿Olvidaste tu contraseña?
                  </Link>
                  <p className="mt-3">
                    ¿No tienes cuenta?{" "}
                    <Link className="text-primary" to="/register">
                      Regístrate
                    </Link>
                  </p>
                </>
              ) : (
                <p>
                  {mode === "register" ? "¿Ya tienes cuenta?" : "¿Recordaste tu contraseña?"}{" "}
                  <Link className="text-primary" to="/login">
                    Inicia sesión
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
