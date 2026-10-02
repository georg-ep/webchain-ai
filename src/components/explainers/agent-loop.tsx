"use client";

import { Glyph, type GlyphKind } from "@/components/explainers/glyph";
import { C, Packet, Wire } from "@/components/explainers/kit";
import { Scene, useOn } from "@/components/explainers/scene";
import { SparkOrb } from "@/components/explainers/spark-orb";

/*
 * Home hero: what "a system that thinks" means, as one loop. The agent
 * reads what arrives, decides, acts in your tools, checks its own work,
 * and goes round again, all inside a guardrail boundary. When it isn't
 * sure, the work leaves the boundary for a person instead of guessing.
 */

const STAGES = ["Reads", "Decides", "Acts", "Checks"] as const;

/** A stage on the ring: a pill that lights up ink when its beat arrives. */
function Stage({ x, y, label, index, on }: { x: number; y: number; label: string; index: number; on: boolean }) {
  const w = 92;
  const h = 32;
  return (
    <g className="x-chip" data-on={on}>
      <rect className="x-chip-bg" x={x - w / 2} y={y - h / 2} width={w} height={h} rx={h / 2} fill={C.paper} stroke={C.lineStrong} />
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={h / 2}
        fill={C.ink}
        className="x-fade"
        data-on={on}
      />
      <text x={x - w / 2 + 16} y={y + 4} fontSize="9" className="x-mono" fill={on ? C.ink4 : C.ink4}>
        {String(index + 1).padStart(2, "0")}
      </text>
      <text x={x - w / 2 + 36} y={y + 4.5} fontSize="13" fill={on ? C.paper : C.ink} style={{ transition: "fill 0.5s ease" }}>
        {label}
      </text>
    </g>
  );
}

/** A tool the agent reaches into: email, CRM, documents, ledger. */
function Tool({ x, y, glyph, label, on }: { x: number; y: number; glyph: GlyphKind; label: string; on: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r="22" fill={C.paper} stroke={C.lineStrong} />
      <circle cx={x} cy={y} r="22" fill="none" stroke={C.violet} strokeWidth="1.25" className="x-fade" data-on={on} />
      <circle cx={x} cy={y} r="22" fill={C.violet} opacity="0.25" className="x-ping" style={{ display: on ? undefined : "none" }} />
      <Glyph kind={glyph} x={x - 8} y={y - 8} />
      <text x={x} y={y + 38} fontSize="9" textAnchor="middle" className="x-mono" fill={C.ink4}>
        {label}
      </text>
    </g>
  );
}

function Wide() {
  const on = useOn();
  const [cx, cy, r] = [280, 220, 118];
  const ring = `M${cx} ${cy - r} A${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`;
  const stagePos = [
    [cx, cy - r],
    [cx + r, cy],
    [cx, cy + r],
    [cx - r, cy],
  ];
  const d = r * 0.707;
  const tools: { x: number; y: number; glyph: GlyphKind; label: string; at: number; from: [number, number] }[] = [
    { x: 92, y: 74, glyph: "mail", label: "Email", at: 1, from: [cx - d, cy - d] },
    { x: 468, y: 74, glyph: "chat", label: "CRM", at: 3, from: [cx + d, cy - d] },
    { x: 92, y: 366, glyph: "doc", label: "Docs", at: 1, from: [cx - d, cy + d] },
    { x: 468, y: 366, glyph: "ledger", label: "Ledger", at: 3, from: [cx + d, cy + d] },
  ];
  const escalate = `M${cx + r + 48} ${cy} H${596}`;

  return (
    <svg viewBox="0 0 640 440" aria-hidden>
      {/* Guardrail boundary */}
      <rect x="20" y="16" width="520" height="408" rx="28" fill="none" stroke={C.lineStrong} strokeDasharray="5 6" />
      <text x="44" y="38" fontSize="9" className="x-mono" fill={C.ink4}>
        Guardrails
      </text>

      {/* Spokes out to the tools */}
      {tools.map(({ x, y, at, from }) => (
        <Wire key={`${x}-${y}`} d={`M${from[0]} ${from[1]} L${x} ${y}`} on={on(at)["data-on"]} />
      ))}

      {/* The loop itself, with work circling it */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.line} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.ink4} strokeWidth="1.25" className="x-flow" />
      <Packet path={ring} dur={4.8} phase={0} />
      <Packet path={ring} dur={4.8} phase={2.4} tone={C.ember} r={3} />

      <SparkOrb cx={cx} cy={cy} r={54} label="Your agent" />

      {STAGES.map((label, i) => (
        <Stage key={label} x={stagePos[i][0]} y={stagePos[i][1]} label={label} index={i} on={on(i + 1)["data-on"]} />
      ))}

      {tools.map(({ x, y, glyph, label, at }) => (
        <Tool key={label} x={x} y={y} glyph={glyph} label={label} on={on(at)["data-on"]} />
      ))}

      {/* Not sure? It leaves the boundary for a person */}
      <g className="x-fade" {...on(5)}>
        <path d={escalate} fill="none" stroke={C.ember} strokeWidth="1.25" strokeDasharray="3 4" />
        <Packet path={escalate} dur={1.6} tone={C.ember} r={3} />
      </g>
      <g className="x-pop" {...on(5)}>
        <circle cx="612" cy={cy} r="20" fill={C.ember} />
        <circle cx="612" cy={cy - 5} r="5" fill={C.paper} />
        <path d={`M603 ${cy + 10} a9 8 0 0 1 18 0`} fill={C.paper} />
      </g>
      <text x="612" y={cy + 40} fontSize="9" textAnchor="middle" className="x-mono x-fade" fill={C.ember} {...on(5)}>
        A person
      </text>
      <text x="612" y={cy + 52} fontSize="9" textAnchor="middle" className="x-mono x-fade" fill={C.ink4} {...on(5)}>
        if unsure
      </text>
    </svg>
  );
}

/** Phones: the same loop without the tool satellites, person below. */
function Narrow() {
  const on = useOn();
  const [cx, cy, r] = [180, 196, 104];
  const ring = `M${cx} ${cy - r} A${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`;
  const stagePos = [
    [cx, cy - r],
    [cx + r, cy],
    [cx, cy + r],
    [cx - r, cy],
  ];
  const escalate = `M${cx} ${cy + r + 18} V${cy + r + 92}`;

  return (
    <svg viewBox="0 0 360 470" aria-hidden>
      <rect x="22" y="40" width="316" height="318" rx="28" fill="none" stroke={C.lineStrong} strokeDasharray="5 6" />
      <text x="42" y="60" fontSize="10" className="x-mono" fill={C.ink4}>
        Guardrails
      </text>

      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.line} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.ink4} strokeWidth="1.25" className="x-flow" />
      <Packet path={ring} dur={4.8} phase={0} />
      <Packet path={ring} dur={4.8} phase={2.4} tone={C.ember} r={3} />

      <SparkOrb cx={cx} cy={cy} r={46} />

      {STAGES.map((label, i) => (
        <Stage key={label} x={stagePos[i][0]} y={stagePos[i][1]} label={label} index={i} on={on(i + 1)["data-on"]} />
      ))}

      <g className="x-fade" {...on(5)}>
        <path d={escalate} fill="none" stroke={C.ember} strokeWidth="1.25" strokeDasharray="3 4" />
        <Packet path={escalate} dur={1.6} tone={C.ember} r={3} />
      </g>
      <g className="x-pop" {...on(5)}>
        <circle cx={cx} cy={cy + r + 116} r="20" fill={C.ember} />
        <circle cx={cx} cy={cy + r + 111} r="5" fill={C.paper} />
        <path d={`M${cx - 9} ${cy + r + 126} a9 8 0 0 1 18 0`} fill={C.paper} />
      </g>
      <text x={cx + 32} y={cy + r + 120} fontSize="10" className="x-mono x-fade" fill={C.ember} {...on(5)}>
        A person, if unsure
      </text>
    </svg>
  );
}

export function AgentLoop({ className }: { className?: string }) {
  return (
    <Scene
      steps={6}
      interval={1150}
      hold={4}
      className={className}
      label="Diagram: an AI agent reads what arrives, decides, acts in your tools such as email, CRM, documents and the ledger, then checks its own work, inside guardrails. When it is unsure, the work goes to a person."
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
