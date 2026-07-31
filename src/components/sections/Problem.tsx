import { motion } from "framer-motion";
import { Clock, MoonStar, Activity, TrendingDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Problem = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Clock,
      value: "78%",
      title: t("problem.p1.title"),
      desc: t("problem.p1.desc"),
    },
    {
      icon: MoonStar,
      value: "62%",
      title: t("problem.p2.title"),
      desc: t("problem.p2.desc"),
    },
    {
      icon: Activity,
      value: "5x",
      title: t("problem.p3.title"),
      desc: t("problem.p3.desc"),
    },
  ];

  return (
    <section id="problem" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Subtle red wash to underscore the pain */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(0 84% 40% / 0.18), transparent 70%)" }}
      />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-wider rounded-full bg-destructive/10 text-destructive border border-destructive/20">
            <TrendingDown className="h-3.5 w-3.5" />
            {t("problem.badge")}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            {t("problem.title")}{" "}
            <span className="gradient-text">{t("problem.titleAccent")}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">{t("problem.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative glass-card rounded-2xl p-8 hover:border-destructive/30 transition-all hover:-translate-y-1 overflow-hidden group"
            >
              {/* Decorative XL stat */}
              <div className="absolute -top-4 -right-2 text-[7rem] font-display font-black text-destructive/[0.07] leading-none select-none pointer-events-none group-hover:text-destructive/[0.12] transition-colors">
                {item.value}
              </div>

              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center mb-5">
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold font-display text-destructive mb-3 leading-none">
                  {item.value}
                </div>
                <h3 className="text-lg font-semibold font-display mb-2 leading-snug">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom emphasis line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-base sm:text-lg text-muted-foreground">
            <span className="text-foreground font-bold">{t("problem.cta.lead")}</span>{" "}
            {t("problem.cta.tail")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
