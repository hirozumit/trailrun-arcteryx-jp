"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { useRevealAll } from "@/hooks/use-reveal";
import styles from "./yoyogi-page.module.css";

/* ── Menu nav items ── */

const MENU_ITEMS = [
  { label: "ギアを揃える", href: "#gear" },
  { label: "シューレースを結ぶ", href: "#shoelace" },
  { label: "リズムよく下る", href: "#downhill" },
  { label: "TRAIL HUB YOYOGI について", href: "#about" },
] as const;

/* ── Instruction sub-component ── */

type InstructionProps = {
  id?: string;
  titleLines: string[][];
  body: string;
  reverse?: boolean;
  videoSrc: string;
  videoPoster?: string;
  ctaText?: string;
  ctaHref?: string;
};

function Instruction({
  id,
  titleLines,
  body,
  reverse,
  videoSrc,
  videoPoster,
  ctaText,
  ctaHref,
}: InstructionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      id={id}
      className={`${styles.instruction} ${reverse ? styles["instruction-reverse"] : ""}`}
    >
      <div className={styles["instruction-media"]}>
        <div className={styles["instruction-video"]} data-reveal="fade-up">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={videoPoster}
            playsInline
            loop
            muted
            preload="metadata"
            onEnded={() => setPlaying(false)}
          />
          <button
            className={styles["play-button"]}
            onClick={togglePlay}
            aria-label={playing ? "一時停止" : "再生"}
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="3" width="4" height="10" fill="currentColor" />
                <rect x="9" y="3" width="4" height="10" fill="currentColor" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 3L13 8L4 13V3Z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className={styles["instruction-content"]} data-reveal="clip-left">
        <div className={styles["instruction-title"]}>
          {titleLines.map((column, i) => (
            <div key={i} className={styles["title-column"]}>
              {column.map((char, j) => (
                <p key={j}>{char}</p>
              ))}
            </div>
          ))}
        </div>
        <div className={styles["instruction-body"]}>
          <p>{body}</p>
          {ctaText && ctaHref && (
            <a href={ctaHref} className={styles["instruction-cta"]}>
              <span>{ctaText}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Photo gallery sub-component ── */

type PhotoGalleryProps = {
  images: string[];
  layout?: "row" | "overlap";
};

function PhotoGallery({ images, layout = "row" }: PhotoGalleryProps) {
  return (
    <section
      className={`${styles["photo-gallery"]} ${layout === "overlap" ? styles["photo-gallery-overlap"] : ""}`}
      data-reveal="fade-up"
    >
      {images.map((src) => (
        <div key={src} className={styles["photo-item"]}>
          <img src={src} alt="" />
        </div>
      ))}
    </section>
  );
}

/* ── Expandable note (like ChayaSection's note-toggle) ── */

type NoteToggleProps = {
  label: string;
  children: ReactNode;
};

function NoteToggle({ label, children }: NoteToggleProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles["note-group"]}>
      <button
        className={styles["note-toggle"]}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={styles["note-icon"]}>{open ? "−" : "+"}</span>
        <span>{label}</span>
      </button>
      {open && <div className={styles["note-content"]}>{children}</div>}
    </div>
  );
}

/* ── Event panel sub-component ── */

type EventPanelProps = {
  image: string;
  title: string;
  date: string;
  body?: string;
};

function EventPanel({ image, title, date, body }: EventPanelProps) {
  return (
    <div className={styles["event-panel"]}>
      <div className={styles["event-image"]}>
        <img src={image} alt="" />
      </div>
      <div className={styles["event-info"]}>
        <h4 className={styles["event-title"]}>{title}</h4>
        <p className={styles["event-date"]}>{date}</p>
        {body && <p className={styles["event-body"]}>{body}</p>}
      </div>
    </div>
  );
}

/* ── Main page component ── */

export function YoyogiPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroWrapRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  useRevealAll(pageRef);

  // Parallax: background scrolls at 60% of normal speed (ratio 0.4).
  // Image is absolute-positioned in hero-wrap; overflow hidden clips it.
  useEffect(() => {
    const wrap = heroWrapRef.current;
    const img = heroBgRef.current;
    if (!wrap || !img) return;

    const RATIO = 0.4; // 0 = fixed, 1 = no parallax

    let ticking = false;
    const update = () => {
      const rect = wrap.getBoundingClientRect();
      img.style.transform = `translateY(${-rect.top * RATIO}px)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={pageRef} className={styles.page}>
      {/* ── #1 Hero + #2 Lead — shared background ── */}
      <div ref={heroWrapRef} className={styles["hero-wrap"]}>
        <picture>
          <source
            media="(min-width: 48rem)"
            srcSet="/images/yoyogi/hero-bg-landscape.png"
          />
          <img
            ref={heroBgRef}
            className={styles["hero-bg"]}
            src="/images/yoyogi/hero-bg-portrait.png"
            alt=""
          />
        </picture>

        <section className={styles.hero}>
          <h2 className={styles["hero-title"]} data-reveal="fade">
            ARC&apos;TERYX<br />TRAIL HUB YOYOGI
          </h2>
        </section>

        <section className={styles.lead} data-reveal="fade-up">
          <p>
            山へ行き、山に触れ、何かが変わる。
            <br />
            その第一歩を踏み出す前の方や、今まさに踏み出しつつある方へ。
          </p>
          <p>
            アークテリクスによるトレイルランニングのための準備拠点が、
            <br />
            代々木公園のほど近くに、期間限定でオープンします。
          </p>
          <p>
            トレイルランに必要なギアや知識をチェックし、
            <br />
            アークテリクスの最新のフットウェアを試し、
            <br />
            山道をイメージしながら公園内を走っていただけるなど、
            <br />
            いつものランの延長上で、山を知り、山へと備えていただけます。
          </p>
        </section>
      </div>

      {/* ── #3 Map — 後日実装 ── */}

      {/* ── #4 Menu nav ── */}
      <nav className={styles.menu} data-reveal="fade-up">
        {MENU_ITEMS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className={styles["menu-item"]}
            onClick={handleNavClick}
          >
            <span>{label}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        ))}
      </nav>

      {/* ── #5 Gear collage ── */}
      <section className={styles["gear-collage"]}>
        <div className={styles["collage-grid"]} data-reveal="fade-up">
          <div className={`${styles["collage-item"]} ${styles["collage-1"]}`}>
            <img src="/images/yoyogi/gear-collage-1.jpg" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-2"]}`}>
            <img src="/images/yoyogi/gear-collage-2.jpg" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-3"]}`}>
            <img src="/images/yoyogi/gear-collage-3.jpg" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-4"]}`}>
            <img src="/images/yoyogi/gear-collage-4.jpg" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-5"]}`}>
            <img src="/images/yoyogi/gear-collage-5.jpg" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-6"]}`}>
            <img src="/images/yoyogi/gear-collage-6.jpg" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-7"]}`}>
            <img src="/images/yoyogi/gear-collage-7.jpg" alt="" />
          </div>
        </div>
      </section>

      {/* ── #6 Instruction 1: ギアを揃える ── */}
      <Instruction
        id="gear"
        titleLines={[["ギ", "ア", "を"], ["揃", "え", "る"]]}
        body="都市で行うロードランとは異なり、身一つで山へと入るトレイルランでは、安全で快適なランのために、さまざまな装備が欠かせません。トレイルに適したシューズやウェアのほか、携行品を収納できる軽量なベスト、故障を防ぎ疲労を抑えるスポーツテープ、夜間に視界を照らすヘッドランプ、すぐに水分補給できるフラスクボトル、救急時にも役立つ手ぬぐい、効率よくエネルギーを摂取できる行動食など。山へと向かう前に、一つひとつ準備と確認を。"
        videoSrc="/videos/yoyogi/instruction-1.mp4"
        ctaText="トレイルランニングギアはこちら"
        ctaHref="https://arcteryx.jp"
      />

      {/* ── #7 Photos 1 ── */}
      <PhotoGallery
        images={[
          "/images/yoyogi/instruction-1-1.jpg",
          "/images/yoyogi/instruction-1-2.jpg",
          "/images/yoyogi/instruction-1-3.jpg",
        ]}
      />

      {/* ── #8 Instruction 2: シューレースを結ぶ ── */}
      <Instruction
        id="shoelace"
        titleLines={[["シ", "ュ", "ー", "レ", "ー", "ス", "を"], ["結", "ぶ"]]}
        body="シューズを足にフィットさせるためには、足長だけではなく、足幅や甲の高さも見ながらフィッティングを行い、自分の足に合う一足を選ぶことが肝心です。その上で、シューレースをきちんと結ぶことも大切なポイント。2番目のアイレットでループを作って通す「ダブルアイレット」は、足首をしっかりと固定することができ、下りでもシューズの中で足がずれにくく、結び目も解けにくいのが特長です。他にもさまざまな結び方があるため、自分に合った結び方を探してみてください。シューズと足が一体になると、走りも変わります。"
        videoSrc="/videos/yoyogi/instruction-2.mp4"
        reverse
      />

      {/* ── #9 Photos 2 ── */}
      <PhotoGallery
        images={[
          "/images/yoyogi/instruction-2-1.jpg",
          "/images/yoyogi/instruction-2-2.jpg",
        ]}
        layout="overlap"
      />

      {/* ── #10 Instruction 3: リズムよく下る ── */}
      <Instruction
        id="downhill"
        titleLines={[["リ", "ズ", "ム", "よ", "く"], ["下", "る"]]}
        body="トレイルラン初心者にとって、スピードが出やすく、転倒のリスクもある下りは、恐さを感じやすい部分です。しかし、いくつかのコツを意識することで、スムーズに下ることができます。まずは、歩幅を小さくすること。細かなステップでリズムよく下ることで、関節への負荷を減らすことができます。次に、視線を前へ向けること。足元ではなく数歩先を見て、次に足を置く地点をイメージしながら走ります。さらに、腕や上半身も活用し、全身でバランスをとることで、衝撃を逃がしながら、軽やかに下ることができます。"
        videoSrc="/videos/yoyogi/instruction-3.mp4"
      />

      {/* ── #11 Full-width image ── */}
      <section className={styles["full-image"]}>
        <img src="/images/yoyogi/full-image.jpg" alt="" />
      </section>

      {/* ── #12 About ── */}
      <section className={styles.about} id="about">
        <div className={styles["about-inner"]}>
          <div className={styles["about-header"]} data-reveal="fade-up">
            <div className={styles["about-label"]}>
              <p className={styles["about-label-en"]}>TRAIL HUB YOYOGI</p>
              <p className={styles["about-label-ja"]}>について</p>
            </div>
          </div>
          <div className={styles["about-body"]} data-reveal="fade-up">
            <p>
              アークテリクスによる、トレイルランニングのための準備拠点。代々木公園から徒歩数分の立地で、ロードランの前後にもお立ち寄りいただけます。トレイルランの際に必要となるギアや持ち物、走り方の知識などをチェックしていただけるほか、代々木公園内でトレイルランの練習におすすめのコースもご紹介。アークテリクスの最新のマウンテンラン&amp;トレイルランニングシューズをレンタルしてお試しいただけます（有料）。また、オープン期間中、トレイルランニング初心者を対象としたイベントも開催します。
            </p>
          </div>
        </div>

        {/* ── #13 Facility info ── */}
        <div className={styles.facility} data-reveal="fade-up">
          <div className={styles["facility-image"]}>
            <img src="/images/yoyogi/facility.jpg" alt="TRAIL HUB YOYOGI" />
          </div>
          <div className={styles["facility-detail"]}>
            <div className={styles["facility-info"]}>
              <p className={styles["facility-name"]}>
                ARC&apos;TERYX TRAIL HUB YOYOGI
              </p>
              <div className={styles["facility-address"]}>
                <p>
                  〒150-0041 東京都渋谷区神南1丁目1-1 3F
                  <br />
                  Runtrip BASE YOYOGI PARK
                </p>
                <p>オープン期間：2026年5月2日〜31日</p>
                <NoteToggle label="シューズのレンタルについて">
                  <p>詳細は準備中です。</p>
                </NoteToggle>
              </div>
            </div>
            <div className={styles["facility-photo"]}>
              <img src="/images/yoyogi/facility-2.jpg" alt="" />
            </div>
          </div>
        </div>

        {/* ── #14 Footwear + Apparel ── */}
        <div className={styles.footwear} data-reveal="fade-up">
          <div className={styles["footwear-images"]}>
            <div className={styles["footwear-image"]}>
              <img src="/images/yoyogi/footwear-1.jpg" alt="" />
            </div>
            <div className={styles["footwear-image"]}>
              <img src="/images/yoyogi/footwear-2.jpg" alt="" />
            </div>
          </div>
          <div className={styles["footwear-overlay"]}>
            <p className={styles["footwear-title"]}>Footwear + Apparel</p>
            <a href="https://arcteryx.jp" className={styles["footwear-button"]}>
              More
            </a>
          </div>
        </div>

        {/* ── #15 Pickup Event ── */}
        <div className={styles["pickup-event"]}>
          <h3 className={styles["section-heading"]} data-reveal="fade-up">
            Pickup Event
          </h3>
          <div className={styles["pickup-panel"]} data-reveal="fade-up">
            <div className={styles["pickup-image"]}>
              <img src="/images/yoyogi/events/pickup-1.jpg" alt="" />
            </div>
            <div className={styles["pickup-info"]}>
              <h4 className={styles["pickup-title"]}>TRAIL CLINIC 代々木</h4>
              <p className={styles["pickup-date"]}>
                2026年5月19日(火) 18:30 - 21:00
              </p>
              <p className={styles["pickup-body"]}>
                トレイルランニング初心者が、山への備えを学ぶことができるTRAIL
                CLINIC。5/19（火）は夜間の開催で、アークテリクスのトレイルランニングシューズのほか、マイルストーン社のヘッドランプをお試しいただけます。ロードランでは使用する機会のないヘッドランプですが、山道は暗くなるのが早く、明るい間に下山できない可能性もあるため、トレイルランでは必携品の一つ。詳しい使用方法などをお伝えしながら、夜間の走り方を学んでいただけます。
              </p>
            </div>
          </div>
        </div>

        {/* ── #16 Community Events ── */}
        <div className={styles.events}>
          <h3 className={styles["section-heading"]} data-reveal="fade-up">
            Community Events
          </h3>
          <div className={styles["event-grid"]} data-reveal="fade-up">
            <EventPanel
              image="/images/yoyogi/events/community-1.jpg"
              title="TRAIL CLINIC 代々木"
              date="2026年5月24日(日)"
            />
            <EventPanel
              image="/images/yoyogi/events/community-2.jpg"
              title="TRAIL CLINIC 六甲山"
              date="2026年5月16日(土)"
            />
            <EventPanel
              image="/images/yoyogi/events/community-3.jpg"
              title="TRAIL CLINIC 高尾山"
              date="2026年5月23日(土)"
            />
          </div>
          <button className={styles["more-button"]}>
            <span className={styles["more-icon"]}>+</span>
            <span>More</span>
          </button>
        </div>

        {/* ── #17 Store Events ── */}
        <div className={styles.events}>
          <h3 className={styles["section-heading"]} data-reveal="fade-up">
            Store Events
          </h3>
          <div className={styles["event-grid"]} data-reveal="fade-up">
            <EventPanel
              image="/images/yoyogi/events/store-1.jpg"
              title="CITY TRAIL MEET UP 神戸"
              date="2026年5月3日(日)"
            />
            <EventPanel
              image="/images/yoyogi/events/store-2.jpg"
              title="CITY TRAIL MEET UP 神戸"
              date="2026年5月5日(火)"
            />
            <EventPanel
              image="/images/yoyogi/events/store-3.jpg"
              title="CITY TRAIL MEET UP 心斎橋"
              date="2026年5月9日(土)"
            />
          </div>
          <button className={styles["more-button"]}>
            <span className={styles["more-icon"]}>+</span>
            <span>More</span>
          </button>
        </div>
      </section>

      {/* ── #18 Takao CTA ── */}
      <section className={styles.takao} data-reveal="fade-up">
        <div className={styles["takao-inner"]}>
          <div className={styles["takao-header"]}>
            <p className={styles["takao-label"]}>
              ARC&apos;TERYX TRAIL HUB TAKAO
            </p>
            <p className={styles["takao-title"]}>最も身近な山、高尾へ</p>
          </div>
          <div className={styles["takao-body"]}>
            <p>
              すべての準備が整ったら、いよいよ山へと足を踏み出すとき。アークテリクスは、都市に暮らす人々にとって最も身近な山の一つである高尾山麓に、トレイルランナーをサポートするための茶屋を期間限定でオープンしました。トレイルランの前後の休憩やエネルギー補給の拠点として、また、山のコンディションやルートの情報交換、最新のフットウェアの試し履きの場として。高尾の山へと向かう前に、山から下りた後に、どうぞお立ち寄りください。
            </p>
            <p className={styles["takao-period"]}>
              期間：2026年4月17日(金) 〜 6月28日(日)
            </p>
            <a href="/" className={styles["takao-button"]}>
              More
            </a>
          </div>
        </div>
        <div className={styles["takao-image"]}>
          <img src="/images/yoyogi/takao-cta.jpg" alt="" />
        </div>
      </section>
    </div>
  );
}
