
# Research Fabric Lab Journal

## Cloudflare Tunnel を利用して ArgoCD をインターネットへ公開する

### 目的

これまで Research Fabric Lab の管理画面は、ローカルネットワーク内からのみアクセス可能だった。

```text
Browser
  ↓
argocd.lab.local
````

この構成は安全である一方、

* 外出先から確認できない
* VPN環境が必要
* デモや検証時に不便

という課題がある。

本記事では Cloudflare Tunnel を利用し、

ポート開放や固定IPを利用せずに、

ArgoCD を安全に公開する。

---

## なぜ Cloudflare Tunnel を使うのか

従来の公開方法。

```text
Internet
 ↓
Router
 ↓
Port Forward
 ↓
Home Server
```

課題:

* ポート開放が必要
* 固定IPが望ましい
* 攻撃対象になる

Cloudflare Tunnel を利用すると、

```text
Home Server
 ↓
cloudflared
 ↓
Cloudflare
 ↓
Browser
```

となる。

サーバ側から外向き通信を張るだけでよい。

---

## 今回の環境

### Harvester

* Harvester v1.8

### Management Cluster

* rancher-mgmt-02
* Ubuntu 24.04
* K3s

### Applications

* Rancher
* ArgoCD
* MinIO

### ArgoCD

現在のURL

```text
http://argocd.lab.local
```

目標URL

```text
https://argocd.example.com
```

---

## Cloudflare アカウント準備

Cloudflareアカウントを作成する。

[https://www.cloudflare.com/](https://www.cloudflare.com/)

利用する無料機能:

* Cloudflare Tunnel
* Zero Trust

無料プランで問題ない。

---

## Zero Trust を有効化

Cloudflare Dashboard

↓

Zero Trust

↓

Get Started

---

## cloudflared のインストール

rancher-mgmt-02へログイン。

```bash
curl -L \
https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb \
-o cloudflared.deb

sudo dpkg -i cloudflared.deb
```

確認。

```bash
cloudflared version
```

---

## Cloudflareへ認証

```bash
cloudflared tunnel login
```

ブラウザが起動する。

対象ドメインを選択する。

認証成功後、

認証情報が保存される。

---

## Tunnel作成

```bash
cloudflared tunnel create research-fabric-lab
```

出力例。

```text
Tunnel ID:
xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

---

## DNS登録

```bash
cloudflared tunnel route dns \
research-fabric-lab \
argocd.example.com
```

Cloudflare DNSへ自動登録される。

---

## Tunnel設定

設定ファイル作成。

```bash
sudo mkdir -p /etc/cloudflared
sudo vi /etc/cloudflared/config.yml
```

```yaml
tunnel: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

credentials-file: /root/.cloudflared/xxxxxxxx.json

ingress:

  - hostname: argocd.example.com
    service: http://argocd.lab.local

  - service: http_status:404
```

---

## 動作確認

起動。

```bash
cloudflared tunnel run research-fabric-lab
```

ブラウザで確認。

```text
https://argocd.example.com
```

ArgoCD画面が表示されれば成功。

---

## Zero Trust 認証追加

このままだとURLを知っている人はアクセスできる。

Cloudflare Access を利用する。

Cloudflare Dashboard

↓

Zero Trust

↓

Access

↓

Applications

↓

Add Application

---

### ポリシー

例:

```text
Google Login

email ends with:

@gmail.com
```

あるいは

```text
yoshiyuki.kono@gmail.com
```

のみ許可。

---

## 最終構成

```text
Browser
   ↓
Cloudflare Access
   ↓
Cloudflare Tunnel
   ↓
ArgoCD
```

特徴:

* ポート開放不要
* 固定IP不要
* VPN不要
* Google認証可能
* 自宅ネットワークを公開しない

---

## 所感

Cloudflare は CDN 企業として知られているが、

実際に利用してみると、

VPNやリバースプロキシの代替としても非常に強力である。

Research Fabric Lab においては、

ArgoCD
Rancher
MinIO

などの管理系サービスを、

安全に外部から利用する手段として有力である。

従来の

「VPNへ接続してからアクセスする」

という運用に比べ、

圧倒的に導入が容易であることを確認できた。



```text
04-cloudflare-pages-supabase-first-web-app.md
```

がちょうど今回の `life-game-web` につながります。
