"use client";

import { useCallback, useEffect, useRef } from "react";
import styles from "./header.module.css";

const NAV_ITEMS = [
  { label: "茶屋", href: "#chaya" },
  { label: "ギア", href: "#gear" },
  { label: "イベント", href: "#events" },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));

export function Header() {
  const navRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Title fade-in on viewport entry
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Current section indicator
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const links = nav.querySelectorAll<HTMLAnchorElement>(`.${styles.navItem}`);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = sections.indexOf(entry.target as HTMLElement);
          if (idx >= 0 && links[idx]) {
            links[idx].classList.toggle(styles.current, entry.isIntersecting);
          }
        }
      },
      { threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Smooth scroll for anchor links
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <nav ref={navRef} className={styles.nav} aria-label="セクションナビゲーション">
        {NAV_ITEMS.map(({ label, href }) => (
          <a key={href} href={href} className={styles.navItem} onClick={handleClick}>
            {label}
          </a>
        ))}
      </nav>
      <div className={styles.navOffset} />
      <h1 ref={titleRef} className={styles.title}>TRAIL RUNNING</h1>
    </>
  );
}
