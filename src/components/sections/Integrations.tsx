import { motion } from "framer-motion";
import {
  MessageCircle,
  Instagram,
  Facebook,
  Calendar,
  Globe,
  Phone,
  CreditCard,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Integrations = () => {
  const { t } = useTranslation();

  const items = [
    { icon: MessageCircle, label: "WhatsApp" },
    { icon: Instagram, label: "Instagram" },
    { icon: Facebook, label: "Messenger" },
    { icon: Globe, label: "Web Chat" },
    { icon: Phone, label: "Voice / SIP" },
    { icon: Calendar, label: "Google Calendar" },
    { icon: CreditCard, label: "Payments" },
  ];

  return (
    <section id="integrations" className="py-16 sm:py-20 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-10"
        >
          <span className="eyebrow mb-4 inline-flex">{t("integrations.badge")}</span>
          <h2 className="text-2xl sm:text-4xl font-bold font-display leading-tight text-balance">
            {t("integrations.title")}{" "}
            <span className="gradient-text">{t("integrations.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base">
            {t("integrations.subtitle")}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="inline-flex items-center gap-2.5 rounded-full glass-card px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              <item.icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
              {item.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;
