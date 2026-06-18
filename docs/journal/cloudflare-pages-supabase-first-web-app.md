# Research Fabric Lab Journal

## Cloudflare Pages と Supabase を利用して最初の Web アプリを公開する

### 目的

前回の記事では Cloudflare Tunnel を利用して、自宅の Research Fabric Lab 環境を安全に公開した。

今回は視点を変え、

Cloudflare 上で動作する Web アプリケーションを構築する。

目的は完成したサービスを作ることではない。

まずは、

* GitHub
* Cloudflare Pages
* Supabase

を利用した現代的な Web サービス開発の流れを理解することを目的とする。

---

## なぜ Cloudflare Pages なのか

これまで Kubernetes や Harvester を利用してきた。

しかし個人向けサービスを考える場合、

必ずしも Kubernetes が必要とは限らない。

例えば、

* 小規模なツール
* 個人向けサービス
* プロトタイプ

であれば、

Cloudflare Pages の方が運用コストは圧倒的に低い。

構成は次のようになる。

```text
Browser
    ↓
Cloudflare Pages
    ↓
Supabase
```

サーバ管理は不要である。

---

## 今回作るもの

最初に作るのはシンプルな選択履歴アプリである。

利用者は、

* 今日の選択
* 短いメモ

を入力する。

データは Supabase に保存する。

将来的には、

* 人生シミュレーション
* 世界線探索
* AIによる振り返り

へ発展させることも可能である。

しかし今回は保存と表示のみを実装する。

---

## 利用するサービス

### GitHub

ソースコード管理。

Repository

```text
life-game-web
```

---

### Cloudflare Pages

Webアプリケーション公開。

無料プランを利用する。

---

### Supabase

データ保存。

PostgreSQL ベースの Backend as a Service。

無料プランを利用する。

---

## Supabase プロジェクト作成

Supabase Dashboard を開く。

```text
https://supabase.com
```

New Project を選択する。

作成後、

SQL Editor を開く。

---

## テーブル作成

今回は最小構成とする。

```sql
create table choices (
  id bigint generated always as identity primary key,
  choice_text text not null,
  created_at timestamptz default now()
);
```

実行後、

テーブルが作成されることを確認する。

---

## API情報取得

Project Settings

↓

API

から取得する。

```text
Project URL
Anon Key
```

後で利用する。

---

## Next.js プロジェクト

ローカル環境で作成。

```bash
npx create-next-app@latest life-game-web
```

Supabase Client を導入する。

```bash
npm install @supabase/supabase-js
```

---

## 環境変数

`.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=xxxxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```

---

## GitHub へ Push

```bash
git add .
git commit -m "initial version"
git push
```

GitHub 上へ反映されることを確認する。

---

## Cloudflare Pages 作成

Cloudflare Dashboard

↓

Workers & Pages

↓

Create Application

↓

Pages

↓

Connect to Git

を選択する。

GitHub リポジトリを接続する。

---

## Build 設定

Framework

```text
Next.js
```

Build Command

```text
npm run build
```

Cloudflare が自動判定する場合もある。

---

## 初回デプロイ

Deploy を実行する。

数分後、

以下のような URL が発行される。

```text
https://life-game-web.pages.dev
```

ここでアプリへアクセスできる。

---

## GitOps 的運用

以後の流れは単純である。

```text
Code
 ↓
GitHub
 ↓
Push
 ↓
Cloudflare Deploy
```

サーバへログインする必要はない。

GitHub が唯一の変更点となる。

---

## 今回学んだこと

Kubernetes と比較すると、

Cloudflare Pages と Supabase は驚くほどシンプルである。

一方で、

* 個人サービス
* 小規模サービス
* プロトタイプ

には十分な機能を持っている。

Research Fabric Lab が

「インフラ実験室」

であるなら、

Life Game Web は

「サービス実験室」

と呼べるかもしれない。

---

## 次回

次回は Supabase に保存した履歴を一覧表示し、

Life Game Web の最初の機能を完成させる。

Every choice becomes history.
Every diary becomes history.
