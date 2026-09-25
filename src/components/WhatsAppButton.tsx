import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const WhatsAppButton = () => {
  const { t } = useTranslation();
  const whatsappNumber = "50646009140";
  const whatsappMessage = encodeURIComponent(t("whatsapp.message"));
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ y: -2 }}
      whileTap={{ y: 1 }}
      className="whatsapp-aero-button group"
      aria-label="WhatsApp"
    >
      <span className="whatsapp-aero-highlight" aria-hidden="true" />
      <span className="whatsapp-aero-icon">
        <MessageCircle className="h-6 w-6" />
      </span>
      <span className="whatsapp-aero-label">{t("whatsapp.tooltip")}</span>
    </motion.a>
  );
};

export default WhatsAppButton;
