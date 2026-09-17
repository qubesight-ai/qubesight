import { motion } from "framer-motion";
import { Check, MessageCircle, Mic, Network, Workflow } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

/** Internal block rendered inside the "Solution" section. Not a nav section. */
const Capabilities = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const groups = [
    {
      icon: Mic,
      title: "Voice Bot",
      items: es
        ? [
            "Responder llamadas.",
            "Conversar con clientes y prospectos.",
            "Contestar preguntas frecuentes.",
            "Capturar información.",
            "Calificar prospectos.",
            "Agendar citas.",
            "Cotizar cuando las reglas del negocio lo permitan.",
            "Realizar seguimiento.",
            "Transferir la conversación a una persona.",
          ]
        : [
            "Answer calls.",
            "Talk with customers and prospects.",
            "Answer frequently asked questions.",
            "Capture information.",
            "Qualify prospects.",
            "Book appointments.",
            "Quote when business rules allow it.",
            "Follow up.",
            "Transfer the conversation to a person.",
          ],
    },
    {
      icon: MessageCircle,
      title: es ? "Chatbot y atención digital" : "Chatbot and digital service",
      items: es
        ? [
            "WhatsApp.",
            "Sitio web.",
            "Instagram.",
            "Messenger.",
            "Otros canales según integración.",
          ]
        : [
            "WhatsApp.",
            "Website.",
            "Instagram.",
            "Messenger.",
            "Other channels depending on integration.",
          ],
    },
    {
      icon: Workflow,
      title: es ? "Automatización de procesos" : "Process automation",
      items: es
        ? [
            "Automatización de agenda.",
            "Notificaciones.",
            "Seguimiento.",
            "Flujos de atención.",
            "Procesamiento de información.",
            "Acciones posteriores a la interacción.",
          ]
        : [
            "Scheduling automation.",
            "Notifications.",
            "Follow-up.",
            "Service workflows.",
            "Information processing.",
            "Post-interaction actions.",
          ],
    },
    {
      icon: Network,
      title: es ? "Integración empresarial" : "Business integration",
      items: es
        ? [
            "Calendario.",
            "CRM.",
            "Bases de datos.",
            "Sistemas de notificación.",
            "Herramientas empresariales.",
            "Registro de interacciones.",
          ]
        : [
            "Calendar.",
            "CRM.",
            "Databases.",
            "Notification systems.",
            "Business tools.",
            "Interaction records.",
          ],
    },
  ];

  return (
    <div className="mt-20">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl font-bold font-display text-center mb-10"
      >
        {es ? "Productos y servicios." : "Products and services."}
      </motion.h3>

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
            <h4 className="text-xl font-semibold font-display mb-5">{group.title}</h4>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Capabilities;
