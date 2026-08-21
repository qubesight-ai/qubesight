import { useRef, useState, useEffect, KeyboardEvent, MouseEvent } from "react";
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
import { useSectionNavigation } from "@/hooks/useSectionNavigation";
import { NAV_SECTION_IDS } from "@/lib/sectionNav";

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
  const desktopLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const { t, language } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const { activeSection, navigateToSection, refreshActive } = useSectionNavigation(
    NAV_SECTION_IDS,
    isHome,
  );

  const navLabelKeys: Record<(typeof NAV_SECTION_IDS)[number], string> = {
    problem: "nav.problem",
    solution: "nav.solution",
    products: "nav.products",
    voicebot: "nav.voicebot",
    industries: "nav.industries",
    pricing: "nav.pricing",
    faq: "nav.faq",
  };

  const navLinks = NAV_SECTION_IDS.map((id) => ({
    id,
    href: sectionHref(id),
    label: t(navLabelKeys[id]),
  }));

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isHome) return;
    e.preventDefault();
    // Alt+click requests instant jump (no smooth animation).
    navigateToSection(id, { instant: e.altKey });
    setIsMobileMenuOpen(false);
    // Recalc after menu closes — header height changes on mobile.
    requestAnimationFrame(() => refreshActive());
  };

  const handleNavKeyDown = (e: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    const count = navLinks.length;
    let next = index;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        next = (index + 1) % count;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        next = (index - 1 + count) % count;
        break;
      case "Home":
        e.preventDefault();
        next = 0;
        break;
      case "End":
        e.preventDefault();
        next = count - 1;
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        navigateToSection(navLinks[index].id, { instant: e.altKey });
        setIsMobileMenuOpen(false);
        return;
      default:
        return;
    }

    desktopLinkRefs.current[next]?.focus();
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    // Mobile drawer changes header height — refresh active probe.
    requestAnimationFrame(() => refreshActive());
  }, [isMobileMenuOpen, refreshActive]);

  const whatsappUrl = `https://wa.me/50646009140?text=${encodeURIComponent(
    language === "es"
      ? "Hola, quiero empezar con QubeSight."
      : "Hi, I want to get started with QubeSight."
  )}`;

  const demosLabel = language === "es" ? "Demos en vivo" : "Live demos";
  const navAriaLabel = language === "es" ? "Secciones principales" : "Main sections";

  return (
    <motion.header
      data-site-header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className="container">
        <nav
          className="flex items-center justify-between h-20"
          aria-label={navAriaLabel}
        >
          <Link
            to="/"
            className="group flex h-10 w-10 min-[420px]:w-[10.75rem] items-center overflow-hidden"
            aria-label="QubeSight"
          >
            <LogoCube />
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  ref={(el) => {
                    desktopLinkRefs.current[index] = el;
                  }}
                  href={link.href}
                  data-nav-section={link.id}
                  tabIndex={0}
                  onClick={(e) => handleNavClick(e, link.id)}
                  onKeyDown={(e) => handleNavKeyDown(e, index)}
                  aria-current={isActive ? "location" : undefined}
                  aria-label={
                    isActive
                      ? language === "es"
                        ? `${link.label}, sección actual`
                        : `${link.label}, current section`
                      : link.label
                  }
                  className={`text-sm font-medium transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <DropdownMenu>
              <DropdownMenuTrigger className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-sm">
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
              className="p-2 text-foreground min-h-[48px] min-w-[48px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-panel"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden glass-nav border-t border-white/5"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      data-nav-section={link.id}
                      onClick={(e) => handleNavClick(e, link.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={`block px-4 py-3 rounded-lg transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                        isActive ? "text-primary bg-secondary/60" : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}

                <button
                  onClick={() => setIsMobileDemosOpen((v) => !v)}
                  aria-expanded={isMobileDemosOpen}
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
