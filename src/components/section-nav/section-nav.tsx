"use client";

import { useCallback } from "react";
import styles from "./section-nav.module.css";

const ITEMS = [
  { label: "茶屋", href: "#chaya" },
  { label: "ギア", href: "#gear" },
  { label: "イベント", href: "#events" },
] as const;

export function SectionNav() {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav className={styles.nav} aria-label="セクションナビゲーション">
      {ITEMS.map(({ label, href }) => (
        <a key={href} href={href} className={styles.item} onClick={handleClick}>
          <span>{label}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
      ))}
    </nav>
  );
}
