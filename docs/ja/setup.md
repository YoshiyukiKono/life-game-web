

# docs/ja/setup.md

````markdown
# セットアップガイド

このドキュメントは、GitHub・Supabase・Cloudflare を初めて利用する人向けに書かれています。

---

# 1. GitHub

リポジトリを fork または clone します。

```bash
git clone https://github.com/YoshiyukiKono/life-game-web.git
cd life-game-web
````

依存関係をインストールします。

```bash
npm install
```

開発サーバを起動します。

```bash
npm run dev
```

ブラウザで確認します。

```text
http://localhost:3000
```

---

# 2. Supabase

Supabase アカウントを作成します。

[https://supabase.com](https://supabase.com)

---

## プロジェクト作成

New Project を選択します。

無料プランで問題ありません。

---

## テーブル作成

SQL Editor を開きます。

db/schema.sql の内容を実行してください。

---

## API Key 取得

Project Settings → API

以下を取得します。

```text
Project URL
Anon Key
```

---

# 3. 環境変数

ルートディレクトリに

```text
.env.local
```

を作成します。

```env
NEXT_PUBLIC_SUPABASE_URL=xxxxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```

---

# 4. Cloudflare Pages

Cloudflare アカウントを作成します。

[https://cloudflare.com](https://cloudflare.com)

---

## GitHub連携

Workers & Pages

↓

Create Project

↓

Connect to Git

---

## Build設定

Framework Preset

```text
Next.js
```

Build Command

```text
npm run build
```

Output Directory

```text
.next
```

---

## デプロイ

main ブランチへ push すると自動デプロイされます。

以後は GitHub が唯一の変更点になります。

````

---


それが Life Game Web の最初の役割である。
