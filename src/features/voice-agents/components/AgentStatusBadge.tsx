import type { AgentConfigurationStatus } from "@/types/dashboard";

const labels: Record<AgentConfigurationStatus, string> = {
  draft: "Borrador",
  generated: "Configurado",
  published: "Publicado",
};

export default function AgentStatusBadge({ status }: { status: AgentConfigurationStatus }) {
  const className =
    status === "published"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : status === "generated"
        ? "bg-blue-50 text-blue-700 border-blue-200"
        : "bg-slate-50 text-slate-600 border-slate-200";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${className}`}
    >
      {labels[status]}
    </span>
  );
}
