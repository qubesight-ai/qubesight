import { motion } from "framer-motion";
import { Clock, MoonStar, Activity, TrendingDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Problem = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const stats = [
    {
      icon: Clock,
      title: es ? "Consultas mientras el equipo está ocupado" : "Inquiries while the team is busy",
      desc: es
        ? "Las consultas pueden llegar mientras las personas atienden otras tareas importantes."
        : "Inquiries can arrive while people are handling other important tasks.",
    },
    {
      icon: MoonStar,
      title: es ? "Preguntas repetitivas" : "Repeated questions",
      desc: es
        ? "Las mismas dudas consumen tiempo que el equipo necesita para casos más importantes."
        : "The same questions take time the team needs for more important cases.",
    },
    {
      icon: Activity,
      title: es ? "Oportunidades fuera de horario" : "After-hours opportunities",
      desc: es
        ? "Llamadas y mensajes pueden acumularse cuando el negocio ya no está atendiendo."
        : "Calls and messages can build up when the business is no longer open.",
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
            {es ? "EL PROBLEMA" : "THE PROBLEM"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            {es
              ? "Atender cada consulta se vuelve difícil "
              : "Handling every inquiry becomes difficult "}
            <span className="gradient-text">
              {es ? "cuando el negocio está creciendo." : "as the business grows."}
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {es
              ? "Llamadas, mensajes, preguntas repetitivas y consultas fuera de horario pueden acumularse mientras el equipo está ocupado atendiendo otras tareas."
              : "Calls, messages, repeated questions, and after-hours inquiries can build up while the team is busy with other work."}
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
