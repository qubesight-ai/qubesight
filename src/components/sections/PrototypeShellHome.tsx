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
  Mic,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Volume2,
  Linkedin,
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
        aria-label={spanish ? "Hablar con Matilda" : "Talk to Matilda"}
      >
        <div className="aero-panel-topline hero-matilda-topline">
          <span />
          <span />
          <span />
          <strong>{spanish ? "DEMO DE VOZ EN VIVO" : "LIVE VOICE DEMO"}</strong>
        </div>

        <div className="hero-matilda-body">
          <div className="hero-matilda-header">
            <div className="hero-matilda-avatar">M</div>
            <div className="hero-matilda-meta">
              <div className="hero-matilda-name-row">
                <h3>Matilda</h3>
                <span className="hero-matilda-online">
                  <i />
                  {spanish ? "En línea" : "Online"}
                </span>
              </div>
              <p>
                {spanish
                  ? "Recepcionista de voz con IA de QubeSight"
                  : "QubeSight AI voice receptionist"}
              </p>
            </div>
          </div>

          <div className="hero-matilda-console">
            <div className="hero-matilda-console-top">
              <Volume2 className="h-4 w-4" />
              <span>{spanish ? "Matilda está lista para escucharte" : "Matilda is ready to listen"}</span>
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
              <span />
              <span />
            </div>

            <div className="hero-matilda-bubble">
              {spanish
                ? "Podés hablar conmigo como si llamaras a una recepción real. Preguntame por servicios, horarios o una demostración."
                : "Talk to me like you would with a real receptionist. Ask about services, hours, or a demo."}
            </div>

            <a href="#demo" className="hero-matilda-talk">
              <span className="hero-matilda-mic">
                <Mic className="h-5 w-5" />
              </span>
              <span>
                <strong>{spanish ? "Hablar con Matilda" : "Talk to Matilda"}</strong>
                <small>{spanish ? "Demo de voz interactiva" : "Interactive voice demo"}</small>
              </span>
              <ArrowDown className="ml-auto h-4 w-4" />
            </a>
          </div>

          <div className="hero-matilda-footnote">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>
              {spanish ? "Demo segura · hasta 5 turnos de conversación" : "Secure demo · up to 5 conversation turns"}
            </span>
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


const WhoWeAre = () => {
  const { language } = useTranslation();
  const spanish = language === "es";

  const founders = [
    {
      name: "Ernesto Libby Lugo",
      role: spanish ? "Fundador" : "Founder",
      description: spanish
        ? "Lidera la visión de QubeSight, el desarrollo de producto y la estrategia tecnológica."
        : "Leads QubeSight's vision, product development, and technology strategy.",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wgARCAH0AZADASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECBv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIQAxAAAAHowgACgASiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACggAAAAAAAAAAAhQAAAAAAAAAAAAAAAAAAAAAAAJYUAAAAAAAAAAAAAAAAAAAAAAACWFAAAAAAAAAAAAAAAAAAAAAAAQAUAAAAAAAAAAAAAAAAAAAACWAApAUAAAAAAAAAAAAAAAAAAAAAgspKEWFAAAAAAAAAAAAAAAAAAAAAAIVBYFAAAAAAAAAAAAAAAAAAAAIUhUAAFAAAAAAAAAAAAAAAAAAIWAAAAABQAAAAAAAAAAAAAAAACAAAAAAAFSgAAAAAAAAAAAAAAEAAAAAAAAAoAAAAAAAAAAAAAARYAAAAAAAAAUAAAAAAAAAAAAABAAAAAAAAACAtAAAAAAAAAAAAIAAAAAAAAAACJYGgoAAAAAAAAAAgAAAAAAAAAACIAGkqgEFQVBUCwVBUFgVAAAAAAAAAIVBUJYAAGgoEsoAgAAAAAAAAAAAAAAAIIAAABaKIAAAAAAAAAAAAAAAAAQIAAAABoKAAAAlhQAIAAAAAAAAACCAAAAAAaSrLKIAAAAAAAAAAAAAACCAAAAAAAUKAAAAAAAAAAAAAAAggAAAAAAAFCgAAAAAAAAAACFlhUFQgAAAAABBUFSlCgAAAAAAAAAAJRAAgAAAAAAEWCygFCgAAEFQVBQAEoQAAAgAAAAABBYACygFCgAIAAFAAAAABAgAAAAAAAAAAAFCgIAAAACwUAACCAAAAAAAAAAAAAUKlgAAAACAAVC2ACAAAAAAJYVBQAAAAUKgAAAAAgAAAAAAAAAhSFgLKAAAAAtIAAAAgAAAAAAAAhQAIAACygAAAALYAAIAAAAAAAAAIWAAAAAABQAAAAoAAIAAAAAAAABAAAAAAAAUAAAKB/8QAFBABAAAAAAAAAAAAAAAAAAAAsP/aAAgBAQABBQJE7//EABQRAQAAAAAAAAAAAAAAAAAAAJD/2gAIAQMBAT8BSD//xAAUEQEAAAAAAAAAAAAAAAAAAACQ/9oACAECAQE/AUg//8QAFBABAAAAAAAAAAAAAAAAAAAAsP/aAAgBAQAGPwJE7//EABQQAQAAAAAAAAAAAAAAAAAAALD/2gAIAQEAAT8hRO//2gAMAwEAAgADAAAAEPffYQSXfffffffXfffffffffaffffffffffffPffffffffffbRdfffffffffffffffffffdacQVVfffffffffffafafYYQQQQQQVdfefffffefeccYQQQQQQQQQTfVaRfffffYQQQQQQQQQQQQVfeftffcdfffdfYccUcUcYcQQRaYNsffYfefeUcYcYQQQQQQQQQRDngYQVfdeYQQQQQQQSTeQQRRDvvgQRRQQQQQQQQSQQQQQRXfPvrogQQQQQQQQQQQQQQQQRfffOuggiQQQRQQQQQQQQQQQfffdPogggoQTTTTTQQQQQQQQdffPnjiggggXfeecYQQQQQQQTffPPuogggwhfeQQQQQQQQQRfffPPOggggh30QQQQQQQQQQRfffPKOggggg3/wAkE00020010333DDAAIIY49vNcEGkF333333333jAAAIIJ/wD/AI04RffffffffffPAAAgggv/APesMMEEEEFUEF33zzygAIIJ/wD/AO+w1yaXfffffffPPOAAggn/AP8A/jDDD99999999884AAACCf8A/wDuMMMIP3333n3nDBAAARY4/POMMMM44tX3iECCAAAAABL7/wDLDDDDC2qDUgAAMMMAAIM++/zDDDDDOe+qD4AAe++CAAAAC/8A/wD8MMMMIIIMcAB77L764IIJ/wD77jDDCCCCDDfAU6CCS/8A/wA57/8ArDDDDWOCDDD3AcqCCC//AP8A/wDjDDDDHGeqDDDDWE++CDDf/wCwwwwxww3vvqgwww3nPoww0/8AsMMMMd//AO+++/DDDf8AvIgwww34wwww/wD/AP8Avvv/AMMMP77/xAAXEQEAAwAAAAAAAAAAAAAAAAABQHCQ/9oACAEDAQE/EMPiSWT/AP/EABQRAQAAAAAAAAAAAAAAAAAAAJD/2gAIAQIBAT8QSD//xAAeEAACAgMBAQEBAAAAAAAAAAABcUFQMUBRABEQIP/aAAgBAQABPxCxOCrI4K2fmycFbR2DgqyOCrI4KsjgqyOCrI4KsjgqyOCvCxOCrI4KsoKsjgqygqygrWG5BX9Cs6tCaKCtudfq251+rbnX6tudfqsuqy6rLqsuqy6vCx6rISrISrISrISrISrISrISrISrISrISrISrISrISrISrISv37u/dISrISrISrISrISrISrISrISrISrISrISrISrISrLqsuqy6rLqsur3/2Q==",
      linkedin: "https://www.linkedin.com/in/ernestolibby25/",
    },
    {
      name: "Juan Carlos Barboza González",
      role: spanish ? "Co-Fundador" : "Co-Founder",
      description: spanish
        ? "Impulsa la estrategia de negocio, el desarrollo comercial y el crecimiento de QubeSight."
        : "Drives QubeSight's business strategy, commercial development, and growth.",
      image: "data:image/jpeg;base64,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",
      linkedin: "https://www.linkedin.com/in/juan-carlos-barboza-gonz%C3%A1lez-%D7%97%D7%95%D7%90%D7%9F-8492511a2/",
    },
  ];

  return (
    <section id="quienes-somos" className="founders-aero-section">
      <div className="container founders-aero-container">
        <div className="founders-aero-heading">
          <span className="founders-aero-eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            {spanish ? "QUIÉNES SOMOS" : "ABOUT US"}
          </span>
          <h2>{spanish ? "Las personas detrás de QubeSight" : "The people behind QubeSight"}</h2>
          <p>
            {spanish
              ? "Tecnología y negocio trabajando juntos para construir experiencias de atención con IA útiles para empresas reales."
              : "Technology and business working together to build useful AI customer experiences for real companies."}
          </p>
        </div>

        <div className="founders-aero-grid">
          {founders.map((founder) => (
            <article className="founder-aero-card" key={founder.name}>
              <div className="founder-aero-photo-shell">
                <img src={founder.image} alt={founder.name} className="founder-aero-photo" loading="lazy" />
                <span className="founder-aero-photo-shine" aria-hidden="true" />
              </div>

              <div className="founder-aero-body">
                <span className="founder-aero-role">{founder.role}</span>
                <h3>{founder.name}</h3>
                <p>{founder.description}</p>

                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="founder-aero-linkedin"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </article>
          ))}
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
          <WhoWeAre />
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
