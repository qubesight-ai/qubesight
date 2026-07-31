import { motion } from "framer-motion";
import { Check, Sparkles, Users, Bot } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Benefits = () => {
  const { t } = useTranslation();
  const bullets = [t("roi.b1"), t("roi.b2"), t("roi.b3"), t("roi.b4")];

  return (
    <section id="benefits" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-wider rounded-full glass-card text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {t("roi.badge")}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            {t("roi.title")}{" "}
            <span className="gradient-text">{t("roi.titleAccent")}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">{t("roi.description")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-7 text-center"
          >
            <div className="h-12 w-12 mx-auto rounded-2xl bg-muted/30 flex items-center justify-center mb-4">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
              {t("roi.compare.human")}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              {t("pricing.compare.human.1")} · {t("pricing.compare.human.2")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="glass-card rounded-3xl p-7 text-center border-primary/40 shadow-glow"
          >
            <div className="h-12 w-12 mx-auto rounded-2xl gradient-bg flex items-center justify-center text-primary-foreground shadow-glow mb-4">
              <Bot className="h-5 w-5" />
            </div>
            <p className="text-sm uppercase tracking-wider text-primary mb-2">
              {t("roi.compare.qs")}
            </p>
            <p className="text-base text-foreground/90 leading-relaxed">
              {t("pricing.compare.qs.1")} · {t("pricing.compare.qs.3")}
            </p>
          </motion.div>
        </div>

        <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-sm sm:text-base">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-foreground/90">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Benefits;
