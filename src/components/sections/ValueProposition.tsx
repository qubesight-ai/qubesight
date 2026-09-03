import { motion } from "framer-motion";
import { MessageCircle, Repeat2, Users } from "lucide-react";

const ValueProposition = () => {
  const benefits = [
    [
      MessageCircle,
      "Más oportunidades atendidas",
      "QubeSight puede ayudar a responder consultas cuando el equipo está ocupado o fuera de horario.",
    ],
    [
      Repeat2,
      "Menos trabajo repetitivo",
      "Preguntas frecuentes, recopilación inicial de datos y otras tareas rutinarias pueden ser atendidas automáticamente.",
    ],
    [
      Users,
      "Personas donde aportan más valor",
      "Cuando una situación requiere negociación, criterio o atención especial, el proceso puede pasar a una persona.",
    ],
  ] as const;
  return (
    <section id="value" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="eyebrow mb-5 inline-flex">02 — PROPUESTA DE VALOR</span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            Más capacidad de atención{" "}
            <span className="gradient-text">sin llenar de tareas repetitivas a tu equipo.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Queremos que las empresas puedan responder más oportunidades y mantener una atención
            constante mientras las personas se concentran en las conversaciones y decisiones que
            realmente requieren criterio humano.
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
