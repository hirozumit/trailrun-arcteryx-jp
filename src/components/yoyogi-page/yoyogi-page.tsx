"use client";

import { useEffect, useRef } from "react";
import { useRevealAll } from "@/hooks/use-reveal";
import { NoteToggle } from "@/components/note-toggle/note-toggle";
import noteStyles from "@/components/note-toggle/note-toggle.module.css";
import { ImagePanel } from "@/components/image-panel/image-panel";
import { EventCategory, communityEvents, storeEvents } from "@/components/event-section/event-section";
import eventStyles from "@/components/event-section/event-section.module.css";
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
  /** [right column, left column] in vertical-rl reading order */
  title: [string, string];
  body: string;
  reverse?: boolean;
  videoSrc: string;
  ctaText?: string;
  ctaHref?: string;
};

function Instruction({
  id,
  title,
  body,
  reverse,
  videoSrc,
  ctaText,
  ctaHref,
}: InstructionProps) {
  return (
    <section
      id={id}
      className={`${styles.instruction} ${reverse ? styles["instruction-reverse"] : ""}`}
    >
      <div className={styles["instruction-media"]}>
        <div className={styles["instruction-video"]} data-reveal="fade-up">
          <video src={videoSrc} controls playsInline preload="metadata" />
        </div>
      </div>
      <div className={styles["instruction-content"]} data-reveal="clip-left">
        <h3 className={styles["instruction-title"]}>
          <span>{title[0]}</span>
          <span>{title[1]}</span>
        </h3>
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
  mobileReverse?: boolean;
};

function PhotoGallery({ images, mobileReverse }: PhotoGalleryProps) {
  return (
    <section
      className={`${styles["photo-gallery"]} ${mobileReverse ? styles["photo-gallery-reverse"] : ""}`}
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
            <img src="/images/yoyogi/gear-collage-1.png" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-2"]}`}>
            <img src="/images/yoyogi/gear-collage-2.png" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-3"]}`}>
            <img src="/images/yoyogi/gear-collage-3.png" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-4"]}`}>
            <img src="/images/yoyogi/gear-collage-4.png" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-5"]}`}>
            <img src="/images/yoyogi/gear-collage-5.png" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-6"]}`}>
            <img src="/images/yoyogi/gear-collage-6.png" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-7"]}`}>
            <img src="/images/yoyogi/gear-collage-7.png" alt="" />
          </div>
        </div>
      </section>

      {/* ── #6 Instruction 1: ギアを揃える ── */}
      <Instruction
        id="gear"
        title={["ギアを", "揃える"]}
        body="都市で行うロードランとは異なり、身一つで山へと入るトレイルランでは、安全で快適なランのために、さまざまな装備が欠かせません。トレイルに適したシューズやウェアのほか、携行品を収納できる軽量なベスト、故障を防ぎ疲労を抑えるスポーツテープ、夜間に視界を照らすヘッドランプ、すぐに水分補給できるフラスクボトル、救急時にも役立つ手ぬぐい、効率よくエネルギーを摂取できる行動食など。山へと向かう前に、一つひとつ準備と確認を。"
        videoSrc="/videos/yoyogi/instruction-1.mp4"
        ctaText="トレイルランニングギアはこちら"
        ctaHref="https://arcteryx.jp"
      />

      {/* ── #7 Photos 1 ── */}
      <PhotoGallery
        images={[
          "/images/yoyogi/instruction-1-1.png",
          "/images/yoyogi/instruction-1-2.png",
          "/images/yoyogi/instruction-1-3.png",
        ]}
      />

      {/* ── #8 Instruction 2: シューレースを結ぶ ── */}
      <Instruction
        id="shoelace"
        title={["シューレースを", "結ぶ"]}
        body="シューズを足にフィットさせるためには、足長だけではなく、足幅や甲の高さも見ながらフィッティングを行い、自分の足に合う一足を選ぶことが肝心です。その上で、シューレースをきちんと結ぶことも大切なポイント。2番目のアイレットでループを作って通す「ダブルアイレット」は、足首をしっかりと固定することができ、下りでもシューズの中で足がずれにくく、結び目も解けにくいのが特長です。他にもさまざまな結び方があるため、自分に合った結び方を探してみてください。シューズと足が一体になると、走りも変わります。"
        videoSrc="/videos/yoyogi/instruction-2.mp4"
        reverse
      />

      {/* ── #9 Photos 2 ── */}
      <PhotoGallery
        images={[
          "/images/yoyogi/instruction-2-1.png",
          "/images/yoyogi/instruction-2-2.png",
        ]}
        mobileReverse
      />

      {/* ── #10 Instruction 3: リズムよく下る ── */}
      <Instruction
        id="downhill"
        title={["リズムよく", "下る"]}
        body="トレイルラン初心者にとって、スピードが出やすく、転倒のリスクもある下りは、恐さを感じやすい部分です。しかし、いくつかのコツを意識することで、スムーズに下ることができます。まずは、歩幅を小さくすること。細かなステップでリズムよく下ることで、関節への負荷を減らすことができます。次に、視線を前へ向けること。足元ではなく数歩先を見て、次に足を置く地点をイメージしながら走ります。さらに、腕や上半身も活用し、全身でバランスをとることで、衝撃を逃がしながら、軽やかに下ることができます。"
        videoSrc="/videos/yoyogi/instruction-3.mp4"
      />

      {/* ── #11 Full-width image ── */}
      <section className={styles["full-image"]}>
        <div className={styles["full-image-bg"]}>
          <img src="/images/yoyogi/full-image.jpg" alt="" />
        </div>
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
          <div className={styles["facility-photos"]}>
            <div className={`${styles["facility-photo"]} ${styles["facility-photo-tall"]}`}>
              <img src="/images/yoyogi/facility-1.jpg" alt="" />
            </div>
            <div className={styles["facility-photo"]}>
              <img src="/images/yoyogi/facility-2.jpg" alt="" />
            </div>
            <div className={styles["facility-photo"]}>
              <img src="/images/yoyogi/facility-3.jpg" alt="" />
            </div>
            <div className={styles["facility-photo"]}>
              <img src="/images/yoyogi/facility-4.jpg" alt="" />
            </div>
            <div className={styles["facility-photo"]}>
              <img src="/images/yoyogi/facility-5.jpg" alt="" />
            </div>
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
                  <ul className={noteStyles.list}>
                    <li>
                      BIRD CLUB会員の方、またはLINEで友だち登録をしていただいた方は、レンタル料無料となります。
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
                </NoteToggle>
              </div>
            </div>
            <div className={styles["facility-map"]}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.4345074799626!2d139.69871441254514!3d35.66630173067758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d003c44e355%3A0x4f53a3a729034f15!2sRuntrip%20BASE%20YOYOGI%20PARK!5e0!3m2!1sja!2sjp!4v1777432440197!5m2!1sja!2sjp"
                width={600}
                height={450}
                style={{ border: "0" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* ── #14 Footwear + Apparel ── */}
        <div data-reveal="fade-up">
          <ImagePanel
            images={[
              { src: "/images/yoyogi/footwear-1.jpg" },
              { src: "/images/yoyogi/footwear-2.jpg" },
            ]}
            title="Footwear + Apparel"
            href="https://arcteryx.jp/pages/260326_sylan2"
          />
        </div>

        {/* ── #15 Pickup Event ── */}
        <div className={eventStyles.category}>
          <h3 className={eventStyles["category-title"]} data-reveal="fade-up">
            Pickup Event
          </h3>
          <div className={styles["pickup-panel"]} data-reveal="clip-left">
            <div className={styles["pickup-image"]}>
              <a href="https://arcteryx.jp" target="_blank" rel="noopener noreferrer">
                <img src="/images/yoyogi/pickup-1.jpg" alt="" />
              </a>
            </div>
            <div className={styles["pickup-info"]}>
              <a href="https://arcteryx.jp" target="_blank" rel="noopener noreferrer" className={styles["pickup-name"]}>
                TRAIL CLINIC 代々木
              </a>
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
        <EventCategory title="Community Events" items={communityEvents} />

        {/* ── #17 Store Events ── */}
        <EventCategory title="Store Events" items={storeEvents} />
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
          <img src="/images/yoyogi/takao-cta.png" alt="" />
        </div>
      </section>
    </div>
  );
}
