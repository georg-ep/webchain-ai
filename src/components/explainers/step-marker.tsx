"use client";

import { useStep } from "@/components/explainers/scene";
import { cn } from "@/lib/utils";

/**
 * The progress line along the top of a process step. Inside a <Scene>, the
 * steps light up one after another and then reset, so a row of cards reads
 * as a sequence rather than a list.
 */
export function StepMarker({ index }: { index: number }) {
  const active = useStep() >= index;
  return (
    <span aria-hidden className="absolute inset-x-7 top-0 h-px overflow-hidden bg-line">
      <span
        data-on={active}
        className={cn(
          "x-bar absolute inset-0",
          index % 2 ? "bg-ember" : "bg-signal",
        )}
      />
    </span>
  );
}

/** The step's diamond, filled once its beat arrives. */
export function StepDiamond({ index }: { index: number }) {
  const active = useStep() >= index;
  return (
    <span
      className={cn(
        "h-2 w-2 rotate-45 border transition-colors duration-500",
        active ? "border-ink bg-ink" : "border-ink-4 bg-transparent",
      )}
    />
  );
}
