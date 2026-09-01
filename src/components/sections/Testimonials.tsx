import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    { key: "t1", initials: "MG", color: "from-cyan-500 to-blue-500" },
    { key: "t2", initials: "JC", color: "from-blue-500 to-indigo-500" },
    { key: "t3", initials: "AL", color: "from-cyan-400 to-teal-500" },
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-24 relative bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            {t("testimonials.title")}{" "}
            <span className="gradient-text">{t("testimonials.titleAccent")}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((tm, i) => (
            <motion.div
              key={tm.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-card rounded-2xl p-7 flex flex-col"
            >
              <Quote className="h-8 w-8 text-primary/40 mb-4" />
              <p className="text-foreground/90 leading-relaxed mb-6 flex-grow">
                "{t(`testimonials.${tm.key}.quote`)}"
              </p>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className={`h-11 w-11 rounded-full bg-gradient-to-br ${tm.color} flex items-center justify-center text-white font-bold`}
                >
                  {tm.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t(`testimonials.${tm.key}.name`)}</div>
                  <div className="text-xs text-muted-foreground">
                    {t(`testimonials.${tm.key}.role`)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
