// Contenido de la Política de privacidad de QubeSight.
// La página /privacy renderiza exactamente lo que hay aquí.

export type PrivacySection = {
  heading: string;
  paragraphs: string[];
  items?: string[];
  closingParagraphs?: string[];
};

export const PRIVACY_POLICY_TITLE = "Política de privacidad de QubeSight";
export const PRIVACY_POLICY_UPDATED = "Última actualización: 2 de noviembre de 2026";
export const PRIVACY_POLICY_INTRO =
  "QubeSight desarrolla herramientas de inteligencia artificial para automatizar la atención al cliente mediante voz, chat y WhatsApp. Esta política explica cómo recopilamos, usamos y protegemos la información relacionada con nuestro sitio web, la aplicación Matilda Voice y nuestras demostraciones.";

export const PRIVACY_CONTACT = {
  company: "QubeSight",
  website: "https://qubesight.lat",
  websiteLabel: "https://qubesight.lat",
  email: "privacy@qubesight.lat",
  country: "Costa Rica",
} as const;

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    heading: "Información que podemos recopilar",
    paragraphs: ["Podemos recopilar:"],
    items: [
      "Nombre, empresa, correo electrónico y número telefónico.",
      "Mensajes enviados durante una conversación con Matilda.",
      "Audio, transcripciones y datos técnicos de llamadas de demostración.",
      "Información necesaria para agendar una reunión.",
      "Datos técnicos como dirección IP, navegador, dispositivo y registros de uso.",
    ],
    closingParagraphs: [
      "No solicitamos contraseñas, claves API ni información bancaria mediante Matilda.",
    ],
  },
  {
    heading: "Cómo usamos la información",
    paragraphs: ["Usamos la información para:"],
    items: [
      "Proporcionar y mejorar los servicios de QubeSight.",
      "Responder consultas y solicitudes comerciales.",
      "Realizar demostraciones de Matilda.",
      "Enviar resúmenes o información solicitada por el usuario.",
      "Agendar reuniones cuando el usuario lo solicita.",
      "Detectar errores, prevenir abusos y proteger la seguridad del servicio.",
      "Cumplir obligaciones legales.",
    ],
    closingParagraphs: ["No vendemos información personal."],
  },
  {
    heading: "Servicios de terceros",
    paragraphs: [
      "QubeSight puede utilizar proveedores tecnológicos para operar sus servicios, como proveedores de alojamiento, inteligencia artificial, telefonía, correo electrónico, automatización y calendario. Estos proveedores solo reciben la información necesaria para prestar sus servicios y están sujetos a sus propias políticas de privacidad.",
    ],
  },
  {
    heading: "WhatsApp y llamadas",
    paragraphs: [
      "Cuando una persona utiliza WhatsApp o llama a Matilda, sus mensajes, número telefónico, audio o transcripción pueden procesarse para responder la conversación y prestar la demostración solicitada. No usamos esa información para enviar comunicaciones comerciales no solicitadas.",
    ],
  },
  {
    heading: "Conservación de la información",
    paragraphs: [
      "Conservamos la información solo durante el tiempo necesario para prestar el servicio, atender solicitudes, mejorar la plataforma o cumplir obligaciones legales. Podemos eliminar información cuando ya no sea necesaria o cuando la persona lo solicite, salvo que exista una obligación legal de conservarla.",
    ],
  },
  {
    heading: "Seguridad",
    paragraphs: [
      "Aplicamos medidas razonables para proteger la información contra acceso, modificación, pérdida o divulgación no autorizada. Sin embargo, ningún sistema conectado a Internet puede garantizar seguridad absoluta.",
    ],
  },
  {
    heading: "Derechos de las personas",
    paragraphs: [
      "Puedes solicitar acceso, corrección o eliminación de tus datos personales, así como retirar tu consentimiento cuando corresponda.",
      "Para realizar una solicitud, escribe a:",
      "privacy@qubesight.lat",
    ],
  },
  {
    heading: "Menores de edad",
    paragraphs: [
      "Los servicios de QubeSight no están dirigidos intencionalmente a menores de edad. Si descubrimos que hemos recopilado información de un menor sin autorización válida, tomaremos medidas para eliminarla.",
    ],
  },
  {
    heading: "Cambios a esta política",
    paragraphs: [
      "Podemos actualizar esta política cuando sea necesario. Publicaremos la versión actualizada en esta misma página e indicaremos la fecha de modificación.",
    ],
  },
];
