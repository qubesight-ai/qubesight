import {
  PhoneCall,
  MessageCircle,
  Workflow,
  Network,
  ChartNoAxesCombined,
  Wrench,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const ProductServices = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const services = [
    {
      icon: PhoneCall,
      title: "A. Voice Bot",
      items: [
        ["Responder llamadas.", "Answer calls."],
        ["Conversar con clientes y prospectos.", "Talk with customers and prospects."],
        ["Contestar preguntas frecuentes.", "Answer frequently asked questions."],
        ["Capturar información.", "Capture information."],
        ["Calificar prospectos.", "Qualify leads."],
        ["Agendar citas.", "Schedule appointments."],
        [
          "Cotizar cuando las reglas del negocio lo permitan.",
          "Provide quotes when business rules allow.",
        ],
        ["Realizar seguimiento.", "Follow up."],
        ["Transferir la conversación a una persona.", "Transfer the conversation to a person."],
      ],
    },
    {
      icon: MessageCircle,
      title: es ? "B. Chatbot y atención digital" : "B. Chatbot and digital service",
      items: [
        ["WhatsApp.", "WhatsApp."],
        ["Sitio web.", "Website."],
        ["Instagram.", "Instagram."],
        ["Messenger.", "Messenger."],
        ["Otros canales según integración.", "Other channels depending on integration."],
      ],
    },
    {
      icon: Workflow,
      title: es ? "C. Automatización de procesos" : "C. Process automation",
      items: [
        ["Automatización de agenda.", "Scheduling automation."],
        ["Notificaciones.", "Notifications."],
        ["Seguimiento.", "Follow-up."],
        ["Flujos de atención.", "Customer service workflows."],
        ["Procesamiento de información.", "Information processing."],
        ["Acciones posteriores a la interacción.", "Actions after the interaction."],
      ],
    },
    {
      icon: Network,
      title: es ? "D. Integración empresarial" : "D. Business integration",
      items: [
        ["Calendario.", "Calendar."],
        ["CRM.", "CRM."],
        ["Bases de datos.", "Databases."],
        ["Sistemas de notificación.", "Notification systems."],
        ["Herramientas empresariales.", "Business tools."],
        ["Registro de interacciones.", "Interaction records."],
      ],
    },
    {
      icon: ChartNoAxesCombined,
      title: es ? "E. Análisis de datos basado en métricas" : "E. Metrics-based data analysis",
      groups: [
        {
          title: es ? "Métricas de uso" : "Usage metrics",
          items: [
            ["Número de llamadas.", "Number of calls."],
            ["Minutos utilizados.", "Minutes used."],
            ["Número de conversaciones.", "Number of conversations."],
            ["Mensajes.", "Messages."],
            ["Llamadas simultáneas.", "Concurrent calls."],
            ["Transferencias humanas.", "Human transfers."],
          ],
        },
        {
          title: es ? "Métricas de desempeño" : "Performance metrics",
          items: [
            ["Tiempo de respuesta.", "Response time."],
            ["Porcentaje de resolución automática.", "Automatic resolution rate."],
            [
              "Citas agendadas, pedidos y cotizaciones solicitadas.",
              "Appointments scheduled, orders, and quotes requested.",
            ],
            ["Leads calificados.", "Qualified leads."],
          ],
        },
      ],
    },
    {
      icon: Wrench,
      title: es ? "F. Implementación y soporte" : "F. Implementation and support",
      items: [
        ["Configuración de agentes.", "Agent configuration."],
        ["Adaptación de información del negocio.", "Adaptation of business information."],
        ["Definición de flujos.", "Workflow definition."],
        ["Integración inicial.", "Initial integration."],
        ["Monitoreo.", "Monitoring."],
        ["Soporte.", "Support."],
        [
          "Transferencia a atención humana cuando corresponda.",
          "Handoff to a person when appropriate.",
        ],
      ],
    },
  ];
  const renderItems = (items: string[][]) => (
    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
      {items.map(([itemEs, itemEn]) => (
        <li key={itemEs}>{es ? itemEs : itemEn}</li>
      ))}
    </ul>
  );

  return (
    <div className="max-w-5xl mx-auto mt-16">
      <h3 className="text-3xl font-bold font-display text-center mb-8">
        {es ? "Productos y servicios" : "Products and services"}
      </h3>
      <div className="grid md:grid-cols-2 gap-5">
        {services.map(({ icon: Icon, title, items, groups }) => (
          <article
            key={title}
            className="glass-card rounded-2xl p-7 hover:border-primary/30 transition-colors"
          >
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary border border-primary/20 grid place-items-center mb-5">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h4 className="text-lg font-semibold font-display mb-4">{title}</h4>
            {items && renderItems(items)}
            {groups?.map((group) => (
              <div key={group.title} className="mt-5">
                <h5 className="font-semibold mb-3">{group.title}</h5>
                {renderItems(group.items)}
              </div>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProductServices;
