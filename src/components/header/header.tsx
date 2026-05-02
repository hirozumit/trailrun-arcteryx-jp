"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/use-reveal";
import styles from "./header.module.css";

type NavItem = {
  label: string;
  href: string;
  current?: boolean;
};

type HeaderProps = {
  navItems?: NavItem[];
};

export function Header({ navItems }: HeaderProps = {}) {
  const titleRef = useRef<HTMLDivElement>(null);

  useReveal(titleRef, { threshold: 0, rootMargin: "0px" });

  return (
    <div ref={titleRef} className={styles.title} data-reveal="fade">
      <span className={styles.titleLabel}>TRAIL HUB</span>
      {navItems?.map(({ label, href, current }) =>
        current ? (
          <span key={href} className={`${styles.titleItem} ${styles.titleCurrent}`}>
            {label}
          </span>
        ) : (
          <a key={href} href={href} className={styles.titleItem}>
            {label}
          </a>
        )
      )}
    </div>
  );
}
