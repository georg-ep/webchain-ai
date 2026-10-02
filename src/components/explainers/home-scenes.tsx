"use client";

import { Glyph } from "@/components/explainers/glyph";
import { Badge, Bar, C, Caption, Packet, Pill, Plate, Sheet, Token, Wire } from "@/components/explainers/kit";
import { story, useOn, useStep } from "@/components/explainers/scene";
import { SparkOrb } from "@/components/explainers/spark-orb";

/*
 * Home page explainers: the three principles and the four method phases,
 * each told as a short animated sketch so the cards can say less.
 */

/** A small person mark, used wherever a human makes the call. */
function Person({ cx, cy, r = 14, tone = C.ember }: { cx: number; cy: number; r?: number; tone?: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={tone} />
      <circle cx={cx} cy={cy - r * 0.25} r={r * 0.26} fill={C.paper} />
      <path d={`M${cx - r * 0.45} ${cy + r * 0.5} a${r * 0.45} ${r * 0.4} 0 0 1 ${r * 0.9} 0`} fill={C.paper} />
    </g>
  );
}

/* ---------- Principle 001 — Deterministic core ---------- */

function RulesDrawing() {
  const on = useOn();
  const step = useStep();
  const gates = [96, 150, 204];
  const lane = "M20 75 H262";
  return (
    <Plate w={300} h={150}>
      <Wire d={lane} on />
      {/* The input steps through each gate on the beat its rule ticks */}
      <Token points={[[40, 75], [123, 75], [177, 75], [231, 75], [270, 75]]} step={step} />
      <Sheet x={8} y={58} w={28} h={34} rx={5} />
      <Bar x={14} y={68} w={16} h={3} />
      <Bar x={14} y={76} w={12} h={3} />
      {gates.map((x, i) => (
        <g key={x}>
          <rect x={x - 18} y={50} width={36} height={50} rx={8} fill={C.paper} stroke={C.lineStrong} />
          <Caption x={x} y={44} anchor="middle">
            {`Rule ${i + 1}`}
          </Caption>
          <Badge cx={x} cy={75} glyph="check" r={10} on={on(i + 1)["data-on"]} />
        </g>
      ))}
      <rect x={250} y={56} width={40} height={38} rx={8} fill={C.ink} />
      <Glyph kind="ledger" x={262} y={67} stroke={C.paper} />
      <Pill x={150} y={116} align="middle" label="Same input · same answer" className="x-rise" on={on(4)["data-on"]} />
    </Plate>
  );
}

export const RulesScene = story(RulesDrawing, {
  steps: 5,
  label: "An input passes three fixed rules in turn, each ticked, and lands in the ledger: the same input always gives the same answer.",
});

/* ---------- Principle 002 — Probabilistic edge ---------- */

function ModelDrawing() {
  const on = useOn();
  const reads = [
    { y: 46, label: "Invoice", w: 70, best: true },
    { y: 76, label: "Order", w: 30 },
    { y: 106, label: "Query", w: 18 },
  ];
  return (
    <Plate w={300} h={150}>
      {/* Messy inputs: a scrawl, a photo, a half-filled form */}
      <g>
        <Sheet x={8} y={22} w={50} h={30} rx={5} />
        <path d="M14 38 q6 -8 12 0 t12 0 t12 0" stroke={C.ink4} fill="none" />
        <Sheet x={20} y={60} w={50} h={34} rx={5} />
        <path d="M26 88 l10 -12 8 8 6 -6 12 10z" fill={C.lineStrong} />
        <Sheet x={8} y={102} w={50} h={30} rx={5} />
        <Bar x={14} y={112} w={30} h={3} />
        <Bar x={14} y={120} w={20} h={3} />
      </g>
      <Wire d="M74 77 H108" on />
      <SparkOrb cx={132} cy={77} r={22} />
      <Wire d="M158 77 C 172 77, 168 46, 182 46" on={on(1)["data-on"]} />
      <Wire d="M158 77 H182" on={on(1)["data-on"]} />
      <Wire d="M158 77 C 172 77, 168 106, 182 106" on={on(1)["data-on"]} />
      {reads.map(({ y, label, w, best }) => (
        <g key={label}>
          <Caption x={188} y={y + 3}>
            {label}
          </Caption>
          <rect x={236} y={y - 3} width={56} height={6} rx={3} fill={C.line} />
          <Bar x={236} y={y - 3} w={w * 0.78} h={6} tone={best ? C.violet : C.lineStrong} grow on={on(2)["data-on"]} />
        </g>
      ))}
      <Pill x={292} y={122} align="end" label="Best reading" tone="violet" className="x-rise" on={on(3)["data-on"]} />
    </Plate>
  );
}

export const ModelScene = story(ModelDrawing, {
  steps: 4,
  label: "Messy inputs, a scrawl, a photo and a half-filled form, go through a model which weighs what each could be and picks the best reading.",
});

/* ---------- Principle 003 — Human agency ---------- */

function HumanDrawing() {
  const on = useOn();
  return (
    <Plate w={300} h={150}>
      {/* Confidence meter with a threshold line */}
      <Caption x={14} y={22}>
        Confidence
      </Caption>
      <defs>
        <clipPath id="human-meter">
          <rect x={14} y={32} width={18} height={96} rx={9} />
        </clipPath>
      </defs>
      <rect x={14} y={32} width={18} height={96} rx={9} fill={C.line} />
      {/* Rises, but only to just under the bar */}
      <g clipPath="url(#human-meter)">
        <rect
          x={14}
          y={32}
          width={18}
          height={96}
          rx={9}
          fill={C.ember}
          data-on={on(1)["data-on"]}
          className="x-move"
          style={{ "--ty": `${on(1)["data-on"] ? 38 : 88}px`, "--dur": "1.2s" } as React.CSSProperties}
        />
      </g>
      <path d="M8 66 H40" stroke={C.ink} strokeDasharray="3 3" />
      <Caption x={44} y={69}>
        Bar
      </Caption>

      {/* Below the bar: it goes to a person instead of acting */}
      <Wire d="M40 104 C 100 104, 104 75, 148 75" on={on(2)["data-on"]} tone={C.ember} />
      <g className="x-pop" {...on(2)}>
        <Person cx={166} cy={75} />
      </g>
      <Caption x={166} y={104} anchor="middle" tone={C.ember} on={on(2)["data-on"]}>
        Asks you
      </Caption>
      <Wire d="M184 75 H226" on={on(3)["data-on"]} />
      <Badge cx={244} cy={75} glyph="check" on={on(3)["data-on"]} />
      <Pill x={244} y={116} align="middle" label="Then acts" className="x-rise" on={on(4)["data-on"]} />
    </Plate>
  );
}

export const HumanScene = story(HumanDrawing, {
  steps: 5,
  label: "When the system's confidence falls below the bar, it asks a person, who approves, and only then does it act.",
});

/* ---------- Phase I — Cognitive mapping: sort each step into rules or model ---------- */

function MapDrawing() {
  const on = useOn();
  const blocks = [
    { x: 66, lane: 0 },
    { x: 112, lane: 1 },
    { x: 158, lane: 0 },
    { x: 204, lane: 1 },
  ];
  return (
    <Plate w={260} h={110}>
      <Caption x={10} y={37}>
        Rules
      </Caption>
      <Caption x={10} y={91}>
        Model
      </Caption>
      <path d="M56 34 H250" stroke={C.line} />
      <path d="M56 88 H250" stroke={C.line} />
      {blocks.map(({ x, lane }, i) => {
        const sorted = on(i + 1)["data-on"];
        return (
          <rect
            key={x}
            x={x}
            y={50}
            width={36}
            height={16}
            rx={5}
            fill={lane ? C.violet : C.ink}
            data-on={sorted}
            className="x-move"
            style={{ "--ty": `${sorted ? (lane ? 30 : -24) : 0}px`, "--dur": "0.8s" } as React.CSSProperties}
          />
        );
      })}
    </Plate>
  );
}

export const MapScene = story(MapDrawing, {
  steps: 5,
  interval: 900,
  label: "Each step of a workflow is sorted into one of two lanes: fixed rules, or a model's judgement.",
});

/* ---------- Phase II — Model prototyping: candidates scored against a golden set ---------- */

function PrototypeDrawing() {
  const on = useOn();
  const rows = [
    { y: 26, label: "A", w: 96 },
    { y: 52, label: "B", w: 150, best: true },
    { y: 78, label: "C", w: 70 },
  ];
  return (
    <Plate w={260} h={110}>
      {rows.map(({ y, label, w, best }) => (
        <g key={label}>
          <Caption x={10} y={y + 4} size={9}>
            {label}
          </Caption>
          <rect x={26} y={y - 4} width={170} height={8} rx={4} fill={C.line} />
          <Bar x={26} y={y - 4} w={w} h={8} tone={best ? C.violet : C.lineStrong} grow on={on(1)["data-on"]} />
        </g>
      ))}
      <path d="M160 14 V92" stroke={C.ink} strokeDasharray="2 3" />
      <Caption x={160} y={104} anchor="middle">
        Pass mark
      </Caption>
      <Badge cx={232} cy={52} glyph="check" r={11} on={on(2)["data-on"]} />
    </Plate>
  );
}

export const PrototypeScene = story(PrototypeDrawing, {
  steps: 3,
  interval: 1300,
  label: "Three candidate models are scored against a golden set of known answers; the best one is chosen.",
});

/* ---------- Phase III — Guardrails: bad inputs bounced, good ones through ---------- */

function GuardDrawing() {
  const on = useOn();
  const lane = "M8 56 H250";
  return (
    <Plate w={260} h={110}>
      <Wire d={lane} on />
      <Packet path={lane} dur={2.6} />
      <Packet path={lane} dur={2.6} phase={1.3} />
      {/* The gate */}
      <rect x={118} y={20} width={24} height={72} rx={8} fill={C.paper} stroke={C.ink} />
      {/* Shield */}
      <path d="M130 31 l6 2.5 v5 c0 4.5 -2.6 7.2 -6 8.8 c-3.4 -1.6 -6 -4.3 -6 -8.8 v-5z" fill="none" stroke={C.ink} strokeWidth="1.2" strokeLinejoin="round" />
      <Caption x={130} y={104} anchor="middle">
        Guardrail
      </Caption>
      {/* A bad input, bounced back */}
      <g
        data-on
        className="x-move"
        style={
          {
            "--tx": on(2)["data-on"] ? "28px" : on(1)["data-on"] ? "96px" : "0px",
            "--ty": on(2)["data-on"] ? "-22px" : "0px",
          } as React.CSSProperties
        }
      >
        <circle cx={14} cy={56} r={6} fill={C.ember} />
      </g>
      <Pill x={12} y={6} label="Blocked" tone="ember" className="x-rise" on={on(2)["data-on"]} />
    </Plate>
  );
}

export const GuardScene = story(GuardDrawing, {
  steps: 3,
  interval: 1200,
  label: "Inputs pass through a guardrail; good ones go through, a bad one is blocked and bounced back.",
});

/* ---------- Phase IV — Scale: monitored, with drift caught ---------- */

function ScaleDrawing() {
  const on = useOn();
  const line = "M10 70 L40 64 L70 68 L100 60 L130 66 L160 30 L190 62 L220 58 L250 62";
  return (
    <Plate w={260} h={110}>
      <path d="M10 44 H250" stroke={C.ember} strokeDasharray="3 4" opacity="0.5" />
      <Caption x={250} y={40} anchor="end" tone={C.ember}>
        Drift
      </Caption>
      <path d="M10 92 H250" stroke={C.line} />
      <path
        d={line}
        pathLength={1}
        fill="none"
        stroke={C.violet}
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="x-draw"
        {...on(1)}
      />
      <g className="x-pop" {...on(2)}>
        <circle cx={160} cy={30} r={9} fill={C.ember} opacity="0.2" className="x-ping" />
        <circle cx={160} cy={30} r={4} fill={C.ember} />
      </g>
      <Pill x={250} y={78} align="end" label="Caught" tone="ember" className="x-rise" on={on(2)["data-on"]} />
    </Plate>
  );
}

export const ScaleScene = story(ScaleDrawing, {
  steps: 3,
  interval: 1400,
  label: "A live quality line is monitored in production; when it drifts past the limit, it's caught.",
});
