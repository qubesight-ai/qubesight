import Header from "@/components/layout/Header";
import TrustBar from "@/components/sections/TrustBar";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import HowItWorks from "@/components/sections/HowItWorks";
import Multichannel from "@/components/sections/Multichannel";
import Products from "@/components/sections/Products";
import VoiceBot from "@/components/sections/VoiceBot";
import Industries from "@/components/sections/Industries";
import Benefits from "@/components/sections/Benefits";
import SocialProof from "@/components/sections/SocialProof";
import Testimonials from "@/components/sections/Testimonials";
import Founders from "@/components/sections/Founders";
import Integrations from "@/components/sections/Integrations";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import GuaranteeStrip from "@/components/sections/GuaranteeStrip";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CinematicStory from "@/components/sections/CinematicStory";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const PrototypeHero = () => {
  const { language, t } = useTranslation();
  const spanish = language === "es";
  return <section id="hero" className="prototype-hero"><div className="prototype-cube prototype-cube-a" aria-hidden="true"><span/><span/><span/><span/><span/><span/><i><b/><b/><b/><b/><b/><b/></i></div><div className="prototype-cube prototype-cube-b" aria-hidden="true"><span/><span/><span/><span/><span/><span/><i><b/><b/><b/><b/><b/><b/></i></div><div className="prototype-eyebrow">● {spanish ? "AGENTES IA PARA NEGOCIOS QUE CRECEN" : "AI AGENTS FOR GROWING BUSINESSES"}</div><h1>{spanish ? "Tus clientes" : "Your customers"}<br/>{spanish ? "no esperan." : "won’t wait."}<br/><em>{spanish ? "Tu IA tampoco debería." : "Your AI shouldn’t either."}</em></h1><div className="prototype-hero-bottom"><p>{t("hero.subhead.1")}</p><div><a href="#products" className="prototype-button">{t("hero.cta.primary")} <ArrowDown className="h-4 w-4"/></a><a href="#contact" className="prototype-text-link">{spanish ? "Hablar con un experto" : "Talk to an expert"} <ArrowUpRight className="inline h-4 w-4"/></a></div></div></section>;
};

const PrototypeShellHome = () => {
  useScrollReveal();
  return <div className="prototype-shell"><Header/><main><PrototypeHero/><section className="prototype-statement"><span>[ 01 — EL PROBLEMA ]</span><h2>La misma inteligencia que tu equipo necesita.<br/><em>Una experiencia que tus clientes merecen.</em></h2><p>QubeSight conserva todos tus canales, productos y flujos; el nuevo diseño simplemente les da una experiencia más clara y memorable.</p></section><CinematicStory/><div className="prototype-content"><TrustBar/><Problem/><Solution/><HowItWorks/><Multichannel/><Products/><VoiceBot/><Industries/><Benefits/><SocialProof/><Testimonials/><Founders/><Integrations/><Pricing/><FAQ/><GuaranteeStrip/><FinalCTA/></div></main><Footer/><WhatsAppButton/></div>;
};
export default PrototypeShellHome;