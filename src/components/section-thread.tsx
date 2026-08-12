"use client";

import { useEffect, useRef } from "react";

/**
 * A single continuous line running the height of the page, with a node at
 * each section. It fills as the visitor scrolls and each node lights up as
 * its section is reached, so the sections read as stops along one pipeline
 * rather than separate blocks.
 *
 * Positions are measured from the sections themselves and written straight
 * to the DOM on scroll, so nothing re-renders while scrolling.
 */
export function SectionThread({ sectionIds }: { sectionIds: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const cometRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    const comet = cometRef.current;
    if (!root || !fill || !comet) return;

    let frame = 0;
    let positions: number[] = [];

    const measure = () => {
      const rootTop = root.getBoundingClientRect().top + window.scrollY;
      positions = sectionIds.map((id) => {
        const section = document.getElementById(id);
        if (!section) return 0;
        const top = section.getBoundingClientRect().top + window.scrollY;
        return top - rootTop;
      });

      positions.forEach((top, i) => {
        const node = nodeRefs.current[i];
        if (node) node.style.transform = `translateY(${top}px)`;
      });
    };

    const update = () => {
      frame = 0;
      const rootTop = root.getBoundingClientRect().top + window.scrollY;
      const height = root.offsetHeight;
      // Progress is measured against the middle of the viewport, so the
      // marker sits where the reader is actually looking.
      const focus = window.scrollY + window.innerHeight * 0.5 - rootTop;
      const progress = Math.min(1, Math.max(0, focus / height));

      fill.style.transform = `scaleY(${progress})`;
      comet.style.transform = `translateY(${progress * height}px)`;
      comet.style.opacity = progress > 0.002 && progress < 0.999 ? "1" : "0";

      positions.forEach((top, i) => {
        const node = nodeRefs.current[i];
        if (node) node.dataset.reached = String(focus >= top - 8);
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

    measure();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Sections change height as fonts load and images settle.
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
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-6 hidden w-px lg:block"
    >
      {/* Track */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-line to-transparent" />

      {/* Filled portion, following the reader */}
      <div
        ref={fillRef}
        className="absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-signal/10 via-signal/50 to-signal/70"
      />

      {/* The travelling head of the fill */}
      <div
        ref={cometRef}
        className="absolute -left-[3px] top-0 h-1.5 w-1.5 rounded-full bg-signal opacity-0 shadow-[0_0_12px_2px_rgba(52,211,153,0.65)] transition-opacity duration-500"
      />

      {/* One node per section */}
      {sectionIds.map((id, i) => (
        <div
          key={id}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          data-reached="false"
          className="group absolute -left-[5px] top-0 h-2.5 w-2.5"
        >
          <span className="absolute inset-0 rotate-45 border border-line-strong bg-surface-0 transition-all duration-700 [transition-timing-function:var(--ease-out-expo)] group-data-[reached=true]:border-signal group-data-[reached=true]:bg-signal/25" />
          <span className="absolute inset-0 rotate-45 scale-0 bg-signal/20 blur-[6px] transition-transform duration-700 group-data-[reached=true]:scale-[2.2]" />
        </div>
      ))}
    </div>
  );
}
