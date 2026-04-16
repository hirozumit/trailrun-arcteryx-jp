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
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    // 1. Determine the correct source
    const resolvedSrc =
      mobileSrc && window.matchMedia(MOBILE_MQ).matches ? mobileSrc : src;

    // 2. Scroll-driven seek
    let ticking = false;

    const seek = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = vh - rect.top;
      const scrollRange = container.offsetHeight + vh;
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));

      const bar = progressRef.current;
      if (bar) bar.style.width = `${progress * 100}%`;

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

    // 3. Fetch video as Blob and use a Blob URL.
    //    This ensures seeking works even when the server does not support
    //    Range requests (e.g. Cloudflare Pages returning 200 instead of 206).
    const controller = new AbortController();

    fetch(resolvedSrc, { signal: controller.signal })
      .then((res) => res.blob())
      .then((blob) => {
        if (controller.signal.aborted) return;
        const blobUrl = URL.createObjectURL(blob);
        video.src = blobUrl;
        video.addEventListener(
          "loadeddata",
          () => {
            seek();
            if (priority) window.dispatchEvent(new Event("scrollvideo:ready"));
          },
          { once: true },
        );
      })
      .catch(() => {
        // Fetch failed (e.g. aborted) — fall back to original src
        if (!controller.signal.aborted) {
          video.src = resolvedSrc;
          video.addEventListener(
            "loadeddata",
            () => {
              seek();
              if (priority) window.dispatchEvent(new Event("scrollvideo:ready"));
            },
            { once: true },
          );
        }
      });

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      controller.abort();
      window.removeEventListener("scroll", onScroll);
      if (video.src.startsWith("blob:")) URL.revokeObjectURL(video.src);
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
          src={src}
          muted
          playsInline
          preload="auto"
          poster={poster}
        />
        <div className={styles.timeline}>
          <div ref={progressRef} className={styles.timelineProgress} />
        </div>
      </div>
    </div>
  );
}
