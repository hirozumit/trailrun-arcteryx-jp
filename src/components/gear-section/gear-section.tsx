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
            <h2 className={styles.title}>どこまでも動き続けるために。</h2>
            <div className={styles.body}>
              <p>
                山で繰り返し実地テストをクリアしたギアがかなえる自然との一体感。
                テクニカルな路面もスピーディに走れる、軽量高機能なマストアイテム。
              </p>
              <p>
                機能性、快適性、そして安心感。過酷な環境でも対応してくれる、トレイルランニング
                ギア。
              </p>
            </div>
          </div>
        </div>

        <div className={styles.panel} data-reveal="clip-left">
          <div className={styles["panel-images"]}>
            <div className={styles["panel-image"]}>
              <img src="/images/gear-hero-1.jpg" alt="" />
            </div>
            <div className={styles["panel-image"]}>
              <img src="/images/gear-hero-2.jpg" alt="" />
            </div>
          </div>
          <div className={styles["panel-overlay"]}>
            <p className={styles["panel-title"]}>Footwear + Apparel</p>
            <a
              href="https://arcteryx.jp/pages/260326_sylan2"
              className={styles["panel-link"]}
              target="_blank"
              rel="noopener noreferrer"
            >
              More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
