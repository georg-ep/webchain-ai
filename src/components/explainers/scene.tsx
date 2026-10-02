"use client";

import { cn } from "@/lib/utils";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const StepContext = createContext(Infinity);

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
  // Starts dimmed so the first pass, too, fades up from the reset rather
  // than snapping from the finished frame back to beat 0.
  const [dim, setDim] = useState(true);
  const [running, setRunning] = useState(false);
  // Off screen (and before hydration) the scene rests on its final, complete
  // frame, so a still screenshot or a no-JS render is never half drawn.
  const step = running ? Math.min(tick, steps - 1) : steps - 1;
  // Between passes the scene dips briefly, resets to beat 0 while dimmed and
  // fades back up, so the loop reads as a breath rather than a jump.
  const resetting = running && dim;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      node.querySelectorAll("svg").forEach((svg) => svg.pauseAnimations?.());
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), {
      threshold: 0.2,
    });
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

    // One pass: beats 1..steps-1, the hold, then a short dip around the
    // reset. Timeouts rather than an interval, because the dip is shorter
    // than a beat.
    let timer = 0;
    let t = 0;
    const DIP_OUT = 500;
    const DIP_IN = 500;
    const next = () => {
      if (t < steps + hold - 1) {
        t += 1;
        setTick(t);
        timer = window.setTimeout(next, interval);
        return;
      }
      setDim(true);
      timer = window.setTimeout(() => {
        t = 0;
        setTick(0);
        timer = window.setTimeout(() => {
          setDim(false);
          timer = window.setTimeout(next, interval);
        }, DIP_IN);
      }, DIP_OUT);
    };
    timer = window.setTimeout(() => {
      setDim(false);
      timer = window.setTimeout(next, interval);
    }, DIP_IN);
    return () => {
      window.clearTimeout(timer);
      // Resume from the top, dimmed, next time it scrolls into view.
      setTick(0);
      setDim(true);
    };
  }, [running, steps, hold, interval]);

  return (
    <div
      ref={ref}
      role={label ? "img" : undefined}
      aria-label={label}
      data-step={step}
      data-resetting={resetting}
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
