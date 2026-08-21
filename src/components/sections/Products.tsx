import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Phone, Rocket, ArrowRight, Check } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

type ProductKey = "assistant" | "voice" | "suite";

const Products = () => {
  const { t, language } = useTranslation();
  const [selected, setSelected] = useState<ProductKey | null>(null);

  const products: {
    key: ProductKey;
    icon: typeof MessageSquare;
    name: string;
    tag: string;
    desc: string;
    forWhom: string;
    href: string;
    featured?: boolean;
  }[] = [
    {
      key: "assistant",
      icon: MessageSquare,
      name: t("products.assistant.name"),
      tag: t("products.assistant.tag"),
      desc: t("products.assistant.desc"),
      forWhom: t("products.assistant.for"),
      href: "#pricing",
    },
    {
      key: "voice",
      icon: Phone,
      name: t("products.voice.name"),
      tag: t("products.voice.tag"),
      desc: t("products.voice.desc"),
      forWhom: t("products.voice.for"),
      href: "#pricing",
    },
    {
      key: "suite",
      icon: Rocket,
      name: t("products.suite.name"),
      tag: t("products.suite.tag"),
      desc: t("products.suite.desc"),
      forWhom: t("products.suite.for"),
      href: "#pricing",
      featured: true,
    },
  ];

  const selectorOptions: { key: ProductKey; label: string }[] = [
    { key: "assistant", label: t("products.selector.q1") },
    { key: "voice", label: t("products.selector.q2") },
    { key: "suite", label: t("products.selector.q4") },
  ];

  const selectedProduct = products.find((p) => p.key === selected);

  const compareRows = [
    {
      label: t("products.compare.channel"),
      assistant: t("products.compare.chat"),
      voice: t("products.compare.voice"),
      suite: language === "es" ? "Todos" : "All",
    },
    {
      label: t("products.compare.best"),
      assistant: language === "es" ? "Inbox saturado" : "Busy inbox",
      voice: language === "es" ? "Línea telefónica" : "Phone line",
      suite: language === "es" ? "Cobertura total" : "Full coverage",
    },
  ];

  return (
    <section id="products" className="py-20 sm:py-28 relative overflow-hidden">
      <div
        className="absolute top-1/4 -left-40 w-[480px] h-[480px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(249 70% 40% / 0.4), transparent 60%)" }}
      />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="eyebrow mb-5 inline-flex">{t("products.badge")}</span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            {t("products.title")}{" "}
            <span className="gradient-text">{t("products.titleAccent")}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">{t("products.subtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto mb-8">
          {products.map((p, i) => (
            <motion.a
              key={p.key}
              href={p.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className={`group relative glass-card rounded-2xl p-6 flex flex-col transition-all hover:-translate-y-1 hover:border-primary/40 ${
                p.featured ? "border-primary/35 bg-primary/[0.04]" : ""
              } ${selected === p.key ? "ring-1 ring-primary/50" : ""}`}
            >
              {p.featured && (
                <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                  {t("products.recommended")}
                </span>
              )}
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary border border-primary/20 grid place-items-center mb-4">
                <p.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-1">
                {p.tag}
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">{p.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-4">{p.desc}</p>
              <p className="text-xs text-primary/90 font-medium">{p.forWhom}</p>
            </motion.a>
          ))}
        </div>

        {/* Simple comparison */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-10 overflow-x-auto"
        >
          <div className="glass-card rounded-2xl min-w-[560px] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-left">
                  <th className="p-4 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold" />
                  <th className="p-4 font-semibold">Assistant</th>
                  <th className="p-4 font-semibold">Voice Bot</th>
                  <th className="p-4 font-semibold text-primary">AI Suite</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="p-4 text-muted-foreground text-xs uppercase tracking-wider font-medium">
                      {row.label}
                    </td>
                    <td className="p-4">{row.assistant}</td>
                    <td className="p-4">{row.voice}</td>
                    <td className="p-4 font-medium text-primary">{row.suite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Product selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass-card rounded-3xl p-7 sm:p-9 border-primary/20"
        >
          <h3 className="text-xl sm:text-2xl font-bold font-display mb-2">
            {t("products.selector.title")}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">{t("products.selector.subtitle")}</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {selectorOptions.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setSelected(opt.key)}
                className={`text-left rounded-xl px-4 py-3.5 text-sm border transition-all ${
                  selected === opt.key
                    ? "border-primary/50 bg-primary/10 text-foreground"
                    : "border-white/8 bg-white/[0.02] text-muted-foreground hover:border-white/15 hover:text-foreground"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  {selected === opt.key && <Check className="h-4 w-4 text-primary shrink-0" />}
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
          {selectedProduct && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
              <p className="text-sm">
                <span className="text-muted-foreground">{t("products.selector.result")} </span>
                <span className="font-semibold text-primary">{selectedProduct.name}</span>
              </p>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                {t("products.selector.cta")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
