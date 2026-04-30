"use client";

import { type ReactNode, useRef } from "react";
import { useRevealAll } from "@/hooks/use-reveal";
import { NoteToggle } from "@/components/note-toggle/note-toggle";
import noteStyles from "@/components/note-toggle/note-toggle.module.css";
import styles from "./chaya-section.module.css";

type ServiceProps = {
  id?: string;
  heading: string;
  body: string;
  reverse?: boolean;
  images?: string[];
  noteLabel?: string;
  children?: ReactNode;
};

function Service({ id, heading, body, reverse, images = [], noteLabel, children }: ServiceProps) {
  return (
    <div
      id={id}
      className={`${styles.service} ${reverse ? styles["service-reverse"] : ""}`}
    >
      <div className={styles["service-text"]} data-reveal="fade-up">
        <h3 className={styles["service-heading"]}>{heading}</h3>
        <p className={styles["service-body"]}>{body}</p>
        {noteLabel && (
          <NoteToggle label={noteLabel}>
            {children}
          </NoteToggle>
        )}
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
            <h2 className={styles.title}>ARC'TERYX<br /> TRAIL HUB TAKAO</h2>
            <p className={styles.body}>
              トレイルランニングが生まれる何世紀も以前から、日本では、山間の街道沿いに茶屋が点在し、旅行者のための休息所として機能してきました。アークテリクスは、トレイルランナーをサポートし、人々を山へと誘うための茶屋を、高尾山麓に期間限定でオープンしました。ランの前後の休憩やエネルギー補給の拠点として、山のコンディションやルートの情報交換、最新のギアの試し履きの場として。山へと向かう前に、山から降りた後に、どうぞお立ち寄りください。
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
          id="try-gear"
          heading="ギアを試す"
          body="アークテリクスの最新のトレイルラン フットウェアをレンタルし、高尾山のフィールドでお試しいただけます。"
          images={["/images/gear-1.jpg", "/images/gear-2.jpg"]}
          noteLabel="お貸し出しについて"
        >
          <ul className={noteStyles.list}>
            <li>
              BIRD CLUB 会員の方、または LINE で友だち登録をしていただいた方は、レンタル料無料となります。
            </li>
            <li>
              上記に該当しない方でも、通常料金（フットウェア＆ベスト 330円/1日）でお貸し出し可能です。
            </li>
          </ul>
          <ul className={noteStyles.caption}>
            <li>
              無料でのご利用は、お一人さま1回限りとさせていただきます。ご了承ください。
            </li>
            <li>
              ギアのお貸し出しは平日・土日祝日とも16:00 までとさせていただきます
            </li>
            <li>
              ご好評により、シューズ‧ウェアのサイズによっては ご希望に沿えない、ノベルティが一部ご用意できない場合がございます。ご了承ください。
            </li>            
          </ul>
        </Service>
        <Service
          id="yokan"
          heading="羊羹とお茶"
          body="出発前や下山後のひとときに、 TRAIL HUB TAKAO限定の羊羹セットやお団子セットをお楽しみいただけます（有料）。"
          images={["/images/yokan.jpg"]}
          noteLabel="カフェ内スペシャルメニュー"
          reverse
        >
          <ul className={noteStyles.list}>
            <li>羊羹セット（880円）</li>
            <li>お団子セット（880円）</li>
          </ul>
        </Service>
        <Service
          id="novelty"
          heading="ノベルティ"
          body="TRAIL HUB TAKAOにてアークテリクスのギアをレンタルされた方に、限定のノベルティを差し上げます。"
          images={["/images/novelty-1.jpg", "/images/novelty-2.jpg"]}
          noteLabel="ノベルティについて"
        >
          <p>
            ギアをレンタルされた方には「オリジナル
            羊羹」、さらに BIRD CLUB 会員の方、LINE 友だち登録をされた方で、フィールドでのお試し後、アンケート・商品レビューにご参加いただいた方には「オリジナル手ぬぐい・ステッカー」を差し上げます
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
                CAMP<br />京王線高尾山口駅より徒歩3分
              </p>
              <p>期間：2026年4月17日(金) 〜 6月28日(日)</p>
              <p>
                レンタル・カフェ営業時間：平日 8:00〜20:00　土・日・祝日 7:00〜20:00　(L.O. 19:00)
              </p>
              <ul className={styles["address-caption"]}>
                <li>期間中の土・日・祝日は、ARC’TERYX STAFFが 16:00 まで駐在。</li>
                <li>ギアのお貸し出しは 平日‧土日祝日とも16:00 までとさせていただきます。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
