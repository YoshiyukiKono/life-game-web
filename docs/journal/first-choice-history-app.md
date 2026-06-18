# Research Fabric Lab Journal

## Building the First Choice History App

### 目的

前回までで、

* GitHub
* Cloudflare Pages
* Supabase

を利用した Web アプリケーション基盤を構築した。

今回は初めてユーザーが利用できる機能を実装する。

Life Game Web の最初の機能は非常に単純である。

「今日の選択を記録する」

ただそれだけである。

---

## なぜ選択なのか

人生は選択の連続である。

大きな決断もあれば、

日常の小さな判断もある。

しかし多くの場合、

私たちは選択したことを忘れてしまう。

Life Game Web の最初の目的は、

選択を保存することにある。

分析もしない。

評価もしない。

ただ履歴として残す。

---

## データモデル

今回は最小構成とする。

```sql
create table choices (
  id bigint generated always as identity primary key,
  choice_text text not null,
  created_at timestamptz default now()
);
```

保存するのは

* 選択内容
* 記録日時

のみである。

---

## Supabase Client

接続用ファイルを作成する。

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

---

## 入力フォーム

最初の画面はシンプルでよい。

```text
Today's Choice

[________________]

[Save]
```

---

## 保存処理

保存ボタン押下時に Supabase へ登録する。

```typescript
await supabase
  .from("choices")
  .insert({
    choice_text: choice
  });
```

---

## 履歴表示

登録したデータを取得する。

```typescript
const { data } = await supabase
  .from("choices")
  .select("*")
  .order("created_at", {
    ascending: false
  });
```

表示例。

```text
2026-06-18
Started Life Game Web

2026-06-17
Published Cloudflare Journal

2026-06-16
Installed ArgoCD
```

---

## 初めての永続データ

ここで重要なのは機能ではない。

初めて、

ユーザーの行動が保存されたことである。

アプリケーションは単なる画面ではなくなった。

小さな歴史を持ち始めた。

---

## Git Push

変更をコミットする。

```bash
git add .
git commit -m "add choice history feature"
git push
```

Cloudflare Pages が自動デプロイを実行する。

---

## 完成したもの

今回完成したのは、

SNSでもなく、

AIサービスでもない。

単なる選択履歴アプリである。

しかし、

Life Game Web の最初の機能としては十分である。

Every choice becomes history.

その一行を実際のデータとして保存できるようになった。

---

## 次回

次回は Choice に Memo を追加する。

単なる履歴ではなく、

「なぜその選択をしたのか」

を保存できるようにする。

ここから History は少しずつ Diary に近づいていく。
