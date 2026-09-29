import { motion } from "framer-motion";
import { Sunrise, Sun, Moon } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import ProductServices from "@/components/sections/ProductServices";

const Solution = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const solutions = [
    [
      "Llamadas sin responder",
      "Voice Bot responde automáticamente",
      "Unanswered calls",
      "Voice Bot answers automatically",
    ],
    [
      "Respuesta tardía",
      "Atención automatizada inmediata",
      "Delayed replies",
      "Immediate automated service",
    ],
    [
      "Contactos fuera de horario",
      "Disponibilidad continua",
      "After-hours contacts",
      "Continuous availability",
    ],
    [
      "Preguntas repetitivas",
      "Automatización de respuestas",
      "Repeated questions",
      "Automated answers",
    ],
    [
      "Leads sin seguimiento",
      "Flujos automatizados de seguimiento",
      "Leads without follow-up",
      "Automated follow-up workflows",
    ],
    [
      "Múltiples canales",
      "Chatbot + Voice Bot + integraciones",
      "Multiple channels",
      "Chatbot + Voice Bot + integrations",
    ],
    [
      "Procesos manuales",
      "Automatización de agenda y flujos",
      "Manual processes",
      "Scheduling and workflow automation",
    ],
    [
      "Sobrecarga del personal",
      "Transferencia a humanos solo cuando corresponde",
      "Staff overload",
      "Human handoff when appropriate",
    ],
  ];
  const pillars = [
    {
      icon: Sunrise,
      title: es ? "ATIENDE" : "SERVES",
      desc: es
        ? "Responde llamadas y consultas digitales."
        : "Answers calls and digital inquiries.",
    },
    {
      icon: Sun,
      title: es ? "ENTIENDE" : "UNDERSTANDS",
      desc: es
        ? "Identifica qué necesita el cliente y recopila la información necesaria."
        : "Identifies what the customer needs and gathers the necessary information.",
    },
    {
      icon: Moon,
      title: es ? "ACTÚA" : "ACTS",
      desc: es
        ? "Puede ayudar con citas, seguimiento, información del negocio o transferencia a una persona."
        : "Can help with appointments, follow-up, business information, or a handoff to a person.",
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
            {es ? "Una recepción con inteligencia artificial " : "An AI reception service "}
            <span className="gradient-text">
              {es ? "que trabaja junto a tu equipo." : "that works alongside your team."}
            </span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            {es
              ? "QubeSight combina atención por voz y canales digitales para ayudar a responder consultas, recopilar información, gestionar oportunidades y conectar al cliente con una persona cuando sea necesario."
              : "QubeSight combines voice service and digital channels to help answer inquiries, gather information, manage opportunities, and connect customers with a person when needed."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {pillars.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
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
        <div className="max-w-5xl mx-auto mt-12">
          <h3 className="text-2xl font-semibold font-display text-center mb-6">
            {es
              ? "Nuestra solución se orienta a resolver los dolores de nuestros clientes."
              : "Our solution addresses our customers' challenges."}
          </h3>
          <div className="glass-card rounded-2xl overflow-x-auto">
            <table className="w-full text-sm text-left">
              <caption className="sr-only">
                {es
                  ? "Dolores y soluciones de QubeSight"
                  : "Customer challenges and QubeSight solutions"}
              </caption>
              <thead className="bg-primary/10">
                <tr>
                  <th scope="col" className="p-4 font-semibold">
                    {es ? "Dolor" : "Challenge"}
                  </th>
                  <th scope="col" className="p-4 font-semibold">
                    {es ? "¿Cómo QubeSight puede resolver?" : "How can QubeSight help?"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {solutions.map(([painEs, solutionEs, painEn, solutionEn]) => (
                  <tr key={painEs} className="border-t border-primary/10">
                    <th scope="row" className="p-4 font-medium align-top">
                      {es ? painEs : painEn}
                    </th>
                    <td className="p-4 text-muted-foreground align-top">
                      {es ? solutionEs : solutionEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ProductServices />
      </div>
    </section>
  );
};

export default Solution;
