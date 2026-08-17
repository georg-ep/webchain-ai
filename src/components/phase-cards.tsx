"use client";

import { TiltCard } from "@/components/tilt-card";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

/** I — radar sweeping the problem space. */
function RadarGlyph() {
  return (
    <span className="glyph-scene h-14 w-14">
      <span className="glyph-radar">
        <i className="r1" />
        <i className="r2" />
        <i className="sweep" />
      </span>
    </span>
  );
}

/** II — candidate model planes shuffling in a stack. */
function StackGlyph() {
  return (
    <span className="glyph-scene h-14 w-14">
      <span className="glyph-stack">
        {[0, 1, 2].map((n) => (
          <i
            key={n}
            style={{ "--pz": `${n * 11}px`, "--d": `${n * 0.45}s` } as React.CSSProperties}
          />
        ))}
      </span>
    </span>
  );
}

/** III — guardrail pulses radiating from a protected core. */
function GuardGlyph() {
  return (
    <span className="glyph-scene h-14 w-14">
      <span className="glyph-guard">
        <i style={{ "--d": "0s" } as React.CSSProperties} />
        <i style={{ "--d": "1s" } as React.CSSProperties} />
        <i style={{ "--d": "2s" } as React.CSSProperties} />
        <span className="core" />
      </span>
    </span>
  );
}

/** IV — rings lifting off the launch pad. */
function RiseGlyph() {
  return (
    <span className="glyph-scene h-14 w-14">
      <span className="glyph-rise">
        <i style={{ "--d": "0s" } as React.CSSProperties} />
        <i style={{ "--d": "0.9s" } as React.CSSProperties} />
        <i style={{ "--d": "1.8s" } as React.CSSProperties} />
        <span className="pad" />
      </span>
    </span>
  );
}

const PHASES = [
  {
    phase: "PHASE I",
    numeral: "01",
    title: "Cognitive Mapping",
    body: "Defining the boundaries of deterministic logic vs probabilistic reasoning. Establishing the architectural constraints.",
    Glyph: RadarGlyph,
  },
  {
    phase: "PHASE II",
    numeral: "02",
    title: "Model Prototyping",
    body: "Rapid iteration of model selection. Quantifying output quality against golden datasets.",
    Glyph: StackGlyph,
  },
  {
    phase: "PHASE III",
    numeral: "03",
    title: "Guardrail Engineering",
    body: "Implementing semantic filters and adversarial testing to ensure system safety and alignment.",
    Glyph: GuardGlyph,
  },
  {
    phase: "PHASE IV",
    numeral: "04",
    title: "High-Availability Scale",
    body: "Deploying to distributed edge networks with real-time monitoring of token usage and drift.",
    Glyph: RiseGlyph,
  },
] as const;

/**
 * Methodology cards: they stand up out of the page plane as they scroll into
 * view, then track the pointer in 3D. Each phase carries a live 3D glyph and
 * an extruded ghost numeral floating on its own depth layer.
 */
export function PhaseCards() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // Show everything immediately rather than leaving content hidden.
      queueMicrotask(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {PHASES.map(({ phase, numeral, title, body, Glyph }, i) => (
        <div
          key={phase}
          className="rise3 scene-3d"
          data-visible={visible}
          style={{ "--rise-delay": `${i * 120}ms` } as React.CSSProperties}
        >
          <TiltCard maxTilt={6} className="group h-full rounded-2xl">
            {/* Glass backdrop with the fine circuit grid */}
            <div aria-hidden className="panel absolute inset-0 overflow-hidden rounded-2xl">
              <div className="grid-fine absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_90%_80%_at_100%_0%,#000,transparent_70%)]" />
              <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-signal/60 to-transparent transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100" />
            </div>

            {/* Extruded ghost numeral on the deepest layer */}
            <div
              aria-hidden
              className="tilt-layer pointer-events-none absolute bottom-1 right-5 select-none"
              style={{ "--tz": "38px" } as React.CSSProperties}
            >
              <span className="numeral-3d font-display text-[6.5rem] leading-none tracking-tighter">
                {numeral}
              </span>
            </div>

            {/* Copy */}
            <div
              className={cn("tilt-layer relative flex h-full flex-col p-8 pb-14")}
              style={{ "--tz": "20px" } as React.CSSProperties}
            >
              <div className="flex items-start justify-between">
                <span className="pt-1 font-mono text-[10px] tracking-[0.24em] text-ink-4 transition-colors duration-500 group-hover:text-signal/80">
                  {phase}
                </span>
                <Glyph />
              </div>

              <h3 className="mt-8 font-display text-xl text-ink">{title}</h3>
              <p className="mt-3 max-w-[36ch] text-[13px] font-light leading-relaxed text-ink-3">
                {body}
              </p>
            </div>

            <div aria-hidden className="tilt-glare rounded-2xl" />
          </TiltCard>
        </div>
      ))}
    </div>
  );
}
