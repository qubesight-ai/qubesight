import imgTemteaching from "@/assets/portfolio/temteaching.webp";
import imgOverstop from "@/assets/portfolio/overstop.webp";
import imgTimAutomation from "@/assets/portfolio/tim-automation.webp";
import imgTimVoice from "@/assets/portfolio/tim-voice.webp";
import imgQubesight from "@/assets/portfolio/qubesight.webp";
import imgAjhb1 from "@/assets/portfolio/ajhb1.webp";

export type Language = "es" | "en";

interface Bilingual {
  es: string;
  en: string;
}

export interface TechStackItem {
  name: Bilingual;
  rationale: Bilingual;
}

export interface Feature {
  title: Bilingual;
  description: Bilingual;
  icon: string; // lucide icon name
}

export interface Metric {
  value: string;
  label: Bilingual;
}

export interface Testimonial {
  quote: Bilingual;
  name: string;
  title: Bilingual;
  photo?: string;
}

export interface CaseStudy {
  slug: string;
  title: Bilingual;
  category: string;
  categoryTag: Bilingual;
  image: string;
  summary: Bilingual;
  heroStat: { value: string; label: Bilingual };
  clientProblem: Bilingual;
  techStack: TechStackItem[];
  architectureDiagram: Bilingual;
  features: Feature[];
  metrics: Metric[];
  testimonial: Testimonial;
  liveUrl?: string;
  embedUrl?: string;
}

export const categories = [
  { key: "all", label: { es: "Todos", en: "All" } },
  { key: "ai", label: { es: "IA & Automatización", en: "AI & Automation" } },
  { key: "edtech", label: { es: "Plataformas Educativas", en: "EdTech" } },
  { key: "web", label: { es: "Desarrollo Web", en: "Web Development" } },
  { key: "ecommerce", label: { es: "E-commerce", en: "E-commerce" } },
  { key: "systems", label: { es: "Sistemas Empresariales", en: "Business Systems" } },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "tim-voice-agent",
    title: { es: "TIM AI Voice Agent", en: "TIM AI Voice Agent" },
    category: "ai",
    categoryTag: { es: "Agente de Voz IA", en: "AI Voice Agent" },
    image: imgTimVoice,
    summary: {
      es: "Un agente de voz inteligente que brinda soporte telefónico automatizado 24/7, asegurando que ninguna llamada de cliente quede sin respuesta.",
      en: "An intelligent voice agent that provides 24/7 automated phone support, ensuring no customer call ever goes unanswered.",
    },
    heroStat: {
      value: "24/7",
      label: { es: "Disponibilidad", en: "Availability" },
    },
    clientProblem: {
      es: "TIM Automation necesitaba proporcionar soporte telefónico las 24 horas a sus clientes globales, pero no podía justificar un call center con personal humano las 24 horas. Estaban perdiendo leads y frustrando a clientes en diferentes zonas horarias.",
      en: "TIM Automation needed to provide round-the-clock phone support to their global clients but couldn't justify a 24-hour human-staffed call center. They were losing leads and frustrating customers in different time zones.",
    },
    techStack: [
      {
        name: { es: "Frontend", en: "Frontend" },
        rationale: {
          es: "React — Elegido por su reusabilidad de componentes y velocidad.",
          en: "React — Chosen for its component reusability and speed.",
        },
      },
      {
        name: { es: "Backend", en: "Backend" },
        rationale: {
          es: "Node.js — Para manejar solicitudes de API en tiempo real de forma eficiente.",
          en: "Node.js — To handle real-time API requests efficiently.",
        },
      },
      {
        name: { es: "IA/NLP", en: "AI/NLP" },
        rationale: {
          es: "Dialogflow CX — Seleccionada por su robusto reconocimiento de intenciones e integración sencilla con telefonía.",
          en: "Dialogflow CX — Selected for its robust intent matching and easy telephony integration.",
        },
      },
      {
        name: { es: "Base de Datos", en: "Database" },
        rationale: {
          es: "PostgreSQL — Para integridad de datos y consultas complejas.",
          en: "PostgreSQL — For data integrity and complex querying.",
        },
      },
      {
        name: { es: "DevOps", en: "DevOps" },
        rationale: {
          es: "AWS (EC2, RDS) — Para asegurar 99.9% de uptime y auto-escalado.",
          en: "AWS (EC2, RDS) — To ensure 99.9% uptime and auto-scaling.",
        },
      },
    ],
    architectureDiagram: {
      es: "Usuario → Llamada Telefónica → Agente de Voz IA → Motor NLP → Lógica de Negocio → CRM / Base de Datos → Transferencia a Agente Humano (si es necesario)",
      en: "User → Phone Call → AI Voice Agent → NLP Engine → Business Logic → CRM / Database → Human Agent Handoff (if needed)",
    },
    features: [
      {
        title: { es: "Comprensión de Lenguaje Natural", en: "Natural Language Understanding" },
        description: {
          es: "La IA comprende solicitudes complejas de clientes y las dirige apropiadamente, reduciendo tiempos de espera y mejorando la satisfacción.",
          en: "The AI understands complex customer requests and routes them appropriately, reducing wait times and improving satisfaction.",
        },
        icon: "Brain",
      },
      {
        title: { es: "Transferencia Inteligente", en: "Seamless Hand-off" },
        description: {
          es: "Transfiere llamadas inteligentemente a un agente humano cuando la consulta requiere un toque personal, sin interrumpir la experiencia.",
          en: "Intelligently transfers calls to a human agent when the query requires a personal touch, without disrupting the experience.",
        },
        icon: "ArrowRightLeft",
      },
      {
        title: { es: "Integración con CRM", en: "CRM Integration" },
        description: {
          es: "Registra automáticamente los detalles de llamadas y solicitudes de clientes en el CRM de la empresa para seguimiento completo.",
          en: "Automatically logs call details and customer requests into the company's CRM for complete follow-up tracking.",
        },
        icon: "Database",
      },
    ],
    metrics: [
      {
        value: "0",
        label: { es: "Llamadas perdidas fuera de horario", en: "Missed calls during off-hours" },
      },
      {
        value: "30%",
        label: {
          es: "Consultas resueltas completamente por IA",
          en: "Inquiries resolved entirely by AI",
        },
      },
      {
        value: "$4,200",
        label: {
          es: "Ahorro anual estimado vs turno nocturno",
          en: "Estimated annual savings vs night shift",
        },
      },
    ],
    testimonial: {
      quote: {
        es: "Qubesight no solo nos construyó una herramienta; se convirtieron en un socio estratégico en nuestra transformación digital. El agente de voz IA ha sido un game-changer para nuestro servicio al cliente.",
        en: "Qubesight didn't just build us a tool; they became a strategic partner in our digital transformation. The AI voice agent has been a game-changer for our customer service.",
      },
      name: "Carlos Méndez",
      title: { es: "CEO, TIM Automation", en: "CEO, TIM Automation" },
    },
  },
  {
    slug: "tim-automation",
    title: { es: "TIM Automation", en: "TIM Automation" },
    category: "ai",
    categoryTag: { es: "Automatización IA", en: "AI Automation" },
    image: imgTimAutomation,
    summary: {
      es: "Sistema de automatización inteligente que eliminó el 40% de tareas manuales repetitivas, liberando al equipo para enfocarse en trabajo estratégico de alto valor.",
      en: "Intelligent automation system that eliminated 40% of repetitive manual tasks, freeing the team to focus on high-value strategic work.",
    },
    heroStat: {
      value: "40%",
      label: { es: "Reducción de Costos", en: "Cost Reduction" },
    },
    clientProblem: {
      es: "TIM Automation, una empresa de servicios industriales con 12 empleados, dependía de procesos manuales para gestionar órdenes de trabajo, facturación y seguimiento de clientes. Los errores humanos generaban retrabajos costosos y el equipo administrativo dedicaba más del 60% de su tiempo a tareas repetitivas.",
      en: "TIM Automation, an industrial services company with 12 employees, relied on manual processes for work order management, invoicing, and client follow-up. Human errors caused costly rework and the admin team spent over 60% of their time on repetitive tasks.",
    },
    techStack: [
      {
        name: { es: "Frontend", en: "Frontend" },
        rationale: {
          es: "React — Interfaces dinámicas con actualización en tiempo real de estados de órdenes.",
          en: "React — Dynamic interfaces with real-time work order status updates.",
        },
      },
      {
        name: { es: "Backend", en: "Backend" },
        rationale: {
          es: "Node.js + Express — Manejo eficiente de webhooks y eventos asíncronos de automatización.",
          en: "Node.js + Express — Efficient handling of webhooks and async automation events.",
        },
      },
      {
        name: { es: "Automatización", en: "Automation" },
        rationale: {
          es: "n8n + Scripts personalizados — Flujos de trabajo visuales combinados con lógica de negocio a medida.",
          en: "n8n + Custom Scripts — Visual workflows combined with custom business logic.",
        },
      },
      {
        name: { es: "Base de Datos", en: "Database" },
        rationale: {
          es: "PostgreSQL — Integridad transaccional para facturación y auditoría completa.",
          en: "PostgreSQL — Transactional integrity for billing and complete audit trails.",
        },
      },
    ],
    architectureDiagram: {
      es: "Entrada de Datos → Motor de Automatización → Reglas de Negocio → Acciones Automatizadas → Dashboard de Monitoreo",
      en: "Data Input → Automation Engine → Business Rules → Automated Actions → Monitoring Dashboard",
    },
    features: [
      {
        title: { es: "Órdenes de Trabajo Automatizadas", en: "Automated Work Orders" },
        description: {
          es: "Las órdenes se crean, asignan y actualizan automáticamente según reglas de negocio, eliminando cuellos de botella administrativos.",
          en: "Work orders are automatically created, assigned, and updated based on business rules, eliminating administrative bottlenecks.",
        },
        icon: "Zap",
      },
      {
        title: { es: "Facturación Inteligente", en: "Smart Invoicing" },
        description: {
          es: "Genera facturas automáticamente al completar una orden, con cálculos de materiales, mano de obra y márgenes configurables.",
          en: "Automatically generates invoices upon order completion, with configurable material, labor, and margin calculations.",
        },
        icon: "Settings",
      },
      {
        title: { es: "Dashboard de Rendimiento", en: "Performance Dashboard" },
        description: {
          es: "Panel en tiempo real con KPIs operativos, tiempos de respuesta y productividad por equipo para decisiones basadas en datos.",
          en: "Real-time dashboard with operational KPIs, response times, and team productivity for data-driven decisions.",
        },
        icon: "BarChart3",
      },
    ],
    metrics: [
      {
        value: "35h",
        label: { es: "Horas manuales eliminadas al mes", en: "Manual hours eliminated per month" },
      },
      {
        value: "30%",
        label: { es: "Reducción en errores de facturación", en: "Reduction in billing errors" },
      },
      {
        value: "2x",
        label: {
          es: "Aumento en velocidad de procesamiento de órdenes",
          en: "Increase in order processing speed",
        },
      },
    ],
    testimonial: {
      quote: {
        es: "Antes tardábamos días en procesar una orden completa. Ahora el sistema lo hace en minutos. Qubesight entendió nuestro negocio y automatizó exactamente lo que necesitábamos.",
        en: "We used to take days to process a complete order. Now the system does it in minutes. Qubesight understood our business and automated exactly what we needed.",
      },
      name: "Roberto Vargas",
      title: {
        es: "Director de Operaciones, TIM Automation",
        en: "Operations Director, TIM Automation",
      },
    },
  },
  {
    slug: "temteaching",
    title: { es: "TemTeaching", en: "TemTeaching" },
    category: "edtech",
    categoryTag: { es: "Enseñanza de Inglés", en: "English Teaching" },
    image: imgTemteaching,
    summary: {
      es: "Plataforma de enseñanza de inglés que digitalizó la gestión académica, conectando a 15 estudiantes y 4 educadores en un ecosistema diseñado para el aprendizaje de idiomas.",
      en: "English teaching platform that digitized academic management, connecting 15 students and 4 educators in an ecosystem designed for language learning.",
    },
    heroStat: {
      value: "15",
      label: { es: "Estudiantes de Inglés", en: "English Students" },
    },
    clientProblem: {
      es: "TemTeaching, una academia de inglés en crecimiento, gestionaba inscripciones, niveles de idioma, calificaciones y comunicaciones con padres mediante hojas de cálculo y correos electrónicos. Los profesores perdían horas semanales en tareas administrativas en lugar de enfocarse en la enseñanza del idioma, y los padres carecían de visibilidad sobre el progreso de sus hijos.",
      en: "TemTeaching, a growing English language academy, managed enrollments, language levels, grades, and parent communications through spreadsheets and emails. Teachers lost hours each week on administrative tasks instead of focusing on language instruction, and parents lacked visibility into their children's progress.",
    },
    techStack: [
      {
        name: { es: "Frontend", en: "Frontend" },
        rationale: {
          es: "React + TypeScript — Tipado seguro para formularios complejos y paneles multi-rol.",
          en: "React + TypeScript — Type-safe forms and complex multi-role dashboards.",
        },
      },
      {
        name: { es: "Backend", en: "Backend" },
        rationale: {
          es: "Supabase — Autenticación integrada, API en tiempo real y reglas de seguridad por rol.",
          en: "Supabase — Built-in auth, real-time API, and role-based security rules.",
        },
      },
      {
        name: { es: "Base de Datos", en: "Database" },
        rationale: {
          es: "PostgreSQL — Relaciones complejas entre cursos, estudiantes, calificaciones y asistencia.",
          en: "PostgreSQL — Complex relationships between courses, students, grades, and attendance.",
        },
      },
      {
        name: { es: "Hosting", en: "Hosting" },
        rationale: {
          es: "Vercel — Deploy continuo con preview por branch para QA del cliente.",
          en: "Vercel — Continuous deployment with branch previews for client QA.",
        },
      },
    ],
    architectureDiagram: {
      es: "Estudiante/Profesor → Plataforma Web → API en Tiempo Real → Base de Datos → Sistema de Notificaciones",
      en: "Student/Teacher → Web Platform → Real-time API → Database → Notification System",
    },
    features: [
      {
        title: { es: "Gestión Académica Completa", en: "Complete Academic Management" },
        description: {
          es: "Registro de calificaciones, asistencia y evaluaciones con cálculo automático de promedios y reportes descargables por periodo.",
          en: "Grade recording, attendance, and evaluations with automatic average calculations and downloadable period reports.",
        },
        icon: "GraduationCap",
      },
      {
        title: { es: "Biblioteca de Contenidos", en: "Content Library" },
        description: {
          es: "Repositorio organizado por materia y nivel donde profesores comparten materiales, tareas y recursos multimedia con sus estudiantes.",
          en: "Repository organized by subject and level where teachers share materials, assignments, and multimedia resources with students.",
        },
        icon: "BookOpen",
      },
      {
        title: { es: "Portal de Padres", en: "Parent Portal" },
        description: {
          es: "Acceso en tiempo real al rendimiento académico, calendario de eventos y canal de comunicación directa con profesores.",
          en: "Real-time access to academic performance, event calendar, and direct communication channel with teachers.",
        },
        icon: "Users",
      },
    ],
    metrics: [
      {
        value: "8h",
        label: {
          es: "Horas semanales ahorradas por profesor",
          en: "Weekly hours saved per teacher",
        },
      },
      {
        value: "92%",
        label: {
          es: "Satisfacción de padres con la plataforma",
          en: "Parent satisfaction with the platform",
        },
      },
      {
        value: "3x",
        label: {
          es: "Velocidad de generación de reportes",
          en: "Report generation speed increase",
        },
      },
    ],
    testimonial: {
      quote: {
        es: "La plataforma transformó la manera en que operamos. Los profesores ahora dedican su tiempo a enseñar, no a llenar formularios. Los padres están más involucrados que nunca.",
        en: "The platform transformed the way we operate. Teachers now spend their time teaching, not filling out forms. Parents are more involved than ever.",
      },
      name: "Ana Lucía Herrera",
      title: { es: "Directora Académica, TemTeaching", en: "Academic Director, TemTeaching" },
    },
    embedUrl: "https://temteaching.lovable.app/demo-login",
  },
  {
    slug: "overstop",
    title: { es: "Overstop", en: "Overstop" },
    category: "ecommerce",
    categoryTag: { es: "E-commerce", en: "E-commerce" },
    image: imgOverstop,
    summary: {
      es: "Tienda e-commerce de moda urbana que duplicó las ventas online en 4 meses con una experiencia de compra optimizada para móvil y estrategia de conversión integrada.",
      en: "Urban fashion e-commerce store that doubled online sales in 4 months with a mobile-optimized shopping experience and integrated conversion strategy.",
    },
    heroStat: {
      value: "85%",
      label: { es: "Aumento en Ventas", en: "Sales Increase" },
    },
    clientProblem: {
      es: "Overstop, una marca de moda urbana en Costa Rica, vendía principalmente en redes sociales y WhatsApp. No tenían catálogo digital, los clientes abandonaban compras por procesos confusos, y el inventario se gestionaba manualmente en una libreta. Necesitaban profesionalizar su operación digital sin perder la cercanía con sus clientes.",
      en: "Overstop, an urban fashion brand in Costa Rica, sold primarily through social media and WhatsApp. They had no digital catalog, customers abandoned purchases due to confusing processes, and inventory was managed manually in a notebook. They needed to professionalize their digital operation without losing closeness with customers.",
    },
    techStack: [
      {
        name: { es: "Frontend", en: "Frontend" },
        rationale: {
          es: "React + Tailwind CSS — Experiencia de compra rápida y visualmente atractiva, optimizada para móvil.",
          en: "React + Tailwind CSS — Fast, visually appealing shopping experience, optimized for mobile.",
        },
      },
      {
        name: { es: "E-commerce", en: "E-commerce" },
        rationale: {
          es: "Arquitectura headless — Flexibilidad total de diseño sin limitaciones de plantillas.",
          en: "Headless architecture — Total design flexibility without template limitations.",
        },
      },
      {
        name: { es: "Pagos", en: "Payments" },
        rationale: {
          es: "Stripe + SINPE Móvil — Pagos internacionales y locales para máxima cobertura en Costa Rica.",
          en: "Stripe + SINPE Móvil — International and local payments for maximum coverage in Costa Rica.",
        },
      },
      {
        name: { es: "Inventario", en: "Inventory" },
        rationale: {
          es: "Sistema a medida — Sincronización en tiempo real entre tienda física y online.",
          en: "Custom system — Real-time sync between physical and online store.",
        },
      },
    ],
    architectureDiagram: {
      es: "Cliente → Tienda Online → Carrito → Pasarela de Pago → Sistema de Inventario → Notificaciones WhatsApp",
      en: "Customer → Online Store → Cart → Payment Gateway → Inventory System → WhatsApp Notifications",
    },
    features: [
      {
        title: { es: "Catálogo Visual Inteligente", en: "Smart Visual Catalog" },
        description: {
          es: "Galería de productos con filtros por categoría, talla y color, con zoom de alta resolución y vista rápida sin salir del catálogo.",
          en: "Product gallery with filters by category, size, and color, with high-res zoom and quick view without leaving the catalog.",
        },
        icon: "ShoppingCart",
      },
      {
        title: { es: "Checkout en 2 Pasos", en: "2-Step Checkout" },
        description: {
          es: "Proceso de compra simplificado que redujo el abandono de carrito un 40%, con soporte para múltiples métodos de pago locales.",
          en: "Simplified purchase process that reduced cart abandonment by 40%, with support for multiple local payment methods.",
        },
        icon: "CreditCard",
      },
      {
        title: { es: "Gestión de Inventario en Tiempo Real", en: "Real-Time Inventory Management" },
        description: {
          es: "Panel administrativo que muestra stock actualizado, alertas de bajo inventario y reportes de productos más vendidos.",
          en: "Admin panel showing updated stock, low inventory alerts, and best-selling product reports.",
        },
        icon: "Package",
      },
    ],
    metrics: [
      {
        value: "85%",
        label: {
          es: "Incremento en ventas online en 4 meses",
          en: "Online sales increase in 4 months",
        },
      },
      {
        value: "25%",
        label: { es: "Reducción en abandono de carrito", en: "Reduction in cart abandonment" },
      },
      {
        value: "2.4s",
        label: { es: "Tiempo de carga promedio en móvil", en: "Average mobile load time" },
      },
    ],
    testimonial: {
      quote: {
        es: "Pasamos de vender por WhatsApp a tener una tienda online profesional que nuestros clientes aman. Las ventas casi se duplicaron y ahora gestionamos todo desde un solo lugar.",
        en: "We went from selling via WhatsApp to having a professional online store our customers love. Sales nearly doubled and now we manage everything from one place.",
      },
      name: "Daniela Rojas",
      title: { es: "Fundadora, Overstop", en: "Founder, Overstop" },
    },
    liveUrl: "https://overstop.lat",
    embedUrl: "https://overstop.lat",
  },
  {
    slug: "qubesight-website",
    title: { es: "Qubesight Website", en: "Qubesight Website" },
    category: "web",
    categoryTag: { es: "Sitio Corporativo", en: "Corporate Website" },
    image: imgQubesight,
    summary: {
      es: "Sitio web corporativo de alto rendimiento que posicionó a Qubesight como referente tecnológico, logrando un 60% de incremento en leads cualificados desde su lanzamiento.",
      en: "High-performance corporate website that positioned Qubesight as a tech leader, achieving a 60% increase in qualified leads since launch.",
    },
    heroStat: {
      value: "1.2s",
      label: { es: "Tiempo de Carga", en: "Load Time" },
    },
    clientProblem: {
      es: "Qubesight necesitaba un sitio web que comunicara credibilidad, profesionalismo y capacidad técnica a clientes empresariales potenciales. Su presencia online anterior era una simple landing page que no reflejaba la sofisticación de sus soluciones ni generaba confianza para proyectos de alto valor.",
      en: "Qubesight needed a website that communicated credibility, professionalism, and technical capability to potential enterprise clients. Their previous online presence was a simple landing page that didn't reflect the sophistication of their solutions or build trust for high-value projects.",
    },
    techStack: [
      {
        name: { es: "Frontend", en: "Frontend" },
        rationale: {
          es: "React + Vite — Velocidad de carga excepcional con hidratación instantánea y code splitting.",
          en: "React + Vite — Exceptional load speed with instant hydration and code splitting.",
        },
      },
      {
        name: { es: "Estilo", en: "Styling" },
        rationale: {
          es: "Tailwind CSS — Sistema de diseño consistente con tokens semánticos para dark/light mode.",
          en: "Tailwind CSS — Consistent design system with semantic tokens for dark/light mode.",
        },
      },
      {
        name: { es: "Animaciones", en: "Animations" },
        rationale: {
          es: "Framer Motion — Micro-interacciones que guían la atención sin sacrificar rendimiento.",
          en: "Framer Motion — Micro-interactions that guide attention without sacrificing performance.",
        },
      },
      {
        name: { es: "SEO", en: "SEO" },
        rationale: {
          es: "Meta tags dinámicos + JSON-LD — Posicionamiento orgánico optimizado para búsquedas de servicios tech.",
          en: "Dynamic meta tags + JSON-LD — Organic positioning optimized for tech service searches.",
        },
      },
    ],
    architectureDiagram: {
      es: "Visitante → CDN Global → SPA React → Componentes Interactivos → WhatsApp CTA → Analytics",
      en: "Visitor → Global CDN → React SPA → Interactive Components → WhatsApp CTA → Analytics",
    },
    features: [
      {
        title: { es: "Portafolio Interactivo", en: "Interactive Portfolio" },
        description: {
          es: "Casos de estudio detallados con arquitectura técnica, métricas de negocio y testimoniales que demuestran valor real a clientes potenciales.",
          en: "Detailed case studies with technical architecture, business metrics, and testimonials that demonstrate real value to potential clients.",
        },
        icon: "Globe",
      },
      {
        title: { es: "Rendimiento Optimizado", en: "Optimized Performance" },
        description: {
          es: "Score de 95+ en Lighthouse con lazy loading, code splitting y assets optimizados para una experiencia ultrarrápida.",
          en: "95+ Lighthouse score with lazy loading, code splitting, and optimized assets for an ultra-fast experience.",
        },
        icon: "Zap",
      },
      {
        title: { es: "Bilingüe Nativo", en: "Native Bilingual" },
        description: {
          es: "Cambio instantáneo entre español e inglés sin recarga de página, con contenido localizado para mercados latinoamericanos y globales.",
          en: "Instant switching between Spanish and English without page reload, with localized content for Latin American and global markets.",
        },
        icon: "Languages",
      },
    ],
    metrics: [
      {
        value: "60%",
        label: { es: "Aumento en leads cualificados", en: "Increase in qualified leads" },
      },
      { value: "95+", label: { es: "Score en Google Lighthouse", en: "Google Lighthouse score" } },
      { value: "2.8min", label: { es: "Tiempo promedio en el sitio", en: "Average time on site" } },
    ],
    testimonial: {
      quote: {
        es: "Nuestro nuevo sitio web no solo se ve increíble, sino que genera resultados reales. Los clientes nos dicen que el portafolio los convenció antes de la primera llamada.",
        en: "Our new website doesn't just look incredible — it generates real results. Clients tell us the portfolio convinced them before the first call.",
      },
      name: "Equipo Qubesight",
      title: { es: "Equipo Fundador", en: "Founding Team" },
    },
    liveUrl: "https://qubesight.lat",
  },
  {
    slug: "ajhb-sistema",
    title: { es: "AJHB Sistema", en: "AJHB System" },
    category: "systems",
    categoryTag: { es: "Sistema Empresarial", en: "Business System" },
    image: imgAjhb1,
    summary: {
      es: "Sistema empresarial a medida que centralizó la gestión de proyectos, clientes y finanzas de una constructora, aumentando su eficiencia operativa en un 45%.",
      en: "Custom business system that centralized project, client, and financial management for a construction firm, increasing operational efficiency by 45%.",
    },
    heroStat: {
      value: "45%",
      label: { es: "Eficiencia Operativa", en: "Operational Efficiency" },
    },
    clientProblem: {
      es: "AJHB Construcciones, una empresa constructora con 6 proyectos simultáneos, gestionaba sus operaciones con hojas de cálculo de Excel y comunicación por WhatsApp. Los presupuestos contenían errores frecuentes, el seguimiento de avances de obra era inconsistente, y la facturación tardaba semanas en consolidarse. Necesitaban un sistema centralizado que conectara todas las áreas del negocio.",
      en: "AJHB Construction, a building company with 6 simultaneous projects, managed operations with Excel spreadsheets and WhatsApp communication. Budgets had frequent errors, construction progress tracking was inconsistent, and invoicing took weeks to consolidate. They needed a centralized system connecting all business areas.",
    },
    techStack: [
      {
        name: { es: "Frontend", en: "Frontend" },
        rationale: {
          es: "React + shadcn/ui — Interfaces profesionales con componentes accesibles y consistentes para usuarios no técnicos.",
          en: "React + shadcn/ui — Professional interfaces with accessible, consistent components for non-technical users.",
        },
      },
      {
        name: { es: "Backend", en: "Backend" },
        rationale: {
          es: "Supabase Edge Functions — Lógica de negocio serverless con autenticación integrada y políticas de seguridad por rol.",
          en: "Supabase Edge Functions — Serverless business logic with built-in auth and role-based security policies.",
        },
      },
      {
        name: { es: "Base de Datos", en: "Database" },
        rationale: {
          es: "PostgreSQL con RLS — Seguridad a nivel de fila para que cada usuario solo vea los datos de sus proyectos asignados.",
          en: "PostgreSQL with RLS — Row-level security so each user only sees data from their assigned projects.",
        },
      },
      {
        name: { es: "Reportería", en: "Reporting" },
        rationale: {
          es: "Recharts + PDF export — Reportes visuales interactivos con exportación automática para reuniones con clientes.",
          en: "Recharts + PDF export — Interactive visual reports with automatic export for client meetings.",
        },
      },
    ],
    architectureDiagram: {
      es: "Usuarios → Dashboard por Rol → API Backend → Base de Datos → Motor de Reportes → Exportación PDF",
      en: "Users → Role-based Dashboard → Backend API → Database → Reports Engine → PDF Export",
    },
    features: [
      {
        title: { es: "Dashboard Multi-Proyecto", en: "Multi-Project Dashboard" },
        description: {
          es: "Vista consolidada de todos los proyectos activos con indicadores de avance, presupuesto consumido y alertas de retrasos en tiempo real.",
          en: "Consolidated view of all active projects with progress indicators, consumed budget, and real-time delay alerts.",
        },
        icon: "LayoutDashboard",
      },
      {
        title: { es: "Reportes Financieros Automáticos", en: "Automated Financial Reports" },
        description: {
          es: "Generación automática de estados financieros por proyecto con desglose de costos, márgenes y proyecciones exportables a PDF.",
          en: "Automatic generation of financial statements per project with cost breakdowns, margins, and projections exportable to PDF.",
        },
        icon: "FileBarChart",
      },
      {
        title: { es: "Control de Acceso por Rol", en: "Role-Based Access Control" },
        description: {
          es: "Sistema de permisos granular donde gerentes, supervisores y contadores ven exactamente la información relevante para su función.",
          en: "Granular permission system where managers, supervisors, and accountants see exactly the information relevant to their role.",
        },
        icon: "Shield",
      },
    ],
    metrics: [
      {
        value: "45%",
        label: { es: "Aumento en eficiencia operativa", en: "Increase in operational efficiency" },
      },
      {
        value: "60%",
        label: { es: "Reducción en errores de presupuesto", en: "Reduction in budget errors" },
      },
      {
        value: "2 sem",
        label: {
          es: "Tiempo de facturación reducido de semanas a días",
          en: "Invoicing time reduced from weeks to days",
        },
      },
    ],
    testimonial: {
      quote: {
        es: "Pasamos de buscar datos en 10 archivos de Excel diferentes a tener todo en un solo sistema. Ahora tomo decisiones con información real y actualizada, no con suposiciones.",
        en: "We went from searching for data across 10 different Excel files to having everything in one system. Now I make decisions with real, up-to-date information, not assumptions.",
      },
      name: "Jorge Hernández B.",
      title: {
        es: "Gerente General, AJHB Construcciones",
        en: "General Manager, AJHB Construction",
      },
    },
    embedUrl: "https://ajhbsistemademo.lovable.app",
  },
];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return caseStudies.find((cs) => cs.slug === slug);
};
