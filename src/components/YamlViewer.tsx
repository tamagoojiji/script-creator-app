import { useState } from "react";

interface Props {
  yaml: string;
  title: string;
}

export default function YamlViewer({ yaml, title }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(yaml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // フォールバック
      const ta = document.createElement("textarea");
      ta.value = yaml;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const filename = title.replace(/[^a-zA-Z0-9\u3000-\u9fff]/g, "_") + ".yaml";
    const blob = new Blob([yaml], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-300">YAML</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1 text-xs rounded bg-slate-700 text-slate-300 hover:bg-slate-600"
          >
            {copied ? "✓ コピー済み" : "コピー"}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1 text-xs rounded bg-slate-700 text-slate-300 hover:bg-slate-600"
          >
            DL
          </button>
        </div>
      </div>
      <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-300 overflow-x-auto max-h-64 overflow-y-auto whitespace-pre-wrap">
        {yaml}
      </pre>
    </div>
  );
}
