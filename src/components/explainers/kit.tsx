"use client";

import { Glyph, type GlyphKind } from "@/components/explainers/glyph";

/*
 * Drawing kit shared by every explainer: the palette as plain values (SVG
 * presentation attributes can't read Tailwind classes) and the handful of
 * shapes the diagrams are built from.
 */

export const C = {
  ink: "#0b0b0b",
  ink2: "#44403b",
  ink3: "#6f6962",
  ink4: "#9a948c",
  line: "#e7e3de",
  lineStrong: "#d9d3cc",
  paper: "#fdfcfc",
  taupe: "#f5f3f1",
  stone: "#efece8",
  violet: "#0447ff",
  violetSoft: "rgba(4,71,255,0.1)",
  ember: "#ff4704",
  emberSoft: "rgba(255,71,4,0.1)",
} as const;

/** An SVG canvas for a small plate. Defaults to the 280×140 card plate. */
export function Plate({
  w = 280,
  h = 140,
  children,
}: {
  w?: number;
  h?: number;
  children: React.ReactNode;
}) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} aria-hidden>
      {children}
    </svg>
  );
}

/** A sheet of paper: documents, windows, panels inside a diagram. */
export function Sheet({
  x,
  y,
  w,
  h,
  rx = 8,
  fill = C.paper,
  dashed = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rx?: number;
  fill?: string;
  dashed?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={rx}
      fill={fill}
      stroke={C.lineStrong}
      strokeDasharray={dashed ? "4 4" : undefined}
    />
  );
}

/** A line of placeholder text. With `grow`, it draws itself in on its beat. */
export function Bar({
  x,
  y,
  w,
  h = 5,
  tone = C.line,
  grow = false,
  on,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  tone?: string;
  grow?: boolean;
  on?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={h / 2}
      fill={tone}
      className={grow ? "x-grow-x" : undefined}
      data-on={on}
    />
  );
}

/** A round badge with an icon, popping in on its beat. */
export function Badge({
  cx,
  cy,
  glyph,
  tone = C.violet,
  r = 13,
  on,
}: {
  cx: number;
  cy: number;
  glyph: GlyphKind;
  tone?: string;
  r?: number;
  on?: boolean;
}) {
  return (
    <g className="x-pop" data-on={on}>
      <circle cx={cx} cy={cy} r={r} fill={tone} />
      <Glyph kind={glyph} x={cx - 8} y={cy - 8} stroke={C.paper} />
    </g>
  );
}

/** Small mono caption. */
export function Caption({
  x,
  y,
  children,
  anchor = "start",
  tone = C.ink4,
  size = 8,
  on,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: "start" | "middle" | "end";
  tone?: string;
  size?: number;
  on?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      textAnchor={anchor}
      fill={tone}
      className={on === undefined ? "x-mono" : "x-mono x-fade"}
      data-on={on}
    >
      {children}
    </text>
  );
}

/**
 * Width of a mono caption in diagram units. Geist Mono advances 0.6em per
 * character and captions add 0.08em tracking, so labels can be measured
 * exactly and pills sized to fit them rather than guessed.
 */
export const monoWidth = (text: string, size: number) => text.length * size * 0.68;

/**
 * A filled pill with a mono label: statuses like "Posted" or "Live". Sized
 * to its label unless a width is given; `align` says which edge (or the
 * centre) `x` refers to.
 */
export function Pill({
  x,
  y,
  w,
  label,
  tone = "ink",
  h = 18,
  size = 8,
  align = "start",
  className,
  on,
}: {
  x: number;
  y: number;
  w?: number;
  label: string;
  tone?: "ink" | "violet" | "ember" | "paper";
  h?: number;
  /** Label font size, in diagram units. */
  size?: number;
  align?: "start" | "middle" | "end";
  className?: string;
  on?: boolean;
}) {
  const width = Math.max(w ?? 0, monoWidth(label, size) + Math.max(h, size * 2.6));
  const left = align === "start" ? x : align === "middle" ? x - width / 2 : x - width;
  const [bg, fg, stroke] =
    tone === "ink"
      ? [C.ink, C.paper, undefined]
      : tone === "violet"
        ? [C.violetSoft, C.violet, undefined]
        : tone === "ember"
          ? [C.emberSoft, C.ember, undefined]
          : [C.paper, C.ink2, C.lineStrong];
  return (
    <g className={className} data-on={on}>
      <rect x={left} y={y} width={width} height={h} rx={h / 2} fill={bg} stroke={stroke} />
      <text
        // Tracking trails the last letter too; nudge right to stay centred.
        x={left + width / 2 + size * 0.04}
        y={y + h / 2 + size * 0.36}
        fontSize={size}
        textAnchor="middle"
        fill={fg}
        className="x-mono"
      >
        {label}
      </text>
    </g>
  );
}

/**
 * A dot that steps along with the story: it sits at `points[step]` and
 * glides to the next point on each beat, so moving work stays in time with
 * whatever lights up, unlike a free-running animation.
 */
export function Token({
  points,
  step,
  tone = C.violet,
  r = 4,
  duration = 0.8,
}: {
  points: [number, number][];
  step: number;
  tone?: string;
  r?: number;
  duration?: number;
}) {
  const [x, y] = points[Math.max(0, Math.min(step, points.length - 1))];
  return (
    <g
      data-on
      style={{
        transform: `translate(${x}px, ${y}px)`,
        transition: `transform ${duration}s var(--ease-out-expo)`,
      }}
    >
      <circle r={r * 2.2} fill={tone} opacity="0.14" />
      <circle r={r} fill={tone} />
    </g>
  );
}

/**
 * A dot of work travelling along a path, forever.
 *
 * The phase is applied as a negative `begin`, so the dot is already partway
 * along its path on the very first frame. A positive delay would leave it
 * parked at the SVG origin until it started, which shows up as a stray dot
 * in the corner of the diagram on page load.
 */
export function Packet({
  path,
  phase = 0,
  dur = 2.4,
  tone = C.violet,
  r = 3.5,
}: {
  path: string;
  /** Seconds into the loop this dot starts at. */
  phase?: number;
  dur?: number;
  tone?: string;
  r?: number;
}) {
  const motion = (
    <animateMotion
      dur={`${dur}s`}
      begin={`${-(phase % dur)}s`}
      repeatCount="indefinite"
      path={path}
      calcMode="spline"
      keyTimes="0;1"
      keySplines="0.45 0 0.55 1"
    />
  );
  return (
    <g>
      <circle r={r * 2} fill={tone} opacity="0.12">
        {motion}
      </circle>
      <circle r={r} fill={tone}>
        {motion}
      </circle>
    </g>
  );
}

/** A connector: hairline track, plus marching dashes once it's live. */
export function Wire({ d, on, tone = C.ink4 }: { d: string; on?: boolean; tone?: string }) {
  return (
    <>
      <path d={d} fill="none" stroke={C.line} strokeWidth="1.25" />
      <path d={d} fill="none" stroke={tone} strokeWidth="1.25" className="x-flow x-fade" data-on={on} />
    </>
  );
}
