"use client";

import { useEffect, useRef, useState } from "react";
import logoYamae from "../splash/logo-yamae.svg";
import styles from "./header.module.css";

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

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Skip intro animation if browser restored scroll position
    if (window.scrollY > 0) {
      setReady(true);
      return;
    }

    requestAnimationFrame(() => setReady(true));

    let cancelled = false;

    const cancel = () => {
      cancelled = true;
      window.removeEventListener("scroll", cancel);
    };

    window.addEventListener("scroll", cancel, { once: true, passive: true });

    const timer = setTimeout(() => {
      if (!cancelled) smoothScrollTo(window.innerHeight * 0.5, 1000);
      window.removeEventListener("scroll", cancel);
    }, 3000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", cancel);
    };
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let ticking = false;

    const update = () => {
      const t = Math.min(window.scrollY / window.innerHeight, 1);
      header.style.setProperty("--t", String(t));
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
      <header ref={headerRef} className={styles.header}>
        <img
          className={`${styles.logo} ${ready ? styles.visible : ""}`}
          src={logoYamae.src}
          alt="山へ"
        />
      </header>
      <div className={styles.spacer} />
    </>
  );
}
