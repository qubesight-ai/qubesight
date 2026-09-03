import { motion } from "framer-motion";
import { Clock, MoonStar, Activity, TrendingDown } from "lucide-react";

const Problem = () => {
  const stats = [
    {
      icon: Clock,
      title: "Consultas repetitivas",
      desc: "Horarios, precios, disponibilidad y preguntas frecuentes consumen tiempo todos los días.",
    },
    {
      icon: MoonStar,
      title: "Clientes fuera de horario",
      desc: "Las personas siguen consultando aunque el equipo esté ocupado o el negocio haya cerrado.",
    },
    {
      icon: Activity,
      title: "Oportunidades que requieren seguimiento",
      desc: "Cuando responder, registrar información y dar seguimiento depende completamente de tareas manuales, algunas oportunidades pueden quedar atrás.",
    },
  ];

  return (
    <section id="problem" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Subtle red wash to underscore the pain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(0 84% 40% / 0.18), transparent 70%)",
        }}
      />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-wider rounded-full bg-destructive/10 text-destructive border border-destructive/20">
            <TrendingDown className="h-3.5 w-3.5" />
            01 — EL PROBLEMA
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            Atender cada consulta se vuelve difícil{" "}
            <span className="gradient-text">cuando el negocio está creciendo.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Las llamadas, mensajes, preguntas frecuentes, solicitudes de información y coordinación
            de citas compiten constantemente por la atención del equipo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative glass-card rounded-2xl p-8 hover:border-destructive/30 transition-all hover:-translate-y-1 overflow-hidden group"
            >
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center mb-5">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold font-display mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
