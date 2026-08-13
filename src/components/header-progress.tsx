"use client";

import { useEffect, useRef } from "react";

export interface ProgressSection {
  id: string;
  label: string;
}

/** Shown before the first section stop is reached. */
const INTRO_LABEL = "Intro";

/**
 * Reading progress rendered as an instrument rail along the bottom edge of
 * the header: a filled track with a comet head, one junction marker per
 * section that ignites as it is passed, and a small chapter readout that
 * names the section currently in view.
 *
 * Everything is written straight to the DOM from a single rAF, so scrolling
 * never re-renders the tree.
 */
export function HeaderProgress({ sections }: { sections: ProgressSection[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    const orb = orbRef.current;
    const readout = readoutRef.current;
    if (!root || !fill || !orb || !readout) return;

    // The rail only makes sense on the page that has the sections; on
    // /terms and /privacy it stays hidden.
    if (!sections.some(({ id }) => document.getElementById(id))) {
      root.style.display = "none";
      return;
    }
    root.style.display = "";

    let frame = 0;
    /** Each section's start as a fraction of the scrollable distance. */
    let stops: number[] = [];
    let currentChapter = -2; // Forces the first readout write.

    const measure = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      stops = sections.map(({ id }) => {
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

      // The readout rides with the comet, clamped so it never leaves the rail.
      readout.style.left = `min(max(${progress * 100}%, 5rem), calc(100% - 6rem))`;
      readout.style.opacity = progress > 0.004 ? "1" : "0";

      let chapter = -1;
      stops.forEach((stop, i) => {
        const reached = progress >= stop - 0.004;
        if (reached) chapter = i;
        const marker = markerRefs.current[i];
        if (marker) marker.dataset.reached = String(reached);
      });

      if (chapter !== currentChapter) {
        currentChapter = chapter;
        const label = chapter < 0 ? INTRO_LABEL : sections[chapter].label;
        readout.textContent = `${String(chapter + 1).padStart(2, "0")} · ${label}`;
      }
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
  }, [sections]);

  return (
    <div ref={rootRef} aria-hidden className="absolute inset-x-0 bottom-0 h-px">
      <div className="absolute inset-0 bg-white/[0.06]" />

      <div
        ref={fillRef}
        className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-signal/20 via-signal/60 to-signal"
      />

      {/* Section markers: junction diamonds that ignite as they are passed */}
      {sections.map(({ id }, i) => (
        <div
          key={id}
          ref={(el) => {
            markerRefs.current[i] = el;
          }}
          data-reached="false"
          className="group absolute top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rotate-45"
        >
          <span className="absolute inset-0 bg-white/20 transition-all duration-500 group-data-[reached=true]:scale-150 group-data-[reached=true]:bg-signal group-data-[reached=true]:shadow-[0_0_8px_1px_rgba(52,211,153,0.6)]" />
        </div>
      ))}

      {/* The comet: glowing head with a fading tail along the track */}
      <div
        ref={orbRef}
        className="absolute top-1/2 h-px w-0 opacity-0 transition-opacity duration-500"
      >
        <span className="absolute right-0 top-1/2 h-px w-14 -translate-y-1/2 bg-gradient-to-l from-signal/80 via-signal/25 to-transparent blur-[0.5px]" />
        <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-signal shadow-[0_0_12px_3px_rgba(52,211,153,0.7)]" />
      </div>

      {/* Chapter readout: a flag hanging just below the rail, riding with
          the comet. Living outside the header band means it can never
          collide with the nav or the CTA above. */}
      <div
        ref={readoutRef}
        className="absolute top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-surface-0/75 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-ink-3 opacity-0 backdrop-blur-md transition-opacity duration-500 md:block"
      />
    </div>
  );
}
