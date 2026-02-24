# CLAUDE.md（script-creator-app 専用）

## 概要
音声入力+AI(Gemini)でリール台本を自動生成するPWA。
スマホで音声メモ → テンプレート選択 → Gemini AIが個性心理学3タイプ（Moon/Earth/Sun）を含む台本を自動生成 → YAML出力で tamago-talk-reel と連携。

## 技術スタック
React 19 + Vite 7 + TypeScript + Tailwind CSS 3

## ディレクトリ構成
```
src/
├── types.ts            # 型定義（reel-script-app互換）
├── config.ts           # GAS URL管理（localStorage）
├── api/gasApi.ts       # GAS通信
├── components/
│   ├── BottomNav.tsx       # 下部ナビ（作成/履歴/設定）
│   ├── VoiceInput.tsx      # Web Speech API + textarea
│   ├── TemplateSelector.tsx # PREP/AIDA 2択
│   ├── TargetCheckbox.tsx   # 投稿先チェック
│   ├── ScriptPreview.tsx    # シーンカード一覧
│   ├── YamlViewer.tsx       # YAML表示+コピー+DL
│   └── PersonalityBadge.tsx # Moon/Earth/Sun バッジ
├── pages/
│   ├── CreatePage.tsx    # メイン（入力→生成）
│   ├── ResultPage.tsx    # 結果+YAML+reel-script-appリンク
│   ├── HistoryPage.tsx   # 生成履歴
│   └── SettingsPage.tsx  # GAS URL設定
└── App.tsx
```

## デプロイ
- **GitHub Pages**: `npm run deploy`
- **URL**: https://tamagoojiji.github.io/script-creator-app/

## バックエンド
- ~/script-creator-gas/ のGASプロジェクト
- GAS Web App URL を設定画面から入力

## reel-script-app連携
- 同一オリジン（tamagoojiji.github.io）でlocalStorage共有
- `reel-scripts` キーにScript型データを追加
- reel-script-appのエディタページに遷移

## 開発
```bash
npm run dev    # 開発サーバー
npm run build  # ビルド
npm run deploy # GitHub Pagesデプロイ
```
