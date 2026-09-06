import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Layers, MessageSquare, PhoneCall, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

type Interest = "chat" | "voice" | "suite";
type Purpose = "demo" | "earlyAdopter";

const FinalCTA = () => {
  const { language } = useTranslation();
  const [interest, setInterest] = useState<Interest>("chat");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const es = language === "es";
  const interestOptions = [
    {
      key: "chat",
      icon: MessageSquare,
      label: es ? "Tardo en responder mensajes" : "I'm slow to respond to messages",
    },
    {
      key: "voice",
      icon: PhoneCall,
      label: es ? "Pierdo o no puedo atender llamadas" : "I miss or can't answer calls",
    },
    {
      key: "suite",
      icon: Layers,
      label: es ? "Necesito mejorar ambos canales" : "I need to improve both channels",
    },
  ] as const;
  const selectedLabel = interestOptions.find((option) => option.key === interest)!.label;
  const whatsappUrl = (purpose: Purpose) => {
    const lines = es
      ? [
          purpose === "demo"
            ? "Hola, quiero solicitar una demostración de QubeSight."
            : "Hola, me interesa participar como Early Adopter de QubeSight.",
          `Me interesa: ${selectedLabel}.`,
          name.trim() && `Nombre: ${name.trim()}`,
          company.trim() && `Empresa: ${company.trim()}`,
          contact.trim() && `Correo / teléfono: ${contact.trim()}`,
        ]
      : [
          purpose === "demo"
            ? "Hi, I want to request a QubeSight demo."
            : "Hi, I'm interested in joining as a QubeSight Early Adopter.",
          `I'm interested in: ${selectedLabel}.`,
          name.trim() && `Name: ${name.trim()}`,
          company.trim() && `Company: ${company.trim()}`,
          contact.trim() && `Email / phone: ${contact.trim()}`,
        ];
    return `https://wa.me/50646009140?text=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`;
  };
  const bullets = es
    ? [
        "Demostración adaptada a tu negocio",
        "Sin obligación de contratar",
        "Acompañamiento directo del equipo QubeSight",
        "Posibilidad de un piloto real si existe buen encaje",
      ]
    : [
        "Demo adapted to your business",
        "No obligation to purchase",
        "Direct support from the QubeSight team",
        "Possibility of a real pilot when there is a good fit",
      ];

  return (
    <section id="contacto" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 gradient-hero-bg opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] neon-grid-3d animate-grid-drift opacity-30 pointer-events-none" />
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="h-3.5 w-3.5" />
            {es ? "PROGRAMA EARLY ADOPTER" : "EARLY ADOPTER PROGRAM"}
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6 text-balance">
            {es
              ? "Cuéntanos qué parte de tu atención quieres mejorar."
              : "Tell us which part of your customer service you want to improve."}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {es
              ? "Queremos conocer tu operación, preparar una demostración relevante y evaluar contigo si QubeSight encaja."
              : "We want to understand your operation, prepare a relevant demonstration, and evaluate with you whether QubeSight is a good fit."}
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-10 text-left">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-sm sm:text-base">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground/90">{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="max-w-2xl mx-auto mb-8 text-left">
            <p className="mb-3 text-sm font-semibold text-foreground/90 text-center">
              {es ? "¿Qué problema quieres resolver?" : "What would you like to improve?"}
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {interestOptions.map((option) => {
                const active = interest === option.key;
                const Icon = option.icon;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setInterest(option.key)}
                    aria-pressed={active}
                    className={`flex items-center gap-3 rounded-2xl border p-4 text-sm transition-all duration-300 ${active ? "border-primary/50 bg-primary/10 text-foreground shadow-glow" : "border-white/10 bg-white/[0.05] text-muted-foreground hover:border-primary/30"}`}
                  >
                    <span
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border ${active ? "border-primary/40 bg-primary/15 text-primary" : "border-white/10 text-muted-foreground"}`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-medium leading-snug">{option.label}</span>
                    {active && <Check className="ml-auto h-4 w-4 text-primary" />}
                  </button>
                );
              })}
            </div>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {[
                ["name", es ? "Nombre" : "Name", es ? "Tu nombre" : "Your name", name, setName],
                [
                  "company",
                  es ? "Empresa" : "Company",
                  es ? "Nombre del negocio" : "Business name",
                  company,
                  setCompany,
                ],
                [
                  "contact",
                  es ? "Correo o teléfono" : "Email or phone",
                  es ? "correo@empresa.com" : "you@company.com",
                  contact,
                  setContact,
                ],
              ].map(([field, label, placeholder, value, setter]) => (
                <div key={field as string}>
                  <label
                    htmlFor={`cta-${field}`}
                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                  >
                    {label as string}
                  </label>
                  <Input
                    id={`cta-${field}`}
                    value={value as string}
                    onChange={(event) => (setter as (value: string) => void)(event.target.value)}
                    placeholder={placeholder as string}
                    className="bg-white/[0.05] border-white/10"
                  />
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {es
                ? "Estos datos se envían en tu mensaje de WhatsApp para que el asesor responda con contexto."
                : "These details are included in your WhatsApp message so the advisor replies with context."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="lg" asChild className="min-h-[56px] px-8">
              <a href={whatsappUrl("demo")} target="_blank" rel="noopener noreferrer">
                {es ? "Solicitar una demostración" : "Request a demo"}
                <ArrowRight className="ml-1 h-5 w-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild className="min-h-[56px] px-8">
              <a href={whatsappUrl("earlyAdopter")} target="_blank" rel="noopener noreferrer">
                {es ? "Quiero participar como Early Adopter" : "I want to join as an Early Adopter"}
              </a>
            </Button>
          </div>
          <p className="mt-6 text-base sm:text-lg font-semibold text-foreground">
            👉{" "}
            {es
              ? "Queremos descubrir contigo dónde QubeSight puede aportar valor real."
              : "We want to discover with you where QubeSight can create real value."}
          </p>
          <p className="mt-4 text-sm sm:text-base gradient-text font-display font-bold italic">
            {es
              ? "Construyendo QubeSight con negocios reales."
              : "Building QubeSight with real businesses."}
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            {es
              ? "La demostración inicial no tiene costo y no obliga a contratar QubeSight."
              : "The initial demonstration is free and does not require you to purchase QubeSight."}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
