"use client";

import { HumanScene, ModelScene, RulesScene } from "@/components/explainers/home-scenes";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";

const PRINCIPLES = [
  {
    index: "001",
    title: "Deterministic Core",
    body: "Fixed rules for anything that must be exact. Same input, same answer, every time.",
    Scene: RulesScene,
  },
  {
    index: "002",
    title: "Probabilistic Edge",
    body: "Models for the messy parts rules can't handle: reading, sorting, drafting.",
    Scene: ModelScene,
  },
  {
    index: "003",
    title: "Human Agency",
    body: "Below the confidence bar, it asks a person. You keep the calls that matter.",
    Scene: HumanScene,
  },
] as const;

/**
 * Manifesto cards on a pointer-tracked 3D tilt, each crowned by an animated
 * explainer that floats off the card face, so the principle is shown first
 * and the sentence underneath only has to confirm it.
 */
export function PrincipleCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {PRINCIPLES.map(({ index, title, body, Scene }, i) => (
        <Reveal key={index} delay={i * 100} className="scene-3d">
          <TiltCard className="group h-full rounded-2xl">
            {/* Glass backdrop */}
            <div aria-hidden className="panel absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(4,71,255,0.12),transparent_65%)] opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />
            </div>

            {/* The principle, drawn, floating above the card */}
            <div
              className="tilt-layer relative px-6 pb-2 pt-12 lg:px-8"
              style={{ "--tz": "46px" } as React.CSSProperties}
            >
              <Scene />
              <span className="absolute right-7 top-7 font-mono text-[10px] tracking-[0.2em] text-ink-4">
                {index}
              </span>
            </div>

            {/* Copy */}
            <div
              className="tilt-layer relative px-8 pb-9 pt-2 lg:px-10 lg:pb-11"
              style={{ "--tz": "22px" } as React.CSSProperties}
            >
              <span aria-hidden className="block h-px w-10 bg-gradient-to-r from-signal/50 to-transparent" />
              <h3 className="mt-6 font-display text-2xl text-ink">{title}</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-ink-3">{body}</p>
            </div>

            <div aria-hidden className="tilt-glare rounded-2xl" />
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}
