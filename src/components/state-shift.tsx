import { Reveal } from "@/components/reveal";
import { FaultDiagram, FlowDiagram } from "@/components/system-diagram";
import { cn } from "@/lib/utils";

const BEFORE_POINTS = [
  "High-leverage decisions trapped in Slack",
  "Engineers babysitting brittle automations",
  "Every edge case becoming a meeting",
];

const AFTER_POINTS = [
  "Decisions executed at machine speed",
  "Systems reason through unfamiliar inputs",
  "Edge cases handled without escalation",
];

/**
 * One half of the diptych. Deliberately not a floating card: the two states
 * live inside a single instrument panel, split by a hairline, so the eye
 * compares them across a shared baseline instead of reading two boxes.
 */
function StatePane({
  label,
  status,
  tone,
  diagram,
  points,
}: {
  label: string;
  status: string;
  tone: "fault" | "flow";
  diagram: React.ReactNode;
  points: string[];
}) {
  const isFlow = tone === "flow";

  return (
    <div className="group/pane relative flex flex-col">
      {/* Tone wash, stronger on hover */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-700 group-hover/pane:opacity-100",
          isFlow
            ? "bg-[radial-gradient(ellipse_75%_60%_at_50%_100%,rgba(52,211,153,0.08),transparent_70%)]"
            : "bg-[radial-gradient(ellipse_75%_60%_at_50%_100%,rgba(248,113,113,0.05),transparent_70%)]",
        )}
      />

      {/* Header row */}
      <div className="relative flex items-baseline justify-between gap-4 px-6 pt-7 md:px-9 md:pt-9">
        <div className="flex items-center gap-3">
          <span className={cn("relative flex h-1.5 w-1.5", isFlow ? "text-signal" : "text-fault")}>
            <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-60 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
          </span>
          <span
            className={cn(
              "font-mono text-[11px] font-medium uppercase tracking-[0.34em]",
              isFlow ? "text-signal" : "text-fault/80",
            )}
          >
            {label}
          </span>
        </div>

        <span
          className={cn(
            "font-mono text-[10px] uppercase tracking-[0.22em]",
            isFlow ? "text-signal/70" : "text-fault/60",
          )}
        >
          {status}
        </span>
      </div>

      {/* Diagram, bleeding to the pane edges and sitting on a shared baseline */}
      <div className="relative mt-8 px-4 md:mt-10 md:px-6">{diagram}</div>

      {/* Spec list */}
      <ul className="relative mt-8 px-6 pb-8 md:px-9 md:pb-10">
        {points.map((point, i) => (
          <li
            key={point}
            className="flex items-baseline gap-4 border-t border-line py-3.5 first:border-t-0 md:py-4"
          >
            <span
              className={cn(
                "font-mono text-[10px] tabular-nums",
                isFlow ? "text-signal/60" : "text-ink-4",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "text-[13px] font-light leading-relaxed md:text-sm",
                isFlow ? "text-ink" : "text-ink-3",
              )}
            >
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The before/after diptych plus the anchoring metric, as one instrument. */
export function StateShift() {
  return (
    <Reveal>
      <div className="panel relative overflow-hidden rounded-3xl">
        {/* Corner registration marks */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="absolute left-5 top-5 h-3 w-3 border-l border-t border-white/15" />
          <span className="absolute right-5 top-5 h-3 w-3 border-r border-t border-white/15" />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2">
          {/* Divider: horizontal when stacked, vertical when side by side */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent lg:inset-x-auto lg:inset-y-0 lg:left-1/2 lg:h-auto lg:w-px lg:bg-gradient-to-b"
          />

          {/* Transition marker riding the divider */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-signal/25 bg-surface-2 text-signal"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 rotate-90 lg:rotate-0">
              <path
                d="M4 12h14m0 0-5-5m5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <StatePane
            label="Before"
            status="Stuck"
            tone="fault"
            diagram={<FaultDiagram />}
            points={BEFORE_POINTS}
          />
          <StatePane
            label="After"
            status="Flowing"
            tone="flow"
            diagram={<FlowDiagram />}
            points={AFTER_POINTS}
          />
        </div>

        {/* Metric footer, part of the same instrument */}
        <div className="relative border-t border-line bg-white/[0.02]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 px-6 py-7 md:px-9 md:py-8">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-ink-4">
              Typical Outcome
            </span>
            <div className="flex items-baseline gap-4">
              <span className="whitespace-nowrap font-display text-3xl tracking-tight text-ink tabular-nums md:text-4xl">
                40–60 hrs
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4">
                reclaimed / team / week
              </span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
