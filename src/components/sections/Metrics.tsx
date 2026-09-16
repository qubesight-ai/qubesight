import { motion } from "framer-motion";
import { Activity, BarChart3, CheckCircle2, Gauge } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Metrics = () => {
  const { language } = useTranslation();
  const es = language === "es";
  const groups = [
    {
      icon: Gauge,
      title: es ? "Métricas de uso" : "Usage metrics",
      items: es
        ? [
            "Número de llamadas y minutos utilizados",
            "Conversaciones y mensajes",
            "Llamadas simultáneas",
            "Transferencias humanas",
          ]
        : [
            "Number of calls and minutes used",
            "Conversations and messages",
            "Concurrent calls",
            "Human transfers",
          ],
    },
    {
      icon: Activity,
      title: es ? "Resultados de atención" : "Service outcomes",
      items: es
        ? [
            "Tiempo de respuesta",
            "Citas, pedidos o solicitudes recibidas",
            "Solicitudes de cotización y leads calificados",
            "Resolución automática, cuando la configuración lo permita",
          ]
        : [
            "Response time",
            "Appointments, orders, or requests received",
            "Quote requests and qualified leads",
            "Automated resolution, when supported by the configuration",
          ],
    },
  ];

  return (
    <section id="metrics" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="eyebrow mb-5 inline-flex">
            <BarChart3 className="h-3.5 w-3.5" /> {es ? "MÉTRICAS" : "METRICS"}
          </span>
          <h2 className="display-xl text-3xl sm:text-5xl font-bold font-display leading-tight text-balance">
            {es ? "Mide cómo está funcionando " : "Measure how your service "}
            <span className="gradient-text">{es ? "tu atención." : "is performing."}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            {es
              ? "Consulta indicadores disponibles para entender el uso y los resultados de los flujos configurados."
              : "Review available indicators to understand usage and the outcomes of configured workflows."}
          </p>
        </motion.div>

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
              <h3 className="text-xl font-semibold font-display mb-5">{group.title}</h3>
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
    </section>
  );
};

export default Metrics;
