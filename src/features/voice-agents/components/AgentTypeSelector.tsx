import { Headphones, Megaphone, TrendingUp } from "lucide-react";
import type { AgentType } from "@/types/dashboard";
import { agentTemplates } from "../agentTemplates";

type AgentTypeSelectorProps = {
  value: AgentType | null;
  onChange: (type: AgentType) => void;
};

const icons = {
  customer_service: Headphones,
  sales_prospecting: TrendingUp,
  marketing: Megaphone,
};

export default function AgentTypeSelector({ value, onChange }: AgentTypeSelectorProps) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {agentTemplates.map((template) => {
        const Icon = icons[template.type];
        const selected = template.type === value;

        return (
          <button
            key={template.type}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(template.type)}
            className={`rounded-2xl border p-5 text-left transition ${
              selected
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm"
            }`}
          >
            <span
              className={`w-11 h-11 rounded-xl grid place-items-center mb-4 ${
                selected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              <Icon size={21} />
            </span>
            <strong className="block text-base">{template.title}</strong>
            <span className="block text-sm text-slate-500 mt-2 min-h-10">
              {template.description}
            </span>
            <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
              {template.examples.map((example) => (
                <li key={example}>✓ {example}</li>
              ))}
            </ul>
          </button>
        );
      })}
    </div>
  );
}
