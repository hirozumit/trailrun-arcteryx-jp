import styles from "./image-panel.module.css";

type ImagePanelImage = {
  src: string;
  objectPosition?: string;
};

type ImagePanelProps = {
  images: ImagePanelImage[];
  title: string;
  href: string;
  linkLabel?: string;
};

export function ImagePanel({
  images,
  title,
  href,
  linkLabel = "More",
}: ImagePanelProps) {
  return (
    <a
      href={href}
      className={styles.panel}
      target="_blank"
      rel="noopener noreferrer"
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
