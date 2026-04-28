import type { Metadata } from "next";
import { Splash } from "@/components/splash/splash";
import { Header } from "@/components/header/header";
import { YoyogiPage } from "@/components/yoyogi-page/yoyogi-page";
import { Footer } from "@/components/footer/footer";
import copyLine1 from "@/components/splash/copy-yoyogi-line1.svg";
import copyLine2 from "@/components/splash/copy-yoyogi-line2.svg";

export const metadata: Metadata = {
  title: "TRAIL HUB YOYOGI",
  description:
    "アークテリクスによるトレイルランニングのための準備拠点が、代々木公園のほど近くに期間限定でオープン。",
};

export default function Yoyogi() {
  return (
    <>
      <main>
        <Splash copyLine1={copyLine1} copyLine2={copyLine2} />
        <Header
          hideSectionNav
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
