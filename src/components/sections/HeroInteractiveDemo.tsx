import { FormEvent, useEffect, useRef, useState } from "react";
import { CalendarDays, CircleUserRound, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type HeroInteractiveDemoProps = { spanish: boolean };
type DemoMessage = { id: number; sender: "user" | "assistant"; text: string };

const replies = {
  schedule: {
    es: "Claro. Puedo ayudarte a coordinar una presentación. ¿Qué día y hora te funcionan mejor?",
    en: "Of course. I can help arrange a presentation. What day and time work best for you?",
  },
  services: {
    es: "QubeSight ofrece Voice Bots, Chatbots, automatización de procesos e integración empresarial.",
    en: "QubeSight offers Voice Bots, Chatbots, process automation, and business integrations.",
  },
  human: {
    es: "Con gusto. Puedes hablar con nuestro equipo directamente por WhatsApp.",
    en: "Absolutely. You can speak with our team directly on WhatsApp.",
  },
  hours: {
    es: "La recepción con IA puede atender consultas las 24 horas y transferir los casos que requieren atención humana.",
    en: "The AI receptionist can answer questions 24/7 and transfer cases that need human attention.",
  },
  default: {
    es: "Puedo responder consultas, capturar y calificar leads, agendar citas y dar seguimiento. ¿Qué necesitas resolver?",
    en: "I can answer questions, capture and qualify leads, book appointments, and follow up. What do you need?",
  },
};

const HeroInteractiveDemo = ({ spanish }: HeroInteractiveDemoProps) => {
  const nextId = useRef(3);
  const replyTimer = useRef<number | null>(null);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<DemoMessage[]>([
    {
      id: 1,
      sender: "user",
      text: spanish
        ? "Hola, ¿cuál es su horario de atención?"
        : "Hi, what are your business hours?",
    },
    {
      id: 2,
      sender: "assistant",
      text: spanish
        ? "La recepción con IA puede atender consultas las 24 horas. ¿Te gustaría agendar una presentación?"
        : "The AI receptionist can answer questions 24/7. Would you like to book a presentation?",
    },
  ]);

  useEffect(
    () => () => {
      if (replyTimer.current) window.clearTimeout(replyTimer.current);
    },
    [],
  );

  const answerFor = (text: string) => {
    const normalized = text.toLocaleLowerCase();
    if (/cita|agend|present|meeting|appointment/.test(normalized)) return replies.schedule;
    if (/servicio|producto|voice|chatbot|service|product/.test(normalized)) return replies.services;
    if (/humano|persona|asesor|human|person|advisor/.test(normalized)) return replies.human;
    if (/hora|horario|abierto|hours|open/.test(normalized)) return replies.hours;
    return replies.default;
  };

  const sendMessage = (text: string) => {
    const cleanText = text.trim();
    if (!cleanText || typing) return;
    setMessages((current) => [
      ...current.slice(-3),
      { id: nextId.current++, sender: "user", text: cleanText },
    ]);
    setDraft("");
    setTyping(true);
    const response = answerFor(cleanText);
    replyTimer.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current.slice(-3),
        { id: nextId.current++, sender: "assistant", text: spanish ? response.es : response.en },
      ]);
      setTyping(false);
    }, 550);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(draft);
  };

  return (
    <div
      className="qs-matilda-glass"
      aria-label={spanish ? "Demo interactiva de Matilda" : "Interactive Matilda demo"}
    >
      <div className="qs-matilda-header">
        <div className="hero-matilda-avatar">M</div>
        <div>
          <div className="qs-matilda-name">Matilda</div>
          <span>{spanish ? "Tu recepcionista de IA" : "Your AI receptionist"}</span>
        </div>
        <div className="qs-online">
          <i /> {spanish ? "En línea" : "Online"}
        </div>
      </div>
      <div className="qs-demo-conversation" aria-live="polite">
        {messages.map((message) =>
          message.sender === "user" ? (
            <div key={message.id} className="qs-message qs-message-user">
              {message.text}
            </div>
          ) : (
            <div key={message.id} className="qs-message-row">
              <div className="hero-matilda-avatar qs-avatar-small">M</div>
              <div className="qs-message">{message.text}</div>
            </div>
          ),
        )}
        {typing && (
          <div
            className="qs-message-row"
            aria-label={spanish ? "Matilda está escribiendo" : "Matilda is typing"}
          >
            <div className="hero-matilda-avatar qs-avatar-small">M</div>
            <div className="qs-message qs-typing" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </div>
        )}
      </div>
      <div className="qs-quick-actions">
        <Button
          type="button"
          variant="ghost"
          onClick={() =>
            sendMessage(
              spanish ? "Quiero agendar una presentación" : "I want to book a presentation",
            )
          }
        >
          <CalendarDays />
          {spanish ? "Agendar presentación" : "Book presentation"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() =>
            sendMessage(spanish ? "¿Qué servicios ofrecen?" : "What services do you offer?")
          }
        >
          <MessageCircle />
          {spanish ? "Ver servicios" : "See services"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() =>
            sendMessage(spanish ? "Quiero hablar con un humano" : "I want to talk to a person")
          }
        >
          <CircleUserRound />
          {spanish ? "Hablar con alguien" : "Talk to a person"}
        </Button>
      </div>
      <form className="qs-chat-input" onSubmit={submit}>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={spanish ? "Escribe tu mensaje..." : "Type your message..."}
          aria-label={spanish ? "Mensaje para Matilda" : "Message for Matilda"}
          maxLength={180}
        />
        <Button
          type="submit"
          variant="default"
          size="icon"
          disabled={!draft.trim() || typing}
          aria-label={spanish ? "Enviar mensaje" : "Send message"}
        >
          <Send />
        </Button>
      </form>
    </div>
  );
};

export default HeroInteractiveDemo;
