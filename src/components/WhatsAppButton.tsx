import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M19.11 17.2c-.26-.13-1.53-.76-1.77-.84-.24-.09-.42-.13-.6.13-.18.26-.68.84-.84 1.01-.15.17-.31.2-.57.07-.26-.13-1.1-.4-2.09-1.28-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.17-.26.26-.44.09-.17.04-.33-.02-.46-.07-.13-.6-1.45-.82-1.98-.22-.52-.44-.45-.6-.46h-.51c-.18 0-.46.07-.7.33-.24.26-.92.9-.92 2.19 0 1.29.94 2.54 1.07 2.72.13.17 1.84 2.81 4.46 3.94.62.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.07 1.53-.63 1.75-1.23.22-.6.22-1.12.15-1.23-.06-.11-.24-.17-.5-.3Z"/>
    <path d="M16.03 3.2c-7.05 0-12.78 5.73-12.78 12.78 0 2.25.59 4.45 1.72 6.38L3.14 28.8l6.59-1.73a12.72 12.72 0 0 0 6.3 1.66h.01c7.04 0 12.77-5.73 12.77-12.78 0-3.41-1.33-6.62-3.74-9.04A12.7 12.7 0 0 0 16.03 3.2Zm0 23.37h-.01a10.58 10.58 0 0 1-5.39-1.48l-.39-.23-3.91 1.03 1.04-3.81-.25-.39a10.58 10.58 0 0 1-1.63-5.71c0-5.82 4.73-10.56 10.55-10.56 2.82 0 5.47 1.1 7.46 3.09a10.48 10.48 0 0 1 3.09 7.47c0 5.82-4.74 10.55-10.56 10.55Z"/>
  </svg>
);

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
        <WhatsAppIcon className="h-6 w-6" />
      </span>
      <span className="whatsapp-aero-label">WhatsApp</span>
    </motion.a>
  );
};

export default WhatsAppButton;
