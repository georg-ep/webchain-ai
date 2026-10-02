"use client";

import { useId } from "react";

/**
 * The brand mark inside every diagram: a soft sphere of violet, ember and
 * peach light, slowly turning. It stands for "where the reasoning happens",
 * so it always sits at the centre of a flow, never as decoration on its own.
 *
 * Pure SVG (blurred gradient fields clipped to a circle) so it scales with
 * the diagram and costs nothing to ship.
 */
export function SparkOrb({
  cx,
  cy,
  r,
  label,
}: {
  cx: number;
  cy: number;
  r: number;
  /** Small caption under the sphere. */
  label?: string;
}) {
  const id = useId().replace(/:/g, "");
  const origin = { transformOrigin: `${cx}px ${cy}px` };

  return (
    <g>
      <defs>
        <clipPath id={`${id}-clip`}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={r * 0.28} />
        </filter>
        <radialGradient id={`${id}-shine`} cx="35%" cy="28%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#44403b" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#44403b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Contact shadow on the paper */}
      <ellipse cx={cx} cy={cy + r * 1.12} rx={r * 0.8} ry={r * 0.14} fill={`url(#${id}-shadow)`} />

      <g clipPath={`url(#${id}-clip)`}>
        <circle cx={cx} cy={cy} r={r} fill="#f3d9cf" />
        <g filter={`url(#${id}-blur)`}>
          <g className="x-spin" style={origin}>
            <circle cx={cx - r * 0.45} cy={cy - r * 0.3} r={r * 0.75} fill="#0447ff" />
            <circle cx={cx + r * 0.5} cy={cy + r * 0.35} r={r * 0.7} fill="#ff4704" />
          </g>
          <g className="x-spin-rev" style={origin}>
            <circle cx={cx + r * 0.35} cy={cy - r * 0.55} r={r * 0.5} fill="#ffb38a" />
            <circle cx={cx - r * 0.3} cy={cy + r * 0.6} r={r * 0.5} fill="#b9a6ff" />
          </g>
        </g>
        <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-shine)`} />
      </g>

      {label && (
        <text
          x={cx}
          y={cy + r + 30}
          textAnchor="middle"
          className="x-mono fill-ink-3"
          fontSize="10"
        >
          {label}
        </text>
      )}
    </g>
  );
}

/** The orb on its own, as a mark above a call to action. */
export function OrbMark({ size = 112, className }: { size?: number; className?: string }) {
  const r = size / 2 - 6;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${size} ${size + 16}`}
      width={size}
      height={size + 16}
      className={className}
    >
      <SparkOrb cx={size / 2} cy={size / 2} r={r} />
    </svg>
  );
}
