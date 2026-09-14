import { motion } from "framer-motion";
import {
  Clock,
  MoonStar,
  Activity,
  TrendingDown,
  PhoneMissed,
  Repeat2,
  MessagesSquare,
  ClipboardList,
  ShieldCheck,
  Coins,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Problem = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const stats = [
    {
      icon: PhoneMissed,
      title: es ? "Llamadas y consultas sin responder" : "Unanswered calls and inquiries",
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
      title: es ? "Trabajo repetitivo" : "Repetitive work",
      desc: es
        ? "El personal dedica tiempo a preguntas frecuentes, agendas y tareas que pueden automatizarse."
        : "Staff spend time on common questions, scheduling, and tasks that can be automated.",
    },
    {
      icon: MessagesSquare,
      title: es ? "Múltiples canales" : "Multiple channels",
      desc: es
        ? "Teléfono, WhatsApp, web y otros canales requieren atención simultánea."
        : "Phone, WhatsApp, web, and other channels all require simultaneous attention.",
    },
    {
      icon: ClipboardList,
      title: es ? "Procesos manuales" : "Manual processes",
      desc: es
        ? "Agenda, captura de información y seguimiento todavía dependen muchas veces de intervención humana."
        : "Scheduling, data capture, and follow-up still often depend on human intervention.",
    },
    {
      icon: ShieldCheck,
      title: es ? "Cobertura 24/7" : "24/7 coverage",
      desc: es
        ? "Mantener disponibilidad continua con personal humano puede resultar costoso para una PyME."
        : "Keeping continuous availability with human staff can be costly for an SMB.",
    },
    {
      icon: Coins,
      title: es ? "Escalabilidad de costos" : "Cost scalability",
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
              ? "Las PyMEs que reciben llamadas, mensajes, leads o solicitudes de citas pueden perder oportunidades cuando no consiguen responder oportunamente, atender fuera de horario o dar seguimiento de forma consistente."
              : "SMBs that receive calls, messages, leads, or appointment requests can lose opportunities when they can't reply promptly, cover after-hours, or follow up consistently."}
          </p>
          <p className="mt-4 text-base text-muted-foreground">
            {es
              ? "QubeSight está pensado para negocios de servicios con atención recurrente, como clínicas, consultorios de fisioterapia, inmobiliarias, restaurantes, gimnasios, salones de belleza, estéticas, barberías y otros negocios con volumen frecuente de llamadas o mensajes."
              : "QubeSight is designed for service businesses with recurring customer contact: clinics, physiotherapy practices, real estate agencies, restaurants, gyms, beauty salons, aesthetics studios, barbershops, and other businesses with frequent calls or messages."}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
