"use client";

import { Glyph } from "@/components/explainers/glyph";
import { Scene, useOn } from "@/components/explainers/scene";

const INK = "#0b0b0b";
const INK_3 = "#6f6962";
const INK_4 = "#9a948c";
const LINE = "#e7e3de";
const LINE_STRONG = "#d9d3cc";
const PAPER = "#fdfcfc";
const TAUPE = "#f5f3f1";
const VIOLET = "#0447ff";

function Story() {
  const on = useOn();

  return (
    <svg viewBox="0 0 440 330" aria-hidden>
      {/* The change request */}
      <g>
        <rect x="0" y="0" width="210" height="58" rx="12" fill={PAPER} stroke={LINE_STRONG} />
        <Glyph kind="code" x={14} y={21} />
        <text x="42" y="24" fontSize="9" fill={INK_4} className="x-mono">
          Change #14
        </text>
        <text x="42" y="42" fontSize="13" fill={INK}>
          Add a booking assistant
        </text>
      </g>
      <path d="M60 58 V92" stroke={LINE_STRONG} strokeWidth="1.25" className="x-flow" fill="none" />

      {/* Its own preview environment */}
      <g>
        <rect x="30" y="92" width="320" height="200" rx="14" fill={PAPER} stroke={LINE_STRONG} />
        <path d="M30 120 H350" stroke={LINE} />
        {[46, 58, 70].map((cx) => (
          <circle key={cx} cx={cx} cy="106" r="3" fill={LINE_STRONG} />
        ))}
        <rect x="88" y="98" width="200" height="16" rx="8" fill={TAUPE} />
        <text x="188" y="109" fontSize="9" fill={INK_3} textAnchor="middle" className="x-mono">
          preview-14.youragency.dev
        </text>
        {/* Spinning up */}
        <rect x="30" y="119" width="320" height="2" fill={VIOLET} className="x-grow-x" {...on(1)} />

        {/* The page rendering */}
        <g className="x-fade" {...on(2)}>
          <rect x="50" y="138" width="150" height="10" rx="5" fill={INK} />
          <rect x="50" y="156" width="110" height="7" rx="3.5" fill={LINE_STRONG} />
          <rect x="50" y="178" width="130" height="64" rx="10" fill={TAUPE} />
          <rect x="190" y="178" width="140" height="64" rx="10" fill={TAUPE} />
          <Glyph kind="calendar" x={62} y={190} />
          <rect x="62" y="214" width="90" height="6" rx="3" fill={LINE_STRONG} />
          <Glyph kind="chat" x={202} y={190} />
          <rect x="202" y="214" width="100" height="6" rx="3" fill={LINE_STRONG} />
        </g>

        {/* Sign-off: grey until clicked, then approved */}
        <g>
          <rect x="242" y="254" width="92" height="26" rx="13" fill={INK} className="x-out" {...on(4)} />
          <text x="288" y="270.5" fontSize="10" fill={PAPER} textAnchor="middle" className="x-out" {...on(4)}>
            Approve
          </text>
          <rect x="242" y="254" width="92" height="26" rx="13" fill={VIOLET} className="x-fade" {...on(4)} />
          <text x="288" y="270.5" fontSize="10" fill={PAPER} textAnchor="middle" className="x-fade" {...on(4)}>
            Approved
          </text>
        </g>

        <text x="50" y="271" fontSize="9" fill={INK_4} className="x-mono">
          You and your client
        </text>
      </g>

      {/* Cursor travelling to the button */}
      <g
        className="x-slide"
        style={{ "--dx": "120px", transitionDuration: "1.1s" } as React.CSSProperties}
        {...on(3)}
      >
        <path
          d="M300 262 l0 17 4.5 -4.5 3.5 7.5 3 -1.4 -3.4 -7.4 6.4 0 z"
          fill={INK}
          stroke={PAPER}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </g>

      {/* Only then does it go live */}
      <path d="M350 192 H392 V292" stroke={LINE_STRONG} strokeDasharray="3 4" fill="none" />
      <g className="x-pop" {...on(5)}>
        <rect x="360" y="292" width="72" height="28" rx="14" fill={INK} />
        <circle cx="378" cy="306" r="4" fill={VIOLET} />
        <text x="404" y="310" fontSize="10" fill={PAPER} textAnchor="middle" className="x-mono">
          Live
        </text>
      </g>
    </svg>
  );
}

/**
 * The partner promise in motion: a change gets its own preview link, the
 * page renders, someone clicks Approve, and only then does it go live.
 */
export function PreviewScene({ className }: { className?: string }) {
  return (
    <Scene
      steps={6}
      interval={1100}
      hold={4}
      className={className}
      label="Diagram: each change gets its own preview link. The page renders, you or your client click Approve, and only then does the change go live."
    >
      <Story />
    </Scene>
  );
}
