"use client";

import { useCallback, useEffect, useRef } from "react";
import styles from "./section-nav.module.css";

const ITEMS = [
  { label: "茶屋", href: "#chaya" },
  { label: "ギア", href: "#gear" },
  { label: "イベント", href: "#events" },
] as const;

const SECTION_IDS = ITEMS.map((item) => item.href.slice(1));

export function SectionNav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const links = nav.querySelectorAll<HTMLAnchorElement>(`.${styles.item}`);

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

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav ref={navRef} className={styles.nav} aria-label="セクションナビゲーション">
      {ITEMS.map(({ label, href }) => (
        <a key={href} href={href} className={styles.item} onClick={handleClick}>
          {label}
        </a>
      ))}
    </nav>
  );
}
