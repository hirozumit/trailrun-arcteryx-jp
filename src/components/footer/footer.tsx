"use client";

import { useRef } from "react";
import { useRevealAll } from "@/hooks/use-reveal";
import styles from "./footer.module.css";

type FooterProps = {
  poster?: string;
};

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@arcteryxjapan" },
  { label: "Facebook", href: "https://www.facebook.com/ARCTERYXJP/" },
  { label: "X", href: "https://x.com/arcteryx_jp" },
  { label: "Instagram", href: "https://www.instagram.com/arcteryx_jp" },
  { label: "Line", href: "https://lin.ee/s9QngwV" },
];

const legalLinks = [
  { label: "Cookie Policy", href: "https://arcteryx.jp/pages/cookies" },
  { label: "Privacy Policy", href: "https://arcteryx.jp/policies/privacy-policy" },
  { label: "Terms of Service", href: "https://arcteryx.jp/policies/terms-of-service" },
  { label: "Legal Notice", href: "https://arcteryx.jp/policies/legal-notice" },
];

export function Footer({ poster }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  useRevealAll(footerRef, { threshold: 0, rootMargin: "0px" });

  return (
    <footer ref={footerRef} className={styles.footer}>
      {poster && (
        <img className={styles.poster} src={poster} alt="" />
      )}
      <div className={styles.inner} data-reveal="fade-up">
        <a
          href="https://arcteryx.jp"
          className={styles.brand}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/logo-arcteryx-type.svg" alt="ARC'TERYX" />
        </a>
        <nav className={styles.links}>
          <ul className={styles.social}>
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className={styles.legal}>
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <p className={styles.copyright}>&copy; 2026 ARC&apos;TERYX</p>
      </div>
    </footer>
  );
}
