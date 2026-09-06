import { motion } from "framer-motion";
import { Sunrise, Sun, Moon } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Solution = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const pillars = [
    {
      icon: Sunrise,
      title: es ? "ATIENDE" : "SERVES",
      desc: es
        ? "Responde llamadas y consultas digitales."
        : "Answers calls and digital inquiries.",
    },
    {
      icon: Sun,
      title: es ? "ENTIENDE" : "UNDERSTANDS",
      desc: es
        ? "Identifica qué necesita el cliente y recopila la información necesaria."
        : "Identifies what the customer needs and gathers the necessary information.",
    },
    {
      icon: Moon,
      title: es ? "ACTÚA" : "ACTS",
      desc: es
        ? "Puede ayudar con citas, seguimiento, información del negocio o transferencia a una persona."
        : "Can help with appointments, follow-up, business information, or a handoff to a person.",
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
            {es ? "Una recepción con inteligencia artificial " : "An AI reception service "}
            <span className="gradient-text">
              {es ? "que trabaja junto a tu equipo." : "that works alongside your team."}
            </span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            {es
              ? "QubeSight combina atención por voz y canales digitales para ayudar a responder consultas, recopilar información, gestionar oportunidades y conectar al cliente con una persona cuando sea necesario."
              : "QubeSight combines voice service and digital channels to help answer inquiries, gather information, manage opportunities, and connect customers with a person when needed."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {pillars.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-7 text-center hover:border-primary/30 transition-colors"
            >
              <div className="h-12 w-12 mx-auto rounded-xl bg-primary/10 text-primary border border-primary/20 grid place-items-center mb-5">
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;
