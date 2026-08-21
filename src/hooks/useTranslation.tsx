import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface Translations {
  [key: string]: { es: string; en: string };
}

export const translations: Translations = {
  // Header
  'nav.problem': { es: 'Problema', en: 'Problem' },
  'nav.solution': { es: 'Solución', en: 'Solution' },
  'nav.products': { es: 'Productos', en: 'Products' },
  'nav.assistant': { es: 'Asistente', en: 'Assistant' },
  'nav.voicebot': { es: 'Voice Bot', en: 'Voice Bot' },
  'nav.industries': { es: 'Casos de uso', en: 'Use cases' },
  'nav.pricing': { es: 'Precios', en: 'Pricing' },
  'nav.faq': { es: 'FAQ', en: 'FAQ' },
  'nav.contact': { es: 'Empezar', en: 'Get Started' },

  // Voice Bot — teammate framing
  'voicebot.badge': { es: 'Voice Bot · Asistente de voz', en: 'Voice Bot · Voice assistant' },
  'voicebot.title': { es: 'Tu secretaria ahora tiene un', en: 'Your front desk now has an' },
  'voicebot.titleAccent': { es: 'asistente disponible 24/7.', en: 'assistant available 24/7.' },
  'voicebot.subtitle': {
    es: 'La IA atiende consultas repetitivas y agenda. Tu equipo se enfoca en clientes importantes y excepciones.',
    en: 'AI handles repetitive inquiries and booking. Your team focuses on important clients and exceptions.'
  },
  'voicebot.col.feature': { es: 'Tarea', en: 'Task' },
  'voicebot.col.human': { es: 'Tu equipo', en: 'Your team' },
  'voicebot.col.ai': { es: 'Voice Bot', en: 'Voice Bot' },
  'voicebot.row.hours': { es: 'Fuera de horario', en: 'After hours' },
  'voicebot.row.hours.human': { es: 'Descansa', en: 'Rests' },
  'voicebot.row.hours.bot': { es: 'Sigue atendiendo', en: 'Keeps answering' },
  'voicebot.row.languages': { es: 'Preguntas frecuentes', en: 'FAQs' },
  'voicebot.row.languages.human': { es: 'Libera tiempo', en: 'Frees up time' },
  'voicebot.row.languages.bot': { es: 'Las responde al instante', en: 'Answers instantly' },
  'voicebot.row.calls': { es: 'Casos importantes', en: 'Important cases' },
  'voicebot.row.calls.human': { es: 'Atiende con criterio', en: 'Handles with judgment' },
  'voicebot.row.calls.bot': { es: 'Escala al humano', en: 'Escalates to human' },
  'voicebot.row.cost': { es: 'Agenda y seguimiento', en: 'Booking & follow-up' },
  'voicebot.row.cost.extra': { es: '', en: '' },
  'voicebot.row.cost.human': { es: 'Cierra la venta', en: 'Closes the sale' },
  'voicebot.row.cost.bot': { es: 'Agenda y confirma', en: 'Books and confirms' },
  'voicebot.row.savings': { es: 'Resultado', en: 'Outcome' },
  'voicebot.year': { es: 'año', en: 'year' },
  'voicebot.benefit.latency': { es: 'Conversación natural <1s', en: 'Natural talk <1s' },
  'voicebot.benefit.orders': { es: 'Pedidos y consultas por voz', en: 'Voice orders & inquiries' },
  'voicebot.benefit.payments': { es: 'Cobros asistidos por voz', en: 'Voice-assisted payments' },
  'voicebot.benefit.calendar': { es: 'Agenda en Google Calendar', en: 'Books to Google Calendar' },
  'voicebot.cta': { es: 'Potenciar mi equipo con Voice Bot', en: 'Empower my team with Voice Bot' },
  'voicebot.mantra': {
    es: 'No reemplazamos personas. Les damos superpoderes.',
    en: 'We don\'t replace people. We give them superpowers.'
  },

  // Hero
  'hero.badge': { es: 'IA que trabaja junto a tu equipo · 24/7', en: 'AI that works with your team · 24/7' },
  'hero.title': { es: 'Automatiza lo repetitivo.', en: 'Automate the repetitive.' },
  'hero.titleAccent': { es: 'Potencia a tu equipo.', en: 'Empower your team.' },
  'hero.description': {
    es: 'QubeSight elimina tareas repetitivas para que las personas se enfoquen en lo que requiere criterio humano.',
    en: 'QubeSight removes repetitive tasks so people focus on what needs human judgment.'
  },
  'hero.cta.primary': { es: 'Ver cómo potencia a tu equipo', en: 'See how it empowers your team' },
  'hero.cta.secondary': { es: 'Hablar con un experto', en: 'Talk to an expert' },
  'hero.proof.messages': { es: 'consultas atendidas', en: 'inquiries handled' },
  'hero.proof.time': { es: 'tiempo de respuesta', en: 'response time' },
  'hero.proof.conversion': { es: 'clientes que no se pierden', en: 'customers retained' },

  // Problem
  'problem.title': { es: 'Tu equipo pierde horas en', en: 'Your team loses hours on' },
  'problem.titleAccent': { es: 'tareas que no requieren criterio.', en: 'tasks that don\'t need judgment.' },
  'problem.subtitle': {
    es: 'Preguntas frecuentes, agendas manuales y mensajes fuera de horario saturan a las personas que deberían estar vendiendo y cuidando clientes clave.',
    en: 'FAQs, manual booking and after-hours messages overload the people who should be selling and caring for key clients.'
  },
  'problem.p1.title': { es: 'Consultas repetitivas', en: 'Repetitive inquiries' },
  'problem.p1.desc': { es: 'Horarios, precios y FAQs consumen el día de tu equipo.', en: 'Hours, pricing and FAQs eat your team\'s day.' },
  'problem.p2.title': { es: 'Clientes fuera de horario', en: 'After-hours customers' },
  'problem.p2.desc': { es: 'Cuando la oficina cierra, las consultas no esperan.', en: 'When the office closes, inquiries don\'t wait.' },
  'problem.p3.title': { es: 'Menos tiempo para lo importante', en: 'Less time for what matters' },
  'problem.p3.desc': { es: 'Agenda manual y errores restan atención a clientes VIP.', en: 'Manual booking and errors steal focus from VIP clients.' },

  // Assistant
  'assistant.badge': { es: 'Assistant · Chat IA', en: 'Assistant · AI Chat' },
  'assistant.title': { es: 'Tu equipo de atención', en: 'Your support team' },
  'assistant.titleAccent': { es: 'con un copiloto 24/7.', en: 'with a 24/7 copilot.' },
  'assistant.description': {
    es: 'IA entrenada con tu negocio que responde en chat, captura leads y agenda — y escala a tu equipo cuando hace falta criterio humano.',
    en: 'AI trained on your business that replies in chat, captures leads and books — and escalates to your team when human judgment is needed.'
  },
  'assistant.b1': { es: 'Respuestas inmediatas en WhatsApp y Web Chat', en: 'Instant replies on WhatsApp and Web Chat' },
  'assistant.b2': { es: 'FAQ: precios, horarios, citas y stock', en: 'FAQs: pricing, hours, appointments and stock' },
  'assistant.b3': { es: 'Captura de leads 24/7 para tu equipo', en: '24/7 lead capture for your team' },
  'assistant.b4': { es: 'Configuración gestionada por nosotros', en: 'Setup managed by our team' },
  'assistant.b5': { es: 'Handoff inteligente a humano', en: 'Smart hand-off to a human' },
  'assistant.cta': { es: 'Quiero mi Assistant', en: 'I want my Assistant' },

  // PropIA
  'propia.badge': { es: 'Producto 2 · PropIA', en: 'Product 2 · PropIA' },
  'propia.title': { es: 'PropIA: Publicación Automática', en: 'PropIA: Automatic Publishing' },
  'propia.titleAccent': { es: 'Multiplataforma.', en: 'Across All Platforms.' },
  'propia.description': {
    es: 'Sube tus fotos una vez. Nuestra IA hace el resto: textos SEO, videos automáticos y publicación simultánea en Instagram, Facebook y TikTok.',
    en: 'Upload your photos once. Our AI does the rest: SEO copy, automatic videos and simultaneous posting on Instagram, Facebook and TikTok.'
  },
  'propia.step1.title': { es: 'Subes tus fotos', en: 'Upload your photos' },
  'propia.step1.desc': { es: 'Una sola vez, desde tu celular o computadora.', en: 'Just once, from your phone or computer.' },
  'propia.step2.title': { es: 'IA genera textos SEO', en: 'AI generates SEO copy' },
  'propia.step2.desc': { es: 'Optimizados para alcance y conversión.', en: 'Optimized for reach and conversion.' },
  'propia.step3.title': { es: 'IA crea videos automáticos', en: 'AI creates videos automatically' },
  'propia.step3.desc': { es: 'Reels, stories y videos cortos listos para publicar.', en: 'Reels, stories and short videos ready to publish.' },
  'propia.step4.title': { es: 'Publica en todas tus redes', en: 'Posts to all your channels' },
  'propia.step4.desc': { es: 'IG (Feed/Stories/Reels), Facebook y TikTok a la vez.', en: 'IG (Feed/Stories/Reels), Facebook and TikTok at once.' },
  'propia.feature1': { es: 'SEO Enhancer para visibilidad máxima', en: 'SEO Enhancer for maximum visibility' },
  'propia.feature2': { es: 'Notificaciones por WhatsApp en cada publicación', en: 'WhatsApp notifications on every post' },
  'propia.cta': { es: 'Activar PropIA', en: 'Activate PropIA' },

  // Industries
  'industries.title': { es: 'Casos de uso por industria', en: 'Use cases by industry' },
  'industries.description': { es: 'QubeSight se adapta a tu sector para potenciar al equipo que ya tienes.', en: 'QubeSight adapts to your sector to empower the team you already have.' },
  'industries.realestate.tab': { es: 'Inmobiliarias', en: 'Real Estate' },
  'industries.realestate.title': { es: 'Califica leads y agenda visitas mientras muestras propiedades.', en: 'Qualify leads and book visits while you show properties.' },
  'industries.realestate.b1': { es: 'Responde por cada propiedad publicada', en: 'Answers for every listed property' },
  'industries.realestate.b2': { es: 'Pre-califica al comprador automáticamente', en: 'Auto-qualifies the buyer' },
  'industries.realestate.b3': { es: 'Agenda visitas en tu calendario', en: 'Books visits to your calendar' },
  'industries.restaurants.tab': { es: 'Restaurantes', en: 'Restaurants' },
  'industries.restaurants.title': { es: 'Reservas y pedidos automáticos sin errores.', en: 'Automatic bookings and orders, error-free.' },
  'industries.restaurants.b1': { es: 'Confirma reservas al instante', en: 'Confirms reservations instantly' },
  'industries.restaurants.b2': { es: 'Toma pedidos por WhatsApp', en: 'Takes orders via WhatsApp' },
  'industries.restaurants.b3': { es: 'Envía menú y promos del día', en: 'Sends menu and daily specials' },
  'industries.clinics.tab': { es: 'Clínicas', en: 'Clinics' },
  'industries.clinics.title': { es: 'Gestión de citas y consultas frecuentes 24/7.', en: 'Appointment management and FAQs 24/7.' },
  'industries.clinics.b1': { es: 'Agenda, reagenda y cancela citas', en: 'Books, reschedules and cancels appointments' },
  'industries.clinics.b2': { es: 'Recordatorios automáticos a pacientes', en: 'Automatic reminders to patients' },
  'industries.clinics.b3': { es: 'Responde sobre tratamientos y precios', en: 'Answers about treatments and pricing' },
  'industries.gyms.tab': { es: 'Gimnasios y Salones', en: 'Gyms & Salons' },
  'industries.gyms.title': { es: 'Convierte consultas en suscripciones al instante.', en: 'Turn inquiries into subscriptions instantly.' },
  'industries.gyms.b1': { es: 'Información de planes y horarios', en: 'Plan and schedule info' },
  'industries.gyms.b2': { es: 'Cierra inscripciones por chat', en: 'Closes sign-ups via chat' },
  'industries.gyms.b3': { es: 'Reserva clases y servicios', en: 'Books classes and services' },

  // Testimonials
  'testimonials.title': { es: 'Equipos que ya', en: 'Teams already' },
  'testimonials.titleAccent': { es: 'trabajan con un copiloto IA.', en: 'working with an AI copilot.' },
  'testimonials.t1.name': { es: 'María González', en: 'María González' },
  'testimonials.t1.role': { es: 'Restaurante', en: 'Restaurant Owner' },
  'testimonials.t1.quote': {
    es: 'Mi recepcionista ya no se ahoga con FAQs. Atiende mesas VIP y QubeSight cubre el resto — incluso de noche.',
    en: 'My front desk isn\'t drowning in FAQs anymore. They handle VIP tables and QubeSight covers the rest — even at night.'
  },
  'testimonials.t2.name': { es: 'James Carter', en: 'James Carter' },
  'testimonials.t2.role': { es: 'Inmobiliaria', en: 'Real Estate Agent' },
  'testimonials.t2.quote': {
    es: 'Las ventas subieron un 40%. Mi equipo cierra; la IA califica y agenda. Nadie se siente reemplazado.',
    en: 'Sales up 40%. My team closes; AI qualifies and books. Nobody feels replaced.'
  },
  'testimonials.t3.name': { es: 'Ana López', en: 'Ana López' },
  'testimonials.t3.role': { es: 'Clínica Dental', en: 'Dental Clinic' },
  'testimonials.t3.quote': {
    es: 'Menos errores de agenda, menos llamadas repetidas. La secretaria dedica tiempo a pacientes reales.',
    en: 'Fewer booking errors, fewer repeat calls. The secretary spends time with real patients.'
  },

  // Pricing
  'pricing.badge': { es: 'Precios transparentes', en: 'Transparent pricing' },
  'pricing.title': { es: 'Planes simples,', en: 'Simple plans,' },
  'pricing.titleAccent': { es: 'resultados inmediatos.', en: 'immediate results.' },
  'pricing.monthly': { es: 'Mensual', en: 'Monthly' },
  'pricing.yearly': { es: 'Anual', en: 'Yearly' },
  'pricing.save': { es: 'Ahorra 20%', en: 'Save 20%' },
  'pricing.annualTotal': { es: '/año', en: '/year' },
  'pricing.youSave': { es: 'ahorras', en: 'you save' },
  'pricing.popular': { es: 'Más Popular', en: 'Most Popular' },
  'pricing.month': { es: '/mes', en: '/mo' },
  'pricing.oneTime': { es: 'pago único', en: 'one-time' },
  'pricing.cta': { es: 'Empezar ahora', en: 'Start now' },
  'pricing.starter.name': { es: 'Inicio', en: 'Starter' },
  'pricing.starter.desc': { es: 'Empieza a atender 24/7 en WhatsApp, Telegram y Web Chat.', en: 'Start serving 24/7 on WhatsApp, Telegram and Web Chat.' },
  'pricing.starter.f1': { es: 'Hasta 800 mensajes WhatsApp/mes', en: 'Up to 800 WhatsApp messages/mo' },
  'pricing.starter.f2': { es: 'WhatsApp Business + Telegram + Web Chat', en: 'WhatsApp Business + Telegram + Web Chat' },
  'pricing.starter.f3': { es: 'IA conversacional 24/7', en: 'Conversational AI 24/7' },
  'pricing.starter.f4': { es: 'Entiende notas de voz', en: 'Understands voice notes' },
  'pricing.starter.f5': { es: '1 idioma', en: '1 language' },
  'pricing.starter.f6': { es: 'Excedente: $0.03/mensaje', en: 'Overage: $0.03/message' },
  'pricing.basic.name': { es: 'Bronce', en: 'Bronze' },
  'pricing.basic.desc': { es: 'Todo Inicio + agenda, cotizaciones y links de pago.', en: 'Everything in Starter + booking, quotes and payment links.' },
  'pricing.basic.f1': { es: 'Hasta 2,500 mensajes WhatsApp/mes', en: 'Up to 2,500 WhatsApp messages/mo' },
  'pricing.basic.f2': { es: 'Google Calendar + agenda automática', en: 'Google Calendar + automatic booking' },
  'pricing.basic.f3': { es: 'Cotizaciones automáticas', en: 'Automatic quotes' },
  'pricing.basic.f4': { es: 'Links de pago', en: 'Payment links' },
  'pricing.basic.f5': { es: 'Telegram ilimitado', en: 'Unlimited Telegram' },
  'pricing.basic.f6': { es: 'Web Chat ilimitado', en: 'Unlimited Web Chat' },
  'pricing.basic.f7': { es: 'Todo lo del Plan Inicio', en: 'Everything in Starter' },
  'pricing.growth.name': { es: 'Plata', en: 'Silver' },
  'pricing.growth.desc': { es: 'Todo Bronce + Instagram, Facebook, memoria y handoff.', en: 'Everything in Bronze + Instagram, Facebook, memory and handoff.' },
  'pricing.growth.f1': { es: 'Hasta 6,000 mensajes WhatsApp/mes', en: 'Up to 6,000 WhatsApp messages/mo' },
  'pricing.growth.f2': { es: 'Instagram DMs', en: 'Instagram DMs' },
  'pricing.growth.f3': { es: 'Facebook Messenger', en: 'Facebook Messenger' },
  'pricing.growth.f4': { es: 'Memoria de conversación', en: 'Conversation memory' },
  'pricing.growth.f5': { es: 'Multiidioma', en: 'Multilingual' },
  'pricing.growth.f6': { es: 'Handoff a humano', en: 'Handoff to human' },
  'pricing.growth.f7': { es: 'Notificaciones automáticas', en: 'Automatic notifications' },
  'pricing.growth.f8': { es: 'Todo lo del Plan Bronce', en: 'Everything in Bronze' },
  'pricing.propia.name': { es: 'Oro', en: 'Gold' },
  'pricing.propia.desc': { es: 'Todo Plata + CRM, catálogo y omnicanal completo.', en: 'Everything in Silver + CRM, catalog and full omnichannel.' },
  'pricing.propia.setup': { es: 'Setup', en: 'Setup' },
  'pricing.propia.f1': { es: 'Hasta 15,000 mensajes WhatsApp/mes', en: 'Up to 15,000 WhatsApp messages/mo' },
  'pricing.propia.f2': { es: 'CRM integrado', en: 'Integrated CRM' },
  'pricing.propia.f3': { es: 'Catálogo interactivo', en: 'Interactive catalog' },
  'pricing.propia.f4': { es: 'Automatizaciones avanzadas', en: 'Advanced automations' },
  'pricing.propia.f5': { es: 'Omnicanal completo + Reportes y analíticas', en: 'Full omnichannel + reports & analytics' },
  'pricing.propia.f6': { es: 'Soporte prioritario', en: 'Priority support' },
  'pricing.note': { es: 'Los mensajes de WhatsApp tienen un costo por mensaje de Meta. Instagram, Facebook Messenger, Telegram y Web Chat son canales sin costo adicional — incluidos según tu plan.', en: 'WhatsApp messages carry a per-message cost from Meta. Instagram, Facebook Messenger, Telegram and Web Chat have no additional cost — included according to your plan.' },
  'pricing.channels.title': { es: 'Canales adicionales', en: 'Additional channels' },
  'pricing.channels.subtitle': { es: 'Suma canales a cualquier plan. Precio por canal, mensual.', en: 'Add channels to any plan. Per-channel monthly price.' },
  'pricing.channels.ig': { es: 'Instagram DMs', en: 'Instagram DMs' },
  'pricing.channels.fb': { es: 'Facebook Messenger', en: 'Facebook Messenger' },
  'pricing.channels.web': { es: 'Web Chat', en: 'Web Chat' },
  'pricing.channels.all': { es: 'Todos los canales', en: 'All channels' },

  // Voice Bot pricing
  'pricing.voice.title': { es: 'Voice Bots IA — Asistente telefónico', en: 'AI Voice Bots — Phone assistant' },
  'pricing.voice.subtitle': { es: 'Atiende llamadas repetitivas y agenda; tu equipo interviene cuando hace falta criterio.', en: 'Handles repetitive calls and booking; your team steps in when judgment is needed.' },
  'pricing.voice.bronze.name': { es: 'Inicio', en: 'Starter' },
  'pricing.voice.bronze.desc': { es: 'Asistente de voz para no perder llamadas.', en: 'Voice assistant so you never miss a call.' },
  'pricing.voice.bronze.f1': { es: 'Asistente de voz IA 24/7', en: 'AI voice assistant 24/7' },
  'pricing.voice.bronze.f2': { es: 'Agenda automática', en: 'Automatic scheduling' },
  'pricing.voice.bronze.f3': { es: 'FAQs + resumen por email', en: 'FAQs + email summary' },
  'pricing.voice.bronze.f4': { es: '1 idioma', en: '1 language' },
  'pricing.voice.bronze.f5': { es: '1 línea simultánea', en: '1 concurrent line' },
  'pricing.voice.silver.name': { es: 'Bronce', en: 'Bronze' },
  'pricing.voice.silver.desc': { es: 'Bilingüe y con transferencia a humano.', en: 'Bilingual with human handoff.' },
  'pricing.voice.silver.f1': { es: 'Todo lo del plan Inicio', en: 'Everything in Starter' },
  'pricing.voice.silver.f2': { es: 'Español e Inglés', en: 'Spanish & English' },
  'pricing.voice.silver.f3': { es: 'Transferencia a humano', en: 'Human handoff' },
  'pricing.voice.silver.f4': { es: 'WhatsApp post-llamada + reportes', en: 'Post-call WhatsApp + reports' },
  'pricing.voice.silver.f5': { es: '3 líneas simultáneas', en: '3 concurrent lines' },
  'pricing.voice.gold.name': { es: 'Plata', en: 'Silver' },
  'pricing.voice.gold.desc': { es: 'Multiidioma, CRM, pagos por voz y llamadas salientes.', en: 'Multilingual, CRM, voice payments and outbound calls.' },
  'pricing.voice.gold.f1': { es: 'Todo lo del plan Bronce', en: 'Everything in Bronze' },
  'pricing.voice.gold.f2': { es: 'Hasta 4 idiomas', en: 'Up to 4 languages' },
  'pricing.voice.gold.f3': { es: 'CRM integrado', en: 'Integrated CRM' },
  'pricing.voice.gold.f4': { es: 'Llamadas salientes automáticas + pagos por voz', en: 'Automatic outbound calls + voice payments' },
  'pricing.voice.gold.f5': { es: 'Líneas ilimitadas', en: 'Unlimited lines' },
  'pricing.voice.gold.f6': { es: 'Soporte prioritario', en: 'Priority support' },

  // Final CTA
  'final.badge': { es: 'Empieza hoy', en: 'Start today' },
  'final.title': { es: 'Dale superpoderes', en: 'Give your team' },
  'final.titleAccent': { es: 'a tu equipo.', en: 'superpowers.' },
  'final.description': { es: 'Activa QubeSight en 48 horas. Sin contratos largos. Más clientes atendidos, menos carga repetitiva.', en: 'Go live in 48 hours. No long contracts. More customers served, less repetitive load.' },
  'final.cta': { es: 'Hablar con un experto', en: 'Talk to an expert' },
  'final.cta.primary': { es: 'Probar demo gratis', en: 'Try free demo' },
  'final.bullet.1': { es: 'Activación en 48 horas', en: 'Live in 48 hours' },
  'final.bullet.2': { es: 'Sin permanencia ni contratos largos', en: 'No lock-in, no long contracts' },
  'final.bullet.3': { es: 'Soporte humano cuando lo necesites', en: 'Human support whenever you need it' },
  'final.bullet.4': { es: 'Garantía de 14 días o te devolvemos tu dinero', en: '14-day money-back guarantee' },
  'final.fineprint': { es: 'Sin tarjeta para probar el demo. Cancela cuando quieras.', en: 'No card needed to try the demo. Cancel anytime.' },

  // Trust bar
  'trustbar.title': { es: 'Equipos en sectores reales ya trabajan con QubeSight', en: 'Real-world teams already work with QubeSight' },

  // Guarantees
  'guarantee.setup.title': { es: 'Activo en 48h', en: 'Live in 48h' },
  'guarantee.setup.desc': { es: 'Configuración 100% gestionada por nuestro equipo.', en: 'Setup fully managed by our team.' },
  'guarantee.nocontract.title': { es: 'Sin permanencia', en: 'No lock-in' },
  'guarantee.nocontract.desc': { es: 'Cancela cuando quieras, sin penalizaciones.', en: 'Cancel anytime, no penalties.' },
  'guarantee.support.title': { es: 'Soporte real', en: 'Real support' },
  'guarantee.support.desc': { es: 'Humanos respondiendo en menos de 4 horas.', en: 'Humans replying in under 4 hours.' },
  'guarantee.refund.title': { es: 'Garantía 14 días', en: '14-day guarantee' },
  'guarantee.refund.desc': { es: 'Si no te convence, te devolvemos el 100%.', en: 'Not happy? Full refund within 14 days.' },

  // Urgency banner
  'urgency.text': { es: '🚀 Lanzamiento Q4 — quedan {n} cupos de onboarding gestionado este mes', en: '🚀 Q4 launch — {n} managed onboarding slots left this month' },
  'urgency.cta': { es: 'Reservar →', en: 'Book yours →' },

  // Problem extras
  'problem.badge': { es: 'La carga que frena a tu equipo', en: 'The load holding your team back' },
  'problem.cta.lead': { es: 'No hace falta contratar más personas para cubrir lo repetitivo.', en: 'You don\'t need to hire more people to cover the repetitive work.' },
  'problem.cta.tail': { es: 'Necesitas un asistente inteligente que trabaje junto a tu equipo.', en: 'You need a smart assistant that works alongside your team.' },

  // Footer
  'footer.tagline': { es: 'IA que potencia equipos humanos: menos tareas repetitivas, mejor atención, más ventas.', en: 'AI that empowers human teams: less repetitive work, better service, more sales.' },
  'footer.product': { es: 'Producto', en: 'Product' },
  'footer.company': { es: 'Compañía', en: 'Company' },
  'footer.legal': { es: 'Legal', en: 'Legal' },
  'footer.terms': { es: 'Términos', en: 'Terms' },
  'footer.privacy': { es: 'Privacidad', en: 'Privacy' },
  'footer.rights': { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
  'footer.backToTop': { es: 'Volver arriba', en: 'Back to top' },

  // Founders
  'founders.badge': { es: 'Fundador', en: 'Founder' },
  'founders.title': { es: 'Quién está', en: 'Who is' },
  'founders.titleAccent': { es: 'detrás de QubeSight.', en: 'behind QubeSight.' },
  'founders.subtitle': {
    es: 'Construimos automatización con IA pensada para negocios reales en Latinoamérica.',
    en: 'We build AI automation designed for real businesses across Latin America.',
  },
  'founders.ernesto.role': { es: 'Fundador & CEO', en: 'Founder & CEO' },
  'founders.ernesto.bio': {
    es: 'Años de experiencia en atención al cliente en banca y telecomunicaciones le mostraron de primera mano el costo real de no responder a tiempo. Hoy construye QubeSight para que ningún negocio en Latinoamérica vuelva a perder un cliente por eso.',
    en: 'Years of customer-service experience in banking and telecommunications showed him firsthand the real cost of not responding on time. Today he builds QubeSight so no business in Latin America loses a customer for that reason again.',
  },
  'founders.karla.role': { es: 'Cofundadora & COO', en: 'Co-founder & COO' },
  'founders.karla.bio': {
    es: 'Dirige operaciones y la experiencia de cliente para que cada implementación funcione.',
    en: 'Runs operations and customer experience to make every rollout work.',
  },

  // Hero extras
  'hero.subhead.1': {
    es: 'La IA elimina tareas repetitivas para que tu equipo se enfoque en lo que requiere criterio humano.',
    en: 'AI removes repetitive tasks so your team focuses on what needs human judgment.'
  },
  'hero.subhead.2': {
    es: 'Cuando tu equipo descansa, QubeSight sigue atendiendo clientes.',
    en: 'When your team rests, QubeSight keeps serving customers.'
  },

  // Multichannel block
  'multi.badge': { es: 'Canales', en: 'Channels' },
  'multi.title': { es: 'Un copiloto en', en: 'One copilot across' },
  'multi.titleAccent': { es: 'todos tus canales.', en: 'every channel.' },
  'multi.description': {
    es: 'WhatsApp, Instagram, Messenger, web y llamadas — misma lógica, menos carga para tu equipo.',
    en: 'WhatsApp, Instagram, Messenger, web and calls — same logic, less load on your team.'
  },
  'multi.ch.whatsapp': { es: 'WhatsApp', en: 'WhatsApp' },
  'multi.ch.instagram': { es: 'Instagram (DMs)', en: 'Instagram (DMs)' },
  'multi.ch.messenger': { es: 'Facebook Messenger', en: 'Facebook Messenger' },
  'multi.ch.web': { es: 'Web Chat', en: 'Web Chat' },
  'multi.ch.voice': { es: 'Llamadas (Voice Bot AI)', en: 'Calls (Voice Bot AI)' },
  'multi.tagline': {
    es: 'Un solo sistema. Todos tus clientes atendidos.',
    en: 'One system. All your customers served.'
  },

  // Assistant overrides
  'assistant.title.v2': { es: 'Chat IA que alivia', en: 'AI chat that lifts' },
  'assistant.titleAccent.v2': { es: 'la carga de tu equipo.', en: 'the load off your team.' },
  'assistant.footer': {
    es: '24/7 en WhatsApp, Instagram, Messenger y web. Tu equipo solo interviene cuando hace falta.',
    en: '24/7 on WhatsApp, Instagram, Messenger and web. Your team only steps in when needed.'
  },

  // VoiceBot updates
  'voicebot.subtitle.v2': {
    es: 'La secretaria atiende casos importantes. La IA responde lo repetitivo, agenda y cubre fuera de horario.',
    en: 'Your front desk handles important cases. AI covers FAQs, booking and after-hours.'
  },
  'voicebot.activation': {
    es: 'Activo en menos de 48 horas, junto a tu equipo.',
    en: 'Live in under 48 hours, alongside your team.'
  },

  // Voice Bot capacity
  'pricing.voice.bronze.capacity': { es: '2,000 minutos (~400 llamadas)', en: '2,000 minutes (~400 calls)' },
  'pricing.voice.silver.capacity': { es: '5,000 minutos (~1,000 llamadas)', en: '5,000 minutes (~1,000 calls)' },
  'pricing.voice.gold.capacity': { es: '12,000 minutos', en: '12,000 minutes' },
  'pricing.voice.overage': { es: 'Uso adicional: $0.10 por minuto', en: 'Overage usage: $0.10 per minute' },

  // PropIA repositioning
  'propia.title.v2': { es: 'PropIA — Tu equipo de', en: 'PropIA — Your automatic' },
  'propia.titleAccent.v2': { es: 'marketing automático.', en: 'marketing team.' },
  'propia.description.v2': {
    es: 'Convierte una sola foto en contenido que vende en todas tus redes automáticamente.',
    en: 'Turn a single photo into content that sells across all your social channels automatically.'
  },
  'propia.step1.title.v2': { es: 'Subes tus fotos una vez', en: 'Upload your photos once' },
  'propia.step2.title.v2': { es: 'IA crea textos que venden', en: 'AI writes copy that sells' },
  'propia.step2.desc.v2': { es: 'Optimizados para SEO y conversión.', en: 'Optimized for SEO and conversion.' },
  'propia.step3.title.v2': { es: 'IA genera Reels automáticos', en: 'AI generates auto Reels' },
  'propia.step3.desc.v2': { es: 'Videos cortos listos para publicar.', en: 'Short videos ready to publish.' },
  'propia.step4.title.v2': { es: 'Publica en IG, FB y TikTok', en: 'Publishes to IG, FB and TikTok' },
  'propia.step4.desc.v2': { es: 'Todas tus redes al mismo tiempo.', en: 'All your channels simultaneously.' },
  'propia.closer': {
    es: 'Más contenido = más visibilidad = más clientes.',
    en: 'More content = more visibility = more customers.'
  },

  // Differentiation block
  'diff.badge': { es: 'Por qué QubeSight', en: 'Why QubeSight' },
  'diff.title': { es: 'Otras herramientas', en: 'Other tools' },
  'diff.titleAccent': { es: 'vs QubeSight.', en: 'vs QubeSight.' },
  'diff.others.title': { es: 'Otras plataformas', en: 'Other platforms' },
  'diff.others.1': { es: 'Son complicadas de usar', en: 'Are complicated to use' },
  'diff.others.2': { es: 'Requieren configuración técnica', en: 'Require technical setup' },
  'diff.others.3': { es: 'No están adaptadas al mercado local', en: 'Not adapted to the local market' },
  'diff.others.4': { es: 'Soporte lento o automatizado', en: 'Slow or automated support' },
  'diff.us.title': { es: 'QubeSight', en: 'QubeSight' },
  'diff.us.1': { es: 'Configuración completa incluida', en: 'Full setup included' },
  'diff.us.2': { es: 'Funciona en todos tus canales', en: 'Works across all your channels' },
  'diff.us.3': { es: 'Soporte humano real', en: 'Real human support' },
  'diff.us.4': { es: 'Listo en menos de 48 horas', en: 'Live in under 48 hours' },

  // Benefits (was ROI — teammate framing)
  'roi.badge': { es: 'Beneficios', en: 'Benefits' },
  'roi.title': { es: 'Más productividad.', en: 'More productivity.' },
  'roi.titleAccent': { es: 'Mejor atención.', en: 'Better service.' },
  'roi.description': {
    es: 'QubeSight no sustituye a tu equipo: elimina lo repetitivo para que las personas brillen donde importa.',
    en: 'QubeSight doesn\'t replace your team: it removes the repetitive so people shine where it matters.'
  },
  'roi.b1': { es: 'Menos llamadas y FAQs repetitivas', en: 'Fewer repetitive calls and FAQs' },
  'roi.b2': { es: 'Más tiempo para clientes importantes', en: 'More time for important clients' },
  'roi.b3': { es: 'Cero consultas perdidas fuera de horario', en: 'Zero lost after-hours inquiries' },
  'roi.b4': { es: 'Menos errores de agenda manual', en: 'Fewer manual booking errors' },
  'roi.compare.human': { es: 'Solo tu equipo', en: 'Team alone' },
  'roi.compare.qs': { es: 'Equipo + QubeSight', en: 'Team + QubeSight' },
  'roi.compare.month': { es: '/mes', en: '/mo' },

  // Final CTA additions
  'final.subline': {
    es: 'Nunca más pierdas un cliente por no responder.',
    en: 'Never lose a customer for not answering again.'
  },
  'final.tagline': {
    es: 'No reemplazamos personas. Les damos superpoderes.',
    en: 'We don\'t replace people. We give them superpowers.'
  },

  // Voice Bot pricing redesign
  'pricing.voice.inboundFree': { es: 'Minutos entrantes incluidos en tu plan', en: 'Inbound minutes included in your plan' },
  'pricing.voice.setup48': { es: 'Configuración en 48 horas', en: 'Setup in 48 hours' },
  'pricing.voice.noContract': { es: 'Sin contratos largos', en: 'No long-term contracts' },
  'pricing.voice.overage.title': { es: 'Uso adicional', en: 'Additional usage' },
  'pricing.voice.overage.item': { es: 'Minutos salientes: $0.07 / min', en: 'Outbound minutes: $0.07 / min' },
  'pricing.voice.overage.note': { es: 'Los minutos entrantes están incluidos en cada plan. Solo pagas extra cuando el sistema realiza llamadas salientes.', en: 'Inbound minutes are included in each plan. You only pay extra when the system makes outbound calls.' },
  'pricing.addon.badge': { es: 'Recomendado para aumentar ventas', en: 'Recommended to boost sales' },
  'pricing.addon.name': { es: 'Outbound Engine', en: 'Outbound Engine' },
  'pricing.addon.desc': { es: 'Recordatorios y follow-ups automáticos ($0.07/min saliente).', en: 'Automatic reminders and follow-ups ($0.07/min outbound).' },
  'pricing.addon.f1': { es: 'Recordatorios automáticos', en: 'Automatic reminders' },
  'pricing.addon.f2': { es: 'Follow-ups inteligentes', en: 'Smart follow-ups' },
  'pricing.addon.f3': { es: 'Llamadas salientes automatizadas', en: 'Automated outbound calls' },
  'pricing.addon.cta': { es: 'Agregar a mi plan', en: 'Add to my plan' },
  'pricing.compare.title': { es: 'Equipo solo vs Equipo + QubeSight', en: 'Team alone vs Team + QubeSight' },
  'pricing.compare.human': { es: 'Solo tu equipo', en: 'Team alone' },
  'pricing.compare.human.1': { es: 'Saturado con FAQs', en: 'Overloaded with FAQs' },
  'pricing.compare.human.2': { es: 'Horario limitado', en: 'Limited hours' },
  'pricing.compare.human.3': { es: 'Agenda manual y errores', en: 'Manual booking & errors' },
  'pricing.compare.qs': { es: 'Equipo + QubeSight', en: 'Team + QubeSight' },
  'pricing.compare.qs.1': { es: 'IA cubre lo repetitivo', en: 'AI covers the repetitive' },
  'pricing.compare.qs.2': { es: 'Atención 24/7', en: '24/7 coverage' },
  'pricing.compare.qs.3': { es: 'Humanos en lo importante', en: 'Humans on what matters' },

  // AI Suite (Chat + Voice)
  'pricing.suite.title': { es: 'AI Suite — Chat + Voz + Automaciones', en: 'AI Suite — Chat + Voice + Automations' },
  'pricing.suite.subtitle': { es: 'Combina chatbot, voice bot y automatizaciones operativas en un solo sistema.', en: 'Combine chatbot, voice bot and operational automations in one system.' },
  'pricing.suite.business.name': { es: 'Business', en: 'Business' },
  'pricing.suite.business.desc': { es: 'Chat Bot + Voice Bot con todo incluido.', en: 'Chat Bot + Voice Bot with everything included.' },
  'pricing.suite.business.f1': { es: 'WhatsApp + Instagram + Facebook + Telegram + Web Chat', en: 'WhatsApp + Instagram + Facebook + Telegram + Web Chat' },
  'pricing.suite.business.f2': { es: 'Voice Bot como asistente del equipo', en: 'Voice Bot as a team assistant' },
  'pricing.suite.business.f3': { es: 'CRM integrado + agenda automática', en: 'Integrated CRM + auto scheduling' },
  'pricing.suite.business.f4': { es: 'Catálogo interactivo + memoria de conversación', en: 'Interactive catalog + conversation memory' },
  'pricing.suite.business.f5': { es: 'Multiidioma + handoff a humano', en: 'Multilingual + human handoff' },
  'pricing.suite.business.f6': { es: 'Reportes, analíticas y soporte prioritario', en: 'Reports, analytics and priority support' },
  'pricing.suite.enterprise.name': { es: 'Enterprise', en: 'Enterprise' },
  'pricing.suite.enterprise.desc': { es: 'Para operaciones multi-sucursal con flujos a medida.', en: 'For multi-branch operations with custom flows.' },
  'pricing.suite.enterprise.f1': { es: 'Todo lo del plan Business', en: 'Everything in Business' },
  'pricing.suite.enterprise.f2': { es: 'Flujos personalizados', en: 'Custom flows' },
  'pricing.suite.enterprise.f3': { es: 'Integraciones API a la medida', en: 'Custom API integrations' },
  'pricing.suite.enterprise.f4': { es: 'Dashboard de métricas', en: 'Metrics dashboard' },
  'pricing.suite.enterprise.f5': { es: 'Múltiples sucursales', en: 'Multiple locations' },
  'pricing.suite.enterprise.f6': { es: 'Automatizaciones avanzadas + soporte dedicado', en: 'Advanced automations + dedicated support' },

  // Section titles
  'pricing.section.chat': { es: '💬 AI Chat Bots', en: '💬 AI Chat Bots' },
  'pricing.chat.title': { es: 'Chatbots IA para WhatsApp y Web', en: 'AI Chatbots for WhatsApp & Web' },
  'pricing.chat.subtitle': { es: 'Atiende clientes automáticamente, captura leads y agenda citas 24/7.', en: 'Automatically serve customers, capture leads and book appointments 24/7.' },
  'pricing.section.voice': { es: '📞 AI Voice Bots', en: '📞 AI Voice Bots' },
  'pricing.section.suite': { es: '🚀 AI Suite', en: '🚀 AI Suite' },

  // Universal features
  'pricing.universal.title': { es: 'Todos los planes incluyen', en: 'All plans include' },
  'pricing.universal.f1': { es: 'Activación en 48 horas', en: 'Activation in 48 hours' },
  'pricing.universal.f2': { es: 'Sin contratos de permanencia', en: 'No long-term contracts' },
  'pricing.universal.f3': { es: 'Garantía de 14 días', en: '14-day guarantee' },
  'pricing.universal.f4': { es: 'Soporte técnico', en: 'Technical support' },
  'pricing.universal.f5': { es: 'Actualizaciones continuas', en: 'Continuous updates' },

  // Solution
  'solution.badge': { es: 'La solución', en: 'The solution' },
  'solution.title': { es: 'IA que trabaja', en: 'AI that works' },
  'solution.titleAccent': { es: 'antes, durante y después de tu equipo.', en: 'before, during and after your team.' },
  'solution.subtitle': {
    es: 'QubeSight automatiza lo repetitivo. Las personas se quedan con el criterio, la venta y la relación.',
    en: 'QubeSight automates the repetitive. People keep judgment, sales and relationships.'
  },
  'solution.b1.title': { es: 'Antes', en: 'Before' },
  'solution.b1.desc': { es: 'Responde FAQs y captura leads mientras tu equipo aún no llegó.', en: 'Answers FAQs and captures leads before your team arrives.' },
  'solution.b2.title': { es: 'Durante', en: 'During' },
  'solution.b2.desc': { es: 'Filtra lo repetitivo para que tu gente atienda lo que importa.', en: 'Filters the repetitive so your people handle what matters.' },
  'solution.b3.title': { es: 'Después', en: 'After' },
  'solution.b3.desc': { es: 'Cuando cierran, QubeSight sigue atendiendo y agendando.', en: 'When they clock out, QubeSight keeps answering and booking.' },

  // How it works
  'how.badge': { es: 'Cómo funciona', en: 'How it works' },
  'how.title': { es: 'Tres pasos.', en: 'Three steps.' },
  'how.titleAccent': { es: 'Cero fricción.', en: 'Zero friction.' },
  'how.s1.title': { es: 'Nos cuentas tu negocio', en: 'Tell us about your business' },
  'how.s1.desc': { es: 'Canales, FAQs, horarios y cómo quieres escalar a humano.', en: 'Channels, FAQs, hours and how you want to escalate to humans.' },
  'how.s2.title': { es: 'Configuramos todo', en: 'We set everything up' },
  'how.s2.desc': { es: 'Sin conocimientos técnicos. Listo en ~48 horas.', en: 'No technical skills. Live in ~48 hours.' },
  'how.s3.title': { es: 'Tu equipo gana un copiloto', en: 'Your team gains a copilot' },
  'how.s3.desc': { es: 'Menos carga repetitiva. Más clientes atendidos. Tú intervienes cuando quieras.', en: 'Less repetitive load. More customers served. You step in anytime.' },

  // Products
  'products.badge': { es: 'Productos', en: 'Products' },
  'products.title': { es: 'Elige el copiloto', en: 'Choose the copilot' },
  'products.titleAccent': { es: 'que tu equipo necesita.', en: 'your team needs.' },
  'products.subtitle': {
    es: 'Cada producto refuerza a las personas — no las sustituye.',
    en: 'Each product strengthens people — it doesn\'t replace them.'
  },
  'products.assistant.name': { es: 'Assistant', en: 'Assistant' },
  'products.assistant.tag': { es: 'Chat', en: 'Chat' },
  'products.assistant.desc': { es: 'WhatsApp, Instagram, Messenger y web. FAQs, leads y agenda.', en: 'WhatsApp, Instagram, Messenger and web. FAQs, leads and booking.' },
  'products.assistant.for': { es: 'Ideal si te llegan muchos mensajes', en: 'Best if you get lots of messages' },
  'products.voice.name': { es: 'Voice Bot', en: 'Voice Bot' },
  'products.voice.tag': { es: 'Voz', en: 'Voice' },
  'products.voice.desc': { es: 'Llamadas 24/7: FAQs, agenda y cobertura fuera de horario.', en: 'Calls 24/7: FAQs, booking and after-hours coverage.' },
  'products.voice.for': { es: 'Ideal si pierdes llamadas o tu línea satura', en: 'Best if you miss calls or the line saturates' },
  'products.suite.name': { es: 'AI Suite', en: 'AI Suite' },
  'products.suite.tag': { es: 'Todo en uno', en: 'All-in-one' },
  'products.suite.desc': { es: 'Chat + Voz + Ops en un solo sistema.', en: 'Chat + Voice + Ops in one system.' },
  'products.suite.for': { es: 'Ideal si quieres cobertura completa', en: 'Best if you want full coverage' },
  'products.recommended': { es: 'Recomendado', en: 'Recommended' },
  'products.selector.title': { es: '¿No sabes cuál elegir?', en: 'Not sure which to pick?' },
  'products.selector.subtitle': { es: 'Responde según tu negocio:', en: 'Answer based on your business:' },
  'products.selector.q1': { es: 'Principalmente mensajes (WhatsApp / redes)', en: 'Mostly messages (WhatsApp / social)' },
  'products.selector.q2': { es: 'Principalmente llamadas telefónicas', en: 'Mostly phone calls' },
  'products.selector.q3': { es: 'Operación interna y cobros', en: 'Internal ops and billing' },
  'products.selector.q4': { es: 'Quiero todo: chat y voz', en: 'I want it all: chat and voice' },
  'products.selector.result': { es: 'Te conviene', en: 'You should start with' },
  'products.selector.cta': { es: 'Ver precios', en: 'See pricing' },
  'products.compare.channel': { es: 'Canal', en: 'Channel' },
  'products.compare.chat': { es: 'Mensajes', en: 'Messages' },
  'products.compare.voice': { es: 'Llamadas', en: 'Calls' },
  'products.compare.best': { es: 'Mejor para', en: 'Best for' },

  // Social proof stats
  'social.badge': { es: 'Resultados', en: 'Results' },
  'social.s1.value': { es: '< 3s', en: '< 3s' },
  'social.s1.label': { es: 'tiempo de respuesta promedio', en: 'average response time' },
  'social.s2.value': { es: '24/7', en: '24/7' },
  'social.s2.label': { es: 'cobertura cuando el equipo descansa', en: 'coverage while the team rests' },
  'social.s3.value': { es: '40%', en: '40%' },
  'social.s3.label': { es: 'más leads atendidos en el primer mes*', en: 'more leads handled in month one*' },
  'social.s4.value': { es: '48h', en: '48h' },
  'social.s4.label': { es: 'para estar en producción', en: 'to go live' },
  'social.note': { es: '*Resultados reportados por clientes en implementación típica.', en: '*Results reported by customers in typical rollouts.' },

  // Integrations
  'integrations.badge': { es: 'Integraciones', en: 'Integrations' },
  'integrations.title': { es: 'Se conecta con', en: 'Connects with' },
  'integrations.titleAccent': { es: 'las herramientas que ya usas.', en: 'the tools you already use.' },
  'integrations.subtitle': {
    es: 'Calendarios, mensajería y pagos — sin reinventar tu stack.',
    en: 'Calendars, messaging and payments — without reinventing your stack.'
  },

  // FAQ
  'faq.badge': { es: 'FAQ', en: 'FAQ' },
  'faq.title': { es: 'Preguntas', en: 'Questions' },
  'faq.titleAccent': { es: 'frecuentes.', en: 'answered.' },
  'faq.q1': { es: '¿Necesito conocimientos técnicos?', en: 'Do I need technical skills?' },
  'faq.a1': { es: 'No. Configuramos todo por ti. Tú solo defines horarios, FAQs y cuándo escalar a humano.', en: 'No. We set everything up for you. You just define hours, FAQs and when to escalate to a human.' },
  'faq.q2': { es: '¿La IA reemplaza a mi equipo?', en: 'Does AI replace my team?' },
  'faq.a2': { es: 'No. QubeSight automatiza tareas repetitivas para que tu equipo se enfoque en criterio, ventas y clientes importantes.', en: 'No. QubeSight automates repetitive tasks so your team focuses on judgment, sales and important clients.' },
  'faq.q3': { es: '¿Qué pasa si el cliente hace una pregunta complicada?', en: 'What if a customer asks something complex?' },
  'faq.a3': { es: 'La IA escala a una persona de tu equipo con el contexto de la conversación. Tú decides las reglas de handoff.', en: 'AI escalates to someone on your team with full conversation context. You set the handoff rules.' },
  'faq.q4': { es: '¿Puedo intervenir una conversación?', en: 'Can I take over a conversation?' },
  'faq.a4': { es: 'Sí. En cualquier momento puedes asumir el chat o la llamada. La IA cede el control al instante.', en: 'Yes. You can take over chat or call anytime. AI hands control over instantly.' },
  'faq.q5': { es: '¿Cuánto tarda la implementación?', en: 'How long does implementation take?' },
  'faq.a5': { es: 'La mayoría de los negocios están activos en menos de 48 horas.', en: 'Most businesses go live in under 48 hours.' },
  'faq.q6': { es: '¿Qué canales soporta?', en: 'Which channels are supported?' },
  'faq.a6': { es: 'WhatsApp, Instagram, Facebook Messenger, Web Chat y llamadas telefónicas (Voice Bot).', en: 'WhatsApp, Instagram, Facebook Messenger, Web Chat and phone calls (Voice Bot).' },
  'faq.q7': { es: '¿Puedo cancelar cuando quiera?', en: 'Can I cancel anytime?' },
  'faq.a7': { es: 'Sí. Sin permanencia ni penalizaciones. También tienes garantía de 14 días.', en: 'Yes. No lock-in or penalties. You also get a 14-day guarantee.' },
};

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language | null;
    if (saved === 'es' || saved === 'en') setLanguageState(saved);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language];
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const ctx = useContext(TranslationContext);
  if (!ctx) throw new Error('useTranslation must be used within TranslationProvider');
  return ctx;
};
