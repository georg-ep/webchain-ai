"use client";

import { Glyph } from "@/components/explainers/glyph";
import { Bar, C, Caption, Pill, Plate, Sheet, Token, Wire } from "@/components/explainers/kit";
import { story, useOn, useStep } from "@/components/explainers/scene";
import { SparkOrb } from "@/components/explainers/spark-orb";

/* =========================================================================
 * What we build: one plate per service
 * ====================================================================== */

/* AI agents: a visitor asks, the assistant answers and takes the action. */
function AgentDrawing() {
  const on = useOn();
  return (
    <Plate w={280} h={130}>
      <Sheet x={10} y={8} w={260} h={114} rx={12} />
      {/* Visitor */}
      <g className="x-rise" {...on(1)}>
        <rect x={130} y={20} width={128} height={22} rx={11} fill={C.taupe} />
        <Bar x={142} y={29} w={92} h={4} tone={C.lineStrong} />
      </g>
      {/* Typing… */}
      <g className="x-out" {...on(3)}>
        <g className="x-fade" {...on(2)}>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={34 + i * 9} cy={60} r={2.5} fill={C.ink4} className="x-breathe" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </g>
      </g>
      {/* Agent reply */}
      <g className="x-rise" {...on(3)}>
        <SparkOrb cx={30} cy={60} r={9} />
        <rect x={46} y={49} width={140} height={22} rx={11} fill={C.ink} />
        <Bar x={58} y={58} w={100} h={4} tone="#5b5752" />
      </g>
      {/* …and does it */}
      <g className="x-rise" {...on(4)}>
        <rect x={46} y={82} width={112} height={26} rx={13} fill={C.violetSoft} />
        <Glyph kind="calendar" x={56} y={87} stroke={C.violet} />
        <text x={78} y={98.5} fontSize="9" className="x-mono" fill={C.violet}>
          Booked
        </text>
      </g>
    </Plate>
  );
}

export const AgentScene = story(AgentDrawing, {
  steps: 5,
  label: "A visitor asks a question, the assistant replies, and then takes the action: the booking is made.",
});

/* Workflow automation: trigger → filter → action → action, lighting in order. */
function WorkflowDrawing() {
  const on = useOn();
  const step = useStep();
  const nodes = [
    { x: 34, glyph: "mail" as const, label: "Trigger" },
    { x: 104, glyph: "check" as const, label: "Filter" },
    { x: 174, glyph: "chat" as const, label: "CRM" },
    { x: 244, glyph: "bell" as const, label: "Notify" },
  ];
  const lane = "M34 58 H244";
  return (
    <Plate w={280} h={130}>
      <Wire d={lane} on={on(1)["data-on"]} />
      {/* The run steps from node to node, in time with each one lighting */}
      <Token points={[[6, 58], ...nodes.map(({ x }) => [x, 58] as [number, number])]} step={step} />
      {nodes.map(({ x, glyph, label }, i) => (
        <g key={label}>
          <rect x={x - 22} y={36} width={44} height={44} rx={12} fill={C.paper} stroke={C.lineStrong} />
          <Glyph kind={glyph} x={x - 8} y={50} />
          <g className="x-fade" {...on(i + 1)}>
            <rect x={x - 22} y={36} width={44} height={44} rx={12} fill={C.ink} />
            <Glyph kind={glyph} x={x - 8} y={50} stroke={C.paper} />
          </g>
          <Caption x={x} y={100} anchor="middle">
            {label}
          </Caption>
        </g>
      ))}
    </Plate>
  );
}

export const WorkflowScene = story(WorkflowDrawing, {
  steps: 5,
  interval: 900,
  label: "A workflow runs step by step: a trigger, a filter, an update in the CRM, then a notification.",
});

/* LLM integration: a CRM record whose empty fields fill themselves in. */
function IntegrationDrawing() {
  const on = useOn();
  const fields = [
    { y: 46, label: "Company", w: 70, ai: false },
    { y: 70, label: "Summary", w: 120, ai: true },
    { y: 94, label: "Next step", w: 84, ai: true },
  ];
  return (
    <Plate w={280} h={130}>
      <Sheet x={10} y={8} w={260} h={114} rx={12} />
      <Caption x={24} y={28}>
        CRM record
      </Caption>
      <Pill x={256} y={15} align="end" label="AI filled" tone="violet" className="x-rise" on={on(2)["data-on"]} />
      {fields.map(({ y, label, w, ai }, i) => (
        <g key={label}>
          <Caption x={24} y={y + 4}>
            {label}
          </Caption>
          <rect x={92} y={y - 7} width={164} height={14} rx={5} fill={C.taupe} />
          <Bar x={98} y={y - 2} w={w} h={4} tone={ai ? C.violet : C.ink} grow={ai} on={ai ? on(i)["data-on"] : undefined} />
        </g>
      ))}
    </Plate>
  );
}

export const IntegrationScene = story(IntegrationDrawing, {
  steps: 3,
  interval: 1300,
  label: "Inside an existing CRM record, the AI fills in a summary and the next step.",
});

/* Web apps and internal tools: a dashboard assembling itself. */
function AppDrawing() {
  const on = useOn();
  return (
    <Plate w={280} h={130}>
      <Sheet x={10} y={8} w={260} h={114} rx={12} />
      <path d="M10 28 H270" stroke={C.line} />
      {[22, 32, 42].map((x) => (
        <circle key={x} cx={x} cy={18} r={2.5} fill={C.lineStrong} />
      ))}
      <rect x={18} y={36} width={46} height={78} rx={6} fill={C.taupe} className="x-slide" style={{ "--dx": "12px" } as React.CSSProperties} {...on(1)} />
      {[48, 60, 72].map((y) => (
        <rect key={y} x={26} y={y} width={30} height={4} rx={2} fill={C.lineStrong} className="x-fade" {...on(1)} />
      ))}
      <g className="x-pop" {...on(2)}>
        <rect x={72} y={36} width={86} height={36} rx={6} fill={C.ink} />
        <rect x={80} y={44} width={30} height={4} rx={2} fill="#6f6962" />
        <rect x={80} y={55} width={52} height={8} rx={4} fill={C.paper} />
      </g>
      <g className="x-pop" {...on(2)}>
        <rect x={166} y={36} width={96} height={36} rx={6} fill={C.taupe} />
        <circle cx={186} cy={54} r={9} fill="none" stroke={C.line} strokeWidth="3" />
        <circle cx={186} cy={54} r={9} fill="none" stroke={C.violet} strokeWidth="3" strokeDasharray="40 100" transform="rotate(-90 186 54)" />
        <rect x={202} y={46} width={44} height={4} rx={2} fill={C.lineStrong} />
        <rect x={202} y={56} width={30} height={4} rx={2} fill={C.lineStrong} />
      </g>
      <g className="x-fade" {...on(3)}>
        <rect x={72} y={80} width={190} height={34} rx={6} fill={C.taupe} />
        <path
          d="M80 106 L104 98 L128 102 L152 90 L176 94 L200 84 L224 88 L252 86"
          fill="none"
          stroke={C.violet}
          strokeWidth="1.5"
          pathLength={1}
          className="x-draw"
          {...on(3)}
        />
      </g>
    </Plate>
  );
}

export const AppScene = story(AppDrawing, {
  steps: 4,
  interval: 1000,
  label: "A custom web app assembles: sidebar, summary cards, then a live chart.",
});

/* Overflow development: tickets moving across a board to Done. */
function BoardDrawing() {
  const on = useOn();
  const cols = [
    { x: 14, label: "To do" },
    { x: 102, label: "Doing" },
    { x: 190, label: "Done" },
  ];
  const tickets = [
    { row: 0, at: [1, 3] },
    { row: 1, at: [2, 4] },
    { row: 2, at: [3, 5] },
  ];
  return (
    <Plate w={280} h={130}>
      {cols.map(({ x, label }) => (
        <g key={label}>
          <rect x={x} y={10} width={76} height={112} rx={10} fill={C.taupe} />
          <Caption x={x + 10} y={26}>
            {label}
          </Caption>
        </g>
      ))}
      {tickets.map(({ row, at }) => {
        const col = on(at[1])["data-on"] ? 2 : on(at[0])["data-on"] ? 1 : 0;
        const done = col === 2;
        return (
          <g
            key={row}
            data-on
            style={{
              transform: `translate(${col * 88}px, 0)`,
              transition: "transform 0.8s var(--ease-out-expo)",
            }}
          >
            <rect x={20} y={36 + row * 28} width={64} height={22} rx={6} fill={done ? C.ink : C.paper} stroke={C.lineStrong} style={{ transition: "fill 0.5s ease" }} />
            <rect x={28} y={45 + row * 28} width={34} height={4} rx={2} fill={done ? "#5b5752" : C.lineStrong} />
          </g>
        );
      })}
    </Plate>
  );
}

export const BoardScene = story(BoardDrawing, {
  steps: 6,
  interval: 900,
  label: "Tickets move across a board from to do, to doing, to done.",
});

/* =========================================================================
 * Why us
 * ====================================================================== */

/* Tested before handover: a test list ticking through. */
function TestsDrawing() {
  const on = useOn();
  const rows = [26, 46, 66, 86];
  return (
    <Plate w={280} h={110}>
      <Sheet x={10} y={10} w={180} h={92} rx={10} />
      {rows.map((y, i) => (
        <g key={y}>
          <circle cx={28} cy={y} r={6} fill={C.line} />
          <g className="x-pop" {...on(i + 1)}>
            <circle cx={28} cy={y} r={6} fill={C.violet} />
            <path d={`M25 ${y} l2 2 4-4`} fill="none" stroke={C.paper} strokeWidth="1.4" strokeLinecap="round" />
          </g>
          <Bar x={42} y={y - 2} w={[110, 86, 124, 70][i]} h={4} tone={C.lineStrong} />
        </g>
      ))}
      <Pill x={198} y={46} w={74} label="All pass" tone="violet" className="x-rise" on={on(5)["data-on"]} />
    </Plate>
  );
}

export const TestsScene = story(TestsDrawing, {
  steps: 6,
  interval: 700,
  label: "A list of tests ticks through one by one until all pass.",
});

/* Fixed quote in 48 hours: the clock runs, a fixed quote lands. */
function QuoteClockDrawing() {
  const on = useOn();
  return (
    <Plate w={280} h={110}>
      <circle cx={52} cy={55} r={34} fill="none" stroke={C.line} strokeWidth="4" />
      <circle
        cx={52}
        cy={55}
        r={34}
        fill="none"
        stroke={C.ink}
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={1}
        transform="rotate(-90 52 55)"
        className="x-draw"
        {...on(1)}
        style={{ transitionDuration: "1.6s" }}
      />
      <text x={52} y={60} fontSize="13" textAnchor="middle" fill={C.ink}>
        48h
      </text>
      <Wire d="M96 55 H124" on={on(2)["data-on"]} />
      <g className="x-rise" {...on(2)}>
        <Sheet x={130} y={14} w={90} h={82} rx={8} />
        <Bar x={142} y={30} w={50} h={4} tone={C.ink} />
        <Bar x={142} y={42} w={40} h={4} />
        <Bar x={142} y={54} w={60} h={4} />
      </g>
      <g className="x-pop" {...on(3)}>
        <g transform="rotate(-8 214 78)">
          <Pill x={214} y={66} h={24} size={9} w={70} align="middle" label="Fixed" />
        </g>
      </g>
    </Plate>
  );
}

export const QuoteClockScene = story(QuoteClockDrawing, {
  steps: 4,
  interval: 1200,
  label: "Within 48 hours, a quote arrives stamped with a fixed price.",
});

/* NDA, and we never contact your client: the line from us to them is cut. */
function NdaDrawing() {
  const on = useOn();
  return (
    <Plate w={280} h={110}>
      {/* You (agency) between us and the client */}
      <SparkOrb cx={34} cy={55} r={14} />
      <Caption x={34} y={92} anchor="middle">
        Us
      </Caption>
      <circle cx={140} cy={55} r={16} fill={C.ink} />
      <text x={140} y={59} fontSize="9" textAnchor="middle" fill={C.paper} className="x-mono">
        YOU
      </text>
      <circle cx={246} cy={55} r={16} fill={C.paper} stroke={C.lineStrong} />
      <Glyph kind="browser" x={238} y={47} />
      <Caption x={246} y={92} anchor="middle">
        Client
      </Caption>
      <Wire d="M50 55 H122" on />
      <Wire d="M158 55 H228" on />
      {/* The route that never happens */}
      <path d="M44 42 C 90 4, 190 4, 236 42" fill="none" stroke={C.ember} strokeDasharray="3 4" className="x-fade" {...on(1)} />
      <g className="x-pop" {...on(2)}>
        <circle cx={140} cy={14} r={9} fill={C.ember} />
        <path d="M136 10 l8 8 M144 10 l-8 8" stroke={C.paper} strokeWidth="1.6" strokeLinecap="round" />
      </g>
      <Pill x={96} y={80} w={88} label="Only via you" tone="violet" className="x-rise" on={on(3)["data-on"]} />
    </Plate>
  );
}

export const NdaScene = story(NdaDrawing, {
  steps: 4,
  interval: 1300,
  label: "We only ever talk to you, the agency; any direct line from us to your client is blocked.",
});

/* =========================================================================
 * Commercials
 * ====================================================================== */

/* Your margin: our price plus your margin makes the client's price. */
function MarginDrawing() {
  const on = useOn();
  const grown = on(1)["data-on"];
  return (
    <Plate w={360} h={110}>
      <rect x={10} y={38} width={180} height={34} rx={8} fill={C.ink} />
      <text x={22} y={58.5} fontSize="10" fill={C.paper} className="x-mono">
        Our price
      </text>
      <rect
        x={192}
        y={38}
        width={150}
        height={34}
        rx={8}
        fill={C.violet}
        data-on={grown}
        style={{
          transformBox: "fill-box",
          transformOrigin: "left center",
          transform: grown ? "scaleX(1)" : "scaleX(0.15)",
          transition: "transform 1.1s var(--ease-out-expo)",
        }}
      />
      <text x={204} y={58.5} fontSize="10" fill={C.paper} className="x-mono x-fade" {...on(1)}>
        Your margin
      </text>
      <path d="M10 82 v8 H342 v-8" fill="none" stroke={C.ink4} className="x-fade" {...on(2)} />
      <Caption x={176} y={106} anchor="middle" size={9.5} on={on(2)["data-on"]}>
        Your client pays · you set it
      </Caption>
      <Caption x={10} y={26} size={9.5}>
        We invoice you
      </Caption>
      <Caption x={192} y={26} size={9.5} on={on(1)["data-on"]}>
        You add
      </Caption>
    </Plate>
  );
}

export const MarginScene = story(MarginDrawing, {
  steps: 3,
  interval: 1300,
  label: "Our price plus your margin makes the price your client pays, which you set.",
});

/* Reserved capacity: days in the month held for your agency. */
function CapacityDrawing() {
  const on = useOn();
  const reserved = new Set([2, 3, 9, 10, 16, 17]);
  let n = 0;
  return (
    <Plate w={360} h={110}>
      {Array.from({ length: 20 }, (_, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const x = 10 + col * 36;
        const y = 10 + row * 24;
        const isReserved = reserved.has(i);
        const at = isReserved ? 1 + Math.floor(n++ / 2) : 0;
        return (
          <g key={i}>
            <rect x={x} y={y} width={30} height={18} rx={5} fill={C.taupe} stroke={C.line} />
            {isReserved && <rect x={x} y={y} width={30} height={18} rx={5} fill={C.violet} className="x-pop" {...on(at)} />}
          </g>
        );
      })}
      <Caption x={200} y={30} size={11}>
        Held for you
      </Caption>
      <rect x={200} y={42} width={14} height={14} rx={3} fill={C.violet} />
      <text x={222} y={54} fontSize="14" fill={C.ink2}>
        Reserved days
      </text>
      <Caption x={200} y={88} size={11}>
        Every month
      </Caption>
    </Plate>
  );
}

export const CapacityScene = story(CapacityDrawing, {
  steps: 4,
  interval: 1000,
  label: "A set number of days each month are reserved for your agency.",
});

/* Fixed project quote: the brief, the price locked, changes quoted first. */
function FixedScopeDrawing() {
  const on = useOn();
  return (
    <Plate w={360} h={110}>
      <Sheet x={10} y={10} w={110} h={90} rx={8} />
      <Caption x={22} y={28} size={10}>
        Brief
      </Caption>
      <Bar x={22} y={40} w={80} h={4} tone={C.ink} />
      <Bar x={22} y={52} w={64} h={4} />
      <Bar x={22} y={64} w={74} h={4} />
      <Bar x={22} y={76} w={50} h={4} />
      <Wire d="M124 55 H160" on={on(1)["data-on"]} />
      {/* The padlock: the price is set */}
      <g className="x-pop" {...on(1)}>
        <rect x={164} y={46} width={30} height={26} rx={6} fill={C.ink} />
        <path d="M171 46 v-6 a8 8 0 0 1 16 0 v6" fill="none" stroke={C.ink} strokeWidth="3" />
        <circle cx={179} cy={58} r={3} fill={C.paper} />
      </g>
      <Caption x={179} y={94} anchor="middle" size={10} on={on(1)["data-on"]}>
        Fixed
      </Caption>
      <Pill x={208} y={22} w={146} h={26} size={11} label="Scope change?" tone="ember" className="x-rise" on={on(2)["data-on"]} />
      <Pill x={208} y={60} w={146} h={26} size={11} label="Quoted first" className="x-rise" on={on(3)["data-on"]} />
    </Plate>
  );
}

export const FixedScopeScene = story(FixedScopeDrawing, {
  steps: 4,
  interval: 1200,
  label: "The brief becomes a fixed, locked price; any scope change is quoted before work starts.",
});
