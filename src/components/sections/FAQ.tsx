import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/hooks/useTranslation";

type FaqItem = {
  question: string;
  answer: string;
  bullets?: string[];
  notes?: string[];
};

const FAQ = () => {
  const { language } = useTranslation();
  const es = language === "es";

  const items: FaqItem[] = es
    ? [
        {
          question: "¿Qué significa participar como Early Adopter?",
          answer:
            "Significa probar QubeSight durante una etapa temprana y compartirnos tu experiencia para ayudarnos a mejorar el producto.",
        },
        {
          question: "¿Qué es una solución a nivel de MVP?",
          answer:
            "Un MVP, o Producto Mínimo Viable, es una primera versión funcional que contiene las capacidades esenciales de una solución. Su propósito es probarla con empresas reales, medir resultados, detectar mejoras y validar el modelo antes de lanzar una versión comercial completa.",
        },
        {
          question: "¿Cuáles funciones incluye nuestra solución de MVP?",
          answer: "La solución inicial de QubeSight incluye:",
          bullets: [
            "Un agente de inteligencia artificial personalizado.",
            "Un número telefónico dedicado.",
            "Atención automática de llamadas entrantes.",
            "Conversación en español mediante lenguaje natural.",
            "Respuestas basadas en la información de la empresa.",
            "Recopilación estructurada de información del cliente.",
            "Flujos para servicio al cliente, ventas, prospección o marketing.",
            "Registro básico de llamadas y transcripciones.",
            "Identificación de necesidades y procesos que podrían automatizarse.",
            "Configuración, pruebas y ajustes iniciales.",
            "Panel básico de administración.",
          ],
          notes: [
            "Las integraciones avanzadas con CRM, calendarios, sistemas de inventario y otras plataformas se cotizan y desarrollan según las necesidades de cada empresa.",
          ],
        },
        {
          question: "¿Cuáles son las condiciones económicas para adquirir nuestra solución de MVP?",
          answer:
            "QubeSight se encuentra actualmente en etapa piloto, por lo que todavía no existe una tarifa comercial pública definitiva. La estructura económica prevista contempla:",
          bullets: [
            "Un pago inicial por configuración, personalización y puesta en funcionamiento.",
            "Una mensualidad por el agente, el número telefónico y la infraestructura.",
            "Una cantidad determinada de minutos incluida.",
            "Un posible cargo por consumo adicional.",
            "Costos separados para integraciones o desarrollos especiales.",
          ],
          notes: [
            "Cada empresa recibe una propuesta individual después de completar el diagnóstico de necesidades.",
            "Los costos internos de infraestructura no representan el precio final de venta.",
          ],
        },
        {
          question: "¿Cuál es el tiempo de uso inicial de nuestra solución de MVP?",
          answer:
            "El piloto inicial propuesto tiene una duración de 60 días. Incluye como referencia:",
          bullets: [
            "Un agente de inteligencia artificial.",
            "Un número telefónico.",
            "Hasta 500 minutos mensuales.",
            "Configuración y pruebas iniciales.",
            "Seguimiento y recopilación de retroalimentación.",
          ],
          notes: [
            "Al finalizar el piloto se revisan los resultados y se determina si la empresa desea continuar, ampliar funciones o realizar ajustes.",
          ],
        },
        {
          question: "¿Cómo puedo agendar una sesión de demostración?",
          answer:
            'Puede solicitar una sesión mediante el botón "Solicitar demo" en la página de QubeSight. Deberá proporcionar:',
          bullets: [
            "Nombre.",
            "Empresa.",
            "Teléfono o WhatsApp.",
            "Correo electrónico.",
            "Tipo de negocio.",
            "Fecha y horario preferidos.",
          ],
          notes: [
            "El equipo de QubeSight se pondrá en contacto para confirmar la sesión. Durante la demostración podrá conversar directamente con el agente, conocer su funcionamiento y explicar las necesidades de su empresa.",
            "Por el momento, la confirmación de la sesión se realiza manualmente. La conexión automática con calendarios se incorporará en una etapa posterior.",
          ],
        },
      ]
    : [
        {
          question: "What does being an Early Adopter mean?",
          answer:
            "It means trying QubeSight in an early stage and sharing your experience to help us improve the product.",
        },
        {
          question: "What is an MVP-level solution?",
          answer:
            "An MVP, or Minimum Viable Product, is a first functional version containing the essential capabilities of a solution. Its purpose is to test it with real businesses, measure results, detect improvements, and validate the model before launching a full commercial version.",
        },
        {
          question: "Which functions does our MVP solution include?",
          answer: "The initial QubeSight solution includes:",
          bullets: [
            "A customized artificial intelligence agent.",
            "A dedicated phone number.",
            "Automatic handling of incoming calls.",
            "Spanish conversation through natural language.",
            "Answers based on the company's information.",
            "Structured collection of customer information.",
            "Flows for customer service, sales, prospecting, or marketing.",
            "Basic call logging and transcripts.",
            "Identification of needs and processes that could be automated.",
            "Initial setup, testing, and adjustments.",
            "A basic administration panel.",
          ],
          notes: [
            "Advanced integrations with CRM, calendars, inventory systems, and other platforms are quoted and developed according to each company's needs.",
          ],
        },
        {
          question: "What are the economic conditions to acquire our MVP solution?",
          answer:
            "QubeSight is currently in a pilot stage, so there is no definitive public commercial rate yet. The planned economic structure includes:",
          bullets: [
            "An initial payment for setup, customization, and go-live.",
            "A monthly fee for the agent, the phone number, and the infrastructure.",
            "A defined amount of included minutes.",
            "A possible charge for additional usage.",
            "Separate costs for integrations or special developments.",
          ],
          notes: [
            "Each company receives an individual proposal after completing the needs diagnosis.",
            "Internal infrastructure costs do not represent the final sales price.",
          ],
        },
        {
          question: "What is the initial usage period of our MVP solution?",
          answer: "The proposed initial pilot has a duration of 60 days. As a reference, it includes:",
          bullets: [
            "An artificial intelligence agent.",
            "A phone number.",
            "Up to 500 minutes per month.",
            "Initial setup and testing.",
            "Follow-up and feedback collection.",
          ],
          notes: [
            "At the end of the pilot, results are reviewed and it is determined whether the company wishes to continue, expand features, or make adjustments.",
          ],
        },
        {
          question: "How can I schedule a demonstration session?",
          answer:
            'You can request a session using the "Request a demo" button on the QubeSight page. You will need to provide:',
          bullets: [
            "Name.",
            "Company.",
            "Phone or WhatsApp.",
            "Email address.",
            "Type of business.",
            "Preferred date and time.",
          ],
          notes: [
            "The QubeSight team will contact you to confirm the session. During the demonstration you can talk directly with the agent, learn how it works, and explain your company's needs.",
            "For now, session confirmation is done manually. Automatic calendar connection will be added at a later stage.",
          ],
        },
      ];

  return (
    <section id="faq" className="py-20 sm:py-28 relative">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="eyebrow mb-5 inline-flex">
            {es ? "PREGUNTAS FRECUENTES" : "FREQUENTLY ASKED QUESTIONS"}
          </span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            {es ? "Lo esencial antes de una " : "The essentials before a "}
            <span className="gradient-text">{es ? "demostración." : "demo."}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <Accordion type="single" collapsible className="w-full">
            {items.map(({ question, answer, bullets, notes }, i) => (
              <AccordionItem key={question} value={`item-${i}`} className="border-white/8 px-1">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline hover:text-primary py-5">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  <p>{answer}</p>
                  {bullets && bullets.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-[7px] h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                  {notes && notes.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {notes.map((note) => (
                        <p key={note}>{note}</p>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
