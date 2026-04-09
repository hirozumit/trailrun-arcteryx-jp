import styles from "./yoyogi-section.module.css";

export function YoyogiSection() {
  return (
    <section className={styles.section} id="yoyogi">
      <div className={styles.inner}>
        <div className={styles.poster} />
        <div className={styles.body}>
          <div className={styles.header}>
            <p className={styles.subtitle}>
              ARC&apos;TERYX TRAIL HUB YOYOGI
            </p>
            <h2 className={styles.title}>トレイルに備える</h2>
          </div>
          <p className={styles.text}>
            本格的なトレランの準備の拠点として、代々木公園のクロカンコースで、ギアを試したり、トレランに必要な知識を得たりすることができる拠点が期間限定オープンします。
          </p>
          <p className={styles.caption}>
            オープン期間：2026年5月2日〜31日
          </p>
          {/* <a href="/trail/yoyogi" className={styles.button}>
            詳細をみる
          </a> */}
        </div>
      </div>
    </section>
  );
}
