import logoYamae from "@/components/splash/logo-yamae.svg";
import styles from "./footer.module.css";

type FooterProps = {
  poster?: string;
};

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@arcteryxjp" },
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

export function Footer({ poster }: FooterProps) {
  return (
    <footer className={styles.footer}>
      {poster && (
        <img className={styles.poster} src={poster} alt="" />
      )}
      <img className={styles.logoYamae} src={logoYamae.src} alt="" aria-hidden="true" />
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
        <p className={styles.copyright}>&copy; 2026 ARC&apos;TERYX</p>
      </div>
    </footer>
  );
}
