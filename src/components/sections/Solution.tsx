import { motion } from "framer-motion";
import { PhoneCall, MessageCircle, Workflow, Plug, LifeBuoy } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Solution = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const pillars = [
    {
      icon: PhoneCall,
      title: es ? "Voice Bot" : "Voice Bot",
      desc: es
        ? "Agentes de voz con IA que atienden llamadas, responden preguntas, capturan información, califican prospectos, agendan citas y transfieren a una persona cuando corresponde."
        : "AI voice agents that answer calls, respond to questions, capture information, qualify prospects, book appointments, and hand off to a person when appropriate.",
    },
    {
      icon: MessageCircle,
      title: es ? "Chat y atención digital" : "Chat and digital service",
      desc: es
        ? "Automatiza conversaciones en WhatsApp, web, Instagram, Messenger y otros canales digitales desde una misma lógica de atención."
        : "Automate conversations on WhatsApp, web, Instagram, Messenger, and other digital channels from a single service logic.",
    },
    {
      icon: Workflow,
      title: es ? "Automatización de procesos" : "Process automation",
      desc: es
        ? "Ejecuta acciones después de cada conversación: agendar, notificar, actualizar información y activar otros procesos."
        : "Runs actions after each conversation: scheduling, notifications, information updates, and other downstream processes.",
    },
    {
      icon: Plug,
      title: es ? "Integraciones empresariales" : "Business integrations",
      desc: es
        ? "Conecta QubeSight con calendarios, CRM, bases de datos y otras herramientas utilizadas por el negocio."
        : "Connects QubeSight with calendars, CRM, databases, and other tools the business already uses.",
    },
    {
      icon: LifeBuoy,
      title: es ? "Implementación y soporte" : "Implementation and support",
      desc: es
        ? "QubeSight se implementa y configura para el negocio sin que el cliente tenga que administrar directamente una infraestructura compleja de IA."
        : "QubeSight is implemented and configured for the business, so the client doesn't have to manage complex AI infrastructure.",
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
            {es ? "Una capa de atención " : "An automated service layer "}
            <span className="gradient-text">
              {es ? "automatizada para tu negocio." : "for your business."}
            </span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            {es
              ? "QubeSight combina agentes de voz, chatbots e integraciones empresariales para automatizar gran parte de la atención inicial al cliente, manteniendo la posibilidad de intervención humana cuando sea necesaria."
              : "QubeSight combines voice agents, chatbots, and business integrations to automate much of the initial customer service, while keeping human intervention available when needed."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {pillars.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
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

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-xl sm:text-2xl font-display font-semibold text-balance max-w-3xl mx-auto"
        >
          {es ? "La IA atiende lo repetitivo. " : "AI handles the repetitive work. "}
          <span className="gradient-text">
            {es
              ? "Tu equipo entra cuando realmente hace falta."
              : "Your team steps in when it really matters."}
          </span>
        </motion.p>
      </div>
    </section>
  );
};

export default Solution;
