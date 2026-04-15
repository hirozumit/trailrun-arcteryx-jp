"use client";

import { useRef, useState } from "react";
import { useRevealAll } from "@/hooks/use-reveal";
import styles from "./event-section.module.css";

type EventItem = {
  name: string;
  date: string;
};

const communityEvents: EventItem[] = [
  { name: "TRAIL CLINIC TAKAO", date: "2026-04-26 SUN" },
  { name: "TRAIL CLINIC ROKKO", date: "2026-05-16 SAT" },
  { name: "TRAIL CLINIC TAKAO", date: "2026-05-23 FRI" },
  { name: "TRAIL CLINIC TAKAO", date: "2026-05-16 SAT" },
  { name: "TRAIL CLINIC TAKAO", date: "2026-05-16 SAT" },
];

const storeEvents: EventItem[] = [
  { name: "CITY TRAIL MEET UP KOBE", date: "2026-05-03 SUN" },
  { name: "CITY TRAIL MEET UP KOBE", date: "2026-05-05 TUE" },
  { name: "CITY TRAIL MEET UP SHINSAIBASHI", date: "2026-05-09 SAT" },
  { name: "CITY TRAIL MEET UP KOBE", date: "2026-05-03 SUN" },
  { name: "CITY TRAIL MEET UP SHINSAIBASHI", date: "2026-05-09 SAT" },
];

function EventPanel({ item }: { item: EventItem }) {
  return (
    <div className={styles.panel} data-reveal="clip-left">
      <div className={styles["panel-image"]} />
      <div className={styles["panel-info"]}>
        <p className={styles["panel-name"]}>{item.name}</p>
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
      <h3 className={styles["category-title"]} data-reveal="fade-up">{title}</h3>
      {/* Desktop: sliced grid */}
      <div
        className={`${styles["category-grid"]} ${styles["desktop-only"]}`}
      >
        {visibleItems.map((item, i) => (
          <EventPanel key={`${item.name}-${item.date}-${i}`} item={item} />
        ))}
      </div>
      {/* Mobile: full carousel */}
      <div
        className={`${styles["category-grid"]} ${styles["mobile-only"]}`}
      >
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
  const sectionRef = useRef<HTMLElement>(null);
  useRevealAll(sectionRef);

  return (
    <section ref={sectionRef} className={styles.section} id="events">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label} data-reveal="clip-down">
            <span className={styles["label-ja"]}>イベント</span>
            <span className={styles["label-en"]}>The Community Events</span>
          </div>
          <div className={styles.intro} data-reveal="fade-up">
            <h2 className={styles.title}>
              XXXXX XXXXX XXXXX XXXXX 
              <br />
              XXXXX XXXXX XXXXX 
            </h2>
            <p className={styles.body}>
              高尾の茶屋などのTRAIL HUBを拠点としたコミュニティイベントや、最新ギアをお試しできるストアイベントが開催されます。高尾では、バリエーション豊かなルートを持つ高尾山を一緒に走るイベントを開催します。最新のトレランギアを試すことができるイベントが同時期に全国各地で行われます。
            </p>
          </div>
        </div>
        <EventCategory title="Community Event" items={communityEvents} />
        <EventCategory title="Store Event" items={storeEvents} />
      </div>
    </section>
  );
}
