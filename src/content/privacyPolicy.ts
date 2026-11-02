// Contenido de la Política de privacidad de QubeSight.
// La página /privacy renderiza exactamente lo que hay aquí.

export type PrivacySection = {
  heading: string;
  paragraphs: string[];
};

export const PRIVACY_POLICY_TITLE = "Política de privacidad de QubeSight";

export const PRIVACY_CONTACT = {
  company: "QubeSight",
  website: "https://qubesight.lat",
  websiteLabel: "qubesight.lat",
  email: "privacy@qubesight.lat",
  country: "Costa Rica",
} as const;

// El texto legal definitivo aún no fue entregado por el titular del sitio.
// Se sustituye este bloque por el texto completo en cuanto se reciba.
export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    heading: "Aviso provisional",
    paragraphs: [
      "El texto definitivo de esta Política de privacidad aún no ha sido entregado por el titular del sitio, por lo que esta página se publica de forma provisional con la información de contacto.",
      "Mientras tanto, cualquier solicitud sobre el tratamiento de tus datos puede enviarse a privacy@qubesight.lat.",
    ],
  },
];
