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
      image: "/team/juan-carlos-barboza.jpg",
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
