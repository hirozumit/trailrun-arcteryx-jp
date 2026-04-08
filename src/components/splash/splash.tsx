"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logoYamae from "./logo-yamae.svg";
import styles from "./splash.module.css";

const TOTAL_DURATION = 2800;

export function Splash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), TOTAL_DURATION);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.overlay} aria-hidden="true">
      <Image
        className={styles.logo}
        src={logoYamae}
        alt="YAMAE"
        priority
      />
    </div>
  );
}
