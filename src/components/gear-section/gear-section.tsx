"use client";

import { useRef } from "react";
import { useRevealAll } from "@/hooks/use-reveal";
import styles from "./gear-section.module.css";

export function GearSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealAll(sectionRef);

  return (
    <section ref={sectionRef} className={styles.section} id="gear">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label} data-reveal="clip-down">
            <span className={styles["label-ja"]}>ギア</span>
            <span className={styles["label-en"]}>The Gear</span>
          </div>
          <div className={styles.intro} data-reveal="fade-up">
            <h2 className={styles.title}>山を行く人を支える、<br />装備の数々。</h2>
            <div className={styles.body}>
              <p>
                これまで以上に推進力を追求した、レースにも最適な「SYLAN2」をはじめ、叶えたいランに合わせて選べるシューズや、軽量で通気性の高いウエアなど。山での実地テストを繰り返しクリアし、機能性・快適性・安心感を兼ね備えた、過酷な環境にも対応できるマウンテンラン＆トレイルランニング ギアを揃えました。
              </p>
            </div>
          </div>
        </div>

        <a href="https://arcteryx.jp/pages/260326_sylan2" className={styles.panel} data-reveal="clip-left" target="_blank" rel="noopener noreferrer">
          <div className={styles["panel-images"]}>
            <div className={styles["panel-image"]}>
              <img src="/images/gear-hero-1.jpg" alt="" style={{ objectPosition: "11% center" }} />
            </div>
            <div className={styles["panel-image"]}>
              <img src="/images/gear-hero-2.jpg" alt="" style={{ objectPosition: "38% 60%" }} />
            </div>
          </div>
          <div className={styles["panel-overlay"]}>
            <p className={styles["panel-title"]}>Footwear + Apparel</p>
            <span className={styles["panel-link"]}>More</span>
          </div>
        </a>
      </div>
    </section>
  );
}
