import { motion } from "framer-motion";
import { Clock3, MessageCircle, Repeat2, ClipboardList, UserCheck, CalendarDays, Network, Users, Wrench } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const ValueProposition = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const benefits = [
    [Clock3, "Atención continua y posibilidad de operación 24/7.", "Continuous service with the possibility of 24/7 operation."],
    [MessageCircle, "Respuesta rápida a llamadas y mensajes.", "Fast responses to calls and messages."],
    [Repeat2, "Reducción de tareas repetitivas.", "Fewer repetitive tasks."],
    [ClipboardList, "Captura estructurada de información.", "Structured information capture."],
    [UserCheck, "Calificación de prospectos.", "Lead qualification."],
    [CalendarDays, "Agenda y seguimiento.", "Scheduling and follow-up."],
    [Network, "Integración de diferentes canales.", "Integration across different channels."],
    [Users, "Transferencia a atención humana.", "Handoff to a person."],
    [Wrench, "Implementación gestionada.", "Managed implementation."],
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
              ? "Una recepción digital con AI que atiende, captura, califica, agenda y da seguimiento."
              : "A digital AI receptionist that serves, captures, qualifies, schedules, and follows up."}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            {es
              ? "Elementos de valor."
              : "Elements of value."}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {benefits.map(([Icon, titleEs, titleEn], i) => (
            <motion.article
              key={titleEs}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-7 text-center hover:border-primary/30 transition-colors"
            >
              <div className="h-12 w-12 mx-auto rounded-xl bg-primary/10 text-primary border border-primary/20 grid place-items-center mb-5">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">{es ? titleEs : titleEn}</h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ValueProposition;
