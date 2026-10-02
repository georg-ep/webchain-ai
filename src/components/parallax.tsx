"use client";

import { useEffect, useRef } from "react";

/**
 * Drifts its children as they pass through the viewport, so neighbouring
 * sections overlap in motion instead of arriving as separate blocks.
 *
 * Transform-only and written straight to the DOM from a single rAF, and it
 * opts out entirely under prefers-reduced-motion.
 */
export function Parallax({
  children,
  className,
  /** Pixels of travel across a full viewport pass. Negative moves upward. */
  distance = -40,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let visible = true;

    const update = () => {
      frame = 0;
      if (!visible) return;

      const rect = node.getBoundingClientRect();
      // -1 when the element sits a screen below the fold, 1 when a screen above.
      const centre = rect.top + rect.height / 2;
      const offset = (centre - window.innerHeight / 2) / window.innerHeight;
      // Whole pixels, and a 2D translate: a sub-pixel or 3D offset puts the
      // content on its own GPU layer, which blurs text and fine lines.
      node.style.transform = `translateY(${Math.round(offset * distance)}px)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) onScroll();
      },
      { rootMargin: "20% 0px" },
    );
    observer.observe(node);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
