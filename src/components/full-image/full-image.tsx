import styles from "./full-image.module.css";

type FullImageProps = {
  src: string;
  alt?: string;
};

export function FullImage({ src, alt = "" }: FullImageProps) {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={src} alt={alt} />
    </div>
  );
}
