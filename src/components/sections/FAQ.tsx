import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/hooks/useTranslation";

const FAQ = () => {
  const { t } = useTranslation();

  const groups = [
    {
      title: t("faq.group.chat"),
      items: [
        { q: "faq.c1.q", a: "faq.c1.a" },
        { q: "faq.c2.q", a: "faq.c2.a" },
        { q: "faq.c3.q", a: "faq.c3.a" },
        { q: "faq.c4.q", a: "faq.c4.a" },
      ],
    },
    {
      title: t("faq.group.voice"),
      items: [
        { q: "faq.v1.q", a: "faq.v1.a" },
        { q: "faq.v2.q", a: "faq.v2.a" },
        { q: "faq.v3.q", a: "faq.v3.a" },
        { q: "faq.v4.q", a: "faq.v4.a" },
      ],
    },
    {
      title: t("faq.group.general"),
      items: [
        { q: "faq.q1", a: "faq.a1" },
        { q: "faq.q2", a: "faq.a2" },
        { q: "faq.q3", a: "faq.a3" },
        { q: "faq.q4", a: "faq.a4" },
        { q: "faq.q5", a: "faq.a5" },
        { q: "faq.q6", a: "faq.a6" },
        { q: "faq.q7", a: "faq.a7" },
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
          <span className="eyebrow mb-5 inline-flex">{t("faq.badge")}</span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            {t("faq.title")}{" "}
            <span className="gradient-text">{t("faq.titleAccent")}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          {groups.map((group, gi) => (
            <div key={gi}>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">
                {group.title}
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {group.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${gi}-${i}`}
                    className="border-white/8 px-1"
                  >
                    <AccordionTrigger className="text-left text-base font-medium hover:no-underline hover:text-primary py-5">
                      {t(item.q)}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                      {t(item.a)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};


export default FAQ;
