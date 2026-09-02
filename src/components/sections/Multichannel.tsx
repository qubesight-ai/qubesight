import { motion } from "framer-motion";
import {
  MessageCircle,
  Instagram,
  Facebook,
  Globe,
  Phone,
  Network,
  ArrowUpRight,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Multichannel = () => {
  const { t } = useTranslation();

  const channels = [
    { icon: MessageCircle, label: t("multi.ch.whatsapp"), tag: "WhatsApp Business API" },
    { icon: Instagram, label: t("multi.ch.instagram"), tag: "DMs · Stories · Reels" },
    { icon: Facebook, label: t("multi.ch.messenger"), tag: "Pages · Inbox" },
    { icon: Globe, label: t("multi.ch.web"), tag: "Webchat embebido" },
    { icon: Phone, label: t("multi.ch.voice"), tag: "Voz IA · SIP" },
  ];

  return (
    <section id="multichannel" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] rounded-full glass-card text-primary">
            <Network className="h-3 w-3" />
            {t("multi.badge")}
          </span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-[1.05] text-balance">
            {t("multi.title")} <span className="gradient-text">{t("multi.titleAccent")}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">{t("multi.description")}</p>
        </motion.div>

        {/* Bento grid: featured + tiles */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 auto-rows-fr gap-4">
          {/* Featured WhatsApp tile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="md:col-span-3 md:row-span-2 bezel-shell"
          >
            <div className="bezel-inner bento-tile p-7 sm:p-9 h-full flex flex-col justify-between min-h-[280px]">
              <div className="flex items-start justify-between gap-4">
                <div className="h-12 w-12 rounded-2xl gradient-bg flex items-center justify-center text-primary-foreground shadow-glow">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-soft px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                  Canal #1
                </span>
              </div>
              <div className="mt-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                  WhatsApp Business API
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display leading-tight">
                  {t("multi.ch.whatsapp")}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground max-w-md">
                  Plantillas, multi-agente, etiquetas, CRM y respuesta IA en menos de 2 segundos.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Plantillas HSM", "Multi-agente", "Webhooks", "Catálogo"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Remaining channels */}
          {channels.slice(1).map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * (i + 1), ease: [0.32, 0.72, 0, 1] }}
              className="md:col-span-3 lg:col-span-[unset] bezel-shell"
              style={{ gridColumn: "span 3" }}
            >
              <div className="bezel-inner bento-tile p-6 h-full flex items-center gap-4 group">
                <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold leading-tight">{c.label}</div>
                  <div className="text-xs text-muted-foreground truncate">{c.tag}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-lg sm:text-xl font-bold gradient-text">
          {t("multi.tagline")}
        </p>
      </div>
    </section>
  );
};

export default Multichannel;
