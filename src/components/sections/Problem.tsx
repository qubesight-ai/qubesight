import { motion } from "framer-motion";
import { PhoneMissed, Timer, MoonStar, Repeat2, UserRoundX, MessagesSquare, Coins, TrendingDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Problem = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const stats = [
    [PhoneMissed, "Llamadas no atendidas", "Missed calls"],
    [Timer, "Respuesta tardía", "Delayed replies"],
    [MoonStar, "Atención fuera de horario", "After-hours service"],
    [Repeat2, "Preguntas repetitivas", "Repeated questions"],
    [UserRoundX, "Leads sin seguimiento", "Leads without follow-up"],
    [MessagesSquare, "Múltiples canales", "Multiple channels"],
    [Coins, "Costo de atención", "Service costs"],
  ] as const;

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
            {es ? "Principales dolores identificados." : "Key challenges identified."}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {es
              ? "Las empresas con volumen recurrente de llamadas, mensajes, leads o citas enfrentan dificultades para responder oportunamente, atender fuera de horario, procesar preguntas repetitivas y dar seguimiento a clientes y prospectos."
              : "Businesses with recurring calls, messages, leads, or appointments struggle to respond promptly, serve customers after hours, handle repeated questions, and follow up with customers and prospects."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map(([Icon, titleEs, titleEn], i) => (
            <motion.div
              key={titleEs}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative glass-card rounded-2xl p-8 hover:border-destructive/30 transition-all hover:-translate-y-1 overflow-hidden group"
            >
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center mb-5">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold font-display mb-2 leading-snug">
                  {es ? titleEs : titleEn}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
