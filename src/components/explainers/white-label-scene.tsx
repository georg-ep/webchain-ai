"use client";

import { Glyph } from "@/components/explainers/glyph";
import { Packet } from "@/components/explainers/kit";
import { Scene, useOn } from "@/components/explainers/scene";
import { SparkOrb } from "@/components/explainers/spark-orb";

const INK = "#0b0b0b";
const INK_3 = "#6f6962";
const INK_4 = "#9a948c";
const LINE = "#e7e3de";
const LINE_STRONG = "#d9d3cc";
const PAPER = "#fdfcfc";
const TAUPE = "#f5f3f1";
const VIOLET = "#0447ff";

/** Left-hand caption for one layer of the stack. */
function LayerLabel({ y, index, title, sub }: { y: number; index: string; title: string; sub: string }) {
  return (
    <g>
      <text x="0" y={y} fontSize="11" fill={INK_4} className="x-mono">
        {index}
      </text>
      <text x="0" y={y + 22} fontSize="16" fill={INK}>
        {title}
      </text>
      <text x="0" y={y + 41} fontSize="12.5" fill={INK_3}>
        {sub}
      </text>
    </g>
  );
}

function Stack() {
  const on = useOn();
  const spine = "M300 334 V112";

  return (
    <svg viewBox="0 0 450 440" aria-hidden>
      {/* The spine work travels up, from our bench to the client's screen */}
      <path d={spine} stroke={LINE_STRONG} strokeWidth="1.25" fill="none" />
      <path d={spine} stroke={INK_4} strokeWidth="1.25" fill="none" className="x-flow" />
      {[0, 1.3].map((phase) => (
        <Packet key={phase} path={spine} phase={phase} dur={2.6} r={3.5} />
      ))}

      {/* 03 — what the client sees */}
      <LayerLabel y={26} index="03" title="Your client" sub="Sees your work" />
      <g>
        <rect x="160" y="8" width="280" height="122" rx="14" fill={PAPER} stroke={LINE_STRONG} />
        <path d="M160 34 H440" stroke={LINE} />
        {[176, 188, 200].map((cx) => (
          <circle key={cx} cx={cx} cy="21" r="3" fill={LINE_STRONG} />
        ))}
        <text x="218" y="24.5" fontSize="9" fill={INK_4} className="x-mono">
          client-site.co.uk
        </text>
        <rect x="176" y="48" width="120" height="8" rx="4" fill={LINE} />
        <rect x="176" y="64" width="86" height="8" rx="4" fill={LINE} />
        {/* The feature we built, arriving on their site */}
        <g className="x-rise" {...on(3)}>
          <rect x="312" y="46" width="112" height="56" rx="10" fill={TAUPE} stroke={LINE_STRONG} />
          <Glyph kind="chat" x={322} y={56} />
          <rect x="344" y="60" width="64" height="6" rx="3" fill={INK} />
          <rect x="322" y="80" width="86" height="6" rx="3" fill={LINE_STRONG} />
        </g>
        <g className="x-fade" {...on(4)}>
          <rect x="176" y="98" width="104" height="20" rx="10" fill={INK} />
          <text x="228" y="111.5" fontSize="9" fill={PAPER} textAnchor="middle" className="x-mono">
            By your agency
          </text>
        </g>
      </g>

      {/* 02 — the agency layer: the work takes on your brand */}
      <LayerLabel y={176} index="02" title="Your agency" sub="Presents it as yours" />
      <g className="x-chip" {...on(2)}>
        <rect className="x-chip-bg" x="160" y="160" width="280" height="80" rx="14" fill={PAPER} stroke={LINE_STRONG} />
        <circle cx="196" cy="200" r="16" fill={INK} />
        <text x="196" y="204" fontSize="11" fill={PAPER} textAnchor="middle" className="x-mono">
          YA
        </text>
        <text x="224" y="196" fontSize="14" fill={INK}>
          Your Agency
        </text>
        <text x="224" y="214" fontSize="9" fill={INK_4} className="x-mono">
          Your brand · your client
        </text>
        <g className="x-pop" {...on(2)}>
          <circle cx="410" cy="200" r="12" fill={VIOLET} />
          <Glyph kind="check" x={402} y={192} stroke={PAPER} />
        </g>
      </g>

      {/* 01 — our bench, out of sight */}
      <LayerLabel y={292} index="01" title="WebChain" sub="Builds and tests it" />
      <g>
        <rect
          x="160"
          y="272"
          width="280"
          height="124"
          rx="14"
          fill={TAUPE}
          stroke={LINE_STRONG}
          strokeDasharray="4 4"
        />
        <SparkOrb cx={196} cy={334} r={20} />
        <Glyph kind="code" x={232} y={290} />
        {[
          { y: 316, w: 120, at: 0 },
          { y: 332, w: 90, at: 1 },
          { y: 348, w: 140, at: 1 },
        ].map(({ y, w, at }) => (
          <rect key={y} x="232" y={y} width={w} height="6" rx="3" fill={INK} className="x-grow-x" {...on(at)} />
        ))}
        <g className="x-fade" {...on(1)}>
          <rect x="232" y="364" width="96" height="20" rx="10" fill="rgba(4,71,255,0.1)" />
          <text x="280" y="377.5" fontSize="9" fill={VIOLET} textAnchor="middle" className="x-mono">
            Tested
          </text>
        </g>
      </g>

      <text x="0" y="432" fontSize="10.5" fill={INK_4} className="x-mono">
        Behind the scenes: we never contact your client
      </text>
    </svg>
  );
}

/**
 * White-label, drawn: work is built and tested on our bench, takes on the
 * agency's brand, and arrives on the client's site as the agency's work.
 */
export function WhiteLabelScene({ className }: { className?: string }) {
  return (
    <Scene
      steps={5}
      interval={1200}
      hold={4}
      className={className}
      label="Diagram: WebChain builds and tests the work behind the scenes, your agency presents it under your brand, and your client sees it on their site as your agency's work."
    >
      <Stack />
    </Scene>
  );
}
