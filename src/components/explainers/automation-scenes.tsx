"use client";

import { Glyph } from "@/components/explainers/glyph";
import { Badge, C, Caption, Plate, Wire } from "@/components/explainers/kit";
import { story, useOn } from "@/components/explainers/scene";
import { SparkOrb } from "@/components/explainers/spark-orb";

/* ---------- The job ad, split: the routine to us, the people work to your hire ---------- */

const AD_TASKS = [
  { label: "Chase invoices", to: "us", at: 1 },
  { label: "Key in orders", to: "us", at: 2 },
  { label: "Talk to customers", to: "hire", at: 4 },
  { label: "Match bills", to: "us", at: 3 },
  { label: "Judgement calls", to: "hire", at: 4 },
] as const;

function HireSplitDrawing() {
  const on = useOn();
  const chipW = 128;
  const adX = 146;
  const rowY = (i: number) => 70 + i * 34;
  let us = 0;
  let hire = 0;

  return (
    <Plate w={420} h={262}>
      {/* Columns */}
      <text x={65} y={18} fontSize="13" textAnchor="middle" fill={C.ink}>
        Your new hire
      </text>
      <text x={210} y={18} fontSize="13" textAnchor="middle" fill={C.ink}>
        The job ad
      </text>
      <text x={355} y={18} fontSize="13" textAnchor="middle" fill={C.ink}>
        WebChain
      </text>

      <g>
        <circle cx={65} cy={36} r={9} fill={C.ember} />
        <circle cx={65} cy={33.5} r={2.6} fill={C.paper} />
        <path d="M60.5 41 a4.5 4 0 0 1 9 0" fill={C.paper} />
      </g>
      <rect x={adX - 6} y={50} width={chipW + 12} height={190} rx={12} fill={C.paper} stroke={C.lineStrong} strokeDasharray="4 4" />
      <SparkOrb cx={355} cy={36} r={9} />

      {AD_TASKS.map(({ label, to, at }, i) => {
        const moved = on(at)["data-on"];
        const targetRow = to === "us" ? us++ : hire++;
        const dx = to === "us" ? 291 - adX : 1 - adX;
        const dy = rowY(targetRow) - rowY(i);
        const human = to === "hire";
        return (
          <g
            key={label}
            style={{
              transform: moved ? `translate(${dx}px, ${dy}px)` : "none",
              transition: "transform 0.9s var(--ease-out-expo)",
            }}
          >
            <rect
              x={adX}
              y={rowY(i) - 13}
              width={chipW}
              height={26}
              rx={13}
              fill={moved ? (human ? C.emberSoft : C.ink) : C.taupe}
              stroke={moved ? "none" : C.lineStrong}
              style={{ transition: "fill 0.6s ease" }}
            />
            <text
              x={adX + chipW / 2}
              y={rowY(i) + 4.5}
              fontSize="12.5"
              textAnchor="middle"
              fill={moved ? (human ? C.ember : C.paper) : C.ink2}
              style={{ transition: "fill 0.6s ease" }}
            >
              {label}
            </text>
          </g>
        );
      })}

      <Caption x={65} y={256} anchor="middle" size={10} on={on(4)["data-on"]}>
        People work
      </Caption>
      <Caption x={355} y={256} anchor="middle" size={10} on={on(3)["data-on"]}>
        Done every day
      </Caption>
    </Plate>
  );
}

export const HireSplitScene = story(HireSplitDrawing, {
  steps: 5,
  interval: 1200,
  hold: 4,
  label: "The tasks in a job ad are split: chasing invoices, keying in orders and matching supplier bills go to WebChain; talking to customers and judgement calls stay with your new hire.",
});

/* ---------- How it works: one small plate per step ---------- */

function CallDrawing() {
  const on = useOn();
  return (
    <Plate w={200} h={84}>
      <circle cx={42} cy={42} r={28} fill="none" stroke={C.line} strokeWidth="3" />
      <circle
        cx={42}
        cy={42}
        r={28}
        fill="none"
        stroke={C.violet}
        strokeWidth="3"
        strokeLinecap="round"
        pathLength={1}
        className="x-draw"
        transform="rotate(-90 42 42)"
        {...on(1)}
      />
      <Glyph kind="chat" x={34} y={34} />
      <text x={86} y={38} fontSize="16" fill={C.ink}>
        15 min
      </text>
      <Caption x={86} y={54}>
        One call
      </Caption>
    </Plate>
  );
}

export const CallScene = story(CallDrawing, { steps: 2, interval: 1600, label: "A fifteen-minute call." });

function MapPriceDrawing() {
  const on = useOn();
  const nodes = [24, 70, 116];
  return (
    <Plate w={200} h={84}>
      <path
        d="M24 42 H116"
        stroke={C.ink4}
        strokeWidth="1.25"
        pathLength={1}
        className="x-draw"
        {...on(1)}
      />
      {nodes.map((x, i) => (
        <rect key={x} x={x - 9} y={33} width={18} height={18} rx={5} fill={i === 1 ? C.violet : C.ink} className="x-pop" {...on(i === 0 ? 0 : 1)} />
      ))}
      <g className="x-pop" {...on(2)}>
        <path d="M142 26 h38 a6 6 0 0 1 6 6 v20 a6 6 0 0 1 -6 6 h-38 l-10 -16z" fill={C.ink} />
        <circle cx={142} cy={42} r={2.5} fill={C.paper} />
        <text x={164} y={45.5} fontSize="9" textAnchor="middle" fill={C.paper} className="x-mono">
          Fixed
        </text>
      </g>
    </Plate>
  );
}

export const MapPriceScene = story(MapPriceDrawing, {
  steps: 3,
  interval: 1200,
  label: "The task is mapped step by step, then priced at one fixed monthly figure.",
});

function PlugInDrawing() {
  const on = useOn();
  const tools = [
    { y: 16, label: "Accounts" },
    { y: 42, label: "Sheets" },
    { y: 68, label: "Inbox" },
  ];
  return (
    <Plate w={200} h={84}>
      <SparkOrb cx={26} cy={42} r={16} />
      {tools.map(({ y, label }, i) => {
        const d = `M44 42 C 80 42, 76 ${y}, 112 ${y}`;
        return (
          <g key={label}>
            <Wire d={d} on={on(i + 1)["data-on"]} />
            <rect x={112} y={y - 10} width={80} height={20} rx={10} fill={C.paper} stroke={C.lineStrong} />
            <circle cx={124} cy={y} r={3.5} fill={C.lineStrong} />
            <circle cx={124} cy={y} r={3.5} fill={C.violet} className="x-pop" {...on(i + 1)} />
            <text x={134} y={y + 3.5} fontSize="9.5" fill={C.ink2}>
              {label}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export const PlugInScene = story(PlugInDrawing, {
  steps: 4,
  interval: 900,
  label: "WebChain connects to your accounts package, spreadsheets and inbox, one after another.",
});

function ApproveDrawing() {
  const on = useOn();
  const approved = on(1)["data-on"];
  return (
    <Plate w={200} h={84}>
      <rect x={6} y={14} width={128} height={56} rx={10} fill={C.paper} stroke={C.lineStrong} />
      <rect x={18} y={26} width={64} height={5} rx={2.5} fill={C.ink} />
      <rect x={18} y={37} width={48} height={5} rx={2.5} fill={C.line} />
      {/* Toggle */}
      <rect x={18} y={50} width={30} height={14} rx={7} fill={approved ? C.violet : C.lineStrong} style={{ transition: "fill 0.5s ease" }} />
      <circle
        cx={25}
        cy={57}
        r={5}
        fill={C.paper}
        style={{ transform: approved ? "translateX(16px)" : "none", transition: "transform 0.6s var(--ease-out-expo)" }}
      />
      <Caption x={54} y={60}>
        {approved ? "Approved" : "Approve?"}
      </Caption>
      <Wire d="M134 42 H158" on={on(2)["data-on"]} />
      <Badge cx={176} cy={42} glyph="mail" tone={C.ink} on={on(2)["data-on"]} />
    </Plate>
  );
}

export const ApproveScene = story(ApproveDrawing, {
  steps: 3,
  interval: 1300,
  label: "An item waits for your approval; once you approve it, it goes out.",
});

