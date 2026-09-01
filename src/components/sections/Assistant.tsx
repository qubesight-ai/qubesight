import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Clock, Globe2, Calendar, Database, Languages } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Assistant = () => {
  const { t, language } = useTranslation();
  const whatsappUrl = `https://wa.me/50646009140?text=${encodeURIComponent(
    language === "es"
      ? "Hola, quiero mi QubeSight Assistant."
      : "Hi, I want my QubeSight Assistant.",
  )}`;

  // Capability tiles — bento grid
  const tiles = [
    {
      icon: Clock,
      title: t("assistant.b1"),
      span: "lg:col-span-4 lg:row-span-2",
      featured: true,
      // featured tile shows a live "response timer"
    },
    { icon: Globe2, title: t("assistant.b2"), span: "lg:col-span-4" },
    { icon: Calendar, title: t("assistant.b3"), span: "lg:col-span-4" },
    { icon: Languages, title: t("assistant.b4"), span: "lg:col-span-4" },
    { icon: Database, title: t("assistant.b5"), span: "lg:col-span-4" },
  ];

  return (
    <section id="assistant" className="relative py-28 sm:py-36 overflow-hidden">
      {/* Ambient orb */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-1/4 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, hsl(249 70% 40% / 0.4), transparent 60%)" }}
        />
      </div>

      <div className="container">
        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow mb-6">
              <Bot className="h-3 w-3" strokeWidth={1.75} />
              {t("assistant.badge")}
            </span>
            <h2 className="display-xl text-[clamp(2rem,4.5vw,3.75rem)] max-w-3xl">
              {t("assistant.title.v2")}{" "}
              <span className="accent-text">{t("assistant.titleAccent.v2")}</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {t("assistant.description")}
            </p>
          </motion.div>

          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 bg-gradient-to-br from-[hsl(249,65%,58%)] to-[hsl(258,75%,64%)] text-white font-semibold text-sm shadow-[0_18px_40px_-12px_hsl(249,70%,40%,0.6)] transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] active:scale-[0.98] w-max"
          >
            <span>{t("assistant.cta")}</span>
            <span className="cta-arrow-chip">
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </span>
          </motion.a>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:auto-rows-[180px] gap-4 sm:gap-5">
          {tiles.map((tile, i) => {
            const Icon = tile.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.32, 0.72, 0, 1] }}
                className={`bento-tile p-7 flex flex-col ${tile.span ?? ""}`}
              >
                {tile.featured ? (
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary grid place-items-center border border-primary/25">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                      <div className="eyebrow !text-[9px]">24/7</div>
                    </div>
                    <div>
                      <div className="text-6xl font-display font-semibold tabular-nums tracking-tight leading-none">
                        2.1<span className="text-2xl text-muted-foreground ml-1">s</span>
                      </div>
                      <div className="mt-3 text-sm text-foreground/90 max-w-xs leading-snug">
                        {tile.title}
                      </div>
                      <div className="mt-5 flex items-center gap-1.5">
                        {[0, 1, 2, 3, 4, 5, 6].map((b) => (
                          <span
                            key={b}
                            className="h-6 w-1.5 rounded-full bg-gradient-to-t from-primary/30 to-primary"
                            style={{ opacity: 0.3 + b * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.08] grid place-items-center text-primary mb-5">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div className="mt-auto">
                      <p className="text-foreground/90 text-[15px] leading-snug">{tile.title}</p>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">{t("assistant.footer")}</p>
      </div>
    </section>
  );
};

export default Assistant;
