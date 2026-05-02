"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRevealAll } from "@/hooks/use-reveal";
import styles from "./event-section.module.css";

export type EventItem = {
  name: string;
  date: string;
  image: string;
  url: string;
  ended?: boolean;
};

export const communityEvents: EventItem[] = [
  {
    name: "TRAIL CLINIC 代々木",
    date: "2026年5月24日(日)",
    image: "/images/events/trail-clinic-yoyogi.jpg",
    url: "#",
  },
  {
    name: "TRAIL CLINIC 高尾山",
    date: "2026年5月23日(土)",
    image: "/images/events/trail-clinic-takao.jpg",
    url: "https://arcteryx.jp/pages/trail_clinic_20260523",
  },
  {
    name: "TRAIL CLINIC 代々木",
    date: "2026年5月19日(月)",
    image: "/images/events/trail-clinic-yoyogi.jpg",
    url: "#",
  },
  {
    name: "TRAIL CLINIC 六甲山",
    date: "2026年5月16日(土)",
    image: "/images/events/trail-clinic-rokko.jpg",
    url: "https://arcteryx.jp/pages/trail_clinic_20260516",
  },
  {
    name: "TRAIL CLINIC 代々木",
    date: "2026年5月8日(金)",
    image: "/images/events/trail-clinic-yoyogi.jpg",
    url: "#",
  },
  {
    name: "TRAIL CLINIC 高尾山",
    date: "2026年4月26日(日)",
    image: "/images/events/trail-clinic-takao.jpg",
    url: "https://arcteryx.jp/pages/trail_clinic_20260426",
    ended: true,
  },
];

export const storeEvents: EventItem[] = [
  {
    name: "CITY TRAIL MEET UP 神戸",
    date: "2026年5月3日(日)",
    image: "/images/events/city-trail-meetup-kobe.jpg",
    url: "https://reserva.be/arcteryx_event/reserve?mode=service_staff&search_evt_no=f8eJwzMTO2NDIHAAReAUA&ctg_no=0eeJwzMjY0MQQAAvcA_A&sctg_no=25eJwzNTE2BQACDwDS",
  },
  {
    name: "CITY TRAIL MEET UP 神戸",
    date: "2026年5月5日(火)",
    image: "/images/events/city-trail-meetup-kobe.jpg",
    url: "https://reserva.be/arcteryx_event/reserve?mode=service_staff&search_evt_no=f8eJwzMTO2NDIHAAReAUA&ctg_no=0eeJwzMjY0MQQAAvcA_A&sctg_no=25eJwzNTE2BQACDwDS",
  },
  {
    name: "CITY TRAIL MEET UP 心斎橋",
    date: "2026年5月9日(土)",
    image: "/images/events/city-trail-meetup-shinsaibashi.jpg",
    url: "https://reserva.be/arcteryx_event/reserve?mode=service_staff&search_evt_no=27eJwzNTK2tDQFAARcAUI&ctg_no=0eeJwzMjY0MQQAAvcA_A&sctg_no=16eJwzNTE2AwACEADT",
  },
];

type GA4Event = {
  event: string;
  link_type: string;
  link_name: string;
  link_category: string;
};

function EventPanel({ item, ga4Event }: { item: EventItem; ga4Event?: GA4Event }) {
  const handleClick = ga4Event
    ? () => {
        const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
        w.dataLayer?.push({ ...ga4Event });
      }
    : undefined;

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.panel} onClick={handleClick}>
      <div className={styles["panel-image"]}>
        <Image src={item.image} alt={item.name} width={640} height={480} />
      </div>
      <div className={styles["panel-info"]}>
        <p className={styles["panel-name"]}>{item.name}</p>
        <div className={styles["panel-meta"]}>
          <p className={styles["panel-date"]}>{item.date}</p>
          {item.ended && <span className={styles["panel-ended"]}>開催終了</span>}
        </div>
      </div>
    </a>
  );
}

export function EventCategory({
  title,
  items,
  visibleCount = 3,
  ga4Event,
}: {
  title: string;
  items: EventItem[];
  visibleCount?: number;
  ga4Event?: GA4Event;
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
        data-reveal="clip-left"
      >
        {visibleItems.map((item, i) => (
          <EventPanel key={`${item.name}-${item.date}-${i}`} item={item} ga4Event={ga4Event} />
        ))}
      </div>
      {/* Mobile: full carousel */}
      <div
        className={`${styles["category-grid"]} ${styles["mobile-only"]}`}
        data-reveal="clip-left"
      >
        {items.map((item, i) => (
          <EventPanel key={`${item.name}-${item.date}-${i}`} item={item} ga4Event={ga4Event} />
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
              山へと走り、<br />山へと備える。ともに。
            </h2>
            <p className={styles.body}>
              期間中、TRAIL HUB TAKAO などを拠点としたコミュニティイベントや、ストアイベントを開催します。高尾では、草戸山を周遊する約11kmのコースを一緒に走る、TRAIL CLINIC を開催。最新ギアもお試しいただくことができます。後日オープンする ARC’TERYX TRAIL HUB YOYOGI では、トレイルランニング初心者に向けて、山への備えを学ぶことができる TRAIL CLINIC を開催予定です。一部ストアでは、ランニング初心者でもご参加いただける CITY TRAIL MEET UP を開催予定です。
            </p>
          </div>
        </div>
        <EventCategory
          title="Community Events"
          items={communityEvents}
          ga4Event={{
            event: "click",
            link_type: "events",
            link_name: "community_trail",
            link_category: "event",
          }}
        />
        <EventCategory
          title="Store Events"
          items={storeEvents}
          ga4Event={{
            event: "click",
            link_type: "events",
            link_name: "store_trail",
            link_category: "event",
          }}
        />
      </div>
    </section>
  );
}
