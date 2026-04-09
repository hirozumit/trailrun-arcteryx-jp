"use client";

import { useState } from "react";
import styles from "./event-section.module.css";

type EventItem = {
  name: string;
  location: string;
  date: string;
};

const communityEvents: EventItem[] = [
  { name: "TRAIL CLINIC", location: "高尾", date: "2026-04-26 SUN" },
  { name: "TRAIL CLINIC", location: "六甲山", date: "2026-05-16 SAT" },
  { name: "TRAIL CLINIC", location: "高尾", date: "2026-05-23 FRI" },
  { name: "TRAIL CLINIC", location: "高尾", date: "2026-05-16 SAT" },
  { name: "TRAIL CLINIC", location: "高尾", date: "2026-05-16 SAT" },
];

const storeEvents: EventItem[] = [
  { name: "CITY TRAIL MEET UP", location: "神戸", date: "2026-05-03 SUN" },
  { name: "CITY TRAIL MEET UP", location: "神戸", date: "2026-05-05 TUE" },
  { name: "CITY TRAIL MEET UP", location: "心斎橋", date: "2026-05-09 SAT" },
  { name: "CITY TRAIL MEET UP", location: "神戸", date: "2026-05-03 SUN" },
  { name: "CITY TRAIL MEET UP", location: "心斎橋", date: "2026-05-09 SAT" },
];

function EventPanel({ item }: { item: EventItem }) {
  return (
    <div className={styles.panel}>
      <div className={styles["panel-image"]} />
      <div className={styles["panel-info"]}>
        <div className={styles["panel-meta"]}>
          <span className={styles["panel-tag"]}>{item.location}</span>
          <p className={styles["panel-name"]}>{item.name}</p>
        </div>
        <p className={styles["panel-date"]}>{item.date}</p>
      </div>
    </div>
  );
}

function EventCategory({
  title,
  items,
  visibleCount = 3,
}: {
  title: string;
  items: EventItem[];
  visibleCount?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > visibleCount;
  const visibleItems = expanded ? items : items.slice(0, visibleCount);

  return (
    <div className={styles.category}>
      <h3 className={styles["category-title"]}>{title}</h3>
      {/* Desktop: sliced grid */}
      <div className={`${styles["category-grid"]} ${styles["desktop-only"]}`}>
        {visibleItems.map((item, i) => (
          <EventPanel key={`${item.name}-${item.date}-${i}`} item={item} />
        ))}
      </div>
      {/* Mobile: full carousel */}
      <div className={`${styles["category-grid"]} ${styles["mobile-only"]}`}>
        {items.map((item, i) => (
          <EventPanel key={`${item.name}-${item.date}-${i}`} item={item} />
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

export function EventSection() {
  return (
    <section className={styles.section} id="events">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>
            <span className={styles["label-ja"]}>イベント</span>
            <span className={styles["label-en"]}>The Community Events</span>
          </div>
          <div className={styles.intro}>
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
        <EventCategory title="Community Event" items={communityEvents} />
        <EventCategory title="Store Event" items={storeEvents} />
      </div>
    </section>
  );
}
