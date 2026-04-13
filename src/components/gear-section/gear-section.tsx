"use client";

import { useRef, useState } from "react";
import { useRevealAll } from "@/hooks/use-reveal";
import styles from "./gear-section.module.css";

type GearItem = {
  name: string;
  price: string;
  storeUrl: string;
};

const footwear: GearItem[] = [
  {
    name: "Sylan 2 W/M",
    price: "W ¥37,400 / M ¥37,400 | NEW",
    storeUrl: "#",
  },
  {
    name: "Norvan LD 4 W/M",
    price: "W ¥28,600 / M ¥28,600",
    storeUrl: "#",
  },
];

const apparel: GearItem[] = [
  {
    name: "Norvan Jacket W/M",
    price: "W ¥75,900 / M ¥75,900 | GORE-TEX",
    storeUrl: "#",
  },
  {
    name: "Norvan Crew SS W",
    price: "W ¥15,400",
    storeUrl: "#",
  },
  {
    name: "Norvan Downword Logo SS M",
    price: "M ¥75,900 | GORE-TEX",
    storeUrl: "#",
  },
  {
    name: "Norvan 7 Vest W/M",
    price: "W ¥27,500 / M ¥27,500",
    storeUrl: "#",
  },
  {
    name: "Synthetic Low Cut Sock",
    price: "Unisex ¥3,630 | NEW",
    storeUrl: "#",
  },
  {
    name: "Synthetic UL Mid Sock",
    price: "Unisex ¥4,290 | NEW",
    storeUrl: "#",
  },
  {
    name: "Norvan Mesh 5 Panel Cap",
    price: "Unisex ¥11,000 | NEW",
    storeUrl: "#",
  },
];

function GearPanel({ item }: { item: GearItem }) {
  return (
    <div className={styles.panel}>
      <div className={styles["panel-image"]} />
      <div className={styles["panel-info"]}>
        <p className={styles["panel-name"]}>{item.name}</p>
        <p className={styles["panel-price"]}>{item.price}</p>
        <a href={item.storeUrl} className={styles["panel-store"]}>
          STORE
        </a>
      </div>
    </div>
  );
}

function GearCategory({
  title,
  items,
  columns,
  visibleRows = 1,
}: {
  title: string;
  items: GearItem[];
  columns: number;
  visibleRows?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = columns * visibleRows;
  const hasMore = items.length > visibleCount;

  const visibleItems = expanded ? items : items.slice(0, visibleCount);
  const allItems = items;

  return (
    <div className={styles.category}>
      <h3 className={styles["category-title"]} data-reveal="fade-up">{title}</h3>
      {/* Desktop: sliced grid */}
      <div
        className={`${styles["category-grid"]} ${styles["desktop-only"]}`}
        style={{ "--columns": columns } as React.CSSProperties}
        data-reveal="clip-left"
      >
        {visibleItems.map((item) => (
          <GearPanel key={item.name} item={item} />
        ))}
      </div>
      {/* Mobile: full carousel */}
      <div
        className={`${styles["category-grid"]} ${styles["mobile-only"]}`}
        data-reveal="clip-left"
      >
        {allItems.map((item) => (
          <GearPanel key={item.name} item={item} />
        ))}
      </div>
      {hasMore && !expanded && (
        <button
          className={styles["more-button"]}
          onClick={() => setExpanded(true)}
        >
          + More
        </button>
      )}
    </div>
  );
}

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
            <h2 className={styles.title}>
              あのイーハトーヴォのすきとおった風、
              <br />
              夏でも底に冷たさをもつ青いそら。
            </h2>
            <p className={styles.body}>
              あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら。あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら。あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら。あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら。あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら。あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら。
            </p>
          </div>
        </div>
        <GearCategory title="Footwear" items={footwear} columns={2} />
        <GearCategory
          title="Apparel"
          items={apparel}
          columns={3}
          visibleRows={1}
        />
      </div>
    </section>
  );
}
