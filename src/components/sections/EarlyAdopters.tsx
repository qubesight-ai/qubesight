import { motion } from "framer-motion";
import { ArrowRight, Check, Handshake, Lightbulb, MessageSquare } from "lucide-react";

const steps = [
  [
    MessageSquare,
    "CONOCEMOS TU PROCESO",
    "Conversamos brevemente sobre cómo atiendes actualmente a tus clientes.",
  ],
  [Lightbulb, "TE MOSTRAMOS QUBESIGHT", "Preparamos una demostración relevante para tu negocio."],
  [
    Handshake,
    "EVALUAMOS UN PILOTO",
    "Si la solución encaja con tu operación, podemos coordinar una prueba real.",
  ],
] as const;
const EarlyAdopters = () => (
  <section id="early-adopters" className="py-20 sm:py-28 relative overflow-hidden">
    <div className="container relative">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <span className="eyebrow mb-5 inline-flex">PROGRAMA EARLY ADOPTER</span>
        <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-tight">
          Estamos buscando empresas que quieran probar QubeSight{" "}
          <span className="gradient-text">con nosotros.</span>
        </h2>
        <p className="mt-5 text-lg text-muted-foreground">
          Durante esta etapa estamos trabajando con un pequeño grupo de negocios para utilizar
          QubeSight en situaciones reales, conocer su experiencia y mejorar el producto antes de
          ampliar su comercialización.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
            Quiero participar <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">
            Participar en la demostración no obliga a contratar QubeSight.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);
export default EarlyAdopters;
