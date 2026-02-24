import { useState } from "react";
import { getGasUrl, setGasUrl } from "../config";
import { testConnection } from "../api/gasApi";

export default function SettingsPage() {
  const [url, setUrl] = useState(getGasUrl());
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const handleSave = () => {
    setGasUrl(url);
    setResult({ ok: true, message: "URLを保存しました" });
  };

  const handleTest = async () => {
    setGasUrl(url);
    setTesting(true);
    setResult(null);
    const res = await testConnection();
    setResult(res);
    setTesting(false);
  };

  return (
    <div className="p-4 pb-24 space-y-5">
      <h1 className="text-xl font-bold">設定</h1>

      <div className="space-y-2">
        <label className="block text-sm text-slate-300">GAS Web App URL</label>
        <input
          type="url"
          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
          placeholder="https://script.google.com/macros/s/.../exec"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <p className="text-xs text-slate-500">
          GASプロジェクトのWebアプリURLを入力してください
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500"
        >
          保存
        </button>
        <button
          onClick={handleTest}
          disabled={testing || !url}
          className="flex-1 py-2 rounded-lg bg-slate-700 text-white font-bold hover:bg-slate-600 disabled:opacity-50"
        >
          {testing ? "テスト中..." : "接続テスト"}
        </button>
      </div>

      {result && (
        <div
          className={`p-3 rounded-lg text-sm ${
            result.ok
              ? "bg-emerald-900/30 border border-emerald-700/40 text-emerald-300"
              : "bg-red-900/30 border border-red-700/40 text-red-300"
          }`}
        >
          {result.ok ? "✓ " : "✕ "}
          {result.message}
        </div>
      )}

      <div className="pt-4 border-t border-slate-700 space-y-2">
        <h2 className="text-sm font-bold text-slate-400">セットアップ手順</h2>
        <ol className="text-xs text-slate-500 space-y-1 list-decimal list-inside">
          <li>GASエディタで setupApiKey() を実行し、Gemini APIキーを設定</li>
          <li>GASをWebアプリとしてデプロイ</li>
          <li>デプロイURLを上のフィールドに貼り付け</li>
          <li>「接続テスト」で動作確認</li>
        </ol>
      </div>
    </div>
  );
}
