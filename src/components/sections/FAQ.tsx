import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/hooks/useTranslation";

const FAQ = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const items = es
    ? [
        [
          "¿Qué es QubeSight?",
          "Una solución de recepción con inteligencia artificial diseñada para ayudar a negocios a atender llamadas y consultas digitales.",
        ],
        [
          "¿QubeSight reemplaza a mi personal?",
          "No. Está pensado principalmente para apoyar al equipo en tareas repetitivas y permitir que una persona intervenga cuando sea necesario.",
        ],
        [
          "¿Necesito conocimientos técnicos?",
          "No. Nuestro objetivo es encargarnos de la configuración técnica.",
        ],
        ["¿La demostración tiene costo?", "No. La demostración inicial no tiene costo."],
        [
          "¿Qué significa participar como Early Adopter?",
          "Significa probar QubeSight durante una etapa temprana y compartirnos tu experiencia para ayudarnos a mejorar el producto.",
        ],
      ]
    : [
        [
          "What is QubeSight?",
          "An AI reception solution designed to help businesses handle calls and digital inquiries.",
        ],
        [
          "Does QubeSight replace my staff?",
          "No. It is designed to support the team with repetitive tasks and let a person step in when needed.",
        ],
        ["Do I need technical knowledge?", "No. Our goal is to take care of the technical setup."],
        ["Is the demo free?", "Yes. The initial demonstration is free."],
        [
          "What does being an Early Adopter mean?",
          "It means trying QubeSight in an early stage and sharing your experience to help us improve the product.",
        ],
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
            {items.map(([question, answer], i) => (
              <AccordionItem key={question} value={`item-${i}`} className="border-white/8 px-1">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline hover:text-primary py-5">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {answer}
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
