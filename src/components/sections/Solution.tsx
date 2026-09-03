import { motion } from "framer-motion";
import { Sunrise, Sun, Moon } from "lucide-react";

const Solution = () => {
  const pillars = [
    {
      icon: Sunrise,
      title: "ANTES",
      desc: "Atiende consultas cuando el equipo todavía no está disponible.",
    },
    {
      icon: Sun,
      title: "DURANTE",
      desc: "Resuelve tareas repetitivas mientras las personas atienden casos importantes.",
    },
    {
      icon: Moon,
      title: "DESPUÉS",
      desc: "Continúa atendiendo consultas y recopilando información fuera del horario habitual.",
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
          <span className="eyebrow mb-5 inline-flex">03 — LA SOLUCIÓN</span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            Una recepción con inteligencia artificial{" "}
            <span className="gradient-text">que trabaja junto a tu equipo.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            QubeSight combina atención por voz y canales digitales para ayudar a responder
            consultas, recopilar información, gestionar oportunidades y conectar al cliente con una
            persona cuando sea necesario.
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
