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

/**
 * Wide: the browser sits right of the change request with the route to
 * Live down its right-hand side. Narrow (phones): the browser fills the
 * width and Live sits underneath, so the type stays readable.
 */
function Story({ narrow = false }: { narrow?: boolean }) {
  const on = useOn();
  // Browser frame
  const bx = narrow ? 0 : 30;
  const bw = narrow ? 300 : 320;
  const by = 92;
  const bh = 200;
  const right = bx + bw;
  const mid = bx + bw / 2;
  const btn = { x: right - 108, y: by + 162, w: 92, h: 26 };
  const live = narrow ? { x: right - 72, y: by + bh + 26 } : { x: 360, y: 292 };
  const liveRoute = narrow
    ? `M${right - 36} ${by + bh} V${live.y}`
    : `M${right} 192 H392 V${live.y}`;

  return (
    <svg viewBox={narrow ? "0 0 300 350" : "0 0 440 330"} aria-hidden>
      {/* The change request */}
      <g>
        <rect x="0.5" y="0.5" width="210" height="58" rx="12" fill={PAPER} stroke={LINE_STRONG} />
        <Glyph kind="code" x={14} y={21} />
        <text x="42" y="24" fontSize="9" fill={INK_4} className="x-mono">
          Change #14
        </text>
        <text x="42" y="42" fontSize="13" fill={INK}>
          Add a booking assistant
        </text>
      </g>
      <path d={`M60 58 V${by}`} stroke={LINE_STRONG} strokeWidth="1.25" className="x-flow" fill="none" />

      {/* Its own preview environment */}
      <g>
        <rect x={bx + 0.5} y={by} width={bw - 1} height={bh} rx="14" fill={PAPER} stroke={LINE_STRONG} />
        <path d={`M${bx} ${by + 28} H${right}`} stroke={LINE} />
        {[16, 28, 40].map((dx) => (
          <circle key={dx} cx={bx + dx} cy={by + 14} r="3" fill={LINE_STRONG} />
        ))}
        <rect x={mid - 92} y={by + 6} width="200" height="16" rx="8" fill={TAUPE} />
        <text x={mid + 8} y={by + 17} fontSize="9" fill={INK_3} textAnchor="middle" className="x-mono">
          preview-14.youragency.dev
        </text>
        {/* Spinning up */}
        <rect x={bx} y={by + 27} width={bw} height="2" fill={VIOLET} className="x-grow-x" {...on(1)} />

        {/* The page rendering */}
        <g className="x-fade" {...on(2)}>
          <rect x={bx + 20} y={by + 46} width="150" height="10" rx="5" fill={INK} />
          <rect x={bx + 20} y={by + 64} width="110" height="7" rx="3.5" fill={LINE_STRONG} />
          <rect x={bx + 20} y={by + 86} width={bw / 2 - 30} height="56" rx="10" fill={TAUPE} />
          <rect x={mid + 10} y={by + 86} width={bw / 2 - 30} height="56" rx="10" fill={TAUPE} />
          <Glyph kind="calendar" x={bx + 32} y={by + 98} />
          <rect x={bx + 32} y={by + 122} width={bw / 2 - 66} height="6" rx="3" fill={LINE_STRONG} />
          <Glyph kind="chat" x={mid + 22} y={by + 98} />
          <rect x={mid + 22} y={by + 122} width={bw / 2 - 66} height="6" rx="3" fill={LINE_STRONG} />
        </g>

        {/* Sign-off: ink until clicked, then approved */}
        <g>
          <rect x={btn.x} y={btn.y} width={btn.w} height={btn.h} rx="13" fill={INK} className="x-out" {...on(4)} />
          <text x={btn.x + btn.w / 2} y={btn.y + 16.5} fontSize="10.5" fill={PAPER} textAnchor="middle" className="x-out" {...on(4)}>
            Approve
          </text>
          <rect x={btn.x} y={btn.y} width={btn.w} height={btn.h} rx="13" fill={VIOLET} className="x-fade" {...on(4)} />
          <text x={btn.x + btn.w / 2} y={btn.y + 16.5} fontSize="10.5" fill={PAPER} textAnchor="middle" className="x-fade" {...on(4)}>
            Approved
          </text>
        </g>

        <text x={bx + 20} y={btn.y + 17} fontSize="9" fill={INK_4} className="x-mono">
          You and your client
        </text>
      </g>

      {/* Cursor travelling to the button's right-hand end, clear of its label */}
      <g
        className="x-slide"
        style={{ "--dx": "120px", transitionDuration: "1.1s" } as React.CSSProperties}
        {...on(3)}
      >
        <path
          d={`M${btn.x + btn.w - 12} ${btn.y + 10} l0 17 4.5 -4.5 3.5 7.5 3 -1.4 -3.4 -7.4 6.4 0 z`}
          fill={INK}
          stroke={PAPER}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </g>

      {/* Only then does it go live */}
      <path d={liveRoute} stroke={LINE_STRONG} strokeDasharray="3 4" fill="none" />
      <g className="x-pop" {...on(5)}>
        <rect x={live.x} y={live.y} width="72" height="28" rx="14" fill={INK} />
        <circle cx={live.x + 18} cy={live.y + 14} r="4" fill={VIOLET} />
        <text x={live.x + 44} y={live.y + 17.5} fontSize="10" fill={PAPER} textAnchor="middle" className="x-mono">
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
      <div className="hidden sm:block">
        <Story />
      </div>
      <div className="sm:hidden">
        <Story narrow />
      </div>
    </Scene>
  );
}
