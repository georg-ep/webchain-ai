"use client";

import { Glyph, type GlyphKind } from "@/components/explainers/glyph";
import { Packet, Wire as Connector } from "@/components/explainers/kit";
import { Scene, useOn } from "@/components/explainers/scene";
import { SparkOrb } from "@/components/explainers/spark-orb";

export interface FlowInput {
  label: string;
  meta: string;
  glyph: GlyphKind;
}

export interface FlowOutput {
  label: string;
  meta: string;
  /** `review` outputs wait for a person and pulse ember instead of ticking. */
  tone: "done" | "review";
}

const CHIP_H = 52;

/** A labelled card inside the diagram: an input arriving or a result leaving. */
function Chip({
  x,
  cy,
  w,
  label,
  meta,
  glyph,
  status,
  on,
}: {
  x: number;
  cy: number;
  w: number;
  label: string;
  meta: string;
  glyph?: GlyphKind;
  status?: FlowOutput["tone"];
  on: boolean;
}) {
  const y = cy - CHIP_H / 2;
  const textX = x + 40;

  return (
    <g className="x-chip" data-on={on}>
      <rect
        className="x-chip-bg"
        x={x}
        y={y}
        width={w}
        height={CHIP_H}
        rx="12"
        fill="#fdfcfc"
        stroke="#d9d3cc"
      />
      {glyph && <Glyph kind={glyph} x={x + 14} y={cy - 8} />}

      {status === "done" && (
        <g className="x-pop" data-on={on}>
          <circle cx={x + 22} cy={cy} r="9" fill="#0447ff" />
          <path
            d={`M${x + 18} ${cy} l3 3 5.5-6`}
            fill="none"
            stroke="#fdfcfc"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
      {status === "review" && (
        <g className="x-pop" data-on={on}>
          <circle className="x-ping" cx={x + 22} cy={cy} r="7" fill="#ff4704" opacity="0.4" />
          <circle cx={x + 22} cy={cy} r="5" fill="#ff4704" />
        </g>
      )}

      <text x={textX} y={cy - 3} fontSize="13" className="fill-ink">
        {label}
      </text>
      <text x={textX} y={cy + 13} fontSize="9" className="x-mono fill-ink-4">
        {meta}
      </text>
    </g>
  );
}

/** Desktop and tablet: inputs on the left, the orb, results on the right. */
function Horizontal({
  inputs,
  outputs,
  center,
}: {
  inputs: FlowInput[];
  outputs: FlowOutput[];
  center: string;
}) {
  const on = useOn();
  const ys = [80, 190, 300];
  const [ox, oy, r] = [300, 190, 54];
  const inPaths = ys.map((y) => `M182 ${y} C 222 ${y}, 214 ${oy}, ${ox - r - 4} ${oy}`);
  const outPaths = ys.map((y) => `M${ox + r + 4} ${oy} C 386 ${oy}, 378 ${y}, 418 ${y}`);

  return (
    <svg viewBox="0 0 600 390" aria-hidden>
      <text x="10" y="24" fontSize="10" className="x-mono fill-ink-4">
        Arrives
      </text>
      <text x={ox} y="24" fontSize="10" textAnchor="middle" className="x-mono fill-ink-4">
        Handled
      </text>
      <text x="590" y="24" fontSize="10" textAnchor="end" className="x-mono fill-ink-4">
        Done
      </text>

      {inPaths.map((d) => (
        <Connector key={d} d={d} on={on(1)["data-on"]} />
      ))}
      {outPaths.map((d, i) => (
        <Connector key={d} d={d} on={on(3 + i)["data-on"]} />
      ))}

      {/* Work only moves along a connector once its beat has lit it */}
      <g className="x-fade" {...on(1)}>
        {inPaths.map((d, i) => (
          <Packet key={d} path={d} phase={i * 0.8} />
        ))}
      </g>
      {outPaths.map((d, i) => (
        <g key={d} className="x-fade" {...on(3 + i)}>
          <Packet path={d} phase={0.6 + i * 0.8} tone={outputs[i]?.tone === "review" ? "#ff4704" : "#0447ff"} />
        </g>
      ))}

      <SparkOrb cx={ox} cy={oy} r={r} label={center} />

      {inputs.slice(0, 3).map((input, i) => (
        <Chip key={input.label} x={10} cy={ys[i]} w={172} {...input} on={on(1)["data-on"]} />
      ))}
      {outputs.slice(0, 3).map((output, i) => (
        <Chip
          key={output.label}
          x={418}
          cy={ys[i]}
          w={172}
          label={output.label}
          meta={output.meta}
          status={output.tone}
          on={on(3 + i)["data-on"]}
        />
      ))}
    </svg>
  );
}

/** Phones: the same story stacked top to bottom so the type stays legible. */
function Vertical({
  inputs,
  outputs,
  center,
}: {
  inputs: FlowInput[];
  outputs: FlowOutput[];
  center: string;
}) {
  const on = useOn();
  const inYs = [30, 90, 150];
  const outYs = [398, 458, 518];
  const [ox, oy, r] = [180, 274, 46];
  // Phones: the inputs stack above a single trunk into the orb, and one
  // trunk leaves it for the stacked results.
  const inPaths = [`M${ox} ${inYs[2] + CHIP_H / 2} V${oy - r - 6}`];
  const outPaths = [`M${ox} ${oy + r + 6} V${outYs[0] - CHIP_H / 2}`];

  return (
    <svg viewBox="0 0 360 548" aria-hidden>
      <Connector d={inPaths[0]} on={on(1)["data-on"]} />
      <Connector d={outPaths[0]} on={on(3)["data-on"]} />
      <g className="x-fade" {...on(1)}>
        <Packet path={inPaths[0]} dur={1.6} />
        <Packet path={inPaths[0]} dur={1.6} phase={0.8} />
      </g>
      <g className="x-fade" {...on(3)}>
        <Packet path={outPaths[0]} dur={1.6} />
        <Packet path={outPaths[0]} dur={1.6} phase={0.8} tone="#ff4704" />
      </g>

      <SparkOrb cx={ox} cy={oy} r={r} />
      <text x={ox + r + 18} y={oy + 4} fontSize="10" className="x-mono fill-ink-3">
        {center}
      </text>

      {inputs.slice(0, 3).map((input, i) => (
        <Chip key={input.label} x={10} cy={inYs[i]} w={340} {...input} on={on(1)["data-on"]} />
      ))}
      {outputs.slice(0, 3).map((output, i) => (
        <Chip
          key={output.label}
          x={10}
          cy={outYs[i]}
          w={340}
          label={output.label}
          meta={output.meta}
          status={output.tone}
          on={on(3 + i)["data-on"]}
        />
      ))}
    </svg>
  );
}

/**
 * The core explainer: work arrives on the left, passes through the spark
 * orb (our pipelines), and leaves as finished results on the right, with
 * anything that needs a person flagged in ember rather than ticked.
 */
export function FlowExplainer({
  inputs,
  outputs,
  center = "WebChain",
  label,
  className,
}: {
  inputs: FlowInput[];
  outputs: FlowOutput[];
  center?: string;
  label: string;
  className?: string;
}) {
  return (
    <Scene steps={6} interval={1100} hold={4} label={label} className={className}>
      <div className="hidden sm:block">
        <Horizontal inputs={inputs} outputs={outputs} center={center} />
      </div>
      <div className="mx-auto max-w-[420px] sm:hidden">
        <Vertical inputs={inputs} outputs={outputs} center={center} />
      </div>
    </Scene>
  );
}
