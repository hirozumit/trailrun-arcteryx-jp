"use client";

import { useRef } from "react";
import { useRevealAll } from "@/hooks/use-reveal";
import { ImagePanel } from "@/components/image-panel/image-panel";
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
                これまで以上に推進力を追求した、レースにも最適な「SYLAN2」をはじめ、叶えたいランに合わせて選べるシューズや、ベストなど。山での実地テストを繰り返しクリアし、機能性・快適性・安心感を兼ね備えた、過酷な環境にも対応できるトレイルランニング ギアを揃えました。
              </p>
            </div>
          </div>
        </div>

        <div data-reveal="clip-left">
          <ImagePanel
            images={[
              { src: "/images/gear-hero-1.jpg", objectPosition: "11% center" },
              { src: "/images/gear-hero-2.jpg", objectPosition: "38% 60%" },
            ]}
            title="Footwear + Apparel"
            href="https://arcteryx.jp/collections/trail-run"
            ga4Event={{
              event: "click",
              link_type: "ecom",
              link_name: "trail_gear",
              link_category: "product",
            }}
          />
        </div>
      </div>
    </section>
  );
}
