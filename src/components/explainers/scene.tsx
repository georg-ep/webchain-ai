"use client";

import { cn } from "@/lib/utils";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const StepContext = createContext(Infinity);

type Phase = "still" | "snap" | "in" | "play" | "out";

/** Matches the fade-out in explainers.css. */
const FADE_OUT_MS = 460;

/** The current beat of the enclosing scene. */
export const useStep = () => useContext(StepContext);

/** `data-on` for an element that appears from beat `n` onwards. */
export function useOn() {
  const step = useStep();
  return (n: number) => ({ "data-on": step >= n });
}

/**
 * Drives an explainer diagram through its story one beat at a time.
 *
 * Every explainer is a little sequence ("invoice arrives → matched → posted").
 * Rather than hand-tuning CSS keyframe percentages for each element, the
 * scene publishes the current beat through context; elements mark
 * themselves `data-on` from the beat they belong to, and explainers.css
 * animates the change with transitions.
 *
 * The clock only runs while the scene is on screen. Visitors who prefer
 * reduced motion get the last beat as a still frame, which is always the
 * complete picture, and any SMIL motion inside is paused.
 */
export function Scene({
  steps,
  interval = 1400,
  hold = 2,
  className,
  children,
  label,
}: {
  /** Number of beats in the story, 0..steps-1. */
  steps: number;
  /** Milliseconds per beat. */
  interval?: number;
  /** Extra beats to linger on the final frame before looping. */
  hold?: number;
  className?: string;
  children: React.ReactNode;
  /**
   * Accessible summary of what the diagram explains. Omit it when the scene
   * only animates real content (a list of steps, say), which then keeps its
   * own semantics.
   */
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0);
  // Server renders, reduced-motion visitors and old browsers stay "still" on
  // the final, complete frame. Once hydrated with motion allowed, the scene
  // is primed: snapped to its first beat with the animated parts hidden,
  // ready to build up when it scrolls into view.
  const [phase, setPhase] = useState<Phase>("still");
  const [running, setRunning] = useState(false);
  const step = phase === "still" ? steps - 1 : Math.min(tick, steps - 1);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      node.querySelectorAll("svg").forEach((svg) => svg.pauseAnimations?.());
      return;
    }

    // Prime before the first paint (a microtask, not a frame), so a scene
    // already on screen never flashes its finished frame first.
    queueMicrotask(() => setPhase("snap"));
    // Starts once a quarter of it is showing; stops only once it has fully
    // left, so it never blanks out while still partly on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.25) setRunning(true);
        else if (!entry.isIntersecting) setRunning(false);
      },
      { threshold: [0, 0.25] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.querySelectorAll("svg").forEach((svg) =>
      running ? svg.unpauseAnimations?.() : svg.pauseAnimations?.(),
    );
    if (!running) return;

    let timer = 0;
    let frame = 0;
    let t = 0;
    const wait = (ms: number, fn: () => void) => {
      timer = window.setTimeout(fn, ms);
    };
    // Two frames, so the snapped first beat is painted before the
    // transitions come back on.
    const afterPaint = (fn: () => void) => {
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(fn);
      });
    };

    const fadeIn = () => {
      setPhase("in");
      wait(interval, advance);
    };
    // One pass: beats 1..steps-1, then `hold` beats on the finished frame,
    // then the seam.
    const advance = () => {
      if (t < steps + hold - 1) {
        t += 1;
        setPhase("play");
        setTick(t);
        wait(interval, advance);
        return;
      }
      setPhase("out");
      wait(FADE_OUT_MS, () => {
        t = 0;
        setPhase("snap");
        setTick(0);
        afterPaint(fadeIn);
      });
    };

    afterPaint(fadeIn);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      // Off screen now: rewind silently, ready for next time.
      setPhase("snap");
      setTick(0);
    };
  }, [running, steps, hold, interval]);

  return (
    <div
      ref={ref}
      role={label ? "img" : undefined}
      aria-label={label}
      data-step={step}
      data-phase={phase}
      className={cn("x-scene relative", className)}
    >
      <StepContext.Provider value={step}>{children}</StepContext.Provider>
    </div>
  );
}

/**
 * Wraps a drawing (which reads its beat with `useOn`) in its own Scene, so
 * each small explainer is declared as just the picture plus its timing.
 */
export function story(
  Drawing: React.ComponentType,
  { steps, label, interval = 1100, hold = 3 }: { steps: number; label: string; interval?: number; hold?: number },
) {
  function Story({ className }: { className?: string }) {
    return (
      <Scene steps={steps} interval={interval} hold={hold} label={label} className={className}>
        <Drawing />
      </Scene>
    );
  }
  Story.displayName = `Story(${Drawing.displayName ?? Drawing.name})`;
  return Story;
}
