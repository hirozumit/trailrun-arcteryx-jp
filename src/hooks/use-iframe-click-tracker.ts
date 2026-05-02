import { useEffect, useRef } from "react";

export function useIframeClickTracker(label: string) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const sent = useRef(false);

  useEffect(() => {
    const onEnter = () => { hovering.current = true; };
    const onLeave = () => { hovering.current = false; };
    const onTouchStart = () => { hovering.current = true; };
    const fire = () => {
      if (hovering.current && !sent.current) {
        sent.current = true;
        const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
        w.dataLayer?.push({ event: "click", link_type: label });
      }
    };

    const el = wrapperRef.current;
    if (!el) return;
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("blur", fire);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("blur", fire);
    };
  }, [label]);

  return wrapperRef;
}
