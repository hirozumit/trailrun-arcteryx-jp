import styles from "./header.module.css";

const NAV_ITEMS = [
  { label: "茶屋", href: "#chaya" },
  { label: "ギア", href: "#gear" },
  { label: "イベント", href: "#events" },
] as const;

export function Header() {
  return (
    <>
      <div className={styles.header}>
        <nav className={styles.nav} aria-label="セクションナビゲーション">
          {NAV_ITEMS.map(({ label, href }) => (
            <a key={href} href={href} className={styles.navItem}>
              {label}
            </a>
          ))}
        </nav>
        <h1 className={styles.title}>TRAIL RUNNING</h1>
      </div>
      <div className={styles.offset} />
    </>
  );
}
