import type { Metadata } from "next";
import { Spectral, Zen_Old_Mincho } from "next/font/google";
import "./globals.css";

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

const siteName = "山へ | ARC'TERYX";
const siteDescription =
  "xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx";

export const metadata: Metadata = {
  metadataBase: new URL("https://yamae.arcteryx.jp"),
  title: {
    default: siteName,
    template: `%s | YAMAE`,
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
    <html lang="ja" className={`${spectral.variable} ${zenOldMincho.variable}`}>
      <body>{children}</body>
    </html>
  );
}
