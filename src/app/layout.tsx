import type { Metadata } from "next";
import { Spectral, Zen_Old_Mincho } from "next/font/google";
import localFont from "next/font/local";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import "@/styles/reveal.css";

const spectral = Spectral({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-spectral",
  display: "swap",
});

const zenOldMincho = Zen_Old_Mincho({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-zen-old-mincho",
  display: "swap",
});

const itcElanBook = localFont({
  src: [
    { path: "../fonts/ITCElanBook_normal_normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ITCElanBook_normal_normal.woff", weight: "400", style: "normal" },
  ],
  variable: "--font-itc-elan-book",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL ?? "https://trailrun.arcteryx.jp";
const siteName = "山へ行く人のための茶屋 | ARC'TERYX アークテリクス";
const siteDescription =
  "トレイルランナーのための期間限定の茶屋が高尾山麓にオープン。最新シューズの試し履き、限定羊羹とお茶。4.17〜";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | 山へ行く人のための茶屋 | ARC'TERYX アークテリクス`,
  },
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    siteName,
    url: siteUrl,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${spectral.variable} ${zenOldMincho.variable} ${itcElanBook.variable}`}>
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
      <body>{children}</body>
      {process.env.NEXT_PUBLIC_GA4_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_ID} />
      )}
    </html>
  );
}
