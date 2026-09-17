import { motion } from "framer-motion";
import {
  Clock,
  MessageCircleQuestion,
  MoonStar,
  PhoneMissed,
  Repeat2,
  Share2,
  UserRoundCheck,
  Workflow,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Solution = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const responses = [
    {
      icon: PhoneMissed,
      problem: es ? "Llamadas sin responder" : "Unanswered calls",
      response: es ? "Voice Bot atiende automáticamente." : "Voice Bot answers automatically.",
    },
    {
      icon: Clock,
      problem: es ? "Respuesta tardía" : "Slow response",
      response: es ? "Atención automatizada inmediata." : "Immediate automated service.",
    },
    {
      icon: MoonStar,
      problem: es ? "Contactos fuera de horario" : "After-hours contacts",
      response: es ? "Disponibilidad continua." : "Continuous availability.",
    },
    {
      icon: MessageCircleQuestion,
      problem: es ? "Preguntas repetitivas" : "Repetitive questions",
      response: es ? "Automatización de respuestas." : "Automated responses.",
    },
    {
      icon: Repeat2,
      problem: es ? "Leads sin seguimiento" : "Leads without follow-up",
      response: es ? "Flujos automatizados de seguimiento." : "Automated follow-up workflows.",
    },
    {
      icon: Share2,
      problem: es ? "Múltiples canales" : "Multiple channels",
      response: es ? "Voz, chat e integraciones." : "Voice, chat, and integrations.",
    },
    {
      icon: Workflow,
      problem: es ? "Procesos manuales" : "Manual processes",
      response: es ? "Automatización de agenda y flujos." : "Automated scheduling and workflows.",
    },
    {
      icon: UserRoundCheck,
      problem: es ? "Sobrecarga del personal" : "Staff overload",
      response: es
        ? "Escalamiento a una persona cuando corresponde."
        : "Escalation to a person when appropriate.",
    },
  ];

  return (
    <section id="solution" className="py-20 sm:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, hsl(249 70% 45% / 0.18), transparent 70%)",
        }}
      />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="eyebrow mb-5 inline-flex">{es ? "LA SOLUCIÓN" : "THE SOLUTION"}</span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            {es ? "Una capa de atención " : "An automated service layer "}
            <span className="gradient-text">
              {es ? "automatizada para tu negocio." : "for your business."}
            </span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            {es
              ? "Nuestra solución se orienta a resolver los dolores de nuestros clientes."
              : "Our solution is designed to resolve our customers' pain points."}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {responses.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="glass-card rounded-2xl p-7 hover:border-primary/30 transition-colors"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary border border-primary/20 grid place-items-center mb-5">
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-semibold font-display mb-2">{item.problem}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.response}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-xl sm:text-2xl font-display font-semibold text-balance max-w-3xl mx-auto"
        >
          {es ? "La IA atiende lo repetitivo. " : "AI handles the repetitive work. "}
          <span className="gradient-text">
            {es
              ? "Tu equipo entra cuando realmente hace falta."
              : "Your team steps in when it really matters."}
          </span>
        </motion.p>
      </div>
    </section>
  );
};

export default Solution;
