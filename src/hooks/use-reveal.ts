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

// Shared group observer pool — keyed by threshold|rootMargin
const groupPool = new Map<string, IntersectionObserver>();
const groupCallbacks = new Map<Element, () => void>();

function getGroupObserver(threshold: number, rootMargin: string) {
  const key = `g|${threshold}|${rootMargin}`;
  let obs = groupPool.get(key);
  if (!obs) {
    obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            groupCallbacks.get(entry.target)?.();
            groupCallbacks.delete(entry.target);
            obs!.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin },
    );
    groupPool.set(key, obs);
  }
  return obs;
}

function observeGroup(container: HTMLElement, threshold: number, rootMargin: string) {
  const children = container.querySelectorAll<HTMLElement>("[data-reveal]");
  // Skip children that belong to a nested group
  const targets = Array.from(children).filter(
    (el) => el.closest("[data-reveal-group]") === container,
  );
  if (targets.length === 0) return;

  groupCallbacks.set(container, () => {
    for (const el of targets) el.dataset.revealed = "";
  });
  const obs = getGroupObserver(threshold, rootMargin);
  obs.observe(container);
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
      // Group containers — observe parent, reveal children together
      const groups = container.querySelectorAll<HTMLElement>("[data-reveal-group]");
      for (const group of groups) observeGroup(group, threshold, rootMargin);

      // Individual elements not inside a group
      const els = container.querySelectorAll<HTMLElement>("[data-reveal]");
      for (const el of els) {
        if (el.closest("[data-reveal-group]")) continue;
        observe(el, threshold, rootMargin);
      }
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

      const groups = container.querySelectorAll<HTMLElement>("[data-reveal-group]");
      const gObs = getGroupObserver(threshold, rootMargin);
      for (const group of groups) {
        groupCallbacks.delete(group);
        gObs.unobserve(group);
      }
    };
  }, [ref, threshold, rootMargin]);
}
