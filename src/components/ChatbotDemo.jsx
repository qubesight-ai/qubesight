import { useState, useRef, useEffect } from "react";

// ─── NICHE CONFIGURATIONS ────────────────────────────────────────────────────
// Each niche has:
//  - bizName / color / emoji / bgLight
//  - services: list with id, name, price (used for menus, booking, quotes)
//  - bookingLabel: "cita" | "reserva" | "visita"
//  - faqs: array of {triggers, response}
//  - autoWelcome
const NICHES = {
  restaurante: {
    label: "Restaurante",
    emoji: "🍽️",
    color: "#C0392B",
    bgLight: "#FDF2F0",
    bizName: "La Cocina Tica",
    phone: "8888-0000",
    address: "Curridabat, San José · 200m norte del parque",
    bookingLabel: "reserva",
    services: [
      { id: "1", name: "Casado con pollo", price: "₡4,000" },
      { id: "2", name: "Casado con carne", price: "₡4,500" },
      { id: "3", name: "Casado vegetariano", price: "₡3,500" },
      { id: "4", name: "Arroz con pollo", price: "₡4,000" },
      { id: "5", name: "Sopa del día", price: "₡2,500" },
      { id: "6", name: "Gallo pinto + huevos", price: "₡2,500" },
      { id: "7", name: "Empanadas (3 und)", price: "₡2,000" },
      { id: "8", name: "Refresco natural", price: "₡1,000" },
    ],
    extraFaqs: [
      {
        triggers: ["alergia", "alergias", "gluten", "celiaco", "celíaco", "vegano", "vegetariano"],
        response: `🌱 OPCIONES ESPECIALES\n\n• Vegetariano: casado #3, sopa del día\n• Sin gluten: arroz con pollo, gallo pinto\n• Vegano bajo pedido (avisa al ordenar)\n\nSi tienes una alergia específica, indícamela y la marco en tu pedido.`,
      },
      {
        triggers: ["delivery", "domicilio", "envio", "envío", "entrega"],
        response: `🛵 DELIVERY\n\n• Zona: Curridabat, Sabanilla, San Pedro\n• Tiempo: 25–40 min\n• Envío: ₡1,500 (gratis sobre ₡10,000)\n• Pago: efectivo, SINPE, tarjeta\n\nEscribe *"pedir"* o el número del platillo para ordenar.`,
      },
      {
        triggers: ["pago", "tarjeta", "sinpe", "efectivo", "metodo", "método"],
        response: `💳 FORMAS DE PAGO\n\n• Efectivo (colones / USD)\n• SINPE Móvil · 8888-0000\n• Tarjeta (Visa / Mastercard)\n• Link de pago al WhatsApp\n\n¿Deseas que te envíe la *cotización por SMS*?`,
      },
    ],
  },

  salon: {
    label: "Salón de Belleza",
    emoji: "💇",
    color: "#8E44AD",
    bgLight: "#F9F0FF",
    bizName: "Salón Glam",
    phone: "8777-1234",
    address: "Escazú, San José · Plaza Itskatzú local 12",
    bookingLabel: "cita",
    services: [
      { id: "1", name: "Corte de cabello", price: "₡8,000" },
      { id: "2", name: "Tinte completo", price: "₡25,000" },
      { id: "3", name: "Mechas / balayage", price: "₡35,000" },
      { id: "4", name: "Alisado keratina", price: "₡45,000" },
      { id: "5", name: "Manicure", price: "₡6,000" },
      { id: "6", name: "Pedicure", price: "₡8,000" },
      { id: "7", name: "Manicure + Pedicure", price: "₡13,000" },
      { id: "8", name: "Maquillaje profesional", price: "₡20,000" },
    ],
    extraFaqs: [
      {
        triggers: ["duracion", "duración", "tiempo", "cuanto dura", "cuánto dura"],
        response: `⏱️ DURACIÓN APROXIMADA\n\n• Corte: 45 min\n• Tinte: 1h 30min\n• Mechas / balayage: 2h – 3h\n• Keratina: 2h\n• Mani + Pedi: 1h 15min\n\n¿Te agendo una *cita*?`,
      },
      {
        triggers: ["producto", "productos", "marca", "marcas"],
        response: `💎 USAMOS PRODUCTOS PROFESIONALES\n\n• L'Oréal Professionnel\n• Wella Koleston\n• OPI / CND para uñas\n• Keratina sin formol\n\nGarantizamos resultados o repetimos el servicio.`,
      },
      {
        triggers: ["parqueo", "parking", "estacionamiento"],
        response: `🅿️ PARQUEO\n\nGratis dentro de Plaza Itskatzú.\nValidamos tu ticket en recepción.`,
      },
    ],
  },

  dental: {
    label: "Clínica Dental",
    emoji: "🦷",
    color: "#2980B9",
    bgLight: "#EBF5FB",
    bizName: "DentalCare CR",
    phone: "2222-0000",
    address: "Sabana Sur, San José · Edificio Médico Torre A, piso 3",
    bookingLabel: "cita",
    services: [
      { id: "1", name: "Consulta general", price: "₡15,000" },
      { id: "2", name: "Limpieza dental", price: "₡20,000" },
      { id: "3", name: "Blanqueamiento", price: "₡60,000" },
      { id: "4", name: "Extracción simple", price: "₡25,000" },
      { id: "5", name: "Empaste (resina)", price: "₡30,000" },
      { id: "6", name: "Radiografía", price: "₡12,000" },
      { id: "7", name: "Ortodoncia (consulta)", price: "Gratis" },
      { id: "8", name: "Emergencia dental", price: "₡35,000" },
    ],
    extraFaqs: [
      {
        triggers: ["emergencia", "dolor", "urgente", "urgencia", "duele"],
        response: `🚨 EMERGENCIA DENTAL\n\nTe atendemos hoy mismo.\n📞 2222-0000 (24/7)\nO escribe *"agendar"* y reservo el siguiente cupo libre.\n\n¿Quieres que un *asistente de voz IA te llame ya mismo*? Escribe *"llamada"*.`,
      },
      {
        triggers: ["seguro", "ins", "ccss", "aseguradora", "poliza", "póliza"],
        response: `🏥 SEGUROS QUE ACEPTAMOS\n\n• INS (Vida + Médico)\n• Assa\n• MAPFRE\n• Sagicor\n\nTramitamos el cobro directo. Indícanos tu aseguradora al agendar.`,
      },
      {
        triggers: ["financiamiento", "cuotas", "plan", "pagar a plazos"],
        response: `💳 FINANCIAMIENTO\n\n• Hasta 12 cuotas sin intereses con tarjeta\n• Plan interno para ortodoncia (24 meses)\n• Descuento del 5% pago al contado\n\nTe envío la *cotización por SMS* si me das tu número.`,
      },
    ],
  },

  gym: {
    label: "Gimnasio",
    emoji: "💪",
    color: "#E67E22",
    bgLight: "#FEF9F0",
    bizName: "FitZone CR",
    phone: "8555-2000",
    address: "Curridabat, San José · 100m sur de la Pops",
    bookingLabel: "visita",
    services: [
      { id: "1", name: "Mensualidad básica", price: "₡15,000" },
      { id: "2", name: "Mensualidad premium", price: "₡25,000" },
      { id: "3", name: "Plan trimestral", price: "₡40,000" },
      { id: "4", name: "Plan semestral", price: "₡70,000" },
      { id: "5", name: "Clase de spinning", price: "₡4,000" },
      { id: "6", name: "Clase de yoga", price: "₡4,000" },
      { id: "7", name: "Entrenamiento personal", price: "₡12,000" },
      { id: "8", name: "Día de visita", price: "₡2,500" },
    ],
    extraFaqs: [
      {
        triggers: ["clases", "horario clases", "spinning", "yoga", "crossfit", "zumba"],
        response: `🧘 CLASES GRUPALES\n\n• Spinning: Lun/Mié/Vie 6am, 6pm\n• Yoga: Mar/Jue 7am, 7pm\n• HIIT: Lun–Vie 5:30pm\n• Zumba: Sáb 9am\n\nIncluidas en el plan Premium. Reserva con *"agendar"*.`,
      },
      {
        triggers: ["congelar", "pausar", "vacaciones", "suspender"],
        response: `⏸️ CONGELAR MEMBRESÍA\n\nPuedes pausarla hasta 30 días al año sin costo (con aviso de 5 días).\n\nEscribe *"asesor"* para tramitarlo.`,
      },
      {
        triggers: ["entrenador", "personal trainer", "coach", "rutina"],
        response: `🏋️ ENTRENAMIENTO PERSONAL\n\n• Sesión individual: ₡12,000\n• Pack 8 sesiones: ₡80,000\n• Plan + nutrición: ₡100,000/mes\n\nIncluye evaluación inicial gratis. ¿Te agendo?`,
      },
    ],
  },

  inmobiliaria: {
    label: "Inmobiliaria",
    emoji: "🏠",
    color: "#27AE60",
    bgLight: "#EAFAF1",
    bizName: "PropCR",
    phone: "2233-4455",
    address: "Escazú, San José · Avenida Escazú, Torre 1 piso 5",
    bookingLabel: "visita",
    services: [
      { id: "1", name: "Apartamento 2 hab · Escazú", price: "$185,000" },
      { id: "2", name: "Casa 3 hab · Heredia", price: "$240,000" },
      { id: "3", name: "Penthouse · Rohrmoser", price: "$420,000" },
      { id: "4", name: "Lote 500m² · Alajuela", price: "$95,000" },
      { id: "5", name: "Alquiler apto Sabana", price: "$950/mes" },
      { id: "6", name: "Alquiler casa Curridabat", price: "$1,400/mes" },
      { id: "7", name: "Avalúo de propiedad", price: "Gratis" },
      { id: "8", name: "Asesoría hipotecaria", price: "Gratis" },
    ],
    extraFaqs: [
      {
        triggers: ["credito", "crédito", "hipoteca", "hipotecario", "banco", "prestamo", "préstamo"],
        response: `💳 ASESORÍA HIPOTECARIA\n\nTrabajamos con BAC, BCR, Davivienda, Promerica.\n\n• Pre-aprobación en 48h\n• Hasta 90% de financiamiento\n• Plazo hasta 30 años\n\nEscribe *"cotizar"* y te envío simulación por SMS.`,
      },
      {
        triggers: ["zonas", "ubicaciones", "donde", "dónde tienen"],
        response: `📍 ZONAS CON PROPIEDADES\n\n• Escazú · Santa Ana · Rohrmoser\n• Heredia · Belén · Cariari\n• Curridabat · Sabanilla\n• Alajuela · La Garita\n\n¿En qué zona buscas? Te envío opciones.`,
      },
      {
        triggers: ["extranjero", "expat", "residencia", "english", "ingles", "inglés"],
        response: `🌎 ATENCIÓN A EXTRANJEROS\n\nAtendemos en *español, inglés y portugués* — con *intérprete en vivo* por llamada si lo necesitas.\n\nAsesoría completa: residencia, escritura, due diligence.`,
      },
    ],
  },
};

// ─── UNIVERSAL CROSS-NICHE FLOWS (voice, SMS, interpretation, payment) ───────
const UNIVERSAL_FLOWS = [
  {
    key: "voz",
    triggers: [
      "llamada", "llamame", "llámame", "llamar", "voz", "voice", "call",
      "telefono", "teléfono", "asistente", "receptionist", "habla",
    ],
    response: (niche) =>
      `🎙️ ASISTENTE DE VOZ IA\n\nNuestro asistente de voz puede llamarte ahora mismo y:\n\n• Contestar tus preguntas en tiempo real\n• Agendar tu ${niche.bookingLabel} en el calendario\n• Enviarte la *cotización por SMS* al terminar\n• Interpretar la llamada *español ↔ inglés* en vivo\n\n📞 Línea demo: ${niche.phone}\nO escribe *"agendar"* y te llamamos en menos de 1 minuto.`,
  },
  {
    key: "interprete",
    triggers: [
      "english", "ingles", "inglés", "interprete", "intérprete",
      "interpretacion", "interpretación", "traducir", "translate",
      "idioma", "language", "bilingue", "bilingüe",
    ],
    response: (niche) =>
      `🌐 INTERPRETACIÓN EN VIVO\n\nWe also speak English! 🇺🇸🇪🇸\n\nNuestro asistente IA traduce la llamada en tiempo real:\n• Español ↔ English ↔ Português\n• Latencia < 1 segundo\n• Sin operador humano de por medio\n\nEscribe *"llamada"* para probarlo o *"agendar"* y te contactamos en tu idioma.`,
  },
  {
    key: "cotizar",
    triggers: [
      "cotizar", "cotizacion", "cotización", "presupuesto", "precio total",
      "sms", "mensaje", "quote",
    ],
    response: (niche) => {
      const top = niche.services.slice(0, 3)
        .map((s) => `• ${s.name} — ${s.price}`).join("\n");
      return `📲 COTIZACIÓN POR SMS\n\nTe enviamos un resumen al instante a tu celular:\n\n${top}\n\nEscribe *"agendar"* y al final del flujo te llega el SMS con tu cotización personalizada y enlace de pago.`;
    },
  },
];

// ─── BOOKING STATE MACHINE ────────────────────────────────────────────────────
// Stages: idle → service → date → time → name → phone → done
const BOOKING_TRIGGERS = [
  "agendar", "reservar", "reserva", "cita", "turno", "visita",
  "appointment", "book", "pedir", "ordenar",
];

function isBookingTrigger(msg) {
  const m = msg.toLowerCase().trim();
  return BOOKING_TRIGGERS.some((t) => m === t || m.includes(t));
}

function bookingPrompt(stage, niche, data) {
  switch (stage) {
    case "service":
      return `📋 AGENDAR ${niche.bookingLabel.toUpperCase()}\n\n¿Qué servicio te interesa?\n\n${niche.services
        .map((s) => `${s.id}️⃣ ${s.name} — ${s.price}`)
        .join("\n")}\n\n✍️ Escribe el número.`;
    case "date":
      return `📅 Perfecto, *${data.service.name}*.\n\n¿Para qué día? (ej: *mañana*, *viernes*, *15/jun*)`;
    case "time":
      return `🕐 ¿A qué hora? (ej: *10am*, *3:30pm*, *en la tarde*)`;
    case "name":
      return `📝 Listo. ¿A nombre de quién agendo?`;
    case "phone":
      return `📱 Último paso — ¿a qué número te envío la *confirmación + cotización por SMS*?`;
    default:
      return null;
  }
}

function bookingConfirmation(niche, data) {
  return (
    `✅ ¡${data.name.split(" ")[0]}, ${niche.bookingLabel} confirmada!\n\n` +
    `🗓️ ${data.date} · ${data.time}\n` +
    `💼 ${data.service.name} — ${data.service.price}\n` +
    `📍 ${niche.address}\n\n` +
    `📲 *SMS enviado a ${data.phone}:*\n` +
    `_"${niche.bizName}: ${data.service.name} ${data.date} ${data.time}. ` +
    `Total ${data.service.price}. Pagar: pay.qubesight.lat/${data.name
      .toLowerCase()
      .replace(/\s+/g, "")
      .slice(0, 8)}. Responde CANCELAR para anular."_\n\n` +
    `🎙️ ¿Prefieres que un *asistente de voz IA te llame* para confirmar por voz? Escribe *"llamada"*.`
  );
}

// ─── QUICK REPLIES ────────────────────────────────────────────────────────────
const QUICK_REPLIES = {
  restaurante: ["Menú", "Reservar", "🎙️ Llamada IA", "📲 Cotizar SMS", "🌐 English"],
  salon:       ["Servicios", "Agendar cita", "🎙️ Llamada IA", "📲 Cotizar SMS", "🌐 English"],
  dental:      ["Tratamientos", "Agendar cita", "Emergencia", "🎙️ Llamada IA", "📲 Cotizar SMS"],
  gym:         ["Membresías", "Agendar visita", "Clases", "🎙️ Llamada IA", "📲 Cotizar SMS"],
  inmobiliaria:["Propiedades", "Agendar visita", "Crédito", "🎙️ Llamada IA", "🌐 English"],
};

// ─── RESPONSE RESOLVER ────────────────────────────────────────────────────────
function buildMenu(niche) {
  return (
    `👋 ¡Bienvenido a *${niche.bizName}*! ${niche.emoji}\n\n` +
    `📋 ${niche.bookingLabel === "reserva" ? "MENÚ" : "SERVICIOS"}\n` +
    niche.services.map((s) => `${s.id}️⃣ ${s.name} — ${s.price}`).join("\n") +
    `\n\n✍️ Escribe el número, o di *"agendar"*, *"llamada"* o *"cotizar"*.`
  );
}

function getServiceByNumber(niche, msg) {
  const m = msg.trim();
  return niche.services.find((s) => s.id === m) || null;
}

function matchUniversal(msg, niche) {
  const m = msg.toLowerCase().trim();
  for (const flow of UNIVERSAL_FLOWS) {
    if (flow.triggers.some((t) => m === t || m.includes(t))) {
      return flow.response(niche);
    }
  }
  return null;
}

function matchFaq(msg, niche) {
  const m = msg.toLowerCase().trim();
  // menu
  if (["hola", "menu", "menú", "inicio", "start", "hi", "buenas", "servicios", "tratamientos", "membresias", "membresías", "propiedades", "catalogo", "catálogo"].some((t) => m === t || m.includes(t))) {
    return buildMenu(niche);
  }
  // promo
  if (["promo", "descuento", "oferta", "promocion", "promoción", "cupon", "cupón"].some((t) => m.includes(t))) {
    return `🎁 PROMO DEL MES\n\nCupón: *QUBE10*\n10% de descuento en tu primer ${niche.bookingLabel}.\nVigencia: este mes.\n\nEscribe *"agendar"* para aplicarla.`;
  }
  // horario
  if (["horario", "hora", "abren", "cierran", "abierto"].some((t) => m.includes(t))) {
    return `🕐 HORARIO\n\nLun–Vie: 8am – 7pm\nSáb: 8am – 4pm\nDom: cerrado\n\n🤖 Pero el *asistente IA está 24/7* por chat, voz y SMS.`;
  }
  // ubicacion
  if (["donde", "dónde", "ubicacion", "ubicación", "direccion", "dirección", "como llegar", "cómo llegar"].some((t) => m.includes(t))) {
    return `📍 UBICACIÓN\n\n${niche.address}\n\n📞 ${niche.phone}\n\n¿Te envío el pin de Google Maps por SMS? Escribe *"cotizar"* con tu número.`;
  }
  // asesor
  if (["asesor", "humano", "persona", "hablar con", "agente", "contactar", "llamame", "llámame"].some((t) => m.includes(t))) {
    return null; // handled separately by lead form
  }
  // niche-specific FAQs
  for (const faq of niche.extraFaqs || []) {
    if (faq.triggers.some((t) => m.includes(t))) return faq.response;
  }
  return null;
}

// Returns scripted reply if a strong match, otherwise null (fall back to AI)
function getScriptedReply(nicheKey, message) {
  const niche = NICHES[nicheKey];
  // service number
  const svc = getServiceByNumber(niche, message);
  if (svc) {
    return `✅ Seleccionaste: *${svc.name}* — ${svc.price}\n\n¿Qué prefieres?\n• Escribe *"agendar"* para reservar\n• *"cotizar"* para recibir SMS con el detalle\n• *"llamada"* para que el asistente IA te llame ahora`;
  }
  const universal = matchUniversal(message, niche);
  if (universal) return universal;
  const faq = matchFaq(message, niche);
  if (faq) return faq;
  return null;
}

function getDefaultResponse(niche) {
  return `No estoy seguro de haber entendido 😊\n\nPuedes:\n• Escribir *"menú"* para ver opciones\n• *"agendar"* para reservar tu ${niche.bookingLabel}\n• *"llamada"* para hablar con el asistente de voz IA por voz\n• *"cotizar"* para recibir SMS con precios\n• *"english"* para cambiar a inglés con intérprete en vivo`;
}

function formatMessage(text) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) =>
    part.startsWith("*") && part.endsWith("*")
      ? <strong key={i}>{part.slice(1, -1)}</strong>
      : part
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 16 11" width="15" height="11" style={{ marginLeft: 2, verticalAlign: "middle" }}>
      <path fill="#53bdeb" d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.405-2.272a.463.463 0 0 0-.336-.146.484.484 0 0 0-.343.146l-.311.31a.473.473 0 0 0 0 .675l3.218 3.218c.094.094.22.146.343.146a.484.484 0 0 0 .343-.146L11.4 1.31a.473.473 0 0 0 0-.675l-.329-.329z"/>
      <path fill="#53bdeb" d="M15.917.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178L9.042 8.365 8.077 7.4a.473.473 0 0 0-.675 0l-.312.311a.473.473 0 0 0 0 .675l1.683 1.683c.094.094.22.146.343.146a.484.484 0 0 0 .343-.146l6.787-8.373a.473.473 0 0 0 0-.675l-.329-.368z"/>
    </svg>
  );
}

function Bubble({ msg }) {
  const isBot = msg.role === "bot";
  return (
    <div style={{ display: "flex", justifyContent: isBot ? "flex-start" : "flex-end", marginBottom: 4, padding: "0 6px" }}>
      <div style={{
        position: "relative",
        maxWidth: "78%",
        background: isBot ? "#ffffff" : "#d9fdd3",
        color: "#111b21",
        borderRadius: 7.5,
        padding: "6px 9px 8px 9px",
        fontSize: 14.2,
        lineHeight: 1.42,
        whiteSpace: "pre-wrap",
        boxShadow: "0 1px 0.5px rgba(11,20,26,0.13)",
        marginLeft: isBot ? 8 : 0,
        marginRight: isBot ? 0 : 8,
        borderTopLeftRadius: isBot ? 0 : 7.5,
        borderTopRightRadius: isBot ? 7.5 : 0,
      }}>
        <span aria-hidden style={{
          position: "absolute", top: 0,
          left: isBot ? -8 : "auto",
          right: isBot ? "auto" : -8,
          width: 8, height: 13,
          background: isBot ? "#ffffff" : "#d9fdd3",
          clipPath: isBot
            ? "polygon(100% 0, 0 0, 100% 100%)"
            : "polygon(0 0, 100% 0, 0 100%)",
        }} />
        <div style={{ paddingRight: isBot ? 44 : 58, minWidth: 60 }}>
          {formatMessage(msg.text)}
        </div>
        <div style={{
          position: "absolute", right: 8, bottom: 3,
          fontSize: 10.5, color: "#667781",
          display: "flex", alignItems: "center", gap: 1, lineHeight: 1,
        }}>
          <span>{msg.time}</span>
          {!isBot && <Tick />}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 4, padding: "0 6px" }}>
      <div style={{
        position: "relative", background: "#ffffff", borderRadius: 7.5,
        borderTopLeftRadius: 0,
        padding: "10px 14px", display: "flex", gap: 4, marginLeft: 8,
        boxShadow: "0 1px 0.5px rgba(11,20,26,0.13)",
      }}>
        <span aria-hidden style={{
          position: "absolute", top: 0, left: -8, width: 8, height: 13,
          background: "#ffffff", clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        }} />
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: "50%", background: "#9aa5ab",
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

// ─── EMBEDDED (INLINE) CHAT — full chat window rendered directly on page ─────
export function ChatEmbedded({ nicheKey }) {
  const niche = NICHES[nicheKey];
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [booking, setBooking] = useState({ stage: "idle", data: {} });
  const bottomRef = useRef(null);
  const hasWelcomed = useRef(false);

  const now = () =>
    new Date().toLocaleTimeString("es-CR", { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, showLeadForm]);

  // Auto-welcome with capability intro
  useEffect(() => {
    if (hasWelcomed.current) return;
    hasWelcomed.current = true;
    const welcome =
      `👋 ¡Hola! Soy el asistente IA de *${niche.bizName}* ${niche.emoji}\n\n` +
      `Atiendo 24/7 por:\n` +
      `💬 Chat · 🎙️ Llamada de voz · 📲 SMS\n` +
      `🌐 Con interpretación en vivo *español ↔ english*\n\n` +
      `Puedo responder dudas, agendar tu ${niche.bookingLabel} y enviarte la cotización por SMS en segundos.\n\n` +
      `Escribe *"menú"* para empezar o prueba: *agendar*, *llamada*, *cotizar*.`;
    const t1 = setTimeout(() => {
      setTyping(true);
      const t2 = setTimeout(() => {
        setTyping(false);
        setMessages([{ role: "bot", text: welcome, time: now() }]);
      }, 1200);
      return () => clearTimeout(t2);
    }, 400);
    return () => clearTimeout(t1);
  }, [niche]);

  const HUMAN_TRIGGERS = ["asesor", "humano", "persona", "hablar con", "agente", "contactar"];
  const looksLikeHumanRequest = (msg) => {
    const m = msg.toLowerCase();
    return HUMAN_TRIGGERS.some((t) => m.includes(t));
  };

  const callAI = async (history, userMsg) => {
    try {
      const apiMessages = history
        .filter((m) => m.role === "user" || m.role === "bot")
        .map((m) => ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.text,
        }));
      apiMessages.push({ role: "user", content: userMsg });

      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-niche`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: apiMessages, nicheKey }),
      });
      if (!res.ok) {
        if (res.status === 429) return "⏳ Estoy recibiendo muchas consultas. Intenta en unos segundos.";
        if (res.status === 402) return "⚠️ Servicio de IA temporalmente no disponible. Escribe *menú* para ver opciones.";
        return null;
      }
      const data = await res.json();
      return data.reply || null;
    } catch (e) {
      console.error("AI fallback error:", e);
      return null;
    }
  };

  const botSay = (text, delay = 700) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text, time: now() }]);
    }, delay + Math.random() * 400);
  };

  const advanceBooking = (userMsg) => {
    const { stage, data } = booking;

    if (stage === "service") {
      // accept number or natural mention
      const svc = getServiceByNumber(niche, userMsg) ||
        niche.services.find((s) => userMsg.toLowerCase().includes(s.name.toLowerCase().split(" ")[0]));
      if (!svc) {
        botSay(`Mmm, no encontré ese servicio 😊\n\n${niche.services.map((s) => `${s.id}️⃣ ${s.name}`).join("\n")}\n\nEscribe el número.`);
        return true;
      }
      const next = { stage: "date", data: { ...data, service: svc } };
      setBooking(next);
      botSay(bookingPrompt("date", niche, next.data));
      return true;
    }
    if (stage === "date") {
      const next = { stage: "time", data: { ...data, date: userMsg } };
      setBooking(next);
      botSay(bookingPrompt("time", niche, next.data));
      return true;
    }
    if (stage === "time") {
      const next = { stage: "name", data: { ...data, time: userMsg } };
      setBooking(next);
      botSay(bookingPrompt("name", niche, next.data));
      return true;
    }
    if (stage === "name") {
      const next = { stage: "phone", data: { ...data, name: userMsg } };
      setBooking(next);
      botSay(bookingPrompt("phone", niche, next.data));
      return true;
    }
    if (stage === "phone") {
      const phone = userMsg.replace(/[^\d+\s-]/g, "").trim() || userMsg;
      const finalData = { ...data, phone };
      setBooking({ stage: "idle", data: {} });
      botSay(bookingConfirmation(niche, finalData), 1100);
      return true;
    }
    return false;
  };

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: msg, time: now() }]);

    // 1) inside booking flow?
    if (booking.stage !== "idle") {
      advanceBooking(msg);
      return;
    }

    // 2) start booking?
    if (isBookingTrigger(msg)) {
      const next = { stage: "service", data: {} };
      setBooking(next);
      botSay(bookingPrompt("service", niche, next.data));
      return;
    }

    setTyping(true);
    const scripted = getScriptedReply(nicheKey, msg);
    const wantsHuman = looksLikeHumanRequest(msg);

    if (scripted && !wantsHuman) {
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [...prev, { role: "bot", text: scripted, time: now() }]);
      }, 700 + Math.random() * 400);
      return;
    }

    if (wantsHuman) {
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: `¡Claro! Déjame tus datos y un asesor humano de *${niche.bizName}* te contactará por WhatsApp en minutos.\n\n💡 O escribe *"llamada"* para que el asistente de voz IA te llame *ahora mismo* por voz.`,
            time: now(),
          },
        ]);
        setShowLeadForm(true);
      }, 800);
      return;
    }

    const aiReply = await callAI(messages, msg);
    setTyping(false);
    if (aiReply) {
      setMessages((prev) => [...prev, { role: "bot", text: aiReply, time: now() }]);
    } else {
      setMessages((prev) => [...prev, { role: "bot", text: getDefaultResponse(niche), time: now() }]);
    }
  };

  const submitLead = (name, phone) => {
    setShowLeadForm(false);
    setLeadSubmitted(true);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: `📋 Soy ${name} · 📱 ${phone}`, time: now() },
      {
        role: "bot",
        text: `¡Listo, ${name.split(" ")[0]}! ✅ Te abriré WhatsApp para que un asesor humano te atienda directamente.`,
        time: now(),
      },
    ]);
    const text = encodeURIComponent(
      `Hola, soy ${name} (${phone}). Me interesa ${niche.bizName} (demo desde QubeSight).`
    );
    setTimeout(() => {
      window.open(`https://wa.me/50646009140?text=${text}`, "_blank", "noopener,noreferrer");
    }, 1200);
  };

  const darken = (hex, amt = 0.18) => {
    const h = hex.replace("#", "");
    const r = Math.max(0, Math.round(parseInt(h.slice(0, 2), 16) * (1 - amt)));
    const g = Math.max(0, Math.round(parseInt(h.slice(2, 4), 16) * (1 - amt)));
    const b = Math.max(0, Math.round(parseInt(h.slice(4, 6), 16) * (1 - amt)));
    return `rgb(${r},${g},${b})`;
  };
  const headerGradient = `linear-gradient(135deg, ${niche.color} 0%, ${darken(niche.color, 0.22)} 100%)`;

  // WhatsApp palette
  const WA_HEADER = "#075e54";
  const WA_HEADER_2 = "#128c7e";
  const WA_BG = "#efeae2";
  const WA_INPUT_BAR = "#f0f2f5";
  const WA_SEND = "#00a884";
  const waPattern =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'><g fill='none' stroke='%23d1c7b8' stroke-width='1' opacity='0.35'><circle cx='20' cy='20' r='6'/><path d='M50 30 q10 -10 20 0 t20 0'/><path d='M90 60 l8 8 l-8 8 l-8 -8 z'/><circle cx='110' cy='100' r='4'/><path d='M20 90 q15 10 30 0'/><path d='M60 110 l6 -10 l6 10'/></g></svg>\")";

  return (
    <>
      <style>{`
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        @keyframes qs-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.55); } 50% { box-shadow: 0 0 0 6px rgba(74,222,128,0); } }
        .qs-embedded-shell { width: 100%; max-width: 480px; height: 640px; }
        @media (min-width: 1280px) { .qs-embedded-shell { max-width: 560px; height: 720px; } }
        .qs-quick-btn { background: #fff; border-radius: 999px; padding: 6px 12px; font-size: 12.5px; cursor: pointer; font-weight: 500; transition: all .15s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
        .qs-quick-btn:hover { background: #f0f2f5; }
        .qs-send-btn { transition: transform .15s ease; }
        .qs-send-btn:hover { transform: scale(1.05); }
        .qs-send-btn:active { transform: scale(0.95); }
        .qs-input::placeholder { color: #8696a0; }
      `}</style>

      <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
        <div aria-hidden style={{
          position: "absolute", inset: "-40px",
          background: `radial-gradient(60% 50% at 50% 40%, ${niche.color}55 0%, transparent 70%)`,
          filter: "blur(40px)", opacity: 0.6, pointerEvents: "none", zIndex: 0,
        }} />

        <div className="qs-embedded-shell" style={{
          position: "relative", zIndex: 1, margin: "0 auto", borderRadius: 14,
          background: WA_BG, display: "flex", flexDirection: "column",
          boxShadow: "0 30px 80px -20px rgba(0,0,0,0.55), 0 8px 24px -8px rgba(0,0,0,0.4)",
          overflow: "hidden", fontFamily: "'Segoe UI', Helvetica, system-ui, -apple-system, sans-serif",
          border: "1px solid rgba(0,0,0,0.15)",
        }}>
          {/* WhatsApp Header */}
          <div style={{
            background: WA_HEADER, color: "#fff", padding: "10px 14px",
            display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
          }}>
            {/* Back arrow */}
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff" style={{ opacity: 0.95 }}>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            {/* Avatar */}
            <div style={{
              position: "relative", width: 40, height: 40, borderRadius: "50%",
              background: niche.color, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 20, flexShrink: 0,
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              {niche.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500, fontSize: 16, lineHeight: 1.2, letterSpacing: "0" }}>
                {niche.bizName}
              </div>
              <div style={{ fontSize: 12.5, opacity: 0.85, marginTop: 1, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{
                  width: 7, height: 7, borderRadius: "50%", background: "#4ade80",
                  display: "inline-block", animation: "qs-pulse 2s ease-out infinite",
                }} />
                en línea · IA 24/7
              </div>
            </div>
            {/* WA header icons */}
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff" style={{ opacity: 0.9 }} aria-label="Videollamada">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff" style={{ opacity: 0.9 }} aria-label="Llamar">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff" style={{ opacity: 0.9 }} aria-label="Más">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>

          {/* Messages with WhatsApp doodle background */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "12px 6px 8px",
            background: `${waPattern}, ${WA_BG}`,
            backgroundRepeat: "repeat",
          }}>
            {/* Date chip */}
            <div style={{ display: "flex", justifyContent: "center", margin: "6px 0 12px" }}>
              <span style={{
                background: "#e1f2fa", color: "#54656f", fontSize: 12.2,
                padding: "5px 12px", borderRadius: 7.5, fontWeight: 500,
                boxShadow: "0 1px 0.5px rgba(11,20,26,0.13)",
              }}>HOY</span>
            </div>
            {/* Encryption notice chip */}
            <div style={{ display: "flex", justifyContent: "center", margin: "0 12px 12px" }}>
              <span style={{
                background: "#fdf4c5", color: "#54656f", fontSize: 11.5,
                padding: "6px 12px", borderRadius: 7.5, textAlign: "center", lineHeight: 1.35,
                boxShadow: "0 1px 0.5px rgba(11,20,26,0.13)", maxWidth: 320,
              }}>🔒 Los mensajes están cifrados de extremo a extremo. Demo IA · QubeSight</span>
            </div>
            {messages.map((msg, i) => <Bubble key={i} msg={msg} />)}
            {typing && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {showLeadForm && (
            <LeadForm color={niche.color} gradient={`linear-gradient(135deg, ${WA_HEADER_2} 0%, ${WA_SEND} 100%)`}
              onSubmit={submitLead} onCancel={() => setShowLeadForm(false)} />
          )}

          {messages.length > 0 && !typing && !showLeadForm && booking.stage === "idle" && (
            <div style={{
              padding: "8px 10px", background: "rgba(239,234,226,0.85)",
              backdropFilter: "blur(8px)", display: "flex", gap: 6, flexWrap: "wrap",
              borderTop: "1px solid rgba(0,0,0,0.06)",
            }}>
              {QUICK_REPLIES[nicheKey].map((q) => (
                <button key={q} className="qs-quick-btn"
                  onClick={() => send(q.replace(/^[^\p{L}]+/u, "").toLowerCase())}
                  style={{ border: `1px solid ${WA_SEND}`, color: WA_HEADER }}>
                  {q}
                </button>
              ))}
              {!leadSubmitted && (
                <button className="qs-quick-btn" onClick={() => setShowLeadForm(true)}
                  style={{ border: `1px solid ${WA_SEND}`, background: WA_SEND, color: "#fff" }}>
                  💬 Hablar con humano
                </button>
              )}
            </div>
          )}

          {/* WhatsApp Input bar */}
          <div style={{
            display: "flex", padding: "8px 10px", background: WA_INPUT_BAR,
            gap: 8, alignItems: "center", flexShrink: 0,
          }}>
            <button aria-label="Emoji" style={{
              background: "transparent", border: "none", cursor: "pointer",
              padding: 6, color: "#54656f", display: "flex",
            }}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M11.999 2C6.486 2 2 6.487 2 12s4.486 10 9.999 10C17.514 22 22 17.513 22 12S17.514 2 11.999 2zm.001 18c-4.41 0-8-3.589-8-8s3.59-8 8-8 8 3.589 8 8-3.59 8-8 8zM8.5 11A1.5 1.5 0 1 1 10 9.5 1.5 1.5 0 0 1 8.5 11zm7 0A1.5 1.5 0 1 1 17 9.5a1.5 1.5 0 0 1-1.5 1.5zm.76 3.62a4.99 4.99 0 0 1-8.52 0 .75.75 0 1 1 1.29-.76 3.49 3.49 0 0 0 5.94 0 .75.75 0 0 1 1.29.76z"/>
              </svg>
            </button>
            <button aria-label="Adjuntar" style={{
              background: "transparent", border: "none", cursor: "pointer",
              padding: 6, color: "#54656f", display: "flex",
            }}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"/>
              </svg>
            </button>
            <input className="qs-input" value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={booking.stage !== "idle" ? "Responde aquí..." : "Mensaje"}
              style={{
                flex: 1, border: "none", borderRadius: 8,
                padding: "10px 14px", fontSize: 14.5, background: "#fff",
                outline: "none", color: "#111b21",
                boxShadow: "0 1px 1px rgba(0,0,0,0.04)",
              }}
            />
            <button className="qs-send-btn" onClick={() => send()} style={{
              width: 42, height: 42, borderRadius: "50%", background: WA_SEND,
              border: "none", color: "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }} aria-label="Enviar">
              {input.trim() ? (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff">
                  <path d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── LEAD FORM ────────────────────────────────────────────────────────────────
function LeadForm({ color, gradient, onSubmit, onCancel }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const valid = name.trim().length >= 2 && phone.trim().length >= 7;

  const handle = (e) => {
    e.preventDefault();
    if (!valid) return;
    onSubmit(name.trim(), phone.trim());
  };

  return (
    <form onSubmit={handle} style={{
      padding: "14px 16px", background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(8px)", borderTop: `2px solid ${color}`,
      display: "flex", flexDirection: "column", gap: 8,
    }}>
      <div style={{ fontSize: 12.5, fontWeight: 600, color: "#374151" }}>
        Déjanos tus datos y un asesor te contactará
      </div>
      <input autoFocus value={name} onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre" maxLength={60}
        style={{ border: "1.5px solid #e5e7eb", borderRadius: 12, padding: "10px 14px",
          fontSize: 13.5, background: "#f9fafb", outline: "none", color: "#111827" }}
        onFocus={(e) => (e.target.style.borderColor = color)}
        onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
      <input value={phone}
        onChange={(e) => setPhone(e.target.value.replace(/[^\d+\s-]/g, ""))}
        placeholder="WhatsApp / Teléfono" maxLength={20} type="tel"
        style={{ border: "1.5px solid #e5e7eb", borderRadius: 12, padding: "10px 14px",
          fontSize: 13.5, background: "#f9fafb", outline: "none", color: "#111827" }}
        onFocus={(e) => (e.target.style.borderColor = color)}
        onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={onCancel} style={{
          flex: "0 0 auto", padding: "10px 14px", borderRadius: 999,
          border: "1.5px solid #e5e7eb", background: "#fff", color: "#6b7280",
          fontSize: 13, fontWeight: 500, cursor: "pointer",
        }}>Cancelar</button>
        <button type="submit" disabled={!valid} style={{
          flex: 1, padding: "10px 14px", borderRadius: 999, border: "none",
          background: valid ? gradient : "#cbd5e1", color: "#fff",
          fontSize: 13.5, fontWeight: 700, cursor: valid ? "pointer" : "not-allowed",
          boxShadow: valid ? `0 6px 18px -4px ${color}88` : "none",
          transition: "transform .15s ease",
        }}>Enviar y abrir WhatsApp →</button>
      </div>
    </form>
  );
}

// ─── Floating widget (legacy) — minimal re-export ────────────────────────────
function ChatWidget({ nicheKey }) {
  return <ChatEmbedded nicheKey={nicheKey} />;
}
export function ChatRestaurante()  { return <ChatWidget nicheKey="restaurante" />; }
export function ChatSalon()        { return <ChatWidget nicheKey="salon" />; }
export function ChatDental()       { return <ChatWidget nicheKey="dental" />; }
export function ChatGym()          { return <ChatWidget nicheKey="gym" />; }
export function ChatInmobiliaria() { return <ChatWidget nicheKey="inmobiliaria" />; }

export default ChatWidget;
