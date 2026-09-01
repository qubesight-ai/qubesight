import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import ernestoImg from "@/assets/founder-ernesto.webp";

const Founders = () => {
  const { t } = useTranslation();

  return (
    <section id="founders" className="py-16 sm:py-24 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <span className="eyebrow mb-5 inline-flex">{t("founders.badge")}</span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            {t("founders.title")} <span className="gradient-text">{t("founders.titleAccent")}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto glass-card rounded-3xl p-6 sm:p-8 md:p-10"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/40 to-blue-600/30 blur-md opacity-70" />
              <img
                src={ernestoImg}
                alt="Ernesto Libby, Founder & CEO of QubeSight"
                loading="lazy"
                className="relative h-36 w-36 sm:h-40 sm:w-40 rounded-2xl object-cover border border-white/10"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-display font-semibold text-2xl">Ernesto Libby</h3>
              <p className="text-sm text-primary mt-1 font-medium">{t("founders.ernesto.role")}</p>
              <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed">
                {t("founders.ernesto.bio")}
              </p>
              <a
                href="https://www.linkedin.com/in/ernestolibby25/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Ernesto Libby"
                className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Founders;
