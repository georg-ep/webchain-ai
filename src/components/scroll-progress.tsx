"use client";

import { useEffect, useRef } from "react";

/**
 * Hairline reading-progress bar pinned to the very top of the page.
 * Written straight to the DOM on scroll rather than through React state, so
 * it never re-renders the tree while scrolling.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-60 h-px">
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-signal/40 via-signal to-emerald-200"
      />
    </div>
  );
}
