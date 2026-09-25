import { motion } from "framer-motion";
import { ArrowRight, Check, Handshake, Lightbulb, MessageSquare } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const EarlyAdopters = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const steps = [
    [
      MessageSquare,
      es ? "CONOCEMOS TU PROCESO" : "WE LEARN ABOUT YOUR PROCESS",
      es
        ? "Conversamos brevemente sobre cómo atiendes actualmente a tus clientes."
        : "We briefly discuss how you currently serve your customers.",
    ],
    [
      Lightbulb,
      es ? "TE MOSTRAMOS QUBESIGHT" : "WE SHOW YOU QUBESIGHT",
      es
        ? "Preparamos una demostración relevante para tu negocio."
        : "We prepare a relevant demonstration for your business.",
    ],
    [
      Handshake,
      es ? "EVALUAMOS UN PILOTO" : "WE EVALUATE A PILOT",
      es
        ? "Si la solución encaja con tu operación, podemos coordinar una prueba real."
        : "If the solution fits your operation, we can coordinate a real pilot.",
    ],
  ] as const;
  const learnings = es
    ? [
        "qué procesos generan mayor valor",
        "qué tareas vale la pena automatizar",
        "qué necesita una empresa para confiar en un agente de IA",
        "qué funciones son realmente importantes",
      ]
    : [
        "which processes create the most value",
        "which tasks are worth automating",
        "what a business needs to trust an AI agent",
        "which features are truly important",
      ];

  return (
    <section id="early-adopters" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="eyebrow mb-5 inline-flex">
            {es ? "PROGRAMA EARLY ADOPTER" : "EARLY ADOPTER PROGRAM"}
          </span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-tight">
            {es
              ? "Estamos buscando empresas que quieran probar QubeSight"
              : "We're looking for businesses that want to try QubeSight"}{" "}
            <span className="gradient-text">{es ? "con nosotros." : "with us."}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {es
              ? "Durante esta etapa estamos trabajando con un pequeño grupo de negocios para utilizar QubeSight en situaciones reales, conocer su experiencia y mejorar el producto antes de ampliar su comercialización."
              : "At this stage, we're working with a small group of businesses to use QubeSight in real situations, learn from their experience, and improve the product before expanding its availability."}
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
          <h3 className="text-xl font-display font-bold mb-5">
            {es ? "¿Qué buscamos aprender?" : "What do we want to learn?"}
          </h3>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
            {learnings.map((item) => (
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
              {es ? "Quiero participar" : "I want to participate"}{" "}
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-xs text-muted-foreground">
              {es
                ? "Participar en la demostración no obliga a contratar QubeSight."
                : "Participating in the demonstration does not require you to purchase QubeSight."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EarlyAdopters;
