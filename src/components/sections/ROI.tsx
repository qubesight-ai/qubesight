import { motion } from "framer-motion";
import { Check, DollarSign, User, Bot } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const ROI = () => {
  const { t } = useTranslation();
  const bullets = [t("roi.b1"), t("roi.b2"), t("roi.b3"), t("roi.b4")];

  return (
    <section id="roi" className="py-20 sm:py-28 relative overflow-hidden">
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
            <DollarSign className="h-3.5 w-3.5" />
            {t("roi.badge")}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            {t("roi.title")} <span className="gradient-text">{t("roi.titleAccent")}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">{t("roi.description")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto perspective-2000 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card depth-card rounded-3xl p-8 text-center"
          >
            <div className="h-14 w-14 mx-auto rounded-2xl bg-muted/30 flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
              {t("roi.compare.human")}
            </p>
            <div className="text-5xl font-bold font-display text-muted-foreground line-through">
              $1,100<span className="text-lg">{t("roi.compare.month")}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card depth-card rounded-3xl p-8 text-center border-primary/40 shadow-glow"
          >
            <div className="h-14 w-14 mx-auto rounded-2xl gradient-bg flex items-center justify-center text-primary-foreground shadow-glow mb-4">
              <Bot className="h-6 w-6" />
            </div>
            <p className="text-sm uppercase tracking-wider text-primary mb-2">
              {t("roi.compare.qs")}
            </p>
            <div className="text-5xl font-bold font-display gradient-text">
              $399<span className="text-lg text-muted-foreground">{t("roi.compare.month")}</span>
            </div>
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

export default ROI;
