// reel-script-app互換の型定義

export type Expression =
  | "normal"
  | "cry"
  | "dizzy"
  | "idea"
  | "tired"
  | "frustrated"
  | "surprised"
  | "bow";

export const EXPRESSIONS: Expression[] = [
  "normal",
  "surprised",
  "idea",
  "frustrated",
  "dizzy",
  "tired",
  "cry",
  "bow",
];

export const EXPRESSION_LABELS: Record<Expression, string> = {
  normal: "通常",
  surprised: "驚き",
  idea: "ひらめき",
  frustrated: "落胆",
  dizzy: "困惑",
  tired: "疲れ",
  cry: "泣き",
  bow: "お辞儀",
};

export const EXPRESSION_EMOJI: Record<Expression, string> = {
  normal: "😐",
  surprised: "😲",
  idea: "💡",
  frustrated: "😞",
  dizzy: "😵",
  tired: "😮‍💨",
  cry: "😢",
  bow: "🙇",
};

export type PersonalityType = "Moon" | "Earth" | "Sun";

export const PERSONALITY_EMOJI: Record<PersonalityType, string> = {
  Moon: "🌙",
  Earth: "🌍",
  Sun: "☀️",
};

export const PERSONALITY_COLORS: Record<PersonalityType, string> = {
  Moon: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  Earth: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Sun: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export type TemplateType = "prep" | "aida";

export const TEMPLATE_INFO: Record<TemplateType, { name: string; description: string }> = {
  prep: { name: "PREP型", description: "結論先出し（20-30秒・攻略系）" },
  aida: { name: "AIDA型", description: "感情訴求（30-60秒・体験レポート）" },
};

export type TargetPlatform = "リール" | "ストーリーズ" | "Threads" | "X";

export const TARGET_PLATFORMS: TargetPlatform[] = ["リール", "ストーリーズ", "Threads", "X"];

// GAS API レスポンスの台本シーン
export interface GeneratedScene {
  text: string;
  display?: string;
  expression: Expression;
  emphasis: string[];
  personality: PersonalityType;
  role: string;
  overlay?: string;
}

// GAS API レスポンスの台本
export interface GeneratedScript {
  title: string;
  template: TemplateType;
  scenes: GeneratedScene[];
  cta: {
    text: string;
    expression: Expression;
  };
  hashtags?: string[];
  caption?: string;
}

// GAS API レスポンス
export interface GasResponse {
  ok: boolean;
  script?: GeneratedScript;
  yaml?: string;
  error?: string;
  message?: string;
}

// reel-script-app互換のScript型
export interface ScriptScene {
  text: string;
  expression: Expression;
  emphasis: string[];
  overlay?: string;
  display?: string;
}

export interface Script {
  id: string;
  name: string;
  preset: string;
  scenes: ScriptScene[];
  cta?: { text: string; expression: Expression };
  createdAt: string;
  updatedAt: string;
}

// 履歴
export interface HistoryItem {
  id: string;
  title: string;
  template: TemplateType;
  transcript: string;
  targets: TargetPlatform[];
  script: GeneratedScript;
  yaml: string;
  createdAt: string;
}
