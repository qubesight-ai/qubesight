import { motion } from "framer-motion";
import { Check, LifeBuoy, Settings2, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Implementation = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const items = es
    ? [
        "Configuración inicial del agente",
        "Incorporación de información del negocio",
        "Definición de flujos de atención",
        "Integraciones necesarias",
        "Pruebas antes de activar",
        "Monitoreo inicial y soporte",
        "Configuración del escalamiento a personas",
      ]
    : [
        "Initial agent configuration",
        "Business information setup",
        "Service workflow definition",
        "Required integrations",
        "Testing before activation",
        "Initial monitoring and support",
        "Human escalation configuration",
      ];

  return (
    <section id="implementation" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="eyebrow mb-5 inline-flex">
            <LifeBuoy className="h-3.5 w-3.5" /> {es ? "IMPLEMENTACIÓN" : "IMPLEMENTATION"}
          </span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            {es ? "Te acompañamos en la " : "We support you through "}
            <span className="gradient-text">{es ? "puesta en marcha." : "implementation."}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            {es
              ? "Configuramos QubeSight para tu operación y te acompañamos durante la activación, sin que tengas que administrar infraestructura compleja de IA."
              : "We configure QubeSight for your operation and support the activation, without requiring you to manage complex AI infrastructure."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-5 max-w-5xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 glass-card rounded-2xl p-7"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {items.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.article>
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="md:col-span-2 glass-card rounded-2xl p-7"
          >
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary border border-primary/20 grid place-items-center mb-5">
              <Settings2 className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold font-display mb-3">
              {es ? "Una plataforma configurable" : "A configurable platform"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {es
                ? "La implementación adapta una plataforma estándar a la información, los flujos y las integraciones disponibles de tu negocio; no parte de un desarrollo de software desde cero."
                : "Implementation adapts a standard platform to your business information, workflows, and available integrations; it does not start as custom software built from scratch."}
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
              <ShieldCheck className="h-4 w-4" />
              {es ? "Activación acompañada" : "Guided activation"}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default Implementation;
