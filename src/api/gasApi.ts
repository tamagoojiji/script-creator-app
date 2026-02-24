import { getGasUrl } from "../config";
import type { GasResponse, TemplateType, TargetPlatform } from "../types";

export async function generateScript(
  transcript: string,
  template: TemplateType,
  targets: TargetPlatform[]
): Promise<GasResponse> {
  const url = getGasUrl();
  if (!url) {
    throw new Error("GAS URLが設定されていません。設定画面でURLを入力してください。");
  }

  const body = JSON.stringify({
    action: "generate",
    transcript,
    template,
    targets,
  });

  // Content-Type: text/plain でPOST（CORS preflight回避）
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const data: GasResponse = await res.json();
  if (!data.ok) {
    throw new Error(data.error || "台本生成に失敗しました");
  }

  return data;
}

export async function testConnection(): Promise<{ ok: boolean; message: string }> {
  const url = getGasUrl();
  if (!url) {
    return { ok: false, message: "URLが空です" };
  }

  try {
    const body = JSON.stringify({ action: "test" });
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body,
    });

    if (!res.ok) {
      return { ok: false, message: `HTTP ${res.status}` };
    }

    const data = await res.json();
    return { ok: data.ok, message: data.message || "接続成功" };
  } catch (e) {
    return { ok: false, message: (e as Error).message };
  }
}
