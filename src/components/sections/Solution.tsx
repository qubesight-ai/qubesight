import { motion } from "framer-motion";
import { Sunrise, Sun, Moon } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Solution = () => {
  const { t } = useTranslation();

  const pillars = [
    { icon: Sunrise, title: t("solution.b1.title"), desc: t("solution.b1.desc") },
    { icon: Sun, title: t("solution.b2.title"), desc: t("solution.b2.desc") },
    { icon: Moon, title: t("solution.b3.title"), desc: t("solution.b3.desc") },
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
          <span className="eyebrow mb-5 inline-flex">{t("solution.badge")}</span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            {t("solution.title")}{" "}
            <span className="gradient-text">{t("solution.titleAccent")}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("solution.subtitle")}
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
      </div>
    </section>
  );
};

export default Solution;
