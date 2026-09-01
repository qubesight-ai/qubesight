import { motion } from "framer-motion";
import { MessageSquare, Wrench, Users } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    { icon: MessageSquare, title: t("how.s1.title"), desc: t("how.s1.desc"), n: "01" },
    { icon: Wrench, title: t("how.s2.title"), desc: t("how.s2.desc"), n: "02" },
    { icon: Users, title: t("how.s3.title"), desc: t("how.s3.desc"), n: "03" },
  ];

  return (
    <section id="how" className="py-20 sm:py-28 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="eyebrow mb-5 inline-flex">{t("how.badge")}</span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            {t("how.title")} <span className="gradient-text">{t("how.titleAccent")}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative text-center px-2"
            >
              <div className="relative mx-auto mb-5 h-16 w-16 rounded-2xl glass-card border border-primary/25 grid place-items-center text-primary">
                <step.icon className="h-6 w-6" strokeWidth={1.75} />
                <span className="absolute -top-2 -right-2 text-[10px] font-bold tracking-wider text-brand-soft bg-background border border-primary/20 rounded-md px-1.5 py-0.5">
                  {step.n}
                </span>
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
