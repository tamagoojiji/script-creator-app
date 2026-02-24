const STORAGE_KEY = "script-creator-gas-url";

export function getGasUrl(): string {
  return localStorage.getItem(STORAGE_KEY) || "";
}

export function setGasUrl(url: string): void {
  localStorage.setItem(STORAGE_KEY, url.trim());
}
