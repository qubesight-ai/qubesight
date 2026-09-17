import { motion } from "framer-motion";
import {
  Clock4,
  Zap,
  ClipboardCheck,
  Filter,
  CalendarCheck,
  Repeat2,
  UserCheck,
  Plug,
  Wrench,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const ValueProposition = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const benefits = [
    [Clock4, es ? "24/7" : "24/7", es ? "Atención continua." : "Continuous availability."],
    [
      Zap,
      es ? "Respuesta rápida" : "Fast response",
      es
        ? "Atención inmediata a llamadas y mensajes."
        : "Immediate attention to calls and messages.",
    ],
    [
      ClipboardCheck,
      es ? "Captura" : "Capture",
      es
        ? "Información estructurada de cada contacto."
        : "Structured information from every contact.",
    ],
    [
      Filter,
      es ? "Calificación" : "Qualification",
      es
        ? "Identificación y clasificación de prospectos."
        : "Identifying and classifying prospects.",
    ],
    [
      CalendarCheck,
      es ? "Agenda" : "Scheduling",
      es ? "Gestión automatizada de citas." : "Automated appointment management.",
    ],
    [
      Repeat2,
      es ? "Seguimiento" : "Follow-up",
      es ? "Acciones posteriores a la interacción." : "Actions after each interaction.",
    ],
    [
      UserCheck,
      es ? "Transferencia humana" : "Human handoff",
      es
        ? "Escalamiento cuando una persona debe intervenir."
        : "Escalation when a person needs to step in.",
    ],
    [
      Plug,
      es ? "Canales e integraciones" : "Channels and integrations",
      es
        ? "Conexión según disponibilidad y configuración."
        : "Connections based on availability and configuration.",
    ],
    [
      Wrench,
      es ? "Implementación acompañada" : "Guided implementation",
      es
        ? "Configuración y puesta en marcha junto a tu equipo."
        : "Configuration and activation alongside your team.",
    ],
  ] as const;
  return (
    <section id="value-proposition" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="eyebrow mb-5 inline-flex">
            {es ? "PROPUESTA DE VALOR" : "VALUE PROPOSITION"}
          </span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            {es
              ? "Una recepción digital con AI que atiende, captura, califica, "
              : "A digital AI reception that answers, captures, qualifies, "}
            <span className="gradient-text">
              {es ? "agenda y da seguimiento." : "schedules, and follows up."}
            </span>
          </h2>
          <h3 className="mt-8 text-xl sm:text-2xl font-semibold font-display">
            {es ? "Elementos de valor." : "Value elements."}
          </h3>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {benefits.map(([Icon, title, desc], i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.08 }}
              className="glass-card rounded-2xl p-7 text-center hover:border-primary/30 transition-colors"
            >
              <div className="h-12 w-12 mx-auto rounded-xl bg-primary/10 text-primary border border-primary/20 grid place-items-center mb-5">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ValueProposition;
