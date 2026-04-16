# Trail Run — Requirements

## Overview

ARC'TERYX「山へ」シリーズの第一弾キャンペーンサイト。トレイルランニングと日本の茶屋文化を接続するストーリーを軸に、商品紹介を含んだ体験を提供する。

## Timeline

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

- 本番ドメイン: `https://trailrun.arcteryx.jp`

## Page Structure

### Phase 1: `/`

長尺のランディングページ。以下のセクションで構成:

1. **Splash** — 全画面イントロ演出。フェードイン・アウトしてコンテンツへ遷移
2. **Movie** — スクロール連動動画（全幅 100vw）
3. **茶屋 (The Chaya)** — 高尾の茶屋紹介。テキスト＋写真、サービス紹介（ギアレンタル / ようかんとお茶 / ノベルティ）、地図（Google Maps embed, 3:2）、住所・営業情報
4. **Movie** — スクロール連動動画（全幅）
5. **ギア (The Gear)** — テキスト紹介 + 商品パネル。Footwear（2列）と Apparel（3列 + More）。モバイルは横スクロールカルーセル（`scroll-snap-type: x mandatory`）
6. **Movie** — スクロール連動動画（全幅）
7. **イベント (The Community Events)** — Community Event / Store Event の2カテゴリ。デスクトップ3列 + More、モバイルは横スクロールカルーセル
8. **代々木 (Yoyogi)** — TRAIL HUB YOYOGI 紹介。テキスト＋写真
9. **Image** — 全幅スチル画像

各セクションの間にスクロール連動の動画・スチル画像が挟まれる。ヘッダー・フッター・スプラッシュは以降も共通になる。

Figma: https://www.figma.com/design/1PrQp1BOsSitaJbdatAqVC/YAMAE-Web?node-id=7-137

### Phase 2: `/yoyogi`

代々木ランナーズハブの詳細ページ。

## Shared Components

| Component | Description                                     |
| --------- | ----------------------------------------------- |
| Header    | 中央にYAMAEロゴ。ページ追加時にページ間リンクを拡張    |
| Footer    | Arc'teryx ロゴ + arcteryx.jp リンク               |
| Splash    | 全画面イントロ演出（YAMAEロゴ）。フェードイン・アウトで遷移。全ページ共通 |
| Nav Local | デスクトップのみ。左端に縦書きセクションナビ（茶屋/ギア/代々木/イベント）。モバイルは非表示（将来的にUI検討の可能性あり） |

## UI Patterns

### Carousel (Mobile)

ギアパネル・イベントパネルはモバイルで横スクロールカルーセルになる。CSS のみで実装:

- `overflow-x: auto` + `scroll-snap-type: x mandatory`
- 各アイテムに `scroll-snap-align: start`

### Grid + More (Desktop)

ギア・イベントのデスクトップ表示は固定列数のグリッド。2行目以降は `[+ More]` ボタンで展開。

### Full-width Media

Movie / Image セクションは全幅（100vw × 100svh 相当）で表示。レイヤー名が `movie` のものは動画、`image` のものは静止画。

## Scroll-driven Interactions

### Video Timeline Control (`ScrollVideo`)

- `position: sticky` で動画をビューポートに固定
- `requestAnimationFrame` でスクロール位置を `video.currentTime` にマッピング
- スクロール範囲は CSS custom property (`--scroll-length`) で制御（100lvh の倍数、デフォルト 3）
- landscape / portrait の2種を用意し、`48rem` 未満でモバイルソースに切り替え
- 動画は ffmpeg で `-g 6 -keyint_min 6`（約0.25秒間隔）のキーフレーム最適化、`-movflags +faststart` で moov atom を先頭に配置

#### プラットフォーム別の初期化

Cloudflare Pages は静的アセットに対して Range リクエスト（`206 Partial Content`）を返さない場合がある。Range 非対応の場合、デスクトップブラウザで `video.currentTime` を設定してもフレームが描画されない。

- **iOS**: `preload="auto"` を無視するため、`play()` を即時呼び出して強制ロードし、`pause()` 後にシーク
- **デスクトップ**: `fetch()` で動画全体を Blob として取得し、`URL.createObjectURL()` で Blob URL に変換してから `<video>` に設定。Blob URL はブラウザメモリ上にあるため Range リクエスト不要でシークが確実に動作する。cleanup 時に `URL.revokeObjectURL()` でメモリ解放

Reference: https://tmp.thirozumi.org/yamae/video-prototype/

### Section Animations

- Intersection Observer ベースのスクロール連動アニメーション
- 各セクションのフェードイン・パララックスなど（詳細は Figma に準拠）

## Assets

- 動画フォーマット: MP4 (H.264)。スクロール駆動再生のシーク性能とiOS互換性を優先
- アセット配信: Cloudflare Pages に同梱（`public/` 配置）
- 画像・動画は Figma デザインおよび別途提供されるファイルを使用

## CSS Rules

- 値のハードコードは禁止。色・フォントサイズ・スペーシング等はすべて CSS custom property として `globals.css` に定義し、各モジュールから `var()` で参照する
- フォントサイズ・スペーシングは `rem` ベース。`html` 要素に `clamp()` 等を設定しレスポンシブに対応できる設計とする
- `font-family`, `font-size`, `line-height`, `letter-spacing`, `font-weight`, `color` 等の継承可能なプロパティは親要素に一度だけ指定し、子要素では継承を活用する。子要素で個別に値が異なる場合のみ上書きする

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
