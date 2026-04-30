"use client";

import styles from "./image-panel.module.css";

type ImagePanelImage = {
  src: string;
  objectPosition?: string;
};

type GA4Event = {
  event: string;
  link_type: string;
  link_name: string;
  link_category: string;
};

type ImagePanelProps = {
  images: ImagePanelImage[];
  title: string;
  href: string;
  linkLabel?: string;
  ga4Event?: GA4Event;
};

export function ImagePanel({
  images,
  title,
  href,
  linkLabel = "More",
  ga4Event,
}: ImagePanelProps) {
  const handleClick = ga4Event
    ? () => {
        const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
        w.dataLayer?.push({ ...ga4Event });
      }
    : undefined;

  return (
    <a
      href={href}
      className={styles.panel}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      <div className={styles.images}>
        {images.map((img) => (
          <div key={img.src} className={styles.image}>
            <img
              src={img.src}
              alt=""
              style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined}
            />
          </div>
        ))}
      </div>
      <div className={styles.overlay}>
        <p className={styles.title}>{title}</p>
        <span className={styles.link}>{linkLabel}</span>
      </div>
    </a>
  );
}
