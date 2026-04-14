"use client";

import { type ReactNode, useRef } from "react";
import { useRevealAll } from "@/hooks/use-reveal";
import styles from "./chaya-section.module.css";

type ServiceProps = {
  heading: string;
  body: string;
  reverse?: boolean;
  images?: string[];
  children?: ReactNode;
};

function Service({ heading, body, reverse, images = [], children }: ServiceProps) {
  return (
    <div
      className={`${styles.service} ${reverse ? styles["service-reverse"] : ""}`}
      data-reveal="clip-left"
    >
      <div className={styles["service-text"]}>
        <h3 className={styles["service-heading"]}>{heading}</h3>
        <p className={styles["service-body"]}>{body}</p>
        {children && <div className={styles["service-note"]}>{children}</div>}
      </div>
      <div
        className={`${styles["service-images"]} ${images.length === 1 ? styles["service-images-single"] : ""}`}
      >
        {images.map((src) => (
          <div key={src} className={styles["service-image"]}>
            <img src={src} alt="" />
          </div>
        ))}
        {images.length === 0 && (
          <>
            <div className={styles["service-image"]} />
            <div className={styles["service-image"]} />
          </>
        )}
      </div>
    </div>
  );
}

export function ChayaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealAll(sectionRef);

  return (
    <section ref={sectionRef} className={styles.section} id="chaya">
      <div className={styles.inner}>
        {/* Header: section label + intro */}
        <div className={styles.header}>
          <div className={styles.label} data-reveal="clip-down">
            <span className={styles["label-ja"]}>茶屋</span>
            <span className={styles["label-en"]}>The Chaya</span>
          </div>
          <div className={styles.intro} data-reveal="fade-up">
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
        <div className={styles["hero-image"]} data-reveal="fade-up">
          <img src="/images/chaya-hero.jpg" alt="ARC'TERYX TRAIL HUB TAKAO 外観" />
        </div>

        {/* Services */}
        <Service
          heading="ギアを試す"
          body="アークテリクスの最新のトレイルラン フットウェアをレンタルし、高尾山のフィールドでお試しいただけます。ウェアも実物をご覧いただけます。"
          images={["/images/gear-1.jpg", "/images/gear-2.jpg"]}
        >
          <p className={styles["note-heading"]}>
            フットウェア・ランニングベストのお貸し出しについて
          </p>
          <ul className={styles["note-list"]}>
            <li>
              BIRD
              CLUB会員の方 もしくは LINEで友だち登録された方はレンタル料無料となります。
            </li>
            <li>
              上記に該当しない方でも通常料金（フットウェア＆ベスト 330円/1日）でお貸し出し可能です。
            </li>
          </ul>
          <p className={styles["note-caption"]}>
            ※無料でご利用の方はお一人さま1回とさせていただきます。ご了承ください。
          </p>
        </Service>
        <Service
          heading="ようかんとお茶"
          body="山への出発前や下山後のひとときに、高尾茶屋限定の羊羹セットをお楽しみいただけます（有料）。アンケートに答えていただいた方には、ドリンクをサービスいたします。"
          images={["/images/yokan.jpg"]}
          reverse
        >
          <p className={styles["note-heading"]}>カフェ内スペシャルメニュー</p>
          <ul className={styles["note-list"]}>
            <li>羊羹セット（880円）</li>
            <li>お団子セット（880円）</li>
          </ul>
        </Service>
        <Service
          heading="ノベルティ"
          body="高尾茶屋にてアークテリクスのギアをレンタルの上、いただいた方に、限定のノベルティを差し上げます。"
          images={["/images/novelty-1.jpg", "/images/novelty-2.jpg"]}
        >
          <p className={styles["note-heading"]}>ギアをレンタルされた方</p>
          <p className={styles["note-body"]}>オリジナル 羊羹</p>
          <p className={styles["note-heading"]}>
            BIRD CLUB会員の方、LINE友だち登録をされた方で、フィールドでのお試し後、アンケート・商品レビューにご参加いただいた方
          </p>
          <p className={styles["note-body"]}>オリジナル 手ぬぐい・ステッカー</p>
        </Service>

        {/* Map + Address */}
        <div className={styles["map-block"]} data-reveal="fade-up">
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
              <p>
                東京都八王子市高尾町1799-3　Mt.TAKAO BASE
                CAMP　京王線高尾山口駅より徒歩3分
              </p>
              <p>期間：2026年4月17日（金）〜6月30日（火）</p>
              <p>
                レンタル・カフェ営業時間：平日 8:00〜20:00　土日祝日 7:00〜20:00
              </p>
              <p className={styles["address-caption"]}>
                ※期間中土日祝日はARC&apos;TERYX STAFF がおります。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
