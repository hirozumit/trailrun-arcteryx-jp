import styles from "./chaya-section.module.css";

type ServiceProps = {
  heading: string;
  body: string;
  reverse?: boolean;
};

function Service({ heading, body, reverse }: ServiceProps) {
  return (
    <div
      className={`${styles.service} ${reverse ? styles["service-reverse"] : ""}`}
    >
      <div className={styles["service-text"]}>
        <h3 className={styles["service-heading"]}>{heading}</h3>
        <p className={styles["service-body"]}>{body}</p>
      </div>
      <div className={styles["service-images"]}>
        <div className={styles["service-image"]} />
        <div className={styles["service-image"]} />
      </div>
    </div>
  );
}

export function ChayaSection() {
  return (
    <section className={styles.section} id="chaya">
      <div className={styles.inner}>
        {/* Header: section label + intro */}
        <div className={styles.header}>
          <div className={styles.label}>
            <span className={styles["label-ja"]}>茶屋</span>
            <span className={styles["label-en"]}>The Chaya</span>
          </div>
          <div className={styles.intro}>
            <h2 className={styles.title}>ARC&apos;TERYX TRAIL HUB TAKAO</h2>
            <p className={styles.body}>
              ARC&apos;TERYX TRAIL HUB TAKAO
              は、、、、あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら。あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら。あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら。あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら。あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら。あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら。
            </p>
            <p className={styles.caption}>
              オープン期間：2026年4月17日〜6月末
            </p>
          </div>
        </div>

        {/* Hero image */}
        <div className={styles["hero-image"]} />

        {/* Services */}
        <Service
          heading="ギアを試す"
          body="アークテリクスの最新のトレイルランニングギアをレンタルし（500円）、高尾山のフィールドでお試しいただけます。"
        />
        <Service
          heading="ようかんとお茶"
          body="TRAIL HUBのために特別に用意した、羊羹セットをお楽しみいただけます。（有料：1000円予定）"
          reverse
        />
        <Service
          heading="ノベルティ"
          body="アークテリクスのギアをレンタルし、LINE登録をすると、茶屋限定のノベルティがもらえます。"
        />

        {/* Map + Address */}
        <div className={styles["map-block"]}>
          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3244.5!2d139.2707!3d35.6321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDM3JzU1LjYiTiAxMznCsDE2JzE0LjUiRQ!5e0!3m2!1sja!2sjp!4v1"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ARC'TERYX TRAIL HUB TAKAO"
            />
          </div>
          <div className={styles.address}>
            <p className={styles["address-title"]}>
              ARC&apos;TERYX TRAIL HUB TAKAO
            </p>
            <div className={styles["address-detail"]}>
              <p>193-0844　東京都八王子市高尾町0000-00</p>
              <p>営業時間：期間（2026年4月17日〜6月末）内の土日祝 10:00-</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
