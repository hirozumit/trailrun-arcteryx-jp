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

  // Source resolution, activation, and scroll-driven playback in a single
  // effect so timing between src assignment and event listeners is guaranteed.
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    // 1. Resolve and assign source
    const resolved =
      mobileSrc && window.matchMedia(MOBILE_MQ).matches ? mobileSrc : src;
    video.src = resolved;

    // 2. Scroll-driven seek
    let ticking = false;

    const seek = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = vh - rect.top;
      const scrollRange = container.offsetHeight + vh;
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));
      video.currentTime = progress * video.duration;
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

    // 3. Activate video (required on iOS to render frames via currentTime)
    //    then sync to current scroll position.
    const activate = () => {
      video
        .play()
        .then(() => {
          video.pause();
          seek();
        })
        .catch(() => seek());

      if (priority) {
        window.dispatchEvent(new Event("scrollvideo:ready"));
      }
    };

    if (video.readyState >= 2) {
      activate();
    } else {
      video.addEventListener("loadeddata", activate, { once: true });
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("loadeddata", activate);
    };
  }, [src, mobileSrc, priority]);

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
