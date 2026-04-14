"use client";

import { useEffect, useRef } from "react";
import styles from "./scroll-video.module.css";

type ScrollVideoProps = {
  src: string;
  /** Video source for mobile (<48rem). When omitted, src is used for all viewports */
  mobileSrc?: string;
  /** Scroll distance as a multiple of 100svh. Default: 3 */
  scrollLength?: number;
  /** Poster image shown while the video is loading */
  poster?: string;
  /** When true, dispatches "scrollvideo:ready" on window once the first frame is available */
  priority?: boolean;
};

const MOBILE_MQ = "(max-width: 47.999rem)";

export function ScrollVideo({
  src,
  mobileSrc,
  scrollLength = 3,
  poster,
  priority,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Resolve source via matchMedia — avoids <source> elements which
  // browsers won't re-evaluate when React adds them dynamically.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const resolved =
      mobileSrc && window.matchMedia(MOBILE_MQ).matches ? mobileSrc : src;
    video.src = resolved;
  }, [src, mobileSrc]);

  // iOS autoplay unlock — use touchstart only so it doesn't race with
  // the scroll-driven currentTime updates on the first scroll event.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unlock = () => {
      video.play().then(() => video.pause()).catch(() => {});
    };

    window.addEventListener("touchstart", unlock, { once: true, passive: true });

    return () => window.removeEventListener("touchstart", unlock);
  }, []);

  // Signal readiness for priority video
  useEffect(() => {
    if (!priority) return;
    const video = videoRef.current;
    if (!video) return;

    const signal = () => {
      window.dispatchEvent(new Event("scrollvideo:ready"));
    };

    if (video.readyState >= 2) {
      signal();
      return;
    }

    video.addEventListener("loadeddata", signal, { once: true });
    return () => video.removeEventListener("loadeddata", signal);
  }, [priority]);

  // Scroll-driven playback
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let ticking = false;

    const seek = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = vh - rect.top;
      const scrollRange = container.offsetHeight + vh;
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));

      if (Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime = progress * video.duration;
      }
    };

    const update = () => {
      seek();
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // When metadata arrives (possibly after scroll has started), sync position
    const onMetadata = () => requestAnimationFrame(seek);

    video.addEventListener("loadedmetadata", onMetadata, { once: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    seek();

    return () => {
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("loadedmetadata", onMetadata);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ "--scroll-length": scrollLength } as React.CSSProperties}
    >
      <div className={styles.sticky}>
        {poster && (
          <img
            src={poster}
            alt=""
            className={styles.poster}
          />
        )}
        <video
          ref={videoRef}
          className={styles.video}
          muted
          playsInline
          preload="auto"
          poster={poster}
        />
      </div>
    </div>
  );
}
