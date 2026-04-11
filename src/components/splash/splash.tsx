"use client";

import { useEffect, useRef, useState } from "react";
import copy from "./copy.svg";
import logoYamae from "./logo-yamae.svg";
import styles from "./splash.module.css";

function smoothScrollTo(target: number, duration: number) {
  const start = window.scrollY;
  const delta = target - start;
  const startTime = performance.now();

  const step = (now: number) => {
    const t = Math.min((now - startTime) / duration, 1);
    const ease = t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2; // easeInOutQuart
    window.scrollTo(0, start + delta * ease);
    if (t < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export function Splash() {
  const splashRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Prevent browser from restoring scroll position on reload
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // Lock scrolling during splash animation
    document.documentElement.style.overflow = "hidden";

    requestAnimationFrame(() => setReady(true));

    // Auto-scroll after logo is visible for 2s (logo appears at 3.5s)
    // and the first video is ready to play
    const LOGO_VISIBLE_AT = 5500; // 3s copy + 0.5s fade-in + 2s hold

    const waitForVideo = new Promise<void>((resolve) => {
      const video = document.querySelector("video");
      if (!video) { resolve(); return; }
      if (video.readyState >= 2) { resolve(); return; }
      video.addEventListener("loadeddata", () => resolve(), { once: true });
    });

    const waitForTimer = new Promise<void>((resolve) => {
      setTimeout(resolve, LOGO_VISIBLE_AT);
    });

    let active = true;
    Promise.all([waitForVideo, waitForTimer]).then(() => {
      if (!active) return;
      // Unlock scrolling, then auto-scroll
      document.documentElement.style.overflow = "";
      smoothScrollTo(window.innerHeight * 0.5, 1000);
    });

    return () => {
      active = false;
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const splash = splashRef.current;
    if (!splash) return;

    let ticking = false;

    const update = () => {
      const t = Math.min(window.scrollY / window.innerHeight, 1);
      splash.style.setProperty("--t", String(t));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div ref={splashRef} className={styles.splash}>
          <img
            src={copy.src}
            alt="（拝啓）山へ／山へ（行こう）"
            className={`${styles.copy} ${ready ? styles.visible : ""}`}
          />
          <img
            className={`${styles.logo} ${ready ? styles.visible : ""}`}
            src={logoYamae.src}
            alt="山へ"
          />
        </div>
      </div>
      <div className={styles.offset} />
      <div className={styles.spacer} />
    </>
  );
}
