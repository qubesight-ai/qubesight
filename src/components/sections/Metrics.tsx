import { motion } from "framer-motion";
import { Activity, CheckCircle2, Gauge } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

/** Internal block rendered inside the "Solution" section. Not a nav section. */
const Metrics = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const groups = [
    {
      icon: Gauge,
      title: es ? "Métricas de uso" : "Usage metrics",
      items: es
        ? [
            "Número de llamadas.",
            "Minutos utilizados.",
            "Número de conversaciones.",
            "Mensajes.",
            "Llamadas simultáneas.",
            "Transferencias humanas.",
          ]
        : [
            "Number of calls.",
            "Minutes used.",
            "Number of conversations.",
            "Messages.",
            "Concurrent calls.",
            "Human transfers.",
          ],
    },
    {
      icon: Activity,
      title: es ? "Métricas de desempeño" : "Performance metrics",
      items: es
        ? [
            "Tiempo de respuesta.",
            "Porcentaje de resolución automática.",
            "Citas agendadas / Pedidos / Cotizaciones solicitadas.",
            "Leads calificados.",
          ]
        : [
            "Response time.",
            "Automated resolution rate.",
            "Appointments booked / Orders / Quotes requested.",
            "Qualified leads.",
          ],
    },
  ];

  return (
    <div className="mt-20">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl font-bold font-display text-center mb-10"
      >
        {es ? "Análisis de datos basado en Métricas" : "Data analysis based on metrics"}
      </motion.h3>

      <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {groups.map((group, index) => (
          <motion.article
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="glass-card rounded-2xl p-7"
          >
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary border border-primary/20 grid place-items-center mb-5">
              <group.icon className="h-5 w-5" />
            </div>
            <h4 className="text-xl font-semibold font-display mb-5">{group.title}</h4>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
        {es
          ? "La disponibilidad de cada indicador depende de los canales, flujos e integraciones configurados."
          : "The availability of each indicator depends on the configured channels, workflows, and integrations."}
      </p>
    </div>
  );
};

export default Metrics;
