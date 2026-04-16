"use client";

import { useRef } from "react";
import { useRevealAll } from "@/hooks/use-reveal";
import styles from "./yoyogi-section.module.css";

export function YoyogiSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealAll(sectionRef);

  return (
    <section ref={sectionRef} className={styles.section} id="yoyogi">
      <div className={styles.inner}>
        <div className={styles.poster} data-reveal="fade-up">
          <img src="/images/yoyogi-poster.jpg" alt="" />
        </div>
        <div className={styles.body} data-reveal="clip-left">
          <div className={styles.header}>
            <h2 className={styles.title}>
              ARC'TERYX<br />TRAIL HUB YOYOGI
              <small>2026/5/1 Fri.-5/31 Sun.</small>
            </h2>
          </div>
          <p className={styles.text}>
            山への第一歩を踏み出す前の方や、今まさに踏み出しつつある方へ。アークテリクスによるトレイルランニングのための準備拠点が、代々木公園に期間限定でオープンします。本格的なトレイルランに臨む前に、山で必要となるギアや持ち物、走り方の知識などをチェックしていただけるほか、代々木公園内でトレイルランの練習におすすめのコースもご紹介。アークテリクスの最新のマウンテンラン&トレイルランニングシューズをレンタルしてお試しいただけます（有料）。
          </p>
          <p className={styles.caption}>
            オープン期間：2026年5月2日(土)〜31日(日)
          </p>
          {/* <a href="/trail/yoyogi" className={styles.button}>
            詳細をみる
          </a> */}
        </div>
      </div>
    </section>
  );
}
