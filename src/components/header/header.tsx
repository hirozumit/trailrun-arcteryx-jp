"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReveal } from "@/hooks/use-reveal";
import styles from "./header.module.css";

const SECTION_NAV_ITEMS = [
  { label: "茶屋", href: "#chaya" },
  { label: "ギア", href: "#gear" },
  { label: "イベント", href: "#events" },
] as const;

const SECTION_IDS = SECTION_NAV_ITEMS.map((item) => item.href.slice(1));

type TitleItem = {
  label: string;
  href: string;
  current?: boolean;
};

type HeaderProps = {
  /** Hide the left section nav (茶屋/ギア/イベント). Default: false */
  hideSectionNav?: boolean;
  /** Title bar items. Default: single "TRAIL RUNNING" label */
  titleItems?: TitleItem[];
};

export function Header({ hideSectionNav, titleItems }: HeaderProps = {}) {
  const navRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useReveal(titleRef, { threshold: 0, rootMargin: "0px" });

  // Current section indicator
  useEffect(() => {
    if (hideSectionNav) return;
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
  }, [hideSectionNav]);

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
      {!hideSectionNav && (
        <nav ref={navRef} className={styles.nav} aria-label="セクションナビゲーション">
          {SECTION_NAV_ITEMS.map(({ label, href }) => (
            <a key={href} href={href} className={styles.navItem} onClick={handleClick}>
              {label}
            </a>
          ))}
        </nav>
      )}
      <div ref={titleRef} className={styles.title} data-reveal="fade">
        {titleItems ? (
          titleItems.map(({ label, href, current }) => (
            <a
              key={href}
              href={href}
              className={`${styles.titleItem} ${current ? styles.titleCurrent : ""}`}
            >
              {label}
            </a>
          ))
        ) : (
          <span className={styles.titleItem}>TRAIL RUNNING</span>
        )}
      </div>
    </>
  );
}
