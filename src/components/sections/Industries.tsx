import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Building2,
  UtensilsCrossed,
  Stethoscope,
  Dumbbell,
  Check,
  ArrowRight,
  Layers,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Industries = () => {
  const { t } = useTranslation();

  const industries = [
    {
      key: "realestate",
      icon: Building2,
      title: t("industries.realestate.title"),
      bullets: [
        t("industries.realestate.b1"),
        t("industries.realestate.b2"),
        t("industries.realestate.b3"),
      ],
      demoTo: "/inmobiliarias",
      metric: { value: "+38%", label: "leads calificados" },
    },
    {
      key: "restaurants",
      icon: UtensilsCrossed,
      title: t("industries.restaurants.title"),
      bullets: [
        t("industries.restaurants.b1"),
        t("industries.restaurants.b2"),
        t("industries.restaurants.b3"),
      ],
      demoTo: "/restaurantes",
      metric: { value: "24/7", label: "reservas automáticas" },
    },
    {
      key: "clinics",
      icon: Stethoscope,
      title: t("industries.clinics.title"),
      bullets: [t("industries.clinics.b1"), t("industries.clinics.b2"), t("industries.clinics.b3")],
      demoTo: "/dental",
      metric: { value: "−62%", label: "ausencias en citas" },
    },
    {
      key: "gyms",
      icon: Dumbbell,
      title: t("industries.gyms.title"),
      bullets: [t("industries.gyms.b1"), t("industries.gyms.b2"), t("industries.gyms.b3")],
      demoTo: "/gimnasios",
      metric: { value: "+27%", label: "retención mensual" },
    },
  ];

  return (
    <section id="industries" className="py-16 sm:py-24 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] rounded-full glass-card text-primary">
            <Layers className="h-3 w-3" />
            Industrias
          </span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-[1.05] text-balance">
            {t("industries.title")}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">{t("industries.description")}</p>
        </motion.div>

        <Tabs defaultValue="realestate" className="max-w-6xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto bg-white/[0.05] border border-white/10 p-1.5 rounded-2xl mb-8 gap-1">
            {industries.map((ind) => (
              <TabsTrigger
                key={ind.key}
                value={ind.key}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl data-[state=active]:gradient-bg data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                <ind.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{t(`industries.${ind.key}.tab`)}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {industries.map((ind) => (
            <TabsContent key={ind.key} value={ind.key}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-5"
              >
                {/* Main bento card */}
                <div className="lg:col-span-3 bezel-shell">
                  <div className="bezel-inner bento-tile p-8 sm:p-10 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-14 w-14 rounded-2xl gradient-bg flex items-center justify-center text-primary-foreground shadow-glow">
                        <ind.icon className="h-7 w-7" />
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-soft mb-1">
                          {t(`industries.${ind.key}.tab`)}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold font-display leading-tight">
                          {ind.title}
                        </h3>
                      </div>
                    </div>
                    <ul className="grid sm:grid-cols-1 gap-2.5 mb-7">
                      {ind.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.05] border border-white/10"
                        >
                          <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground/90">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <Button variant="hero" size="lg" asChild className="min-h-[52px] group">
                        <Link to={ind.demoTo}>
                          Probar demo en vivo
                          <span className="cta-arrow-chip ml-2">
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Side bento — metric + CTA tile */}
                <div className="lg:col-span-2 grid grid-cols-1 gap-5">
                  <div className="bezel-shell">
                    <div className="bezel-inner bento-tile p-7 h-full flex flex-col justify-between">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Resultado promedio
                      </div>
                      <div className="my-4">
                        <div className="display-xl text-5xl sm:text-6xl font-bold gradient-text leading-none">
                          {ind.metric.value}
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">{ind.metric.label}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Basado en clientes activos del sector en los últimos 6 meses.
                      </div>
                    </div>
                  </div>
                  <div className="bezel-shell">
                    <div className="bezel-inner p-6 h-full flex items-center gap-4 bg-primary/[0.04]">
                      <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 text-primary flex items-center justify-center flex-shrink-0">
                        <ind.icon className="h-5 w-5" />
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold">Implementación en 7 días</div>
                        <div className="text-muted-foreground text-xs">
                          Integración con tu stack actual.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Industries;
