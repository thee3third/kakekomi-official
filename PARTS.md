# PARTS.md — 部品カタログ（山梨HPかけこみ寺 公式サイト）

このサイトは izakaya-sample / momoen-sample と同じ「**色変数・文言の差し替えで再利用できる**」部品設計を引き継いでいます。
再利用前提のセクションには HTML 内に `<!-- @parts: 名前 -->` 〜 `<!-- /@parts -->`（CSS は `/* @parts: 名前 */` 〜 `/* /@parts */`）のマーカーが付いています。

> このサイトは**自社の事業サイト**です。店舗系サンプルと違い、**固定電話バーや地図は持たず**、連絡導線は **Instagram と メール**のみ。プライバシー方針として**本名・顔写真・住所番地・電話番号は一切載せません**。

---

## 0. まず最初に差し替える「3点セット」

| 差し替えるもの | 場所 | 内容 |
| --- | --- | --- |
| **① 色・フォント** | `assets/css/style.css` の `:root`（`@parts: design-tokens`） | 配色・余白・フォント。ここを変えると全ページの見た目が一括で変わる |
| **② 料金** | `assets/js/simulator.js` の `PRICING` 定数 ＋ 各HTMLの料金表記 | 計算の正は `PRICING`。表示用のHTMLも合わせて直す（後述） |
| **③ 連絡先・ロゴ** | InstagramURL・mailto・`assets/img/logo.svg` | 全ファイル置換（後述） |

### 文言・連絡先の一括置換リスト（エディタの全ファイル置換で）

| 検索する文字列 | 意味 | 差し替え |
| --- | --- | --- |
| `example@gmail.com` | **メール送信先（未設定）** | 正式なGmailアドレス。`mailto:` とフォーム説明の両方に出現 |
| `hp_kakekomidera` | Instagramのアカウント名（URL・表示） | 実アカウント |
| `山梨県市川三郷町（詳細非公開）` | 所在地表記 | 方針変更時のみ。番地・本名は出さない |
| `88,000` / `66,000` / `6,600` | 料金（表示用） | 改定時。**併せて simulator.js の PRICING も直す** |

> ⚠️ `example@gmail.com` は **全ページ**（ヘッダー無し／contactの2箇所／footer無し・action-bar／各CTA）に出現します。公開前に必ず「全ファイル置換」で実アドレスへ。未設定のまま公開しないこと。

---

## 1. 部品一覧

### `head-common`（メタ情報）※全ページ
- **用途**：title / description / OGP / favicon / Google Fonts / CSS 読み込み。
- **差し替え**：ページ複製時は `<title>`・`description`・`og:title`・`og:description`・`og:url` を必ず変更。

### `header`（ヘッダー）※全ページ共通＝同一HTMLを複製
- **用途**：ロゴ＋グローバルナビ。スマホはハンバーガー（`main.js` が開閉）。
- **差し替え**：`brand__logo`（`assets/img/logo.svg`）、`brand__name`、ナビ項目。現在ページのリンクに `aria-current="page"`。お問い合わせは `.nav-cta`（藍の塗りボタン）。
- **色**：`--color-bg` / `--color-ai`（現在ページ下線は `--color-momo`）。
- **注意**：6ファイルに複製。ナビ項目を増減したら全ページに反映する。

### `action-bar`（固定アクションバー）※スマホのみ・全ページ複製
- **用途**：画面下に固定。`[Instagram]`／`[メール]` の2ボタン。**電話ボタンは作らない**（方針）。
- **差し替え**：InstagramURL、`mailto:`。
- **色**：`--color-ai`（Insta）/ `--color-momo-deep`（メール）。高さは `--actionbar-h`。
- **挙動**：`@media (min-width:768px)` で非表示。本文は `body { padding-bottom }` で隠れない。

### `footer`（フッター）※全ページ複製
- **用途**：屋号・理念の再掲、サイトマップ、運営情報（番地・電話なし）、方針注記。
- **差し替え**：屋号文言・連絡先。`footer-note` の「顔は出していませんが…」「電話窓口なし」は方針なので原則残す。

### `strength-cards`（強み3カード）★新規部品
- **用途**：サイトの3本柱「安心の価格／一気通貫／作って終わりにしない」。
- **差し替え**：`strength__no`（壱弐参）、`strength__title`、`strength__desc`。最重要の2番目だけ `strength--hero` ＋ `strength__badge` で強調。
- **色**：`--color-momo`（左帯・強調枠）、`--color-ai`（番号丸）。
- **設置**：index。スマホ1列 → 768pxで3列。

### `works-grid`（実績カードグリッド）★新規部品
- **用途**：実績／サンプルをカード表示。各カード全体が外部リンク（別タブ）。
- **差し替え**：`work-card` の `href`（実URL）、`.ph`（撮影後 `<img>` へ）、`work-card__kind` / `__title` / `__desc`。
  - 実績は `work-card__tag--real`（「実績」）、サンプルは `work-card__tag--sample`（「制作例（サンプル）」）を付ける。
- **色**：`--color-ai`（実績タグ）、`--color-bg-3`（サンプルタグ）、`--color-momo-deep`（業種ラベル）。
- **設置**：works（フル）／index（抜粋3枚）。スマホ1列 → 768pxで2列 → 1200pxで3列。
- **外部リンク**：必ず `target="_blank" rel="noopener"`。

### `fee-simulator`（料金シミュレーター）★新規部品・このサイトの目玉
- **用途**：プランと利用月数から「総額／初年度総額／月あたり実質負担」をその場で試算。素のJSで駆動。
- **マークアップ**：`#feeSimulator` 内に、プラン選択ラジオ（`name="sim-plan"`）、月数スライダー（`#simMonths`）、結果出力（`#simTotal` / `#simFirstYear` / `#simPerMonth` / `#simMonthsValue`）。
- **計算ロジック・料金定数**：すべて `assets/js/simulator.js` の `PRICING`。**料金改定はここ1箇所**。
  - `firstYearTotal = initialFee + monthly × min(months,12)`
  - `grandTotal     = initialFee + monthly × months`
  - `effectivePerMonth = grandTotal ÷ months`
- **HTMLとの整合**：プランラジオの `value`（`normal` / `monitor`）は `PRICING.plans` のキーと一致させること。スライダーの min/max は JS が `PRICING.months` から上書きする。
- **演出**：数字変化時に easeOutCubic のカウントアップ＋軽いバンプ（`.is-bumped`）。`prefers-reduced-motion` では即時表示。
- **設置**：service。

### `design-tokens`（CSS変数）※`style.css`
- **用途**：配色・フォント・余白・レイアウトの一元管理。
- **配色**：本紙 `--color-bg #FCFAF6` / 藍 `--color-ai #27406B` / 墨 `--color-text #2B2B2B` / 桃（灯り）`--color-momo #F2A3AB` / 補助グレー `--color-mute #8A8580`。
- **フォント**：本文 Noto Sans JP、見出し Shippori Mincho。

### その他の汎用パーツ（マーカー無し・クラスで再利用）
- `quote`（理念のひとこと）、`cta-band`（藍の相談導線バンド）、`welcome`（駆け込み歓迎）、`fee-summary` / `fee-pill`（料金概要）、`plan-card`（料金表）、`inc-col` / `inc-list`（含む・含まない）、`belief__block`（理念ブロック）、`flow`（進め方ステップ）、`contact-card`（連絡手段カード）、`form`（フォーム）、`ph`（プレースホルダ画像）。

---

## 2. プレースホルダ画像 `.ph` の差し替え

CSSダミー（生成りの市松＋構図ラベル）。撮影・支給後は `<img>` へ：

```html
<!-- before -->
<div class="ph ph--ai"><span class="ph__label"><strong>カーオーディオ専門店</strong>店舗外観の俯瞰</span></div>
<!-- after -->
<img src="assets/img/works-caraudio.jpg" alt="カーオーディオ専門店の制作事例" loading="lazy">
```

バリエーション：`.ph`（生成り）/ `.ph--ai`（藍・濃色向き）/ `.ph--momo`（桃・やわらかい題材向き）。構図は **撮影リスト.md** 参照。

---

## 3. ロゴの差し替え

`assets/img/logo.svg` が仮ロゴ（障子＋桃の灯り＋「寺」）。正式ロゴ支給時はこのファイルを同名で差し替えれば、全ページのヘッダーに反映されます。favicon（`favicon.svg`）も同じ世界観で別ファイルにしているので、必要なら合わせて差し替え。

---

## 4. 公開前セルフチェック（Git Bash 等）

```bash
# 本名・電話・住所番地が露出していないか（0件であるべき）
grep -rnE "0[0-9]{1,3}-[0-9]{2,4}-[0-9]{3,4}" *.html   # 電話番号らしき表記
grep -rn "tel:" *.html                                   # 電話リンク（作らない方針＝0件）
# メール送信先が仮のままになっていないか（公開前に実アドレスへ）
grep -rn "example@gmail.com" *.html
# シミュレーターの料金とHTML表記の整合
grep -rn "88,000\|66,000\|6,600" *.html
```
