"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/use-reveal";
import styles from "./header.module.css";

type TitleItem = {
  label: string;
  href: string;
  current?: boolean;
};

type HeaderProps = {
  /** Title bar items. Default: single "TRAIL RUNNING" label */
  titleItems?: TitleItem[];
};

export function Header({ titleItems }: HeaderProps = {}) {
  const titleRef = useRef<HTMLDivElement>(null);

  useReveal(titleRef, { threshold: 0, rootMargin: "0px" });

  return (
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
  );
}
