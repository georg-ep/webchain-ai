"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation in degrees at the card edges. */
  maxTilt?: number;
};

/**
 * Pointer-tracked 3D tilt surface. Writes rotation (--rx/--ry) and glare
 * hotspot (--gx/--gy) CSS vars consumed by `.tilt-card` / `.tilt-glare`, and
 * flags `data-tilting` so CSS can tighten the transition while tracking.
 *
 * Children are laid out in a preserve-3d context, so `.tilt-layer` children
 * with a `--tz` var float above the card face. Mouse-only by design: touch
 * pointers are ignored and prefers-reduced-motion flattens the card in CSS.
 */
export function TiltCard({ children, className, maxTilt = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse") return;
      const node = ref.current;
      if (!node) return;
      const { clientX, clientY } = e;

      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const px = (clientX - rect.left) / rect.width - 0.5;
        const py = (clientY - rect.top) / rect.height - 0.5;
        node.style.setProperty("--rx", `${(-py * maxTilt).toFixed(2)}deg`);
        node.style.setProperty("--ry", `${(px * maxTilt).toFixed(2)}deg`);
        node.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
        node.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
        node.dataset.tilting = "true";
      });
    },
    [maxTilt],
  );

  const handleLeave = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    cancelAnimationFrame(frame.current);
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
    node.dataset.tilting = "false";
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn("tilt-card", className)}
    >
      {children}
    </div>
  );
}
