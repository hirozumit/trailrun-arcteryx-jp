import type { Metadata } from "next";
import { Spectral, Zen_Old_Mincho } from "next/font/google";
import localFont from "next/font/local";
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

const siteName = "山へ - TRAIL RUNNING | ARC'TERYX";
const siteDescription =
  "xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx";

export const metadata: Metadata = {
  metadataBase: new URL("https://trailrun.arcteryx.jp"),
  title: {
    default: siteName,
    template: `%s | 山へ - TRAIL RUNNING | ARC'TERYX`,
  },
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    siteName,
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
      <body>{children}</body>
    </html>
  );
}
