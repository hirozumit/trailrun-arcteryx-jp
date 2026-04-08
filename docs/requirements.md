# YAMAE — Requirements

## Overview

Arc'teryx のキャンペーンサイト。トレイルランニングと日本の茶屋文化を接続するストーリーを軸に、商品紹介を含んだ体験を提供する。

## Timeline

- 初回公開日: 4月17日
- 8月11日（山の日）を目標にコンテンツを拡充
- 最初は1ページで公開し、段階的にページを追加

## Tech Stack

| Layer       | Choice                          |
| ----------- | ------------------------------- |
| Framework   | Next.js 16 (Static Export)      |
| Language    | TypeScript                      |
| Styling     | CSS Modules + CSS Custom Props  |
| Hosting     | Cloudflare Pages                |
| Analytics   | GA4 (導入方法は別途決定)         |
| Design      | Figma → CSS Modules 変換        |
| Fonts       | Google Fonts — Spectral (欧文) + Zen Old Mincho (和文) 混植 |

## Responsive Strategy

- Mobile-first
- Breakpoint: `48rem` でデスクトップレイアウトに切り替え
- 動画はモバイル(portrait) / デスクトップ(landscape) で別ソースを出し分け

## Domain & URL Structure

- 本番ドメイン: `https://yamae.arcteryx.jp` (仮)

```
/                       (後から追加)
/trail                  (後から追加)
/trail/takao            Phase 1
/trail/yoyogi           Phase 2
/climbing               Phase 3+
/hiking                 Phase 3+
/snow                   Phase 3+
```

`/` および `/trail` はコンテンツが揃った段階で追加する。

## Page Structure

### Phase 1: `/trail/takao`

長尺のランディングページ。以下のセクションで構成:

1. **スプラッシュ** — 全画面ローディング/イントロ演出（共通コンポーネント）
2. **茶屋** — 高尾の茶屋ついて
3. **ギア** — 商品紹介セクション
4. **代々木** — 都心部拠点の紹介
5. **イベント** — 今後のイベント情報

各セクションの間にスクロール連動の動画・スチル・イラストが挟まれる。ヘッダー・フッター・スプラッシュは以降も共通になる。

### Phase 2: `/trail/yoyogi`

代々木ランナーズハブの詳細ページ。

### Phase 3+: `/climbing`, `/hiking`, `/snow` ...

シーズン・アクティビティごとのページ。

## Shared Components

| Component | Description                                     |
| --------- | ----------------------------------------------- |
| Header    | ページ内アンカーナビ。ページ追加時にページ間リンクを拡張 |
| Footer    | 共通フッター                                      |
| Splash    | 全画面イントロ演出。全ページのロード時に表示           |

## Scroll-driven Interactions

### Video Timeline Control

- `position: sticky` で動画をビューポートに固定
- `requestAnimationFrame` でスクロール位置を `video.currentTime` にマッピング
- スクロール範囲は CSS custom property (`--scroll-height`) で制御
- iOS 向けにタッチ/スクロールイベントで動画再生をアンロック

Reference: https://tmp.thirozumi.org/yamae/video-prototype/

### Section Animations

- Intersection Observer ベースのスクロール連動アニメーション
- 各セクションのフェードイン・パララックスなど（詳細は Figma に準拠）

## Assets

- 動画フォーマット: WebM（軽量・高画質を優先）
- アセット配信: Cloudflare Pages に同梱（`public/` 配置）
- 画像・動画は Figma デザインおよび別途提供されるファイルを使用

## CSS Rules

- 値のハードコードは禁止。色・フォントサイズ・スペーシング等はすべて CSS custom property として `globals.css` に定義し、各モジュールから `var()` で参照する
- フォントサイズ・スペーシングは `rem` ベース。`html` 要素に `clamp()` 等を設定しレスポンシブに対応できる設計とする
- `font-size`, `line-height`, `font-family` 等の継承可能なプロパティは親要素からの継承を優先し、個別指定は必要最低限にとどめる

## Naming Conventions

| Target                   | Rule                                          |
| ------------------------ | --------------------------------------------- |
| ファイル名・ディレクトリ名 | kebab-case (`scroll-video.tsx`, `gear-section/`) |
| CSS クラス名              | kebab-case (CSS Modules 経由)                   |
| DOM 属性の使い分け         | `class` → スタイリング / `id` → アンカー / `data-*` → JS イベントフック |

## OGP / Meta

- ページごとに `og:title`, `og:description`, `og:image` を設定
- 未指定の場合はサイトデフォルト値にフォールバック（`layout.tsx` の `metadata` で定義）

## Deploy

- Cloudflare Pages のブランチビルドを利用。ブランチ push で自動デプロイされるためクライアント側の設定は不要
- Ref: https://developers.cloudflare.com/pages/configuration/branch-build-controls/

## Internationalization

- 日本語のみ

## Out of Scope

- SNS シェアボタン
- 外部フォーム連携
- 多言語対応
- GTM (GA4 の導入方法は別途決定)
