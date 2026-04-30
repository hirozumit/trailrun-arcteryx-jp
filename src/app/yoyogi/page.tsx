import type { Metadata } from "next";
import { Splash } from "@/components/splash/splash";
import { Header } from "@/components/header/header";
import { YoyogiPage } from "@/components/yoyogi-page/yoyogi-page";
import { Footer } from "@/components/footer/footer";
import copyLine1 from "@/components/splash/copy-yoyogi-line1.svg";
import copyLine2 from "@/components/splash/copy-yoyogi-line2.svg";

const title = "TRAIL HUB YOYOGI | ARC'TERYX アークテリクス";
const description =
  "山へ行き、山に触れ、何かが変わる。その第一歩を踏み出す前の方や、今まさに踏み出しつつある方へ。アークテリクスによるトレイルランニングのための準備拠点が、代々木公園のほど近くに、期間限定でオープンします。";

export const metadata: Metadata = {
  title: "TRAIL HUB YOYOGI",
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
