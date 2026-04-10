import { Header } from "@/components/header/header";
import { ScrollVideo } from "@/components/scroll-video/scroll-video";
import { ChayaSection } from "@/components/chaya-section/chaya-section";
import { GearSection } from "@/components/gear-section/gear-section";
import { EventSection } from "@/components/event-section/event-section";
import { YoyogiSection } from "@/components/yoyogi-section/yoyogi-section";
import { FullImage } from "@/components/full-image/full-image";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ScrollVideo src="/videos/test-landscape.mp4" />
        <ChayaSection />
        <ScrollVideo src="/videos/test-landscape.mp4" />
        <GearSection />
        <ScrollVideo src="/videos/test-landscape.mp4" />
        <EventSection />
        <YoyogiSection />
        <FullImage src="/images/poster.jpg" />
      </main>
      <Footer />
    </>
  );
}