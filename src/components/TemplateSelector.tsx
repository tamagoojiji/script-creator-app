import type { TemplateType } from "../types";
import { TEMPLATE_INFO } from "../types";

interface Props {
  value: TemplateType;
  onChange: (t: TemplateType) => void;
}

export default function TemplateSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="block text-sm text-slate-300">テンプレート</label>
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(TEMPLATE_INFO) as TemplateType[]).map((key) => {
          const info = TEMPLATE_INFO[key];
          const active = value === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`p-3 rounded-lg border text-left transition-colors ${
                active
                  ? "border-blue-500 bg-blue-500/20 text-blue-300"
                  : "border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500"
              }`}
            >
              <div className="font-bold text-sm">{info.name}</div>
              <div className="text-xs mt-1 opacity-70">{info.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
