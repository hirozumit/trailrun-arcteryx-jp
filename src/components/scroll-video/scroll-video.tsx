"use client";

import { useEffect, useRef } from "react";
import styles from "./scroll-video.module.css";

type ScrollVideoProps = {
  src: string;
  /** Scroll distance as a multiple of 100svh. Default: 3 */
  scrollLength?: number;
};

export function ScrollVideo({ src, scrollLength = 3 }: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // iOS autoplay unlock
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unlock = () => {
      video.play().then(() => video.pause()).catch(() => {});
    };

    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    window.addEventListener("scroll", unlock, { once: true, passive: true });

    return () => {
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("scroll", unlock);
    };
  }, []);

  // Scroll-driven playback: starts when video enters viewport
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let ticking = false;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      // Video enters viewport when rect.top < vh (bottom of viewport)
      // Fully scrolled when rect.bottom <= vh
      const scrolled = vh - rect.top;
      const scrollRange = container.offsetHeight;
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));

      if (video.duration) {
        video.currentTime = progress * video.duration;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ "--scroll-length": scrollLength } as React.CSSProperties}
    >
      <div className={styles.sticky}>
        <video
          ref={videoRef}
          className={styles.video}
          src={src}
          muted
          playsInline
          preload="auto"
        />
      </div>
    </div>
  );
}
