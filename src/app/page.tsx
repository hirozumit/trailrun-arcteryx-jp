import { Header } from "@/components/header/header";
import { ScrollVideo } from "@/components/scroll-video/scroll-video";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ScrollVideo
          src="/videos/test-landscape.mp4"
          scrollLength={3} />
      </main>
    </>
  );
}
