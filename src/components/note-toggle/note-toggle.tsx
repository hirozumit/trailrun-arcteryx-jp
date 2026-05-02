"use client";

import { type ReactNode, useState } from "react";
import styles from "./note-toggle.module.css";

type NoteToggleProps = {
  label: string;
  children: ReactNode;
};

export function NoteToggle({ label, children }: NoteToggleProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.group}>
      <button
        className={styles.toggle}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? "−" : "+"} {label}
      </button>
      {open && <div className={styles.content}>{children}</div>}
    </div>
  );
}
