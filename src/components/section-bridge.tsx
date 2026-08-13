import { cn } from "@/lib/utils";

/**
 * Connective thread between two sections: a centred hairline with a pulse
 * running down it and a junction node at the seam, so the page reads as one
 * continuous circuit rather than a stack of slabs.
 *
 * Negative margins cancel the element's own height, so it paints across the
 * seam without adding any layout of its own.
 */
export function SectionBridge({
  className,
  delay = 0,
}: {
  className?: string;
  /** Seconds. Staggers the pulse so the threads don't fire in lockstep. */
  delay?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none relative z-10 mx-auto -my-16 h-32 w-px", className)}
    >
      <span className="absolute inset-0 overflow-hidden bg-gradient-to-b from-transparent via-line-strong to-transparent">
        <span
          className="absolute inset-x-0 top-0 h-10 animate-bridge bg-gradient-to-b from-transparent via-signal to-transparent"
          style={delay ? { animationDelay: `${delay}s` } : undefined}
        />
      </span>
      {/* Junction at the seam: a faded crossbar plus a node diamond,
          matching the diamonds on the phase rail */}
      <span className="absolute left-1/2 top-1/2 h-px w-28 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-signal/40 bg-surface-0" />
    </div>
  );
}
