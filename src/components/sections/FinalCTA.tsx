import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Sparkles, MessageSquare, PhoneCall, Layers } from "lucide-react";
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
  const es = language === "es";

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
    messageLines.filter(Boolean).join("\n")
  )}`;

  const saveLead = async () => {
    try {
      await supabase.from("leads").insert({
        name: name.trim() || null,
        company: company.trim() || null,
        contact: contact.trim() || null,
        interest: selectedLabel,
        language,
        source: "final_cta",
      });
    } catch {
      toast.error(es ? "No pudimos guardar tus datos." : "We couldn't save your details.");
    }
  };

  const bullets = [
    t("final.bullet.1"),
    t("final.bullet.2"),
    t("final.bullet.3"),
    t("final.bullet.4"),
  ];


  return (
    <section id="contacto" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 gradient-hero-bg opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] neon-grid-3d animate-grid-drift opacity-30 pointer-events-none" />

      {/* Floating glow orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none animate-pulse-glow"
        style={{ background: "var(--gradient-glow)" }} />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 0.3), transparent 70%)" }} />

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

          <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="h-3.5 w-3.5" />
            {t("final.badge")}
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6 text-balance">
            {t("final.title")}{" "}
            <span className="gradient-text">{t("final.titleAccent")}</span>
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

          <div className="max-w-2xl mx-auto mb-8 text-left">
            <p className="mb-3 text-sm font-semibold text-foreground/90 text-center">
              {language === "es" ? "¿Qué te interesa?" : "What are you interested in?"}
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
                        active ? "border-primary/40 bg-primary/15 text-primary" : "border-white/10 text-muted-foreground"
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
                  onChange={(e) => setName(e.target.value)}
                  placeholder={es ? "Tu nombre" : "Your name"}
                  className="bg-white/[0.03] border-white/10"
                />
              </div>
              <div>
                <label htmlFor="cta-company" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  {es ? "Empresa" : "Company"}
                </label>
                <Input
                  id="cta-company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={es ? "Nombre del negocio" : "Business name"}
                  className="bg-white/[0.03] border-white/10"
                />
              </div>
              <div>
                <label htmlFor="cta-contact" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  {es ? "Correo o teléfono" : "Email or phone"}
                </label>
                <Input
                  id="cta-contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={es ? "correo@empresa.com" : "you@company.com"}
                  className="bg-white/[0.03] border-white/10"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {es
                ? "Estos datos se envían en tu mensaje de WhatsApp para que el asesor responda con contexto."
                : "These details are included in your WhatsApp message so the advisor replies with context."}
            </p>
          </div>


          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="lg" asChild className="min-h-[56px] px-8">
              <a href="#products">
                {t("final.cta.primary")}
                <ArrowRight className="ml-1 h-5 w-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild className="min-h-[56px] px-8">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {t("final.cta")}
              </a>
            </Button>
          </div>

          <p className="mt-6 text-base sm:text-lg font-semibold text-foreground">
            👉 {t("final.subline")}
          </p>
          <p className="mt-4 text-sm sm:text-base gradient-text font-display font-bold italic">
            {t("final.tagline")}
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            {t("final.fineprint")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
