import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  ArrowRightLeft,
  Database,
  Zap,
  Settings,
  BarChart3,
  ShoppingCart,
  CreditCard,
  Package,
  Globe,
  Languages,
  Users,
  GraduationCap,
  BookOpen,
  LayoutDashboard,
  FileBarChart,
  Shield,
  Quote,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { getCaseStudyBySlug } from "@/data/caseStudies";
import type { Language } from "@/data/caseStudies";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";

const iconMap: Record<string, React.ElementType> = {
  Brain,
  ArrowRightLeft,
  Database,
  Zap,
  Settings,
  BarChart3,
  ShoppingCart,
  CreditCard,
  Package,
  Globe,
  Languages,
  Users,
  GraduationCap,
  BookOpen,
  LayoutDashboard,
  FileBarChart,
  Shield,
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useTranslation();
  const lang = language as Language;

  const cs = getCaseStudyBySlug(slug || "");

  const whatsappNumber = "50646009140";
  const whatsappMessage = encodeURIComponent(
    lang === "es"
      ? "Hola, me interesa una solución similar para mi negocio."
      : "Hello, I'm interested in a similar solution for my business.",
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  if (!cs) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold font-display text-foreground mb-4">404</h1>
            <p className="text-muted-foreground mb-8">
              {lang === "es" ? "Caso de estudio no encontrado." : "Case study not found."}
            </p>
            <Button variant="hero" asChild>
              <Link to="/#portafolio">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {lang === "es" ? "Volver al portafolio" : "Back to portfolio"}
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const archSteps = cs.architectureDiagram[lang].split(" → ");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container relative z-10">
          <motion.div {...fadeUp}>
            <Link
              to="/#portafolio"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {lang === "es" ? "Volver al portafolio" : "Back to portfolio"}
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span
                {...fadeUp}
                className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/15 text-primary border border-primary/20"
              >
                {cs.categoryTag[lang]}
              </motion.span>
              <motion.h1
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6 text-foreground"
              >
                {cs.title[lang]}
              </motion.h1>
              <motion.p
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8"
              >
                {cs.summary[lang]}
              </motion.p>

              {/* Hero Stat */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-baseline gap-3 p-6 rounded-2xl glass-card border-primary/20"
              >
                <span className="text-5xl sm:text-6xl font-bold font-display gradient-text">
                  {cs.heroStat.value}
                </span>
                <span className="text-lg text-muted-foreground font-medium">
                  {cs.heroStat.label[lang]}
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/5">
                <img
                  src={cs.image}
                  alt={cs.title[lang]}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl -z-10 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Client & The Problem */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              {lang === "es" ? "El Cliente y El Problema" : "The Client & The Problem"}
            </h2>
            <p className="text-xl sm:text-2xl text-foreground leading-relaxed font-display">
              {cs.clientProblem[lang]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solution Architecture */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4 text-foreground">
              {lang === "es" ? "Arquitectura de la Solución" : "Solution Architecture"}
            </h2>
            <p className="text-muted-foreground text-lg">
              {lang === "es"
                ? "Cómo diseñamos e implementamos esta solución."
                : "How we designed and implemented this solution."}
            </p>
          </motion.div>

          {/* Architecture Flow Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            {archSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="px-5 py-3 rounded-xl glass-card border-primary/20 text-sm sm:text-base font-medium text-foreground whitespace-nowrap">
                  {step}
                </div>
                {i < archSteps.length - 1 && (
                  <ChevronRight className="h-5 w-5 text-primary shrink-0" />
                )}
              </div>
            ))}
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-xl font-semibold font-display mb-6 text-foreground text-center">
              {lang === "es" ? "Stack Tecnológico" : "Technology Stack"}
            </h3>
            <div className="space-y-4">
              {cs.techStack.map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="grid sm:grid-cols-[160px_1fr] gap-2 sm:gap-6 p-4 rounded-xl glass-card"
                >
                  <span className="font-semibold text-primary text-sm uppercase tracking-wider">
                    {tech.name[lang]}
                  </span>
                  <span className="text-muted-foreground">{tech.rationale[lang]}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4 text-foreground">
              {lang === "es" ? "Características Clave" : "Key Features"}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {cs.features.map((feature, i) => {
              const Icon = iconMap[feature.icon] || Zap;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-2xl glass-card hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold font-display mb-3 text-foreground">
                    {feature.title[lang]}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description[lang]}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business Outcomes */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4 text-foreground">
              {lang === "es" ? "Resultados de Negocio" : "Business Outcomes"}
            </h2>
            <p className="text-muted-foreground text-lg">
              {lang === "es" ? "Impacto medible que generamos." : "Measurable impact we delivered."}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {cs.metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl glass-card border-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <span className="block text-4xl sm:text-5xl font-bold font-display gradient-text mb-3">
                  {metric.value}
                </span>
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {metric.label[lang]}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Quote className="h-12 w-12 text-primary/30 mx-auto mb-6" />
            <blockquote className="text-xl sm:text-2xl text-foreground leading-relaxed font-display italic mb-8">
              "{cs.testimonial.quote[lang]}"
            </blockquote>
            <div>
              <p className="font-semibold text-foreground text-lg">{cs.testimonial.name}</p>
              <p className="text-sm text-muted-foreground">{cs.testimonial.title[lang]}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl glass-card p-8 sm:p-12 lg:p-16 text-center"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4 text-foreground">
                {lang === "es" ? "¿Necesitas una solución similar?" : "Need a similar solution?"}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {lang === "es"
                  ? "Hablemos sobre cómo podemos resolver tu desafío de negocio."
                  : "Let's talk about how we can solve your business challenge."}
              </p>
              <Button variant="hero" size="lg" asChild className="shadow-glow">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  {lang === "es" ? "Iniciar conversación" : "Start a conversation"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyPage;
