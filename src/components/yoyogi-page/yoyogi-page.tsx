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

type VideoEntry = { src: string; poster: string };

type InstructionProps = {
  id?: string;
  /** [right column, left column] in vertical-rl reading order */
  title: [string, string];
  body: string;
  reverse?: boolean;
  videos: VideoEntry[];
  ctaText?: string;
  ctaHref?: string;
};

function Instruction({
  id,
  title,
  body,
  reverse,
  videos,
  ctaText,
  ctaHref,
}: InstructionProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 48rem)");
    const update = () => {
      videoRefs.current.forEach((v) => { if (v) v.playsInline = mq.matches; });
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      id={id}
      className={`${styles.instruction} ${reverse ? styles["instruction-reverse"] : ""}`}
    >
      <div className={styles["instruction-media"]}>
        {videos.map((v, i) => (
          <div key={i} className={styles["instruction-video"]} data-reveal="fade">
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              src={v.src}
              poster={v.poster}
              controls
              preload="metadata"
            />
          </div>
        ))}
      </div>
      <div className={styles["instruction-content"]}>
        <h3 className={styles["instruction-title"]} data-reveal="clip-down">
          <span>{title[0]}</span>
          <span>{title[1]}</span>
        </h3>
        <div className={styles["instruction-body"]} data-reveal="fade-up">
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

const clipReveals = ["clip-down", "clip-right", "clip-up", "clip-left"] as const;

function PhotoGallery({ images, mobileReverse }: PhotoGalleryProps) {
  return (
    <section
      className={`${styles["photo-gallery"]} ${mobileReverse ? styles["photo-gallery-reverse"] : ""}`}
      data-reveal-group
    >
      {images.map((src, i) => (
        <div key={src} className={styles["photo-item"]} data-reveal={clipReveals[i % clipReveals.length]}>
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
  const mapRef = useRef<HTMLElement>(null);
  const mapPathRef = useRef<SVGPathElement>(null);
  const mapCounterRef = useRef<HTMLSpanElement>(null);
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

  // Map: auto-play route drawing + distance counter when visible
  useEffect(() => {
    const section = mapRef.current;
    const path = mapPathRef.current;
    const counter = mapCounterRef.current;
    if (!section || !path || !counter) return;

    const totalLength = path.getTotalLength();
    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    const DURATION = 3000; // ms
    let startTime: number | null = null;
    let rafId: number;

    const animate = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const ease = 1 - (1 - progress) ** 3; // easeOutCubic

      path.style.strokeDashoffset = `${totalLength * (1 - ease)}`;
      counter.textContent = (3.9 * ease).toFixed(1);

      if (progress < 1) rafId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTime = null;
          rafId = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
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
          <h2 className={styles["hero-title"]} data-reveal="fade-up">
            ARC&apos;TERYX<br />TRAIL HUB YOYOGI
          </h2>
        </section>

        <section className={styles.lead} data-reveal="fade-up">
          <p>
            山へ行き、山に触れ、何かが変わる。
            <br />
            その第一歩を踏み出す前の方や、
            <br className={styles["mobile-only"]} />
            今まさに踏み出しつつある方へ。
          </p>
          <p>
            アークテリクスによる
            <br className={styles["mobile-only"]} />
            トレイルランニングのための準備拠点が、
            <br />
            代々木公園のほど近くに、
            <br className={styles["mobile-only"]} />
            期間限定でオープンします。
          </p>
          <p>
            トレイルランに必要な
            <br className={styles["mobile-only"]} />
            ギアや知識をチェックし、
            <br />
            アークテリクスの最新のフットウェアを試し、
            <br />
            山道をイメージしながら
            <br className={styles["mobile-only"]} />
            公園内を走っていただけるなど、
            <br />
            いつものランの延長上で、
            <br className={styles["mobile-only"]} />
            山を知り、山へと備えていただけます。
          </p>
        </section>
      </div>

      {/* ── #3 Map ── */}
      <section ref={mapRef} className={styles.map}>
        <div className={styles["map-inner"]}>
        <img
          className={styles["map-bg"]}
          src="/images/yoyogi/map-bg.png"
          alt=""
        />
        <svg
          className={styles["map-route"]}
          viewBox="0 0 720 720"
          overflow="visible"
          fill="none"
        >
          {/* Route path — original Figma d, offset to route frame coords */}
          <g transform="translate(60, 49)">
            <path
              ref={mapPathRef}
              d="M598.104 605.143L614.398 444.013C614.465 443.354 614.352 442.56 614.07 441.706L608.842 425.817C607.804 422.661 604.863 419.665 602.731 419.591L517.547 416.685C514.806 416.593 511.073 411.866 511.09 408.512L511.187 389.763C511.19 389.061 511.371 388.502 511.71 388.133L515.034 384.538C515.48 384.055 516.182 383.931 517.024 384.186L532.286 388.795C532.95 388.996 533.529 388.963 533.965 388.697L548.875 379.657C549.671 379.175 549.915 377.968 549.533 376.415L546.846 365.463C546.64 364.628 546.263 363.731 545.754 362.863L535.58 345.567C535.046 344.658 534.659 343.723 534.461 342.855L532.435 334.002C532.131 332.677 531.392 331.207 530.392 329.941L506.157 299.261C504.77 297.507 503.088 296.395 501.817 296.395H490.633C490.465 296.395 490.308 296.414 490.159 296.452L467.329 302.436C467.118 302.49 466.931 302.585 466.768 302.715L433.648 329.596C433.415 329.786 433.128 329.897 432.8 329.927L421.147 330.985C420.274 331.063 419.148 330.567 418.032 329.607L400.879 314.879C400.175 314.274 399.503 313.509 398.935 312.663L383.337 289.502C382.435 288.163 381.3 287.057 380.19 286.436L379.919 286.284C376.557 284.4 374.003 278.963 375.587 277.068L398.263 249.97C399.782 248.153 397.491 243.01 394.235 240.935L363.019 221.055C361.973 220.391 360.93 219.32 360.104 218.062L247.911 47.4885C246.971 46.0568 246.394 44.5167 246.332 43.2641L244.658 9.43355C244.476 5.78939 240.343 1.0471 237.769 1.53516L218.648 5.16576C218.475 5.1983 218.315 5.25524 218.171 5.3393L210.627 9.62606C210.066 9.9433 209.763 10.613 209.758 11.5322L209.649 32.6786C209.644 33.9096 209.094 34.6797 208.154 34.7773L175.426 38.2316C175.025 38.275 174.692 38.4377 174.44 38.7143L157.112 57.8976L118.864 103.965C118.818 104.019 118.769 104.071 118.718 104.117L99.748 121.348C99.5584 121.521 99.3282 121.638 99.0654 121.695L92.7918 123.083C92.3259 123.186 91.9684 123.471 91.749 123.918L48.3838 211.543C48.2782 211.755 48.1455 211.931 47.9802 212.067L43.3888 215.925C43.0556 216.204 42.8416 216.644 42.7658 217.205L41.0132 229.995C40.8507 231.177 40.0949 231.771 38.9708 231.6L28.9049 230.079C27.8566 229.922 27.1252 230.426 26.9031 231.464L10.1302 309.524C10.0788 309.757 10.0029 309.966 9.90269 310.147L2.207 323.837C1.93341 324.323 1.84673 325.003 1.95237 325.811L3.70225 339.241C3.74017 339.539 3.75372 339.821 3.74018 340.081L1.50542 382.664C1.49458 382.873 1.5 383.096 1.52167 383.326L3.33386 402.046C3.5939 404.719 5.93972 408.133 8.34784 409.337L19.9767 415.15C20.6322 415.478 21.3121 415.988 21.9622 416.639L41.6471 436.378C42.5058 437.237 43.4132 437.85 44.2394 438.119L69.7589 446.491C70.1544 446.622 70.5228 446.67 70.8506 446.638L78.2591 445.9C78.4515 445.881 78.6303 445.835 78.7901 445.759L82.9454 443.829C84.0126 443.333 85.7273 444.078 87.3065 445.724L92.3666 451.001C93.9025 452.603 95.0239 454.761 95.2352 456.529C95.628 459.791 98.9029 463.777 101.444 464.086L149.105 469.896C149.476 469.943 149.812 469.902 150.096 469.777L159.171 465.802C159.664 465.585 159.992 465.122 160.119 464.463L163.806 445.141C164.014 444.051 164.765 443.52 165.851 443.696L177.22 445.537C178.49 445.743 180.045 446.89 181.307 448.552L184.615 452.909C185.37 453.907 185.969 455.019 186.318 456.087L187.009 458.189C188.044 461.337 190.972 464.325 193.104 464.411L208.934 465.057C209.018 465.059 209.105 465.067 209.192 465.081L234.142 468.695C234.332 468.722 234.511 468.728 234.679 468.712L282.481 464.268C282.668 464.251 282.865 464.259 283.074 464.295L297.653 466.721C299.05 466.955 299.868 466.019 299.757 464.322L297.769 434.388C297.701 433.36 297.975 432.587 298.547 432.21L303.68 428.807C304.536 428.241 305.947 428.626 307.396 429.822L318.375 438.878C318.738 439.176 319.093 439.52 319.434 439.897L340.016 462.717C341.332 464.175 342.806 465.038 343.93 465.008L356.629 464.655C356.788 464.65 356.94 464.628 357.078 464.588L380.637 457.828C380.918 457.747 381.238 457.738 381.587 457.801L401.072 461.301C401.364 461.353 401.635 461.356 401.882 461.309L432.616 455.344C432.916 455.285 433.258 455.304 433.626 455.396L444.041 457.996C444.358 458.075 444.654 458.099 444.922 458.067L481.889 453.66C482.1 453.636 482.33 453.644 482.574 453.688L499.599 456.779C500 456.852 500.363 456.83 500.671 456.714L528.667 446.261C529.358 446.003 529.745 445.288 529.75 444.257L529.87 422.95L601.39 425.817C602.093 425.878 603.7 426.7 604.5 429.5C605.3 432.3 607.728 438.804 608.842 441.706C608.956 442.146 609.115 443.224 608.842 444.013C608.568 444.803 597.667 551.762 592.5 605.143"
              stroke="#666565"
              strokeWidth="3"
              strokeMiterlimit="10"
            />
          </g>
          {/* Spots — route frame coords (Figma x + w/2, y + h/2), strokeWidth=3 per Figma */}
          <circle cx="654" cy="660" r="12" stroke="#666565" strokeWidth="3" fill="#f8f9f4" />
          <circle cx="667" cy="530" r="8" stroke="#666565" strokeWidth="3" fill="white" />
          <circle cx="588" cy="467" r="8" stroke="#666565" strokeWidth="3" fill="white" />
          <circle cx="484" cy="380" r="8" stroke="#666565" strokeWidth="3" fill="white" />
          <circle cx="62" cy="368" r="8" stroke="#666565" strokeWidth="3" fill="white" />
          <circle cx="150" cy="496" r="8" stroke="#666565" strokeWidth="3" fill="white" />
        </svg>
        <div className={styles["map-distance"]}>
          <p className={styles["map-distance-label"]}>
            YOYOGI PARK<br />TRAIL RUN COURSE
          </p>
          <p className={styles["map-distance-value"]}>
            <span ref={mapCounterRef}>0.0</span>
            <span className={styles["map-distance-unit"]}>km</span>
          </p>
        </div>
        </div>
      </section>

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
        <div className={styles["collage-grid"]} data-reveal-group>
          <div className={`${styles["collage-item"]} ${styles["collage-1"]}`} data-reveal="clip-down">
            <img src="/images/yoyogi/gear-collage-1.png" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-2"]}`} data-reveal="clip-right">
            <img src="/images/yoyogi/gear-collage-2.png" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-3"]}`} data-reveal="clip-up">
            <img src="/images/yoyogi/gear-collage-3.png" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-4"]}`} data-reveal="clip-left">
            <img src="/images/yoyogi/gear-collage-4.png" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-5"]}`} data-reveal="clip-right">
            <img src="/images/yoyogi/gear-collage-5.png" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-6"]}`} data-reveal="clip-up">
            <img src="/images/yoyogi/gear-collage-6.png" alt="" />
          </div>
          <div className={`${styles["collage-item"]} ${styles["collage-7"]}`} data-reveal="clip-left">
            <img src="/images/yoyogi/gear-collage-7.png" alt="" />
          </div>
        </div>
      </section>

      {/* ── #6 Instruction 1: ギアを揃える ── */}
      <Instruction
        id="gear"
        title={["ギアを", "揃える"]}
        body="都市で行うロードランとは異なり、身一つで山へと入るトレイルランでは、安全で快適なランのために、さまざまな装備が欠かせません。トレイルに適したシューズやウェアのほか、携行品を収納できる軽量なベスト、故障を防ぎ疲労を抑えるスポーツテープ、夜間に視界を照らすヘッドランプ、すぐに水分補給できるフラスクボトル、救急時にも役立つ手ぬぐい、効率よくエネルギーを摂取できる行動食など。山へと向かう前に、一つひとつ準備と確認を。"
        videos={[{ src: "/videos/yoyogi/instruction-1.mp4", poster: "/images/yoyogi/instruction-1-poster.jpg" }]}
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
        videos={[{ src: "/videos/yoyogi/instruction-2.mp4", poster: "/images/yoyogi/instruction-2-poster.jpg" }]}
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
        videos={[{ src: "/videos/yoyogi/instruction-3.mp4", poster: "/images/yoyogi/instruction-3-poster.jpg" }]}
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
          <div className={styles["about-header"]} data-reveal="clip-left">
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
          <div className={styles["facility-detail"]} data-reveal="fade-up">
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
            <div className={styles["facility-info"]}>
              <p className={styles["facility-name"]}>
                ARC&apos;TERYX TRAIL HUB YOYOGI
              </p>
              <div className={styles["facility-address"]}>
                <p>
                  東京都渋谷区神南1丁目1番1号 3F Runtrip BASE YOYOGIPARK
                  <br />
                  期間: 2026年5月2日(土)〜5月31日(日)
                  <br />
                  営業時間: 平日 7:00-22:00 (最終受付 21:00) / 土日祝 7:00-20:00 (最終受付 19:00)
                </p>
                <NoteToggle label="シューズのレンタルについて">
                  <ul className={noteStyles.list}>
                    <li>
                      期間中、Runtrip BASE YOYOGI PARK をご利用（有料）いただいた方を対象に、フットウェアを無料でお貸し出しいたします。
                    </li>
                    <li>
                      ご返却時に、アンケートおよび商品レビューにご回答いただくと、オリジナルノベルティを進呈いたします。
                    </li>
                    <li>
                      アンケートおよび商品レビューは、BIRD CLUB 会員の方は EXPERIENCE POINT（XP）の獲得、または LINE で友だち登録をしていただくことでご回答いただけます。
                    </li>
                  </ul>
                  <ul className={noteStyles.caption}>
                    <li>
                      ご好評により、シューズ・ウェアのサイズによってはご希望に沿えない場合や、ノベルティが一部ご用意できない場合がございます。ご了承ください。
                    </li>
                    <li>
                      Runtrip BASE YOYOGI PARKのご利用案内については <a href="https://base.runtrip.jp/#howtouse" target="_blank" rel="noopener noreferrer">こちら</a> をご覧ください。
                    </li>
                    <li>
                      EXPERIENCE POINT（XP）については <a href="https://arcteryx.jp/pages/experience-points" target="_blank" rel="noopener noreferrer">こちら</a> をご覧ください。
                    </li>
                  </ul>
                </NoteToggle>
              </div>
            </div>            
          </div>
        </div>

        {/* ── #14 Footwear + Apparel ── */}
        <div data-reveal="clip-left">
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
            <p className={styles["takao-title"]}>最も身近な山、<br />高尾へ</p>
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
