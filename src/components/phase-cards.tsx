"use client";

import { GuardScene, MapScene, PrototypeScene, ScaleScene } from "@/components/explainers/home-scenes";
import { TiltCard } from "@/components/tilt-card";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const PHASES = [
  {
    phase: "PHASE I",
    numeral: "01",
    title: "Cognitive Mapping",
    body: "Every step sorted: fixed rules, or model judgement.",
    Visual: MapScene,
  },
  {
    phase: "PHASE II",
    numeral: "02",
    title: "Model Prototyping",
    body: "Candidate models scored against known answers. The best one wins.",
    Visual: PrototypeScene,
  },
  {
    phase: "PHASE III",
    numeral: "03",
    title: "Guardrail Engineering",
    body: "Filters and adversarial tests, so bad inputs never get through.",
    Visual: GuardScene,
  },
  {
    phase: "PHASE IV",
    numeral: "04",
    title: "High-Availability Scale",
    body: "Monitored live in production, with drift caught early.",
    Visual: ScaleScene,
  },
] as const;

/**
 * Methodology cards: they stand up out of the page plane as they scroll into
 * view, then track the pointer in 3D. Each phase is shown as a small animated
 * explainer, with an extruded ghost numeral floating on its own depth layer.
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
      {PHASES.map(({ phase, numeral, title, body, Visual }, i) => (
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
              <span className="font-mono text-[10px] tracking-[0.24em] text-ink-4 transition-colors duration-500 group-hover:text-signal/80">
                {phase}
              </span>
              <Visual className="mt-6" />

              <h3 className="mt-6 font-display text-xl text-ink">{title}</h3>
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
