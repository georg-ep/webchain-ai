"use client";

import { Glyph, type GlyphKind } from "@/components/explainers/glyph";
import { C, Packet, Pill, Wire } from "@/components/explainers/kit";
import { Scene, useStep } from "@/components/explainers/scene";
import { SparkOrb } from "@/components/explainers/spark-orb";

/*
 * Home hero: what "a system that thinks" means, as one loop. The agent
 * reads what arrives, decides, acts in your tools and checks its own work,
 * all inside a guardrail boundary. A token of work steps round the ring in
 * time with the stages lighting up; on the second lap it isn't sure, so the
 * work leaves the boundary for a person instead of a guess.
 *
 * Beats: 0 idle · 1 Reads · 2 Decides · 3 Acts · 4 Checks · 5 Decides again,
 * unsure, and escalates.
 */

const STAGES = ["Reads", "Decides", "Acts", "Checks"] as const;

/** The stage the token is at on each beat (index into STAGES), -1 for none. */
const ACTIVE = [-1, 0, 1, 2, 3, 1];
/** Where the token sits on the ring per beat, in degrees clockwise from the top. */
const ANGLE = [-50, 0, 90, 180, 270, 450];

function stageState(step: number, i: number) {
  return {
    active: ACTIVE[step] === i,
    // Done this lap: everything before the current stage, and on the second
    // lap every stage has been visited.
    past: step >= 5 ? ACTIVE[step] !== i : step > i + 1,
  };
}

/** A stage on the ring: paper while waiting, outlined once done, ink while active. */
function Stage({
  x,
  y,
  label,
  index,
  active,
  past,
  w = 104,
  h = 34,
  size = 14,
}: {
  x: number;
  y: number;
  label: string;
  index: number;
  active: boolean;
  past: boolean;
  w?: number;
  h?: number;
  size?: number;
}) {
  const left = x - w / 2;
  const top = y - h / 2;
  const num = String(index + 1).padStart(2, "0");
  const face = (fg: string, sub: string) => (
    <>
      <text x={left + 16} y={y + 3.4} fontSize="9.5" className="x-mono" fill={sub}>
        {num}
      </text>
      <text x={left + 40} y={y + size * 0.35} fontSize={size} fill={fg}>
        {label}
      </text>
    </>
  );
  return (
    <g>
      <rect x={left} y={top} width={w} height={h} rx={h / 2} fill={C.paper} stroke={C.lineStrong} />
      <rect
        x={left}
        y={top}
        width={w}
        height={h}
        rx={h / 2}
        fill="none"
        stroke={C.ink}
        className="x-fade"
        data-on={past}
      />
      {face(C.ink, C.ink4)}
      <g className="x-fade" data-on={active}>
        <rect x={left} y={top} width={w} height={h} rx={h / 2} fill={C.ink} />
        {face(C.paper, "#8a847c")}
      </g>
    </g>
  );
}

/** A tool the agent reaches into, ringing while it is being used. */
function Tool({
  x,
  y,
  glyph,
  label,
  used,
  busy,
}: {
  x: number;
  y: number;
  glyph: GlyphKind;
  label: string;
  used: boolean;
  busy: boolean;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r="24" fill={C.paper} stroke={C.lineStrong} />
      <g className="x-fade" data-on={busy}>
        <circle cx={x} cy={y} r="24" fill="none" stroke={C.violet} strokeWidth="1" className="x-ping" />
      </g>
      <circle cx={x} cy={y} r="24" fill={C.violetSoft} stroke={C.violet} strokeWidth="1.25" className="x-fade" data-on={used} />
      <Glyph kind={glyph} x={x - 8} y={y - 8} />
      <text x={x} y={y + 42} fontSize="9.5" textAnchor="middle" className="x-mono" fill={C.ink3}>
        {label}
      </text>
    </g>
  );
}

/** The token of work, carried round the ring on a rotation so it follows the arc. */
function RingToken({ cx, cy, r, step }: { cx: number; cy: number; r: number; step: number }) {
  return (
    <g
      data-on
      className="x-move"
      style={
        {
          transformBox: "view-box",
          transformOrigin: `${cx}px ${cy}px`,
          "--rot": `${ANGLE[step]}deg`,
          "--dur": "0.95s",
          "--ease": "cubic-bezier(0.65, 0, 0.35, 1)",
        } as React.CSSProperties
      }
    >
      <circle cx={cx} cy={cy - r} r="11" fill={step === 5 ? C.ember : C.violet} opacity="0.14" />
      <circle cx={cx} cy={cy - r} r="5" fill={step === 5 ? C.ember : C.violet} style={{ transition: "fill 0.5s ease" }} />
    </g>
  );
}

/** A person: grey and waiting, then ember once the work comes to them. */
function Person({ cx, cy, called }: { cx: number; cy: number; called: boolean }) {
  const figure = (tone: string) => (
    <>
      <circle cx={cx} cy={cy - 5} r="5" fill={tone} />
      <path d={`M${cx - 9} ${cy + 10} a9 8 0 0 1 18 0`} fill={tone} />
    </>
  );
  return (
    <g>
      <circle cx={cx} cy={cy} r="22" fill={C.paper} stroke={C.lineStrong} strokeDasharray="3 3" />
      {figure(C.lineStrong)}
      <g className="x-pop" data-on={called}>
        <circle cx={cx} cy={cy} r="22" fill={C.ember} />
        {figure(C.paper)}
      </g>
    </g>
  );
}

function Wide() {
  const step = useStep();
  const [cx, cy, r] = [266, 240, 120];
  const stagePos: [number, number][] = [
    [cx, cy - r],
    [cx + r, cy],
    [cx, cy + r],
    [cx - r, cy],
  ];
  const k = r * 0.707;
  // Reading happens at the top, acting at the bottom, so the tools for each
  // sit beside the stage that uses them.
  const tools: { x: number; y: number; glyph: GlyphKind; label: string; at: number; from: [number, number] }[] = [
    { x: 92, y: 96, glyph: "mail", label: "Email", at: 1, from: [cx - k, cy - k] },
    { x: 440, y: 96, glyph: "doc", label: "Docs", at: 1, from: [cx + k, cy - k] },
    { x: 92, y: 384, glyph: "chat", label: "CRM", at: 3, from: [cx - k, cy + k] },
    { x: 440, y: 384, glyph: "ledger", label: "Ledger", at: 3, from: [cx + k, cy + k] },
  ];
  const person: [number, number] = [588, cy];
  const escalate = `M${cx + r + 52} ${cy} H${person[0] - 26}`;
  const unsure = step >= 5;

  return (
    <svg viewBox="0 0 640 470" aria-hidden>
      {/* Guardrail boundary, labelled on its own edge */}
      <rect x="16" y="24" width="500" height="430" rx="30" fill="none" stroke={C.lineStrong} strokeDasharray="5 6" />
      <Pill x={cx} y={14} h={20} size={9} align="middle" tone="paper" label="Guardrails" />

      {tools.map(({ x, y, at, from }) => (
        <Wire key={`${x}-${y}`} d={`M${from[0]} ${from[1]} L${x} ${y}`} on={step >= at} />
      ))}

      {/* The loop itself */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.line} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.ink4} strokeWidth="1.25" className="x-flow" />

      <SparkOrb cx={cx} cy={cy} r={50} label="Your agent" />

      <RingToken cx={cx} cy={cy} r={r} step={step} />

      {STAGES.map((label, i) => (
        <Stage key={label} x={stagePos[i][0]} y={stagePos[i][1]} label={label} index={i} {...stageState(step, i)} />
      ))}

      {tools.map(({ x, y, glyph, label, at }) => (
        <Tool key={label} x={x} y={y} glyph={glyph} label={label} used={step >= at} busy={step === at} />
      ))}

      {/* Not sure? It leaves the boundary for a person */}
      <path d={escalate} fill="none" stroke={C.line} strokeWidth="1.25" strokeDasharray="3 4" />
      <g className="x-fade" data-on={unsure}>
        <path d={escalate} fill="none" stroke={C.ember} strokeWidth="1.25" strokeDasharray="3 4" />
        <Packet path={escalate} dur={1.4} tone={C.ember} r={3} />
      </g>
      <Person cx={person[0]} cy={person[1]} called={unsure} />
      <text x={person[0]} y={cy + 44} fontSize="10" textAnchor="middle" className="x-mono" fill={C.ink3}>
        A person
      </text>
      <text x={person[0]} y={cy + 58} fontSize="10" textAnchor="middle" className="x-mono" fill={C.ink4}>
        if unsure
      </text>
    </svg>
  );
}

/** Phones: the same loop without the tool satellites, the person below. */
function Narrow() {
  const step = useStep();
  const [cx, cy, r] = [180, 214, 100];
  const stagePos: [number, number][] = [
    [cx, cy - r],
    [cx + r, cy],
    [cx, cy + r],
    [cx - r, cy],
  ];
  const person: [number, number] = [300, 436];
  const escalate = `M${person[0]} ${cy + 18} V${person[1] - 24}`;
  const unsure = step >= 5;

  return (
    <svg viewBox="0 0 360 470" aria-hidden>
      <rect x="10" y="40" width="340" height="356" rx="28" fill="none" stroke={C.lineStrong} strokeDasharray="5 6" />
      <Pill x={cx} y={30} h={20} size={9.5} align="middle" tone="paper" label="Guardrails" />

      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.line} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.ink4} strokeWidth="1.25" className="x-flow" />

      <SparkOrb cx={cx} cy={cy} r={44} />

      <RingToken cx={cx} cy={cy} r={r} step={step} />

      {/* Drawn before the stages so the Decides pill sits over its start */}
      <path d={escalate} fill="none" stroke={C.line} strokeWidth="1.25" strokeDasharray="3 4" />
      <g className="x-fade" data-on={unsure}>
        <path d={escalate} fill="none" stroke={C.ember} strokeWidth="1.25" strokeDasharray="3 4" />
        <Packet path={escalate} dur={1.6} tone={C.ember} r={3} />
      </g>

      {STAGES.map((label, i) => (
        <Stage
          key={label}
          x={stagePos[i][0]}
          y={stagePos[i][1]}
          label={label}
          index={i}
          w={100}
          h={34}
          size={14}
          {...stageState(step, i)}
        />
      ))}

      <Person cx={person[0]} cy={person[1]} called={unsure} />
      <text x={person[0] - 34} y={person[1] - 2} fontSize="10.5" textAnchor="end" className="x-mono" fill={C.ink3}>
        A person
      </text>
      <text x={person[0] - 34} y={person[1] + 13} fontSize="10.5" textAnchor="end" className="x-mono" fill={C.ink4}>
        if unsure
      </text>
    </svg>
  );
}

export function AgentLoop({ className }: { className?: string }) {
  return (
    <Scene
      steps={6}
      interval={1300}
      hold={3}
      className={className}
      label="Diagram: an AI agent reads what arrives, decides, acts in your tools such as email, documents, the CRM and the ledger, then checks its own work, all inside guardrails. When it is unsure, the work goes to a person."
    >
      <div className="hidden sm:block">
        <Wide />
      </div>
      <div className="mx-auto max-w-[400px] sm:hidden">
        <Narrow />
      </div>
    </Scene>
  );
}
