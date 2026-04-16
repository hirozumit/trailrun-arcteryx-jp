"use client";

import { useEffect, useRef, useState } from "react";
import copyLine1 from "./copy-line1.svg";
import copyLine2 from "./copy-line2.svg";
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
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    const skip = process.env.NEXT_PUBLIC_SKIP_SPLASH === "1";
    const hash = window.location.hash;

    // Prevent browser from restoring scroll position on reload
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    if (skip || hash) {
      splashRef.current?.style.setProperty("--t", "1");
      setSkipped(true);
      setReady(true);

      if (hash) {
        // Wait one frame for layout, then scroll to anchor
        requestAnimationFrame(() => {
          const target = document.querySelector(hash);
          if (target) {
            target.scrollIntoView();
          } else {
            window.scrollTo(0, window.innerHeight * 0.5);
          }
        });
      } else {
        window.scrollTo(0, window.innerHeight * 0.5);
      }
      return;
    }

    // Lock scrolling during splash animation
    document.documentElement.style.overflow = "hidden";

    requestAnimationFrame(() => setReady(true));

    // Auto-scroll after logo is visible for 1s (logo appears at 4.5s)
    // and the first ScrollVideo signals readiness
    const LOGO_VISIBLE_AT = 5500; // 1s blank + 3s copy + 0.5s fade-in + 1s hold

    const waitForVideo = new Promise<void>((resolve) => {
      window.addEventListener("scrollvideo:ready", () => resolve(), { once: true });
      // Fallback: mobile browsers often ignore preload="auto" so loadeddata
      // may never fire without user interaction. Poster image provides visual
      // continuity, so keep the fallback short.
      setTimeout(resolve, 1000);
    });

    const waitForTimer = new Promise<void>((resolve) => {
      setTimeout(resolve, LOGO_VISIBLE_AT);
    });

    let active = true;
    Promise.all([waitForVideo, waitForTimer]).then(() => {
      if (!active) return;
      // Unlock scrolling, wait one frame for layout update, then auto-scroll
      document.documentElement.style.overflow = "";
      requestAnimationFrame(() => {
        if (!active) return;
        smoothScrollTo(window.innerHeight * 0.5, 1000);
      });
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
      const vh = window.innerHeight;
      const scrollY = window.scrollY;

      // Opening: 0→1 over first viewport
      const tOpen = Math.min(scrollY / vh, 1);

      // Closing: 1→0 over last viewport (footer area)
      const maxScroll = document.documentElement.scrollHeight - vh;
      const tClose = 1 - Math.max(0, Math.min((scrollY - (maxScroll - vh)) / vh, 1));

      const t = Math.min(tOpen, tClose);
      splash.style.setProperty("--t", String(t));

      // Raise above footer when logo is expanding back
      splash.style.zIndex = tClose < 1 ? "102" : "";

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
      <div ref={splashRef} className={styles.splash}>
        <div className={`${styles.copy} ${ready && !skipped ? styles.visible : ""}`}>
          <img src={copyLine1.src} alt="" className={styles.copyLine} />
          <img src={copyLine2.src} alt="" className={styles.copyLine} />
        </div>
        <img
          className={`${styles.logo} ${ready ? styles.visible : ""} ${skipped ? styles.skipped : ""}`}
          src={logoYamae.src}
          alt="山へ"
        />
      </div>
      <div className={styles.spacer} />
    </>
  );
}
