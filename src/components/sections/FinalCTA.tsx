import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Sparkles,
  MessageSquare,
  PhoneCall,
  Layers,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Interest = "chat" | "voice" | "suite";

const FinalCTA = () => {
  const { t, language } = useTranslation();
  const [interest, setInterest] = useState<Interest>("chat");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const es = language === "es";

  const schema = z.object({
    name: z
      .string()
      .trim()
      .min(2, es ? "Escribe tu nombre" : "Enter your name")
      .max(100, es ? "Máximo 100 caracteres" : "Max 100 characters"),
    company: z.string().trim().max(120, es ? "Máximo 120 caracteres" : "Max 120 characters"),
    contact: z
      .string()
      .trim()
      .min(6, es ? "Escribe un correo o teléfono" : "Enter an email or phone")
      .max(160, es ? "Máximo 160 caracteres" : "Max 160 characters")
      .refine(
        (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || /^[+()\d][\d\s().-]{6,}$/.test(v),
        es ? "Correo o teléfono no válido" : "Invalid email or phone",
      ),
  });

  const interestOptions: { key: Interest; icon: typeof MessageSquare; label: string }[] = [
    {
      key: "chat",
      icon: MessageSquare,
      label: es ? "Chatbots IA (WhatsApp y web)" : "AI Chatbots (WhatsApp & web)",
    },
    {
      key: "voice",
      icon: PhoneCall,
      label: es ? "Voice Bots IA (recepción telefónica)" : "AI Voice Bots (phone reception)",
    },
    {
      key: "suite",
      icon: Layers,
      label: es ? "AI Suite (chat + voz juntos)" : "AI Suite (chat + voice together)",
    },
  ];

  const selectedLabel = interestOptions.find((o) => o.key === interest)!.label;

  const messageLines = es
    ? [
        "Hola, quiero hablar con un experto de QubeSight.",
        `Me interesa: ${selectedLabel}.`,
        name.trim() && `Nombre: ${name.trim()}`,
        company.trim() && `Empresa: ${company.trim()}`,
        contact.trim() && `Correo / teléfono: ${contact.trim()}`,
      ]
    : [
        "Hi, I want to talk to a QubeSight expert.",
        `I'm interested in: ${selectedLabel}.`,
        name.trim() && `Name: ${name.trim()}`,
        company.trim() && `Company: ${company.trim()}`,
        contact.trim() && `Email / phone: ${contact.trim()}`,
      ];

  const whatsappUrl = `https://wa.me/50646009140?text=${encodeURIComponent(
    messageLines.filter(Boolean).join("\n"),
  )}`;

  const submit = async () => {
    if (sending) return;
    const parsed = schema.safeParse({ name, company, contact });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    // Evita reenvíos duplicados desde el mismo navegador.
    const fingerprint = `qs-lead:${parsed.data.contact.toLowerCase()}:${interest}`;
    const last = Number(localStorage.getItem(fingerprint) ?? 0);
    if (Date.now() - last < 10 * 60 * 1000) {
      setSent(true);
      return;
    }

    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-lead", {
        body: {
          name: parsed.data.name,
          company: parsed.data.company,
          contact: parsed.data.contact,
          interest: selectedLabel,
          language,
          website,
        },
      });
      if (error) throw error;
      if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
      localStorage.setItem(fingerprint, String(Date.now()));
      setSent(true);
    } catch {
      toast.error(
        es
          ? "No pudimos enviar tus datos. Escríbenos por WhatsApp."
          : "We couldn't send your details. Message us on WhatsApp.",
      );
    } finally {
      setSending(false);
    }
  };

  const bullets = [t("final.bullet.1"), t("final.bullet.2"), t("final.bullet.3"), t("final.bullet.4")];

  return (
    <section id="contacto" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 gradient-hero-bg opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] neon-grid-3d animate-grid-drift opacity-30 pointer-events-none" />

      {/* Floating glow orbs */}
      <div
        className="absolute top-1/4 left-10 w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none animate-pulse-glow"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div
        className="absolute bottom-1/4 right-10 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 0.3), transparent 70%)" }}
      />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center glass-card depth-card rounded-3xl p-10 sm:p-16 shadow-glow border-primary/20 relative overflow-hidden perspective-2000"
        >
          {/* Top glow accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

          {sent ? (
            <div className="py-4">
              <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
                {es ? "¡Solicitud recibida!" : "Request received!"}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {es
                  ? "Un asesor de QubeSight ya recibió tus datos y te contactará muy pronto."
                  : "A QubeSight advisor already received your details and will contact you shortly."}
              </p>

              <div className="mx-auto mb-8 max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
                <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
                  {es ? "Resumen de tu solicitud" : "Your request summary"}
                </p>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{es ? "Interés" : "Interest"}</dt>
                    <dd className="text-right font-medium text-foreground">{selectedLabel}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{es ? "Nombre" : "Name"}</dt>
                    <dd className="text-right font-medium text-foreground">{name.trim()}</dd>
                  </div>
                  {company.trim() && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">{es ? "Empresa" : "Company"}</dt>
                      <dd className="text-right font-medium text-foreground">{company.trim()}</dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{es ? "Contacto" : "Contact"}</dt>
                    <dd className="text-right font-medium text-foreground">{contact.trim()}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="hero" size="lg" asChild className="min-h-[56px] px-8">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    {es ? "Continuar por WhatsApp" : "Continue on WhatsApp"}
                    <ArrowRight className="ml-1 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="heroOutline"
                  size="lg"
                  className="min-h-[56px] px-8"
                  onClick={() => setSent(false)}
                >
                  {es ? "Enviar otra solicitud" : "Send another request"}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="h-3.5 w-3.5" />
                {t("final.badge")}
              </span>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6 text-balance">
                {t("final.title")} <span className="gradient-text">{t("final.titleAccent")}</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t("final.description")}
              </p>

              <ul className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-10 text-left">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{b}</span>
                  </li>
                ))}
              </ul>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void submit();
                }}
                className="max-w-2xl mx-auto mb-8 text-left"
              >
                <p className="mb-3 text-sm font-semibold text-foreground/90 text-center">
                  {es ? "¿Qué te interesa?" : "What are you interested in?"}
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {interestOptions.map((opt) => {
                    const active = interest === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setInterest(opt.key)}
                        aria-pressed={active}
                        className={`flex items-center gap-3 rounded-2xl border p-4 text-sm transition-all duration-300 ${
                          active
                            ? "border-primary/50 bg-primary/10 text-foreground shadow-glow"
                            : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border ${
                            active
                              ? "border-primary/40 bg-primary/15 text-primary"
                              : "border-white/10 text-muted-foreground"
                          }`}
                        >
                          <opt.icon className="h-4 w-4" />
                        </span>
                        <span className="font-medium leading-snug">{opt.label}</span>
                        {active && <Check className="ml-auto h-4 w-4 text-primary" />}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 grid sm:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="cta-name" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      {es ? "Nombre" : "Name"}
                    </label>
                    <Input
                      id="cta-name"
                      value={name}
                      maxLength={100}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={es ? "Tu nombre" : "Your name"}
                      aria-invalid={!!errors.name}
                      className="bg-white/[0.03] border-white/10"
                    />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="cta-company" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      {es ? "Empresa" : "Company"}
                    </label>
                    <Input
                      id="cta-company"
                      value={company}
                      maxLength={120}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={es ? "Nombre del negocio" : "Business name"}
                      className="bg-white/[0.03] border-white/10"
                    />
                    {errors.company && <p className="mt-1 text-xs text-destructive">{errors.company}</p>}
                  </div>
                  <div>
                    <label htmlFor="cta-contact" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      {es ? "Correo o teléfono" : "Email or phone"}
                    </label>
                    <Input
                      id="cta-contact"
                      value={contact}
                      maxLength={160}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder={es ? "correo@empresa.com" : "you@company.com"}
                      aria-invalid={!!errors.contact}
                      className="bg-white/[0.03] border-white/10"
                    />
                    {errors.contact && <p className="mt-1 text-xs text-destructive">{errors.contact}</p>}
                  </div>
                </div>

                {/* Honeypot anti-spam: invisible para personas */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {es
                    ? "Guardamos tus datos para que un asesor te contacte y te avise por WhatsApp con contexto."
                    : "We store your details so an advisor can reach out with full context."}
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button type="submit" variant="hero" size="lg" disabled={sending} className="min-h-[56px] px-8">
                    {sending && <Loader2 className="mr-1 h-5 w-5 animate-spin" />}
                    {es ? "Solicitar propuesta" : "Request proposal"}
                    {!sending && <ArrowRight className="ml-1 h-5 w-5" />}
                  </Button>
                  <Button type="button" variant="heroOutline" size="lg" asChild className="min-h-[56px] px-8">
                    <a href="#products">{t("final.cta.primary")}</a>
                  </Button>
                </div>
              </form>

              <p className="mt-6 text-base sm:text-lg font-semibold text-foreground">
                👉 {t("final.subline")}
              </p>
              <p className="mt-4 text-sm sm:text-base gradient-text font-display font-bold italic">
                {t("final.tagline")}
              </p>
              <p className="mt-6 text-xs text-muted-foreground">{t("final.fineprint")}</p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
