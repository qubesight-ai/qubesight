import { motion } from "framer-motion";
import {
  CalendarCheck,
  Database,
  MessageCircle,
  Mic,
  Network,
  Workflow,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Capabilities = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const groups = [
    {
      icon: Mic,
      title: "Voice AI",
      intro: es
        ? "Atiende conversaciones telefónicas y escala a una persona cuando corresponde."
        : "Handles phone conversations and escalates to a person when appropriate.",
      items: es
        ? [
            "Responder llamadas y preguntas frecuentes",
            "Capturar información y calificar prospectos",
            "Agendar citas y ejecutar seguimientos configurados",
            "Generar cotizaciones cuando existan reglas y datos disponibles",
          ]
        : [
            "Answer calls and frequently asked questions",
            "Capture information and qualify prospects",
            "Book appointments and run configured follow-ups",
            "Generate quotes when rules and data are available",
          ],
    },
    {
      icon: MessageCircle,
      title: es ? "Canales digitales" : "Digital channels",
      intro: es
        ? "Atiende también por canales digitales mediante integraciones compatibles."
        : "Serve customers through digital channels using compatible integrations.",
      items: es
        ? ["WhatsApp", "Chat web", "Instagram", "Messenger y otros canales según integración"]
        : ["WhatsApp", "Web chat", "Instagram", "Messenger and other channels by integration"],
    },
    {
      icon: Workflow,
      title: es ? "Automatización" : "Automation",
      intro: es
        ? "Ejecuta acciones posteriores a una interacción mediante flujos configurables."
        : "Runs actions after an interaction through configurable workflows.",
      items: es
        ? ["Agenda y notificaciones", "Seguimiento", "Flujos de atención", "Procesamiento de información"]
        : ["Scheduling and notifications", "Follow-up", "Service workflows", "Information processing"],
    },
    {
      icon: Network,
      title: es ? "Integraciones" : "Integrations",
      intro: es
        ? "Conecta la atención con herramientas empresariales según disponibilidad e integración."
        : "Connect service with business tools depending on availability and integration.",
      items: es
        ? ["Calendarios y CRM", "Bases de datos", "Sistemas de notificación", "Registro de interacciones"]
        : ["Calendars and CRM", "Databases", "Notification systems", "Interaction records"],
    },
  ];

  return (
    <section id="capabilities" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="eyebrow mb-5 inline-flex">
            <Database className="h-3.5 w-3.5" /> {es ? "CAPACIDADES" : "CAPABILITIES"}
          </span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            {es ? "Una plataforma, " : "One platform, "}
            <span className="gradient-text">{es ? "varias capacidades." : "multiple capabilities."}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            {es
              ? "QubeSight combina voz, canales digitales, automatización e integraciones en una recepción digital configurable."
              : "QubeSight combines voice, digital channels, automation, and integrations in a configurable digital reception platform."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {groups.map((group, index) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 2) * 0.08 }}
              className="glass-card rounded-2xl p-7"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary border border-primary/20 grid place-items-center mb-5">
                <group.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold font-display mb-2">{group.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{group.intro}</p>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                    <CalendarCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;