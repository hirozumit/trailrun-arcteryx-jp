"use client";

import { type RefObject, useEffect } from "react";

// Shared observer pool — keyed by threshold|rootMargin
const pool = new Map<string, IntersectionObserver>();

function getObserver(threshold: number, rootMargin: string) {
  const key = `${threshold}|${rootMargin}`;
  let obs = pool.get(key);
  if (!obs) {
    obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "";
            obs!.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin },
    );
    pool.set(key, obs);
  }
  return obs;
}

function observe(el: HTMLElement, threshold: number, rootMargin: string) {
  if (el.dataset.revealed !== undefined) return;
  // clip-path variants may report 0 intersectionRatio — use threshold 0
  const type = el.dataset.reveal;
  const t = type?.startsWith("clip-") ? 0 : threshold;
  getObserver(t, rootMargin).observe(el);
}

/** Reveal a single element with `data-reveal`. */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  { threshold = 0.1, rootMargin = "0px 0px -10% 0px" } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    observe(el, threshold, rootMargin);
    return () => getObserver(threshold, rootMargin).unobserve(el);
  }, [ref, threshold, rootMargin]);
}

/** Reveal all `[data-reveal]` descendants inside a container.
 *  Watches for dynamically added elements via MutationObserver. */
export function useRevealAll(
  ref: RefObject<HTMLElement | null>,
  { threshold = 0.25, rootMargin = "0px 0px -25% 0px" } = {},
) {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const scan = () => {
      const els = container.querySelectorAll<HTMLElement>("[data-reveal]");
      for (const el of els) observe(el, threshold, rootMargin);
    };

    scan();

    // Watch for dynamically added elements (e.g. "+ More" expansion)
    const mutation = new MutationObserver(scan);
    mutation.observe(container, { childList: true, subtree: true });

    return () => {
      mutation.disconnect();
      const els = container.querySelectorAll<HTMLElement>("[data-reveal]");
      const obs = getObserver(threshold, rootMargin);
      for (const el of els) obs.unobserve(el);
    };
  }, [ref, threshold, rootMargin]);
}
