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
    >
      <div className={styles["service-text"]} data-reveal="fade-up">
        <h3 className={styles["service-heading"]}>{heading}</h3>
        <p className={styles["service-body"]}>{body}</p>
        {children && <div className={styles["service-note"]}>{children}</div>}
      </div>
      <div
        className={`${styles["service-images"]} ${images.length === 1 ? styles["service-images-single"] : ""}`}
        data-reveal="clip-left"
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
              トレイルランニングが生まれる遥か昔から、日本では、山間の街道沿いに茶屋が点在し、旅行者のための休息地として機能してきました。アークテリクスは、トレイルランナーをサポートし、人々を山へと誘うための茶屋を、高尾山に期間限定でオープンします。ラン前後の燃料やカレル―補給の拠点として、山のコンディションやルートの案内拠点として、ランナー同士の情報交換や最新のギアの試着の場として、どうぞお気軽にお立ち寄りください。
            </p>
            <p className={styles.caption}>
              期間：2026年4月17日(金) 〜 6月28日(日)
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
          <p className={styles["note-heading"]}>お貸し出しについて</p>
          <ul className={styles["note-list"]}>
            <li>
              BIRD
              CLUB会員の方もしくはLINEで友だち登録された方はレンタル料無料となります。
            </li>
            <li>
              上記に該当しない方でも通常料金 (フットウェア &amp; ベスト 330円/1日) でお貸し出し可能です。
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
          <p>
            ギアをレンタルされた方には「オリジナル
            羊羹」、BIRD CLUB 会員の方、LINE 友だち登録をされた方で、フィールドでのお試し後、アンケート・商品レビューにご参加いただいた方には「オリジナル手ぬぐい・ステッカー」を差し上げます
          </p>
        </Service>

        {/* Map + Address */}
        <div className={styles["map-block"]} data-reveal="fade-up">
          <div className={styles.map}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.7122737469517!2d139.26784277695484!3d35.63481907260237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60191959193b2129%3A0xfb4f2d7e71c9e7df!2zTXQuVGFrYW8gQmFzZSBDYW1wLCDvvJHvvJfvvJnvvJniiJLvvJMg6auY5bC-55S6IOWFq-eOi-WtkOW4giDmnbHkuqzpg70gMTkzLTA4NDQ!5e0!3m2!1sja!2sjp!4v1776213846478!5m2!1sja!2sjp" width={600} height={450} style={{ border: "0" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className={styles.address}>
            <p className={styles["address-title"]} data-reveal="fade-up">
              ARC'TERYX TRAIL HUB TAKAO
            </p>
            <div className={styles["address-detail"]} data-reveal="fade-up">
              <p>
                東京都八王子市高尾町1799-3　Mt.TAKAO BASE
                CAMP　京王線高尾山口駅より徒歩3分
              </p>
              <p>期間：2026年4月17日(金) 〜 6月30日(火)</p>
              <p>
                レンタル・カフェ営業時間：平日 8:00〜20:00　土日祝日 7:00〜20:00
              </p>
            </div>
            <div className={styles["address-caption"]} data-reveal="fade-up">
              <p>
                ※期間中土日祝日はARC&apos;TERYX STAFF がおります。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
