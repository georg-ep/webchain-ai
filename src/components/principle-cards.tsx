"use client";

import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";

const CUBE = 76;
const CUBE_CORE = 30;

/** Six faces of a wireframe cube of the given edge length. */
function CubeFaces({ size }: { size: number }) {
  const z = size / 2;
  const faces = [
    `rotateY(0deg) translateZ(${z}px)`,
    `rotateY(90deg) translateZ(${z}px)`,
    `rotateY(180deg) translateZ(${z}px)`,
    `rotateY(270deg) translateZ(${z}px)`,
    `rotateX(90deg) translateZ(${z}px)`,
    `rotateX(-90deg) translateZ(${z}px)`,
  ];
  return (
    <>
      {faces.map((transform) => (
        <i key={transform} style={{ transform }} />
      ))}
    </>
  );
}

/** 001 — nested wireframe cubes turning in lockstep. */
function DeterministicScene() {
  return (
    <div className="holo-scene h-full w-full">
      <div className="cube3" style={{ width: CUBE, height: CUBE }}>
        <CubeFaces size={CUBE} />
        <div
          className="cube3-core"
          style={{ margin: (CUBE - CUBE_CORE) / 2, width: CUBE_CORE, height: CUBE_CORE }}
        >
          <CubeFaces size={CUBE_CORE} />
        </div>
      </div>
    </div>
  );
}

const WAVE_GRID = 6;

/** 002 — probability wave rolling through a tilted dot field. */
function ProbabilisticScene() {
  return (
    <div className="holo-scene h-full w-full">
      <div
        className="wave-plane"
        style={{
          gridTemplateColumns: `repeat(${WAVE_GRID}, 1fr)`,
          gap: 16,
          width: 128,
          height: 128,
        }}
      >
        {Array.from({ length: WAVE_GRID * WAVE_GRID }, (_, i) => {
          const row = Math.floor(i / WAVE_GRID);
          const col = i % WAVE_GRID;
          return <i key={i} style={{ animationDelay: `${-(row + col) * 0.22}s` }} />;
        })}
      </div>
    </div>
  );
}

/** 003 — gyroscope: satellites orbiting a stable human core. */
function AgencyScene() {
  return (
    <div className="holo-scene h-full w-full">
      <div className="orbit3" style={{ width: 116, height: 116 }}>
        <div
          className="orbit3-ring"
          style={
            { "--orbit-base": "rotateY(-64deg)", "--orbit-t": "9s" } as React.CSSProperties
          }
        >
          <b />
        </div>
        <div
          className="orbit3-ring"
          style={
            {
              inset: "14%",
              "--orbit-base": "rotateX(72deg)",
              "--orbit-t": "6s",
            } as React.CSSProperties
          }
        >
          <b />
        </div>
        <div
          className="orbit3-ring"
          style={
            {
              inset: "28%",
              "--orbit-base": "rotateY(58deg) rotateX(24deg)",
              "--orbit-t": "12s",
            } as React.CSSProperties
          }
        >
          <b />
        </div>
        <span className="orbit3-core" />
      </div>
    </div>
  );
}

const PRINCIPLES = [
  {
    index: "001",
    title: "Deterministic Core",
    body: "Foundational logic must be absolute. We engineer 100% reliability for data integrity, reserving AI for higher-order reasoning.",
    Scene: DeterministicScene,
  },
  {
    index: "002",
    title: "Probabilistic Edge",
    body: "Deployment of models for synthesis and pattern matching. Leveraging ambiguity as a feature, not a bug, in creative workflows.",
    Scene: ProbabilisticScene,
  },
  {
    index: "003",
    title: "Human Agency",
    body: "Systems designed to augment, not replace. We build rigorous “human-in-the-loop” protocols for high-stakes decision making.",
    Scene: AgencyScene,
  },
] as const;

/**
 * Manifesto cards: glass panels on a pointer-tracked 3D tilt, each crowned by
 * a live holographic scene that floats off the card face. The glass backdrop
 * is an absolute sibling layer because backdrop-filter flattens 3D subtrees.
 */
export function PrincipleCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {PRINCIPLES.map(({ index, title, body, Scene }, i) => (
        <Reveal key={index} delay={i * 100} className="scene-3d">
          <TiltCard className="group h-full rounded-2xl">
            {/* Glass backdrop */}
            <div aria-hidden className="panel absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.12),transparent_65%)] opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />
            </div>

            {/* Holographic scene, floating above the glass */}
            <div
              className="tilt-layer relative h-44 lg:h-48"
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
