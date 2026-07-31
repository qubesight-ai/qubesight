import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Clock,
  Calendar,
  CreditCard,
  Mic,
  Zap,
  ArrowRight,
  Users,
  Bot,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const VoiceBot = () => {
  const { t, language } = useTranslation();

  const whatsappUrl = `https://wa.me/50646009140?text=${encodeURIComponent(
    language === "es"
      ? "Hola, quiero información sobre el Voice Bot AI de QubeSight."
      : "Hi, I want info about QubeSight's Voice Bot AI."
  )}`;

  const benefits = [
    { icon: Zap, label: t("voicebot.benefit.latency") },
    { icon: Mic, label: t("voicebot.benefit.orders") },
    { icon: CreditCard, label: t("voicebot.benefit.payments") },
    { icon: Calendar, label: t("voicebot.benefit.calendar") },
  ];

  const rows = [
    {
      icon: Clock,
      label: t("voicebot.row.hours"),
      human: t("voicebot.row.hours.human"),
      bot: t("voicebot.row.hours.bot"),
    },
    {
      icon: Phone,
      label: t("voicebot.row.languages"),
      human: t("voicebot.row.languages.human"),
      bot: t("voicebot.row.languages.bot"),
    },
    {
      icon: Users,
      label: t("voicebot.row.calls"),
      human: t("voicebot.row.calls.human"),
      bot: t("voicebot.row.calls.bot"),
    },
    {
      icon: Calendar,
      label: t("voicebot.row.cost"),
      human: t("voicebot.row.cost.human"),
      bot: t("voicebot.row.cost.bot"),
    },
  ];

  return (
    <section id="voicebot" className="py-20 sm:py-28 relative">
      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "var(--gradient-glow)" }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] rounded-full glass-card text-primary">
            <Phone className="h-3 w-3" />
            {t("voicebot.badge")}
          </span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-[1.05] text-balance">
            {t("voicebot.title")}{" "}
            <span className="gradient-text">{t("voicebot.titleAccent")}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">{t("voicebot.subtitle.v2")}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bezel-shell"
          >
            <div className="bezel-inner bento-tile p-2 sm:p-3 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left p-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {t("voicebot.col.feature")}
                      </th>
                      <th className="text-left p-4 text-sm font-semibold">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {t("voicebot.col.human")}
                        </div>
                      </th>
                      <th className="text-left p-4 text-sm font-semibold">
                        <div className="flex items-center gap-2 text-primary">
                          <Bot className="h-4 w-4" />
                          {t("voicebot.col.ai")}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3 text-sm font-medium">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                              <row.icon className="h-4 w-4" />
                            </div>
                            {row.label}
                          </div>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{row.human}</td>
                        <td className="p-4 text-sm font-semibold text-foreground">{row.bot}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 bezel-shell"
          >
            <div className="bezel-inner bento-tile p-7 sm:p-8 h-full flex flex-col justify-between bg-primary/[0.04]">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/80 mb-3">
                  {t("voicebot.row.savings")}
                </div>
                <p className="text-xl sm:text-2xl font-bold font-display leading-snug gradient-text">
                  {t("voicebot.mantra")}
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  {t("voicebot.activation")}
                </p>
              </div>
              <Button variant="hero" size="lg" asChild className="mt-6 min-h-[52px] group">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  {t("voicebot.cta")}
                  <span className="cta-arrow-chip ml-2">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              className="bezel-shell"
            >
              <div className="bezel-inner bento-tile p-5 h-full flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                  <b.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium leading-tight">{b.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceBot;
