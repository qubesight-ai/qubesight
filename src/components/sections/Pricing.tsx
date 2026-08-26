import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, MessageSquare, Phone, Rocket } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import CheckoutDialog from "@/components/CheckoutDialog";

const Pricing = () => {
  const { t } = useTranslation();
  const [yearly, setYearly] = useState(false);
  const [checkout, setCheckout] = useState<{ open: boolean; amount: number; description: string; planId: string }>(
    { open: false, amount: 0, description: "", planId: "" },
  );

  const openCheckout = (planId: string, amount: number, planName: string) => {
    setCheckout({ open: true, amount, description: `QubeSight — ${planName}`, planId });
  };

  const fmt = (monthly: number) => {
    if (yearly) return Math.round(monthly * 0.8);
    return monthly;
  };

  const plans = [
    {
      id: "assistant_starter",
      name: t("pricing.starter.name"),
      desc: t("pricing.starter.desc"),
      price: fmt(29),
      suffix: t("pricing.month"),
      popular: false,
      setup: 99,
      features: [
        t("pricing.starter.f1"),
        t("pricing.starter.f2"),
        t("pricing.starter.f3"),
        t("pricing.starter.f4"),
        t("pricing.starter.f5"),
        t("pricing.starter.f6"),
      ],
    },
    {
      id: "assistant_bronze",
      name: t("pricing.basic.name"),
      desc: t("pricing.basic.desc"),
      price: fmt(79),
      suffix: t("pricing.month"),
      popular: false,
      setup: 149,
      features: [
        t("pricing.basic.f7"),
        t("pricing.basic.f1"),
        t("pricing.basic.f2"),
        t("pricing.basic.f3"),
        t("pricing.basic.f4"),
        t("pricing.basic.f5"),
        t("pricing.basic.f6"),
      ],
    },
    {
      id: "assistant_silver",
      name: t("pricing.growth.name"),
      desc: t("pricing.growth.desc"),
      price: fmt(149),
      suffix: t("pricing.month"),
      popular: true,
      setup: 199,
      features: [
        t("pricing.growth.f8"),
        t("pricing.growth.f1"),
        t("pricing.growth.f2"),
        t("pricing.growth.f3"),
        t("pricing.growth.f4"),
        t("pricing.growth.f5"),
        t("pricing.growth.f6"),
        t("pricing.growth.f7"),
      ],
    },
    {
      id: "assistant_gold",
      name: t("pricing.propia.name"),
      desc: t("pricing.propia.desc"),
      price: fmt(249),
      suffix: t("pricing.month"),
      popular: false,
      setup: 299,
      features: [
        t("pricing.propia.f1"),
        t("pricing.propia.f2"),
        t("pricing.propia.f3"),
        t("pricing.propia.f4"),
        t("pricing.propia.f5"),
        t("pricing.propia.f6"),
      ],
    },
  ];

  const suitePlans = [
    {
      id: "suite_business",
      name: t("pricing.suite.business.name"),
      desc: t("pricing.suite.business.desc"),
      price: fmt(399),
      setup: 499,
      popular: true,
      features: [
        t("pricing.suite.business.f1"),
        t("pricing.suite.business.f2"),
        t("pricing.suite.business.f3"),
        t("pricing.suite.business.f4"),
        t("pricing.suite.business.f5"),
        t("pricing.suite.business.f6"),
      ],
    },
    {
      id: "suite_enterprise",
      name: t("pricing.suite.enterprise.name"),
      desc: t("pricing.suite.enterprise.desc"),
      price: fmt(599),
      setup: 699,
      popular: false,
      features: [
        t("pricing.suite.enterprise.f1"),
        t("pricing.suite.enterprise.f2"),
        t("pricing.suite.enterprise.f3"),
        t("pricing.suite.enterprise.f4"),
        t("pricing.suite.enterprise.f5"),
        t("pricing.suite.enterprise.f6"),
      ],
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none animate-float-3d" style={{ background: "var(--gradient-glow)" }} />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none animate-float-3d" style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 0.4), transparent 70%)", animationDelay: "-7s" }} />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="eyebrow mb-6">
            {t("pricing.badge")}
          </span>
          <h2 className="display-xl text-[clamp(2rem,4.5vw,3.75rem)] mt-4">
            {t("pricing.title")}{" "}
            <span className="accent-text">{t("pricing.titleAccent")}</span>
          </h2>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 mt-10 p-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
                !yearly ? "bg-gradient-to-br from-[hsl(249,65%,58%)] to-[hsl(258,75%,64%)] text-white shadow-[0_10px_24px_-10px_hsl(249,70%,40%,0.7)]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("pricing.monthly")}
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)] flex items-center gap-2 ${
                yearly ? "bg-gradient-to-br from-[hsl(249,65%,58%)] to-[hsl(258,75%,64%)] text-white shadow-[0_10px_24px_-10px_hsl(249,70%,40%,0.7)]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("pricing.yearly")}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${yearly ? "bg-white/20" : "bg-primary/20 text-primary"}`}>
                {t("pricing.save")}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Chat Bot AI plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mt-16 mb-10"
        >
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <span className="eyebrow mb-4">{t("pricing.section.chat")}</span>
          <h3 className="text-2xl sm:text-4xl font-bold font-display leading-tight mt-4">
            {t("pricing.chat.title")}
          </h3>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            {t("pricing.chat.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
              className={`bento-tile p-7 flex flex-col ${
                plan.popular ? "!border-primary/40 ring-1 ring-primary/30 shadow-[0_30px_80px_-30px_hsl(249,70%,30%,0.6)]" : ""
              }`}
            >

              {plan.popular && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-br from-[hsl(249,65%,58%)] to-[hsl(258,75%,64%)] text-white text-[10px] font-bold uppercase tracking-[0.18em] shadow-[0_10px_24px_-8px_hsl(249,70%,40%,0.7)]">
                  <Sparkles className="h-3 w-3" />
                  {t("pricing.popular")}
                </span>
              )}


              <h3 className="text-xl font-bold font-display mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>

              <div className="mb-6">
                {"setup" in plan && plan.setup && (
                  <div className="text-sm text-muted-foreground mb-1">
                    ${plan.setup} {t("pricing.oneTime")}
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold font-display">${plan.price}</span>
                  <span className="text-muted-foreground">{plan.suffix}</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {yearly ? (
                    <>
                      <span className="text-foreground font-semibold">${plan.price * 12}</span>{" "}
                      {t("pricing.annualTotal")}{" "}
                      <span className="text-primary">
                        ({t("pricing.youSave")} ${(plan.price * 12) / 4})
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-foreground font-semibold">${plan.price * 12}</span>{" "}
                      {t("pricing.annualTotal")}
                    </>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "hero" : "outline"}
                size="lg"
                onClick={() => openCheckout(plan.id, plan.price, plan.name)}
                className="w-full min-h-[48px]"
              >
                {t("pricing.cta")}
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="max-w-3xl mx-auto mt-6 text-center text-xs sm:text-sm text-muted-foreground italic px-4">
          {t("pricing.note")}
        </p>



        {/* Channel add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto mt-10 glass-card rounded-3xl p-6 sm:p-8"
        >
          <div className="text-center mb-6">
            <h4 className="text-lg sm:text-2xl font-bold font-display">
              {t("pricing.channels.title")}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              {t("pricing.channels.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: t("pricing.channels.ig"), price: 19 },
              { label: t("pricing.channels.fb"), price: 19 },
              { label: t("pricing.channels.web"), price: 29 },
              { label: t("pricing.channels.all"), price: 49, highlight: true },
            ].map((ch, i) => (
              <div
                key={i}
                className={`rounded-2xl p-4 border flex flex-col items-center text-center ${
                  ch.highlight
                    ? "border-primary/50 bg-primary/10"
                    : "border-white/10 bg-white/[0.05]"
                }`}
              >
                <span className="text-xs sm:text-sm font-semibold">{ch.label}</span>
                <span className="mt-2 text-2xl font-bold font-display gradient-text">
                  +${ch.price}
                </span>
                <span className="text-[11px] text-muted-foreground">{t("pricing.month")}</span>
              </div>
            ))}
          </div>
        </motion.div>


        {/* Voice Bot AI plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mt-24 mb-10"
        >
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
            <Phone className="h-6 w-6 text-primary" />
          </div>
          <span className="eyebrow mb-4">{t("pricing.section.voice")}</span>
          <h3 className="text-2xl sm:text-4xl font-bold font-display leading-tight">
            {t("pricing.voice.title")}
          </h3>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            {t("pricing.voice.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto perspective-2000 items-stretch">
          {[
            {
              id: "voice_starter",
              name: t("pricing.voice.bronze.name"),
              desc: t("pricing.voice.bronze.desc"),
              price: fmt(79),
              setup: 149,
              tier: "bronze" as const,
              popular: false,
              variant: "outline" as const,
              features: [
                t("pricing.voice.bronze.capacity"),
                t("pricing.voice.bronze.f1"),
                t("pricing.voice.bronze.f2"),
                t("pricing.voice.bronze.f3"),
                t("pricing.voice.bronze.f4"),
                t("pricing.voice.bronze.f5"),
              ],
            },
            {
              id: "voice_bronze",
              name: t("pricing.voice.silver.name"),
              desc: t("pricing.voice.silver.desc"),
              price: fmt(149),
              setup: 249,
              tier: "silver" as const,
              popular: true,
              variant: "hero" as const,
              features: [
                t("pricing.voice.silver.capacity"),
                t("pricing.voice.silver.f1"),
                t("pricing.voice.silver.f2"),
                t("pricing.voice.silver.f3"),
                t("pricing.voice.silver.f4"),
                t("pricing.voice.silver.f5"),
              ],
            },
            {
              id: "voice_silver",
              name: t("pricing.voice.gold.name"),
              desc: t("pricing.voice.gold.desc"),
              price: fmt(299),
              setup: 399,
              tier: "gold" as const,
              popular: false,
              variant: "secondary" as const,
              features: [
                t("pricing.voice.gold.capacity"),
                t("pricing.voice.gold.f1"),
                t("pricing.voice.gold.f2"),
                t("pricing.voice.gold.f3"),
                t("pricing.voice.gold.f4"),
                t("pricing.voice.gold.f5"),
                t("pricing.voice.gold.f6"),
              ],
            },
          ].map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative glass-card depth-card rounded-3xl p-8 flex flex-col transition-all duration-300 ${
                plan.popular
                  ? "border-primary/60 shadow-glow md:scale-105 ring-1 ring-primary/30"
                  : "hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full gradient-bg text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-glow whitespace-nowrap">
                  <Sparkles className="h-3 w-3" />
                  {t("pricing.popular")}
                </span>
              )}

              {/* 1. Name */}
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    plan.tier === "bronze"
                      ? "bg-amber-700"
                      : plan.tier === "silver"
                      ? "bg-slate-300"
                      : "bg-yellow-400"
                  }`}
                />
                <h3 className="text-xl font-bold font-display">Voice Bot {plan.name}</h3>
              </div>

              {/* 2. Price */}
              <div className="mb-1">
                {plan.setup && (
                  <div className="text-sm text-muted-foreground mb-1">
                    ${plan.setup} {t("pricing.oneTime")}
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold font-display">${plan.price}</span>
                  <span className="text-muted-foreground">{t("pricing.month")}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  ⚡ {t("pricing.voice.setup48")} · {t("pricing.voice.noContract")}
                </div>
              </div>

              {/* 3. Subtitle */}
              <p className="text-sm text-muted-foreground mt-4 mb-5">{plan.desc}</p>

              {/* 4. Features */}
              <ul className="space-y-3 mb-5">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* 5. Highlight: inbound free */}
              <div className="mb-6 mt-auto rounded-2xl border border-primary/30 bg-primary/10 p-4 flex items-start gap-3">
                <span className="text-lg leading-none">📞</span>
                <p className="text-sm font-bold text-primary leading-snug">
                  {t("pricing.voice.inboundFree")}
                </p>
              </div>

              {/* 6. CTA */}
              <Button
                variant={plan.variant}
                size="lg"
                onClick={() => openCheckout(plan.id, plan.price, `Voice Bot ${plan.name}`)}
                className="w-full min-h-[48px]"
              >
                {t("pricing.cta")}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Overage block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mt-10 glass-card rounded-2xl p-6 sm:p-8"
        >
          <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
            {t("pricing.voice.overage.title")}
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t("pricing.voice.overage.item")}
            </li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground italic">
            👉 {t("pricing.voice.overage.note")}
          </p>
        </motion.div>

        {/* Add-on card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-3xl mx-auto mt-8 glass-card depth-card rounded-3xl p-8 border-primary/30"
        >
          <span className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-1 rounded-full gradient-bg text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-glow">
            <Sparkles className="h-3 w-3" />
            {t("pricing.addon.badge")}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex-1">
              <h4 className="text-xl font-bold font-display mb-1">
                {t("pricing.addon.name")} —{" "}
                <span className="gradient-text">$29</span>
                <span className="text-muted-foreground text-base font-normal">
                  {" "}{t("pricing.month")}
                </span>
              </h4>
              <p className="text-sm text-muted-foreground mb-4">{t("pricing.addon.desc")}</p>
              <ul className="space-y-2">
                {[t("pricing.addon.f1"), t("pricing.addon.f2"), t("pricing.addon.f3")].map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              variant="hero"
              size="lg"
              onClick={() => openCheckout("outbound_engine", 49, "Outbound Engine")}
              className="min-h-[48px] sm:self-center whitespace-nowrap"
            >
              {t("pricing.addon.cta")}
            </Button>
          </div>
        </motion.div>

        {/* Comparison block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <h4 className="text-center text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">
            {t("pricing.compare.title")}
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-6">
              <h5 className="text-base font-bold font-display mb-4 text-muted-foreground">
                {t("pricing.compare.human")}
              </h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><span className="text-destructive">✕</span>{t("pricing.compare.human.1")}</li>
                <li className="flex items-center gap-2"><span className="text-destructive">✕</span>{t("pricing.compare.human.2")}</li>
                <li className="flex items-center gap-2"><span className="text-destructive">✕</span>{t("pricing.compare.human.3")}</li>
              </ul>
            </div>
            <div className="glass-card rounded-2xl p-6 border-primary/40 shadow-glow">
              <h5 className="text-base font-bold font-display mb-4 text-primary">
                {t("pricing.compare.qs")}
              </h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{t("pricing.compare.qs.1")}</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{t("pricing.compare.qs.2")}</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{t("pricing.compare.qs.3")}</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto mt-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-semibold text-primary">
            ⚡ {t("pricing.voice.overage")}
          </span>
        </div>

        {/* AI Suite (Chat + Voice) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mt-24 mb-10"
        >
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
            <Rocket className="h-6 w-6 text-primary" />
          </div>
          <span className="eyebrow mb-4">{t("pricing.section.suite")}</span>
          <h3 className="text-2xl sm:text-4xl font-bold font-display leading-tight mt-4">
            {t("pricing.suite.title")}
          </h3>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{t("pricing.suite.subtitle")}</p>

          <div className="mt-8 grid sm:grid-cols-2 gap-3 text-left max-w-3xl mx-auto">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold">{t(`pricing.suite.b${n}.title`)}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{t(`pricing.suite.b${n}.desc`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button variant="heroOutline" size="lg" asChild className="min-h-[52px] px-8">
              <a href="#contacto">{t("pricing.suite.cta")}</a>
            </Button>
          </div>
        </motion.div>


        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
          {suitePlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
              className={`bento-tile p-8 flex flex-col ${
                plan.popular ? "!border-primary/40 ring-1 ring-primary/30 shadow-[0_30px_80px_-30px_hsl(249,70%,30%,0.6)]" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-br from-[hsl(249,65%,58%)] to-[hsl(258,75%,64%)] text-white text-[10px] font-bold uppercase tracking-[0.18em] shadow-[0_10px_24px_-8px_hsl(249,70%,40%,0.7)]">
                  <Sparkles className="h-3 w-3" />
                  {t("pricing.popular")}
                </span>
              )}
              <h3 className="text-2xl font-bold font-display mb-1">AI Suite {plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-1">
                  ${plan.setup} {t("pricing.oneTime")}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold font-display">${plan.price}</span>
                  <span className="text-muted-foreground">{t("pricing.month")}</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <span className="text-foreground font-semibold">${plan.price * 12}</span>{" "}
                  {t("pricing.annualTotal")}
                  {yearly && (
                    <span className="text-primary"> ({t("pricing.youSave")} ${(plan.price * 12) / 4})</span>
                  )}
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.popular ? "hero" : "outline"}
                size="lg"
                onClick={() => openCheckout(plan.id, plan.price, `AI Suite ${plan.name}`)}
                className="w-full min-h-[48px]"
              >
                {t("pricing.cta")}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Universal features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto mt-16 glass-card rounded-3xl p-6 sm:p-8"
        >
          <h4 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6">
            {t("pricing.universal.title")}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            {[
              t("pricing.universal.f1"),
              t("pricing.universal.f2"),
              t("pricing.universal.f3"),
              t("pricing.universal.f4"),
              t("pricing.universal.f5"),
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <CheckoutDialog
        open={checkout.open}
        onOpenChange={(open) => setCheckout((c) => ({ ...c, open }))}
        amount={checkout.amount}
        description={checkout.description}
        planId={checkout.planId}
      />
    </section>
  );
};

export default Pricing;
