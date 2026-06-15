# 山梨HPかけこみ寺 — 公式サイト

山梨の小さなお店向けホームページ制作サービス「山梨HPかけこみ寺」の自社公式サイトです。
理念は **「ホームページを持つハードルを下げ、作って終わりにせず、ずっと一緒に守る」**。

- **キャッチコピー**：そのお店の灯りを、ネットにも。
- **3本柱**：①安心の価格 ②一気通貫（ヒアリング〜制作を同じ人間が担当）③作って終わりにしない（月額で更新・管理）
- 素のHTML / CSS / JavaScript、ビルドツール不使用。GitHub Pages での公開を想定した相対パス構成。

## ファイル構成

```
kakekomi-official/
├── index.html        トップ（理念FV・強み3・料金概要・実績抜粋・駆け込み歓迎・問い合わせ導線）
├── service.html      サービス・料金（料金表・含む/含まない・料金シミュレーター★）
├── works.html        制作実績（カードグリッド・外部リンク別タブ）
├── about.html        かけこみ寺について（理念・製造業出身・進め方）
├── contact.html      お問い合わせ（Instagram / メールフォーム。電話欄なし）
├── 404.html          ページが見つからない場合
├── PARTS.md          部品カタログ（再利用・差し替えガイド）
├── 撮影リスト.md      プレースホルダ画像の差し替え用・撮影/支給リスト
└── assets/
    ├── css/style.css     色・余白・フォントを :root に集約（1ファイル）
    ├── js/
    │   ├── main.js       ハンバーガーメニュー＋スクロール出現演出
    │   └── simulator.js  料金シミュレーター（PRICING 定数に料金集約）
    └── img/
        ├── logo.svg          仮ロゴ（正式版が来たら同名で差し替え）
        ├── favicon.svg       favicon
        └── ogp-placeholder.txt  OGP画像(ogp.png)の用意手順メモ
```

## デザイン方針

和モダン。本紙（生成り `#FCFAF6`）を地に、藍 `#27406B` と墨 `#2B2B2B` で引き締め、桃（灯り）`#F2A3AB` をアクセント一点。
見出しは Shippori Mincho（明朝）、本文は Noto Sans JP。配色・余白は `assets/css/style.css` の `:root` に集約。

レスポンシブのブレークポイント：**375px / 768px / 1200px**（モバイルファースト）。

## プライバシー方針（重要）

- 本名・顔写真・住所番地・電話番号は**一切掲載しない**。
- 連絡手段は **Instagram（@hp_kakekomidera）の DM** と **メール**のみ。電話リンク・電話バーは作らない。
- 事業者表記は「山梨HPかけこみ寺／山梨県市川三郷町（詳細非公開）」まで。

## 公開前にやること（TODO）

1. **メール送信先** … `mailto:` の宛先は `thee3third@gmail.com` に設定済み。
   フォーム送信は静的ホスティングでは動かないため、Formspree 等の利用を推奨（`contact.html` 内コメント参照）。
2. **Instagramアカウント** … 公開済みか確認（`hp_kakekomidera`）。
3. **OGP画像** … `assets/img/ogp.png`（1200×630）を用意（`assets/img/ogp-placeholder.txt` 参照）。
4. **実績リンク** … `works.html` / `index.html` のカーオーディオ専門店 `href="https://example.com/"` を実URLへ。
5. **正式ロゴ** … 支給されたら `assets/img/logo.svg` を同名で差し替え。
6. **写真** … `.ph`（CSSダミー）を `<img>` へ（`撮影リスト.md` 参照）。

## ローカルでの確認

ビルド不要。ファイルをブラウザで開くか、簡易サーバで配信：

```bash
# 例：Python が入っていれば
python -m http.server 8000
# → http://localhost:8000/ を開く
```

## 料金の改定方法

計算の正は `assets/js/simulator.js` の `PRICING` 定数です。ここを直すとシミュレーターの計算に反映されます。
**表示用のHTML（service.html / index.html の料金表記）も合わせて手で直してください**（PARTS.md の置換リスト参照）。
