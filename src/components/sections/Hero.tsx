import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Play, Phone, Zap, TrendingUp, Check } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import HeroChatPreview from "@/components/HeroChatPreview";
import AnimatedCounter from "@/components/AnimatedCounter";

const Hero = () => {
  const { t, language } = useTranslation();
  const whatsappUrl = `https://wa.me/50646009140?text=${encodeURIComponent(
    language === "es"
      ? "Hola, quiero empezar a responder automáticamente con QubeSight."
      : "Hi, I want to start replying automatically with QubeSight."
  )}`;

  const stats = [
    { icon: Phone, value: <AnimatedCounter to={2847} />, label: t("hero.proof.messages") },
    { icon: Zap, value: "< 3s", label: t("hero.proof.time") },
    { icon: TrendingUp, value: "94%", label: t("hero.proof.conversion") },
  ];

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden pt-32 pb-20">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/3 w-[640px] h-[640px] rounded-full blur-3xl opacity-40"
             style={{ background: "radial-gradient(circle, hsl(249 70% 40% / 0.45), transparent 60%)" }} />
        <div className="absolute bottom-0 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-30"
             style={{ background: "radial-gradient(circle, hsl(258 70% 45% / 0.4), transparent 60%)" }} />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* Left: editorial copy block */}
          <div className="text-left max-w-2xl min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-semibold shadow-[0_0_24px_-4px_hsl(150,80%,45%,0.45)]"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {language === "es" ? "🎁 Primer mes gratis en Plan Inicio" : "🎁 First month free on Starter Plan"}
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="eyebrow mb-8"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {t("hero.badge")}
            </motion.span>


            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="display-xl text-[clamp(1.9rem,6vw,5.25rem)] mb-8 break-words"
            >
              {t("hero.title")}{" "}
              <span className="accent-text">{t("hero.titleAccent")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-3"
            >
              {t("hero.subhead.1")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="text-base text-foreground/80 max-w-xl leading-relaxed mb-10"
            >
              {t("hero.subhead.2")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              <a
                href="#demos"
                className="group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 bg-gradient-to-br from-[hsl(249,65%,58%)] to-[hsl(258,75%,64%)] text-white font-semibold text-sm shadow-[0_18px_40px_-12px_hsl(249,70%,40%,0.6)] transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] active:scale-[0.98]"
              >
                <span>{t("hero.cta.primary")}</span>
                <span className="cta-arrow-chip">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                </span>
              </a>
              <Button variant="heroOutline" size="lg" asChild className="min-h-[52px] rounded-full">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Play className="mr-1 h-4 w-4" />
                  {t("hero.cta.secondary")}
                </a>
              </Button>
            </motion.div>

            {/* Stats strip (compact, inline) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-stretch divide-x divide-white/5 rounded-2xl bg-white/[0.025] border border-white/[0.06] backdrop-blur-sm"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-4 flex-1 min-w-0">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary grid place-items-center border border-primary/20">
                    <stat.icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-semibold text-foreground tabular-nums tracking-tight leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1 leading-tight truncate">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: floating chat card */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none min-w-0"
          >
            <HeroChatPreview />
            {/* Small floating stat chip overlay */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="hidden sm:flex absolute -bottom-5 -left-4 items-center gap-3 rounded-2xl bg-[hsl(240,30%,7%)] border border-white/10 px-4 py-3 shadow-[0_24px_60px_-20px_hsl(240,40%,2%,0.9)]"
            >
              <div className="h-9 w-9 rounded-xl bg-emerald-400/15 text-emerald-300 grid place-items-center">
                <Check className="h-4 w-4" strokeWidth={2} />
              </div>
              <div>
                <div className="text-sm font-semibold leading-none">+312</div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  {language === "es" ? "reservas esta semana" : "bookings this week"}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

