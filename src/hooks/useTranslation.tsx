import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface Translations {
  [key: string]: { es: string; en: string };
}

export const translations: Translations = {
  // Header
  'nav.problem': { es: 'Problema', en: 'Problem' },
  'nav.assistant': { es: 'Asistente', en: 'Assistant' },
  'nav.voicebot': { es: 'Voice Bot', en: 'Voice Bot' },
  'nav.ops': { es: 'Ops', en: 'Ops' },
  'nav.industries': { es: 'Industrias', en: 'Industries' },
  'nav.pricing': { es: 'Precios', en: 'Pricing' },
  'nav.contact': { es: 'Empezar', en: 'Get Started' },

  // Voice Bot
  'voicebot.badge': { es: 'Producto 3 · Voice Bot AI', en: 'Product 3 · Voice Bot AI' },
  'voicebot.title': { es: 'Recepcionistas de voz inteligentes que', en: 'Smart voice receptionists that' },
  'voicebot.titleAccent': { es: 'no solo contestan: ejecutan.', en: 'don\'t just answer: they execute.' },
  'voicebot.subtitle': {
    es: 'Atienden llamadas, toman pedidos por voz, cobran y agendan en Google Calendar. 24/7, en varios idiomas, con latencia menor a 1 segundo.',
    en: 'They handle calls, take voice orders, charge payments and book on Google Calendar. 24/7, multilingual, with sub-second latency.'
  },
  'voicebot.col.feature': { es: 'Característica', en: 'Feature' },
  'voicebot.col.human': { es: 'Recepcionista humana', en: 'Human receptionist' },
  'voicebot.row.hours': { es: 'Disponibilidad', en: 'Availability' },
  'voicebot.row.hours.human': { es: '8 horas / día', en: '8 hours / day' },
  'voicebot.row.hours.bot': { es: '24/7 sin descansos', en: '24/7 no breaks' },
  'voicebot.row.languages': { es: 'Idiomas', en: 'Languages' },
  'voicebot.row.languages.human': { es: '1 idioma', en: '1 language' },
  'voicebot.row.languages.bot': { es: 'Multicultural · 4+ idiomas', en: 'Multicultural · 4+ languages' },
  'voicebot.row.calls': { es: 'Llamadas simultáneas', en: 'Concurrent calls' },
  'voicebot.row.calls.human': { es: '1 llamada a la vez', en: '1 call at a time' },
  'voicebot.row.calls.bot': { es: 'Ilimitadas en paralelo', en: 'Unlimited in parallel' },
  'voicebot.row.cost': { es: 'Costo anual', en: 'Annual cost' },
  'voicebot.row.cost.extra': { es: 'cargas sociales', en: 'payroll taxes' },
  'voicebot.row.savings': { es: 'Ahorro estimado', en: 'Estimated savings' },
  'voicebot.year': { es: 'año', en: 'year' },
  'voicebot.benefit.latency': { es: 'Latencia <1s, conversación natural', en: 'Sub-second latency, natural talk' },
  'voicebot.benefit.orders': { es: 'Toma de pedidos por voz (RPA)', en: 'Voice order taking (RPA)' },
  'voicebot.benefit.payments': { es: 'Cobros y pagos por voz', en: 'Voice payments and checkout' },
  'voicebot.benefit.calendar': { es: 'Agenda en Google Calendar', en: 'Books to Google Calendar' },
  'voicebot.cta': { es: 'Activar mi Voice Bot', en: 'Activate my Voice Bot' },

  // Hero
  'hero.badge': { es: 'Asistente de Voz & Chat con IA · 24/7', en: 'AI Voice & Chat Assistant · 24/7' },
  'hero.title': { es: 'Nunca pierdas un cliente más.', en: 'Never lose another customer.' },
  'hero.titleAccent': { es: 'Tu recepcionista IA responde llamadas, chat y SMS 24/7.', en: 'Your AI receptionist answers calls, chat and SMS 24/7.' },
  'hero.description': {
    es: 'QubeSight gestiona tus mensajes en WhatsApp y web instantáneamente, mientras PropIA automatiza tus redes sociales. Deja de perder ventas por no contestar a tiempo.',
    en: 'QubeSight handles your WhatsApp and web messages instantly, while PropIA automates your social media. Stop losing sales for not replying in time.'
  },
  'hero.cta.primary': { es: 'Empezar a Responder Automáticamente', en: 'Start Replying Automatically' },
  'hero.cta.secondary': { es: 'Ver Cómo Funciona', en: 'See How It Works' },
  'hero.proof.messages': { es: 'llamadas y mensajes atendidos', en: 'calls and messages handled' },
  'hero.proof.time': { es: 'tiempo de respuesta', en: 'response time' },
  'hero.proof.conversion': { es: 'tasa de conversión', en: 'conversion rate' },

  // Problem
  'problem.title': { es: 'Cada mensaje no respondido es', en: 'Every unanswered message is' },
  'problem.titleAccent': { es: 'dinero que se lleva tu competencia.', en: 'money your competition takes.' },
  'problem.subtitle': {
    es: 'Mientras tú contestas a las 9am, ya perdiste al cliente que escribió a las 11pm.',
    en: 'While you reply at 9am, you already lost the customer who wrote at 11pm.'
  },
  'problem.p1.title': { es: 'Los clientes se van si no contestas rápido', en: 'Customers leave if you don\'t reply fast' },
  'problem.p1.desc': { es: 'El 78% compra al primero que responde. Si tardas más de 5 minutos, ya perdiste.', en: '78% buy from whoever replies first. If you take more than 5 minutes, you already lost.' },
  'problem.p2.title': { es: 'Consultas a deshoras', en: 'Off-hours inquiries' },
  'problem.p2.desc': { es: 'Noches, fines de semana y festivos. Tus clientes preguntan cuando tú no estás.', en: 'Nights, weekends and holidays. Customers ask when you\'re not there.' },
  'problem.p3.title': { es: 'Saturación operativa', en: 'Operational overload' },
  'problem.p3.desc': { es: 'No puedes atender, vender, publicar y operar al mismo tiempo. Algo siempre falla.', en: 'You can\'t serve, sell, post and operate at the same time. Something always breaks.' },

  // Assistant
  'assistant.badge': { es: 'Producto 1 · QubeSight Assistant', en: 'Product 1 · QubeSight Assistant' },
  'assistant.title': { es: 'Tu asistente inteligente que', en: 'Your smart assistant that' },
  'assistant.titleAccent': { es: 'nunca duerme.', en: 'never sleeps.' },
  'assistant.description': {
    es: 'Una IA entrenada con tu negocio que responde clientes en WhatsApp y web chat al instante, captura leads y agenda citas mientras tú haces lo importante.',
    en: 'An AI trained on your business that replies to customers on WhatsApp and web chat instantly, captures leads and books appointments while you focus on what matters.'
  },
  'assistant.b1': { es: 'Respuestas inmediatas en WhatsApp y Web Chat', en: 'Instant replies on WhatsApp and Web Chat' },
  'assistant.b2': { es: 'Manejo de FAQ: precios, horarios, citas y stock', en: 'Handles FAQs: pricing, hours, appointments and stock' },
  'assistant.b3': { es: 'Captura de leads 24/7 sin intervención humana', en: '24/7 lead capture with zero human intervention' },
  'assistant.b4': { es: 'Configuración 100% gestionada por nuestro equipo', en: 'Setup 100% managed by our team' },
  'assistant.b5': { es: 'Escalación inteligente a humano cuando hace falta', en: 'Smart hand-off to a human when needed' },
  'assistant.cta': { es: 'Quiero mi Asistente', en: 'I want my Assistant' },

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
  'industries.title': { es: 'Soluciones por industria', en: 'Solutions by industry' },
  'industries.description': { es: 'Configuramos QubeSight para tu sector específico.', en: 'We tune QubeSight to your specific sector.' },
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
  'testimonials.title': { es: 'Negocios que ya', en: 'Businesses already' },
  'testimonials.titleAccent': { es: 'venden más mientras duermen.', en: 'selling more while they sleep.' },
  'testimonials.t1.name': { es: 'María González', en: 'María González' },
  'testimonials.t1.role': { es: 'Restaurante', en: 'Restaurant Owner' },
  'testimonials.t1.quote': {
    es: 'Antes perdía reservas cada noche. Ahora mi teléfono contesta solo y despierto con nuevas mesas confirmadas.',
    en: 'I used to lose reservations every night. Now my phone answers on its own and I wake up to new tables confirmed.'
  },
  'testimonials.t2.name': { es: 'James Carter', en: 'James Carter' },
  'testimonials.t2.role': { es: 'Inmobiliaria', en: 'Real Estate Agent' },
  'testimonials.t2.quote': {
    es: 'Mis ventas subieron un 40% el primer mes. Ningún lead se queda sin respuesta.',
    en: 'My sales went up 40% the first month. No lead goes unanswered.'
  },
  'testimonials.t3.name': { es: 'Ana López', en: 'Ana López' },
  'testimonials.t3.role': { es: 'Clínica Dental', en: 'Dental Clinic' },
  'testimonials.t3.quote': {
    es: 'A los pacientes les encanta la rapidez. Dejamos de perder pacientes ante clínicas más rápidas.',
    en: 'Patients love the speed. We stopped losing patients to faster clinics.'
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
  'pricing.voice.title': { es: 'Voice Bots IA — Recepcionistas Telefónicas', en: 'AI Voice Bots — Phone Receptionists' },
  'pricing.voice.subtitle': { es: 'Atienden llamadas, agendan citas y cierran ventas por teléfono sin intervención humana.', en: 'Answer calls, book appointments and close sales by phone with zero human intervention.' },
  'pricing.voice.bronze.name': { es: 'Inicio', en: 'Starter' },
  'pricing.voice.bronze.desc': { es: 'Recepcionista IA para no perder llamadas.', en: 'AI receptionist so you never miss a call.' },
  'pricing.voice.bronze.f1': { es: 'Recepcionista IA 24/7', en: 'AI receptionist 24/7' },
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
  'final.title': { es: 'Configuración en minutos.', en: 'Setup in minutes.' },
  'final.titleAccent': { es: 'Tu negocio empieza a responder hoy mismo.', en: 'Your business starts replying today.' },
  'final.description': { es: 'Sin contratos eternos. Sin tarjetas de crédito ocultas. Solo más clientes atendidos.', en: 'No long contracts. No hidden cards. Just more customers served.' },
  'final.cta': { es: 'Hablar con un experto', en: 'Talk to an expert' },
  'final.cta.primary': { es: 'Probar demo gratis', en: 'Try free demo' },
  'final.bullet.1': { es: 'Activación en 48 horas', en: 'Live in 48 hours' },
  'final.bullet.2': { es: 'Sin permanencia ni contratos largos', en: 'No lock-in, no long contracts' },
  'final.bullet.3': { es: 'Soporte humano cuando lo necesites', en: 'Human support whenever you need it' },
  'final.bullet.4': { es: 'Garantía de 14 días o te devolvemos tu dinero', en: '14-day money-back guarantee' },
  'final.fineprint': { es: 'Sin tarjeta para probar el demo. Cancela cuando quieras.', en: 'No card needed to try the demo. Cancel anytime.' },

  // Trust bar
  'trustbar.title': { es: 'Diseñado para PYMEs en sectores reales', en: 'Built for SMBs in real-world sectors' },

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
  'problem.badge': { es: 'El costo de no estar disponible', en: 'The cost of not being available' },
  'problem.cta.lead': { es: 'Cada hora sin responder cuesta clientes reales.', en: 'Every hour you don\'t reply costs real customers.' },
  'problem.cta.tail': { es: 'Lo bueno: hay una solución que ya está funcionando para negocios como el tuyo.', en: 'The good news: there\'s a solution already working for businesses like yours.' },

  // Footer
  'footer.tagline': { es: 'Automatización con IA para pequeños negocios que quieren crecer en grande.', en: 'AI automation for small businesses that want to grow big.' },
  'footer.product': { es: 'Producto', en: 'Product' },
  'footer.company': { es: 'Compañía', en: 'Company' },
  'footer.legal': { es: 'Legal', en: 'Legal' },
  'footer.terms': { es: 'Términos', en: 'Terms' },
  'footer.privacy': { es: 'Privacidad', en: 'Privacy' },
  'footer.rights': { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },

  // Founders
  'founders.title': { es: 'Conoce al equipo', en: 'Meet the team' },
  'founders.titleAccent': { es: 'detrás de QubeSight.', en: 'behind QubeSight.' },
  'founders.subtitle': { es: 'Construimos automatización con IA pensada para negocios reales en Latinoamérica.', en: 'We build AI automation designed for real businesses across Latin America.' },
  'founders.ernesto.role': { es: 'Fundador & CEO', en: 'Founder & CEO' },
  'founders.ernesto.bio': { es: 'Lidera la estrategia, producto y desarrollo de IA en QubeSight.', en: 'Leads strategy, product and AI development at QubeSight.' },
  'founders.karla.role': { es: 'Cofundadora & COO', en: 'Co-founder & COO' },
  'founders.karla.bio': { es: 'Dirige operaciones y la experiencia de cliente para que cada implementación funcione.', en: 'Runs operations and customer experience to make every rollout work.' },

  // Hero extras
  'hero.subhead.1': {
    es: 'Responde automáticamente en WhatsApp, Instagram, Messenger, Web y llamadas — todo en un solo sistema.',
    en: 'Auto-replies on WhatsApp, Instagram, Messenger, Web and calls — all in one system.'
  },
  'hero.subhead.2': {
    es: 'Más clientes atendidos, más citas agendadas, más ventas cerradas.',
    en: 'More customers served, more bookings made, more sales closed.'
  },

  // Multichannel block
  'multi.badge': { es: 'Cobertura total', en: 'Full coverage' },
  'multi.title': { es: 'Automatización total en', en: 'Total automation across' },
  'multi.titleAccent': { es: 'todos tus canales.', en: 'all your channels.' },
  'multi.description': {
    es: 'QubeSight responde por ti en cada canal donde tus clientes te buscan, sincronizado en una sola lógica inteligente.',
    en: 'QubeSight replies for you on every channel where customers reach out, synced under a single smart logic.'
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
  'assistant.title.v2': { es: 'Tu equipo de atención automática', en: 'Your automatic support team' },
  'assistant.titleAccent.v2': { es: 'en todos tus canales.', en: 'on every channel.' },
  'assistant.footer': {
    es: 'Funciona 24/7 en WhatsApp, Instagram, Messenger y tu sitio web. Nunca más pierdes un mensaje.',
    en: 'Runs 24/7 on WhatsApp, Instagram, Messenger and your website. Never miss a message again.'
  },

  // VoiceBot updates
  'voicebot.subtitle.v2': {
    es: 'Tu recepcionista inteligente que responde, agenda y ejecuta por ti 24/7. Atiende llamadas, agenda citas y cobra automáticamente — sin que tengas que configurar nada.',
    en: 'Your smart receptionist that answers, books and executes for you 24/7. Handles calls, books appointments and charges payments automatically — zero setup needed.'
  },
  'voicebot.activation': {
    es: 'Activación en menos de 48 horas, listo para tu negocio.',
    en: 'Live in under 48 hours, ready for your business.'
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

  // ROI block
  'roi.badge': { es: 'Costo vs valor', en: 'Cost vs value' },
  'roi.title': { es: 'Más barato que', en: 'Cheaper than' },
  'roi.titleAccent': { es: 'contratar personal.', en: 'hiring staff.' },
  'roi.description': {
    es: 'Un recepcionista cuesta más de $1,100/mes. QubeSight hace más, por menos de la mitad.',
    en: 'A receptionist costs over $1,100/month. QubeSight does more, for less than half.'
  },
  'roi.b1': { es: 'Atiende 24/7 sin interrupciones', en: 'Answers 24/7 without breaks' },
  'roi.b2': { es: 'Maneja múltiples clientes a la vez', en: 'Handles multiple customers at once' },
  'roi.b3': { es: 'Nunca se cansa ni se enferma', en: 'Never gets tired or sick' },
  'roi.b4': { es: 'Por menos de la mitad del costo', en: 'For less than half the cost' },
  'roi.compare.human': { es: 'Recepcionista humana', en: 'Human receptionist' },
  'roi.compare.qs': { es: 'QubeSight', en: 'QubeSight' },
  'roi.compare.month': { es: '/mes', en: '/mo' },

  // Final CTA additions
  'final.subline': {
    es: 'Empieza hoy y deja de perder clientes todos los días.',
    en: 'Start today and stop losing customers every day.'
  },
  'final.tagline': {
    es: 'Mientras otros venden software… QubeSight te entrega clientes atendidos.',
    en: 'While others sell software… QubeSight delivers served customers.'
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
  'pricing.compare.title': { es: 'Recepcionista humana vs QubeSight', en: 'Human receptionist vs QubeSight' },
  'pricing.compare.human': { es: 'Recepcionista humana', en: 'Human receptionist' },
  'pricing.compare.human.1': { es: '$1,100+/mes', en: '$1,100+/mo' },
  'pricing.compare.human.2': { es: 'Horario limitado', en: 'Limited hours' },
  'pricing.compare.human.3': { es: '1 llamada a la vez', en: '1 call at a time' },
  'pricing.compare.qs': { es: 'QubeSight', en: 'QubeSight' },
  'pricing.compare.qs.1': { es: 'Desde $79', en: 'From $79' },
  'pricing.compare.qs.2': { es: '24/7 sin descansos', en: '24/7 no breaks' },
  'pricing.compare.qs.3': { es: 'Llamadas simultáneas ilimitadas', en: 'Unlimited concurrent calls' },

  // AI Suite (Chat + Voice)
  'pricing.suite.title': { es: 'AI Suite — Chat + Voz', en: 'AI Suite — Chat + Voice' },
  'pricing.suite.subtitle': { es: 'Todo integrado en un solo sistema: chat + voz + CRM + agenda.', en: 'Everything integrated in one system: chat + voice + CRM + scheduling.' },
  'pricing.suite.business.name': { es: 'Business', en: 'Business' },
  'pricing.suite.business.desc': { es: 'Chat Bot + Voice Bot con todo incluido.', en: 'Chat Bot + Voice Bot with everything included.' },
  'pricing.suite.business.f1': { es: 'WhatsApp + Instagram + Facebook + Telegram + Web Chat', en: 'WhatsApp + Instagram + Facebook + Telegram + Web Chat' },
  'pricing.suite.business.f2': { es: 'Voice Bot con recepcionista IA', en: 'Voice Bot with AI receptionist' },
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
