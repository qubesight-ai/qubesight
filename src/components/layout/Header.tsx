import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LogoCube from "@/components/LogoCube";

const demoLinks = [
  { to: "/restaurantes", emoji: "🍽️", label: "Restaurantes" },
  { to: "/salones", emoji: "💇", label: "Salones" },
  { to: "/dental", emoji: "🦷", label: "Clínicas dentales" },
  { to: "/gimnasios", emoji: "💪", label: "Gimnasios" },
  { to: "/inmobiliarias", emoji: "🏠", label: "Inmobiliarias" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDemosOpen, setIsMobileDemosOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { t, language } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const navLinks = [
    { id: "problem", href: sectionHref("problem"), label: t("nav.problem") },
    { id: "assistant", href: sectionHref("assistant"), label: t("nav.assistant") },
    { id: "voicebot", href: sectionHref("voicebot"), label: t("nav.voicebot") },
    { id: "qubeops", href: sectionHref("qubeops"), label: t("nav.ops") },
    { id: "industries", href: sectionHref("industries"), label: t("nav.industries") },
    { id: "pricing", href: sectionHref("pricing"), label: t("nav.pricing") },
  ];

  const HEADER_OFFSET = 80;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isHome) return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (!isHome) return;
      let current = "";
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= HEADER_OFFSET + 40) current = link.id;
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome]);


  const whatsappUrl = `https://wa.me/50646009140?text=${encodeURIComponent(
    language === "es"
      ? "Hola, quiero empezar con QubeSight."
      : "Hi, I want to get started with QubeSight."
  )}`;

  const demosLabel = language === "es" ? "Demos en vivo" : "Live demos";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="group flex h-10 w-10 min-[420px]:w-[10.75rem] items-center overflow-hidden"
            aria-label="QubeSight"
          >
            <LogoCube />
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                aria-current={activeSection === link.id ? "true" : undefined}
                className={`text-sm font-medium transition-colors duration-200 hover:text-foreground ${
                  activeSection === link.id ? "text-foreground" : "text-muted-foreground"
                }`}

              >
                {link.label}
              </a>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200 outline-none">
                <Sparkles className="h-3.5 w-3.5" />
                {demosLabel}
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 glass-card border-white/10 mt-2"
              >
                {demoLinks.map((d) => (
                  <DropdownMenuItem key={d.to} asChild className="cursor-pointer">
                    <Link
                      to={d.to}
                      className="flex items-center gap-3 py-2.5 px-3 text-sm"
                    >
                      <span className="text-lg">{d.emoji}</span>
                      <span className="flex-1">{d.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="hero" size="default" asChild className="min-h-[44px]">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {t("nav.contact")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden glass-nav border-t border-white/5"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}

                <button
                  onClick={() => setIsMobileDemosOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3 text-primary hover:bg-secondary rounded-lg transition-colors"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <Sparkles className="h-4 w-4" />
                    {demosLabel}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isMobileDemosOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isMobileDemosOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 space-y-1 pt-1">
                        {demoLinks.map((d) => (
                          <Link
                            key={d.to}
                            to={d.to}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileDemosOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-colors"
                          >
                            <span className="text-lg">{d.emoji}</span>
                            <span className="flex-1 text-sm">{d.label}</span>
                            <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="px-4 pt-3">
                  <Button variant="hero" size="lg" asChild className="w-full min-h-[48px]">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      {t("nav.contact")}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
