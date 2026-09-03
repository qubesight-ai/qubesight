import { motion } from "framer-motion";
import { ArrowRight, Check, Handshake, Lightbulb, MessageSquare, FlaskConical } from "lucide-react";

const steps = [
  [
    MessageSquare,
    "CONOCEMOS TU NEGOCIO",
    "Conversamos contigo para entender cómo atiendes actualmente a tus clientes.",
  ],
  [
    Lightbulb,
    "PREPARAMOS TU DEMO",
    "Configuramos una demostración basada en procesos reales de tu operación.",
  ],
  [Handshake, "LA PROBAMOS JUNTOS", "Te mostramos la solución y recopilamos tu retroalimentación."],
  [
    FlaskConical,
    "PILOTO REAL",
    "Si existe un buen encaje, podemos invitarte a participar en una prueba bajo las condiciones del programa.",
  ],
] as const;
const EarlyAdopters = () => (
  <section id="early-adopters" className="py-20 sm:py-28 relative overflow-hidden">
    <div className="container relative">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <span className="eyebrow mb-5 inline-flex">PROGRAMA EARLY ADOPTER</span>
        <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-tight">
          Ayúdanos a construir QubeSight{" "}
          <span className="gradient-text">con problemas reales de tu negocio.</span>
        </h2>
        <p className="mt-5 text-lg text-muted-foreground">
          Estamos seleccionando un grupo pequeño de empresas interesadas en probar QubeSight en
          situaciones reales y compartirnos su experiencia.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map(([Icon, title, desc]) => (
          <article key={title} className="glass-card rounded-2xl p-6">
            <Icon className="h-6 w-6 text-primary mb-5" />
            <h3 className="text-sm font-bold tracking-wide mb-3">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </article>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-8 glass-card rounded-3xl p-7 sm:p-10"
      >
        <h3 className="text-xl font-display font-bold mb-5">¿Qué buscamos aprender?</h3>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
          {[
            "qué procesos generan mayor valor",
            "qué tareas vale la pena automatizar",
            "qué necesita una empresa para confiar en un agente de IA",
            "qué funciones son realmente importantes",
            "cómo debería estructurarse el servicio",
            "qué modelo de pago tiene sentido para el mercado",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="h-5 w-5 text-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary"
          >
            Quiero participar como Early Adopter <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">
            Participar en la evaluación inicial no obliga a contratar un plan comercial.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);
export default EarlyAdopters;
