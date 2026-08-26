import { motion } from "framer-motion";
import { Check, X, Shield } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Differentiation = () => {
  const { t } = useTranslation();

  const others = [t("diff.others.1"), t("diff.others.2"), t("diff.others.3"), t("diff.others.4")];
  const us = [t("diff.us.1"), t("diff.us.2"), t("diff.us.3"), t("diff.us.4")];

  return (
    <section id="differentiation" className="py-24 sm:py-32 relative overflow-hidden">
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] rounded-full glass-card text-primary">
            <Shield className="h-3 w-3" />
            {t("diff.badge")}
          </span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-[1.05] text-balance">
            {t("diff.title")}{" "}
            <span className="gradient-text">{t("diff.titleAccent")}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-5 max-w-5xl mx-auto">
          {/* Others — smaller, muted */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="md:col-span-2 bezel-shell"
          >
            <div className="bezel-inner p-7 h-full bg-background/40">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-8 w-8 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive flex items-center justify-center">
                  <X className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("diff.others.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {others.map((o, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <X className="h-4 w-4 text-destructive/70 flex-shrink-0 mt-0.5" />
                    <span className="line-through decoration-destructive/30 decoration-1">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Us — featured */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="md:col-span-3 bezel-shell"
          >
            <div className="bezel-inner bento-tile p-8 sm:p-9 h-full">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground shadow-glow">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-primary">
                    {t("diff.us.title")}
                  </h3>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-soft px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                  QubeSight
                </span>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {us.map((u, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm p-3.5 rounded-2xl bg-primary/[0.04] border border-primary/15"
                  >
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/95 leading-snug">{u}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Differentiation;
