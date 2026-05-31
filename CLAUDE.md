# ONO INTERNATIONAL サイト — 作業メモ

## プロジェクト概要
- **フレームワーク**: Astro v6 + Tailwind CSS v4
- **本番URL**: https://ono-international.com
- **デプロイ**: Vercel（mainブランチにpushで自動デプロイ）
- **リポジトリ**: GitHub / OnO-International/ono-international-web

## 主要ファイル構成
```
src/
  pages/
    index.astro              # トップページ
    about.astro              # 会社概要
    contact.astro            # お問い合わせ
    recruit.astro            # 採用
    services.astro           # サービス一覧（バナーあり）
    services/
      ai.astro               # AI構築・コンサルティング LP
      video.astro            # 動画制作 LP
      drone.astro            # ドローン撮影 LP
      freediving.astro       # フリーダイビング LP
      restaurant-web.astro   # 実店舗Web集客支援 LP ← 新規作成
    news/
      index.astro            # ニュース一覧
      [slug].astro           # ニュース記事詳細
  layouts/
    Layout.astro             # 共通レイアウト（ヘッダー・フッター・固定バナー）
  styles/
    global.css               # グローバルCSS
  content/
    blog/                    # ニュース記事 (Markdown)
  content.config.ts          # コンテンツコレクション設定
```

## 最近の主な作業（2025年5月〜）

### 新規LP作成
- `src/pages/services/restaurant-web.astro` を新規作成
  - 実店舗向けWeb集客支援パッケージのLP
  - ヒーロー・課題提起・サービス内容・料金・デモアプリ・CTAで構成
  - 月額¥80,000、制作費・ドメイン・更新費込み

### 全ページ固定バナー（Layout.astro）
- 右下に常時表示される固定バナーを追加
- タイトル「実店舗を持つ全ての方へ」
- `restaurant-web` LPへのリンク
- ✕ボタンで閉じられる（sessionStorage管理）
- `services.astro` のサービス一覧の上にもバナーカードを追加

### スマホ改行の修正（全ページ）
- 全ページの `<br/>` を整理
  - `hidden md:block` → PC専用改行
  - 不要な文末 `<br/>` 削除
  - ボタン内 `<br/>` 削除
- 見出しフォントサイズをレスポンシブ対応
  - `text-4xl` → `text-2xl md:text-4xl`
  - `text-3xl` → `text-xl md:text-3xl`
- hero見出しを `<span class="block">` 方式に変更（br依存をなくした）
- `global.css` に `overflow-wrap: anywhere` を h1〜h4 に適用
  - ※ `text-wrap: balance` は Safari でバランス均等分割が起きるため削除済み
  - ※ `word-break: auto-phrase` は Chrome専用のため削除済み

### その他修正
- `services/ai.astro` の「07カード」削除（6つのアプローチに戻した）
- 「飲食店」→「実店舗」表記を全ページ統一
- `¥80,000` と「/ 店舗」の間隔調整（mb-4）
- Newsページのバグ修正（詳細不明、デプロイ後に自然解消）

## 現在の既知の課題

### スマホ表示（iPhoneのSafari）
- **text-wrap: balance を削除済み**のため大半は改善
- ただし一部のセクション見出しでまだ改行位置がおかしい可能性あり
- iPhoneで見て確認しながら個別修正が必要
- `word-break: auto-phrase`（Chrome専用）が効かないのが根本原因
- 対策：フォントサイズを小さくするか、テキストを短くするしかない

### TODO（未着手）
- 他のサービスページ（ai, video, drone, freediving）のスマホ改行も
  restaurant-web と同様にiPhoneで確認・修正が必要
- services.astro バナーと services/restaurant-web.astro の
  「飲食店向け」という表現が残っていないか要確認

## 開発メモ
- `npm run dev` でローカル起動（node_modules/.bin/astro dev）
- Google Driveパスにマルチバイト文字（マイドライブ）が含まれるため
  このターミナルからのdev server起動は失敗する
  → ユーザー側のターミナルで起動してもらうか、Vercelで確認する
- mainブランチに直接pushしている（PRなし運用）
