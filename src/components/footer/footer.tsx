import styles from "./footer.module.css";

const socialLinks = [
  { label: "Youtube", href: "https://www.youtube.com/@arcteryxjp" },
  { label: "Facebook", href: "https://www.facebook.com/arcteryx" },
  { label: "X", href: "https://x.com/arcteryx_jp" },
  { label: "Instagram", href: "https://www.instagram.com/arcteryx_jp/" },
  { label: "Line", href: "#" },
];

const legalLinks = [
  { label: "Cookie Policy", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Legal Notice", href: "#" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <a
          href="https://arcteryx.jp"
          className={styles.brand}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/logo-arcteryx-type.svg" alt="ARC'TERYX" />
        </a>
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
        <p className={styles.copyright}>&copy; 2026 Arc&apos;teryx</p>
      </div>
    </footer>
  );
}
