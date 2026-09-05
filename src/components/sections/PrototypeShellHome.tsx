import Header from "@/components/layout/Header";
import ValueProposition from "@/components/sections/ValueProposition";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import HowItWorks from "@/components/sections/HowItWorks";
import MatildaVoiceDemo from "@/components/sections/MatildaVoiceDemo";
import EarlyAdopters from "@/components/sections/EarlyAdopters";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const PrototypeHero = () => {
  const { language } = useTranslation();
  const spanish = language === "es";
  return (
    <section id="hero" className="prototype-hero">
      <div className="prototype-cube prototype-cube-a" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <i>
          <b />
          <b />
          <b />
          <b />
          <b />
          <b />
        </i>
      </div>
      <div className="prototype-cube prototype-cube-b" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <i>
          <b />
          <b />
          <b />
          <b />
          <b />
          <b />
        </i>
      </div>
      <div className="prototype-eyebrow">
        ● {spanish ? "RECEPCIÓN CON IA PARA NEGOCIOS" : "AI RECEPTION FOR BUSINESSES"}
      </div>
      <h1>
        {spanish ? "Tus clientes quieren respuestas" : "Your customers want answers"}
        <br />
        {spanish ? "cuando las necesitan." : "when they need them."}
        <br />
        <em>
          {spanish
            ? "QubeSight ayuda a que tu negocio pueda atenderlos."
            : "QubeSight helps your business be there for them."}
        </em>
      </h1>
      <div className="prototype-hero-bottom">
        <p>
          {spanish
            ? "QubeSight es una recepción con inteligencia artificial para atender llamadas y consultas digitales, responder preguntas frecuentes y gestionar oportunidades cuando tu equipo está ocupado."
            : "QubeSight is an AI reception service for calls and digital inquiries, answering common questions and managing opportunities while your team is busy."}
        </p>
        <div>
          <a href="#early-adopters" className="prototype-button">
            {spanish ? "Solicitar una demostración" : "Request a demo"}{" "}
            <ArrowDown className="h-4 w-4" />
          </a>
          <a href="#demo" className="prototype-text-link">
            {spanish ? "Ver demo" : "See demo"} <ArrowUpRight className="inline h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

const PrototypeShellHome = () => {
  useScrollReveal();
  return (
    <div className="prototype-shell">
      <Header />
      <main>
        <PrototypeHero />
        <div className="prototype-content">
          <Problem />
          <ValueProposition />
          <Solution />
          <HowItWorks />
          <MatildaVoiceDemo />
          <EarlyAdopters />
          <FAQ />
          <FinalCTA />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
export default PrototypeShellHome;
