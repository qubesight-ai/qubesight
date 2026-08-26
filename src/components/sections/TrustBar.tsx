import { motion } from "framer-motion";
import { UtensilsCrossed, Scissors, Stethoscope, Dumbbell, Building2, Store, Briefcase, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const TrustBar = () => {
  const { t } = useTranslation();

  const industries = [
    { icon: UtensilsCrossed, label: "Restaurantes" },
    { icon: Scissors, label: "Salones" },
    { icon: Stethoscope, label: "Clínicas" },
    { icon: Dumbbell, label: "Gimnasios" },
    { icon: Building2, label: "Inmobiliarias" },
    { icon: Store, label: "Retail" },
    { icon: Briefcase, label: "Servicios" },
    { icon: Sparkles, label: "Spas" },
  ];

  // Duplicate for seamless infinite scroll
  const items = [...industries, ...industries];

  return (
    <section aria-label="Industrias atendidas" className="py-10 border-y border-white/5 bg-card/20 backdrop-blur-sm overflow-hidden">
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-6"
        >
          {t("trustbar.title")}
        </motion.p>

        <div className="relative">
          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex gap-10 marquee">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium font-display tracking-wide whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          animation: marquee-scroll 28s linear infinite;
          width: max-content;
        }
        .marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default TrustBar;
