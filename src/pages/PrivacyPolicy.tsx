import { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import {
  PRIVACY_CONTACT,
  PRIVACY_POLICY_TITLE,
  PRIVACY_SECTIONS,
} from "@/content/privacyPolicy";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const PrivacyPolicy = () => {
  const { language } = useTranslation();
  const spanish = language === "es";

  useEffect(() => {
    const previousTitle = document.title;
    document.title = PRIVACY_POLICY_TITLE;
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="container relative z-10 max-w-3xl">
            <motion.div {...fadeUp}>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-10">
                {PRIVACY_POLICY_TITLE}
              </h1>
              {PRIVACY_SECTIONS.map((section) => (
                <div key={section.heading} className="mb-10 last:mb-0">
                  <h2 className="font-display text-xl sm:text-2xl font-semibold mb-4">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-secondary/30">
          <div className="container relative z-10 max-w-3xl">
            <motion.div {...fadeUp} className="rounded-3xl glass-card p-8 sm:p-10">
              <h2 className="font-display text-xl sm:text-2xl font-semibold mb-6">
                {spanish ? "Contacto" : "Contact"}
              </h2>
              <dl className="space-y-3 text-sm">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <dt className="font-semibold w-40 shrink-0">
                    {spanish ? "Empresa" : "Company"}
                  </dt>
                  <dd className="text-muted-foreground">{PRIVACY_CONTACT.company}</dd>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <dt className="font-semibold w-40 shrink-0">
                    {spanish ? "Sitio web" : "Website"}
                  </dt>
                  <dd>
                    <a
                      href={PRIVACY_CONTACT.website}
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {PRIVACY_CONTACT.websiteLabel}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <dt className="font-semibold w-40 shrink-0">
                    {spanish ? "Correo" : "Email"}
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${PRIVACY_CONTACT.email}`}
                      className="text-primary hover:underline break-all"
                    >
                      {PRIVACY_CONTACT.email}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <dt className="font-semibold w-40 shrink-0">{spanish ? "País" : "Country"}</dt>
                  <dd className="text-muted-foreground">{PRIVACY_CONTACT.country}</dd>
                </div>
              </dl>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
