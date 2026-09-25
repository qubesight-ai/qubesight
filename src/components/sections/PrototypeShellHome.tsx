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
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const PrototypeHero = () => {
  const { language } = useTranslation();
  const spanish = language === "es";

  const widgets = [
    {
      icon: PhoneCall,
      title: spanish ? "Llamadas" : "Calls",
      value: spanish ? "Atención 24/7" : "24/7 coverage",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: spanish ? "Respuestas al instante" : "Instant replies",
    },
    {
      icon: CalendarDays,
      title: spanish ? "Agenda" : "Calendar",
      value: spanish ? "Citas organizadas" : "Appointments organized",
    },
  ];

  return (
    <section id="hero" className="prototype-hero">
      <div className="aero-ambient aero-ambient-left" aria-hidden="true" />
      <div className="aero-ambient aero-ambient-right" aria-hidden="true" />
      <div className="aero-horizon" aria-hidden="true" />

      <div className="aero-orbit aero-orbit-large" aria-hidden="true" />
      <div className="aero-orbit aero-orbit-small" aria-hidden="true" />

      <div
        className="aero-hero-panel hero-matilda-card"
        aria-label={spanish ? "Demo de Matilda" : "Matilda demo"}
      >
        <div className="aero-panel-topline hero-matilda-topline">
          <span />
          <span />
          <span />
          <strong>{spanish ? "Demo de Matilda" : "Matilda demo"}</strong>
        </div>
        <div className="hero-matilda-body">
          <div className="hero-matilda-header">
            <div className="hero-matilda-avatar">M</div>
            <div className="hero-matilda-meta">
              <h3>Matilda</h3>
              <p>
                {spanish
                  ? "Recepcionista IA para llamadas y consultas"
                  : "AI receptionist for calls and inquiries"}
              </p>
            </div>
          </div>
          <div className="hero-matilda-wave" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="hero-matilda-bubble">
            {spanish
              ? "Hola, soy Matilda. Puedo atender clientes, responder preguntas y ayudarte a agendar una demostración."
              : "Hi, I’m Matilda. I can answer customers, handle questions, and help schedule a demo."}
          </div>
          <div className="hero-matilda-actions">
            <a href="#demo" className="hero-matilda-primary">
              {spanish ? "Probar a Matilda" : "Try Matilda"}
            </a>
            <a href="#early-adopters" className="hero-matilda-secondary">
              {spanish ? "Solicitar demo" : "Request demo"}
            </a>
          </div>
        </div>
      </div>

      <div className="prototype-eyebrow">
        <Sparkles className="h-3.5 w-3.5" />
        {spanish ? "RECEPCIÓN CON IA PARA NEGOCIOS" : "AI RECEPTION FOR BUSINESSES"}
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

      <div className="aero-trustline">
        <ShieldCheck className="h-4 w-4" />
        <span>
          {spanish
            ? "Automatización clara, profesional y diseñada para negocios reales."
            : "Clear, professional automation designed for real businesses."}
        </span>
      </div>

      <div
        className="aero-widget-dock"
        aria-label={spanish ? "Capacidades de QubeSight" : "QubeSight capabilities"}
      >
        {widgets.map(({ icon: Icon, title, value }) => (
          <div className="aero-widget" key={title}>
            <div className="aero-widget-icon">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <strong>{title}</strong>
              <span>{value}</span>
            </div>
          </div>
        ))}
      </div>

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
