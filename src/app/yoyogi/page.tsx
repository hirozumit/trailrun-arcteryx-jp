import type { Metadata } from "next";
import { Splash } from "@/components/splash/splash";
import { Header } from "@/components/header/header";
import { YoyogiPage } from "@/components/yoyogi-page/yoyogi-page";
import { Footer } from "@/components/footer/footer";
import copyLine1 from "@/components/splash/copy-yoyogi-line1.svg";
import copyLine2 from "@/components/splash/copy-yoyogi-line2.svg";

const title = "山へ踏み出す人のための準備拠点 | ARC'TERYX アークテリクス";
const description =
  "トレイルランナーのための期間限定の準備拠点が代々木公園のほど近くにオープン。最新のフットウェアの試し履き、ギアや走り方の指南。5.2〜5.31";

export const metadata: Metadata = {
  title: "山へ踏み出す人のための準備拠点",
  description,
  openGraph: {
    title,
    description,
    url: "/yoyogi/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function Yoyogi() {
  return (
    <>
      <main>
        <Splash copyLine1={copyLine1} copyLine2={copyLine2} />
        <Header
          titleItems={[
            { label: "TRAIL RUNNING", href: "/" },
            { label: "YOYOGI", href: "/yoyogi", current: true },
          ]}
        />
        <YoyogiPage />
      </main>
      <Footer poster="/images/poster.jpg" />
    </>
  );
}
