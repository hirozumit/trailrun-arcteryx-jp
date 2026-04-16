import { Header } from "@/components/header/header";
import { Splash } from "@/components/splash/splash";
import { ScrollVideo } from "@/components/scroll-video/scroll-video";
import { ChayaSection } from "@/components/chaya-section/chaya-section";
import { GearSection } from "@/components/gear-section/gear-section";
import { EventSection } from "@/components/event-section/event-section";
import { YoyogiSection } from "@/components/yoyogi-section/yoyogi-section";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <>
      <main>
        <Splash />
        <Header />
        <ScrollVideo
          src="/videos/straw_landscape.mp4"
          mobileSrc="/videos/straw_portrait.mp4"
          priority
        />        
        <ChayaSection />
        <ScrollVideo
          src="/videos/gear_landscape.mp4"
          mobileSrc="/videos/gear_portrait.mp4"
        />
        <GearSection />
        <ScrollVideo
          src="/videos/event_landscape.mp4"
          mobileSrc="/videos/event_portrait.mp4"
        />
        <EventSection />
        <YoyogiSection />
      </main>
      <Footer poster="/images/poster.jpg" />
    </>
  );
}