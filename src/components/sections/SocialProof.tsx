import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const SocialProof = () => {
  const { t } = useTranslation();

  const stats = [
    { value: t("social.s1.value"), label: t("social.s1.label") },
    { value: t("social.s2.value"), label: t("social.s2.label") },
    { value: t("social.s3.value"), label: t("social.s3.label") },
    { value: t("social.s4.value"), label: t("social.s4.label") },
  ];

  return (
    <section aria-label="Resultados" className="py-12 sm:py-16 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 sm:p-10"
        >
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-8">
            {t("social.badge")}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold font-display gradient-text tabular-nums">
                  {s.value}
                </div>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-[11px] text-muted-foreground">{t("social.note")}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
