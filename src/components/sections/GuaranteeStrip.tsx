import { motion } from "framer-motion";
import { ShieldCheck, Zap, Headphones, RefreshCw } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const GuaranteeStrip = () => {
  const { t } = useTranslation();

  const items = [
    { icon: Zap, title: t("guarantee.setup.title"), desc: t("guarantee.setup.desc") },
    {
      icon: ShieldCheck,
      title: t("guarantee.nocontract.title"),
      desc: t("guarantee.nocontract.desc"),
    },
    { icon: Headphones, title: t("guarantee.support.title"), desc: t("guarantee.support.desc") },
    { icon: RefreshCw, title: t("guarantee.refund.title"), desc: t("guarantee.refund.desc") },
  ];

  return (
    <section aria-label="Garantías" className="py-12 relative">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 perspective-1000">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card depth-card rounded-2xl p-5 flex items-start gap-3 hover:border-primary/30 transition-colors group"
            >
              <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold font-display leading-tight">{item.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuaranteeStrip;
