import { motion } from "framer-motion";
import { MessageCircle, Instagram, Facebook, ArrowUp } from "lucide-react";
import LogoCube from "@/components/LogoCube";
import { useTranslation } from "@/hooks/useTranslation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const whatsappUrl = "https://wa.me/50646009140";

  const productLinks = [
    { href: "#products", label: t("nav.products") },
    { href: "#pricing", label: t("nav.pricing") },
    { href: "#faq", label: t("nav.faq") },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", window.location.pathname);
  };

  return (
    <footer className="pt-20 pb-10 bg-card/50 border-t border-white/5 relative">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-2"
          >
            <a href="#" className="inline-flex h-10 items-center mb-4" aria-label="QubeSight">
              <LogoCube />
            </a>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">{t("footer.tagline")}</p>
            <div className="flex gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="h-10 w-10 rounded-xl glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="h-10 w-10 rounded-xl glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="h-10 w-10 rounded-xl glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          <div>
            <h4 className="font-semibold font-display mb-4 text-sm uppercase tracking-wider">{t("footer.product")}</h4>
            <ul className="space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-display mb-4 text-sm uppercase tracking-wider">{t("footer.legal")}</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.terms")}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.privacy")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} QubeSight. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground">
              Made with <span className="text-primary">⚡</span> in Costa Rica
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label={t("footer.backToTop")}
              className="inline-flex items-center gap-2 rounded-full glass-card border border-white/10 px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={2} />
              {t("footer.backToTop")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
