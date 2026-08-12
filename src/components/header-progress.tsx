"use client";

import { useEffect, useRef } from "react";

/**
 * Reading progress rendered as a rail along the bottom edge of the header:
 * a filled track with a glowing head, plus one marker per section that
 * lights as that section is reached.
 *
 * Everything is written straight to the DOM from a single rAF, so scrolling
 * never re-renders the tree.
 */
export function HeaderProgress({ sectionIds }: { sectionIds: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    const orb = orbRef.current;
    if (!root || !fill || !orb) return;

    let frame = 0;
    /** Each section's start as a fraction of the scrollable distance. */
    let stops: number[] = [];

    const measure = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      stops = sectionIds.map((id) => {
        const section = document.getElementById(id);
        if (!section || scrollable <= 0) return 0;
        const top = section.getBoundingClientRect().top + window.scrollY;
        return Math.min(1, Math.max(0, top / scrollable));
      });

      stops.forEach((stop, i) => {
        const marker = markerRefs.current[i];
        if (marker) marker.style.left = `${stop * 100}%`;
      });
    };

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;

      fill.style.transform = `scaleX(${progress})`;
      orb.style.left = `${progress * 100}%`;
      orb.style.opacity = progress > 0.004 ? "1" : "0";

      stops.forEach((stop, i) => {
        const marker = markerRefs.current[i];
        if (marker) marker.dataset.reached = String(progress >= stop - 0.004);
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      update();
    };

    onResize();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // The page grows as fonts load and images settle, which moves the stops.
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
    };
  }, [sectionIds]);

  return (
    <div ref={rootRef} aria-hidden className="absolute inset-x-0 bottom-0 h-px">
      <div className="absolute inset-0 bg-white/[0.06]" />

      <div
        ref={fillRef}
        className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-signal/30 via-signal/70 to-signal"
      />

      {/* Section markers */}
      {sectionIds.map((id, i) => (
        <div
          key={id}
          ref={(el) => {
            markerRefs.current[i] = el;
          }}
          data-reached="false"
          className="group absolute top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rotate-45"
        >
          <span className="absolute inset-0 bg-white/20 transition-colors duration-500 group-data-[reached=true]:bg-signal" />
        </div>
      ))}

      {/* The travelling head */}
      <div
        ref={orbRef}
        className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal opacity-0 shadow-[0_0_10px_2px_rgba(52,211,153,0.7)] transition-opacity duration-500"
      />
    </div>
  );
}
