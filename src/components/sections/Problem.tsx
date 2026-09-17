import { motion } from "framer-motion";
import {
  Clock,
  MoonStar,
  Activity,
  TrendingDown,
  PhoneMissed,
  Repeat2,
  MessagesSquare,
  Coins,
  UserRoundX,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Problem = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const stats = [
    {
      icon: PhoneMissed,
      title: es ? "Llamadas no atendidas" : "Unanswered calls",
      desc: es
        ? "Consultas y oportunidades que pueden perderse cuando nadie está disponible para atender."
        : "Inquiries and opportunities that can be lost when nobody is available to respond.",
    },
    {
      icon: MoonStar,
      title: es ? "Atención fuera de horario" : "After-hours service",
      desc: es
        ? "Clientes y prospectos que contactan cuando el negocio está cerrado y no reciben respuesta."
        : "Customers and prospects who reach out when the business is closed and get no reply.",
    },
    {
      icon: Clock,
      title: es ? "Respuestas tardías" : "Slow responses",
      desc: es
        ? "Un prospecto puede perder interés mientras espera una respuesta."
        : "A prospect can lose interest while waiting for an answer.",
    },
    {
      icon: Repeat2,
      title: es ? "Preguntas repetitivas" : "Repetitive questions",
      desc: es
        ? "El personal dedica tiempo a responder una y otra vez las mismas consultas."
        : "Staff spend time answering the same inquiries again and again.",
    },
    {
      icon: MessagesSquare,
      title: es ? "Múltiples canales" : "Multiple channels",
      desc: es
        ? "Teléfono, WhatsApp, web y otros canales requieren atención simultánea."
        : "Phone, WhatsApp, web, and other channels all require simultaneous attention.",
    },
    {
      icon: UserRoundX,
      title: es ? "Leads sin seguimiento" : "Leads without follow-up",
      desc: es
        ? "Los contactos pueden enfriarse cuando el seguimiento depende de tareas manuales."
        : "Contacts can go cold when follow-up depends on manual tasks.",
    },
    {
      icon: Coins,
      title: es ? "Costos crecientes de atención" : "Growing service costs",
      desc: es
        ? "El costo de soluciones de IA internacionales puede crecer rápidamente conforme aumenta el volumen de uso."
        : "The cost of international AI solutions can grow quickly as usage volume increases.",
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
            {es ? "Tus clientes esperan respuesta. " : "Your customers expect an answer. "}
            <span className="gradient-text">
              {es
                ? "Tu negocio no siempre puede estar disponible."
                : "Your business can't always be available."}
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {es
              ? "Las empresas con volumen recurrente de llamadas, mensajes, leads o citas enfrentan dificultades para responder oportunamente, atender fuera de horario, procesar preguntas repetitivas y dar seguimiento a clientes y prospectos."
              : "Businesses with recurring calls, messages, leads, or appointments can struggle to respond promptly, provide after-hours service, process repetitive questions, and follow up with customers and prospects."}
          </p>
          <h3 className="mt-8 text-xl sm:text-2xl font-semibold font-display">
            {es ? "Principales dolores identificados." : "Main pain points identified."}
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
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

        <p className="mt-10 text-center text-xs text-muted-foreground/80 max-w-2xl mx-auto">
          {es
            ? "Estos problemas forman parte de las hipótesis iniciales de QubeSight y se continúan validando directamente con los segmentos objetivo."
            : "These problems are part of QubeSight's initial hypotheses and continue to be validated directly with target segments."}
        </p>
      </div>
    </section>
  );
};

export default Problem;
