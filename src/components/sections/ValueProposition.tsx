import { motion } from "framer-motion";
import { MessageCircle, Repeat2, Users } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const ValueProposition = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const benefits = [
    [
      MessageCircle,
      es ? "Más oportunidades atendidas" : "More opportunities handled",
      es
        ? "Ayuda a mantener la atención disponible cuando el equipo está ocupado o fuera de horario."
        : "Helps keep service available while the team is busy or after hours.",
    ],
    [
      Repeat2,
      es ? "Menos tareas repetitivas" : "Fewer repetitive tasks",
      es
        ? "Consultas frecuentes y recopilación inicial de información pueden ser atendidas automáticamente."
        : "Common questions and initial information gathering can be handled automatically.",
    ],
    [
      Users,
      es ? "Personas donde aportan más valor" : "People where they add most value",
      es
        ? "Los casos que requieren criterio, negociación o atención especial pueden pasar a una persona."
        : "Cases requiring judgment, negotiation, or special attention can go to a person.",
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
              ? "Más capacidad de atención sin aumentar la carga repetitiva de tu equipo."
              : "More capacity to serve customers without increasing your team's repetitive workload."}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            {es
              ? "QubeSight busca ayudar a que los negocios puedan responder más oportunidades y mantener una atención constante mientras las personas se concentran en las conversaciones y decisiones que realmente requieren criterio humano."
              : "QubeSight aims to help businesses respond to more opportunities and maintain consistent service while people focus on conversations and decisions that need human judgment."}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {benefits.map(([Icon, title, desc], i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
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
