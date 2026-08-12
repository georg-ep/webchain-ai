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

function StateCard({
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
    <div
      className={cn(
        "panel panel-hover group relative overflow-hidden rounded-xl p-4",
        isFlow && "border-signal/15",
      )}
    >
      {/* Tone wash */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-32 opacity-60 transition-opacity duration-700 group-hover:opacity-100",
          isFlow
            ? "bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(52,211,153,0.10),transparent_70%)]"
            : "bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(248,113,113,0.07),transparent_70%)]",
        )}
      />

      <div className="relative">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "relative flex h-1.5 w-1.5",
              isFlow ? "text-signal" : "text-fault",
            )}
          >
            <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-70 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
          </span>
          <span
            className={cn(
              "font-mono text-[10px] font-medium uppercase tracking-[0.28em]",
              isFlow ? "text-signal/90" : "text-fault/70",
            )}
          >
            {label}
          </span>
          <span
            className={cn(
              "h-px flex-1",
              isFlow
                ? "bg-gradient-to-r from-signal/30 to-transparent"
                : "bg-gradient-to-r from-fault/20 to-transparent",
            )}
          />
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em]",
              isFlow
                ? "border-signal/25 bg-signal-soft text-signal/90"
                : "border-fault/25 bg-fault-soft text-fault/90",
            )}
          >
            {status}
          </span>
        </div>

        <div className="relative mt-3.5 overflow-hidden rounded-lg border border-line bg-surface-0/60 px-3 py-2.5">
          <div
            aria-hidden
            className="grid-fine pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)]"
          />
          <div className="relative">{diagram}</div>
        </div>

        <ul className="mt-4 space-y-2">
          {points.map((point) => (
            <li
              key={point}
              className={cn(
                "flex items-start gap-2.5 text-[13px] font-light leading-relaxed transition-colors",
                isFlow ? "text-ink" : "text-ink-3",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "mt-[7px] h-px w-3 shrink-0",
                  isFlow ? "bg-signal/60" : "bg-ink-4",
                )}
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** The hero's right-hand column: the before/after state shift plus the anchoring metric. */
export function StateShift() {
  return (
    <div className="flex w-full flex-col gap-3">
      <StateCard
        label="Before"
        status="Stuck"
        tone="fault"
        diagram={<FaultDiagram />}
        points={BEFORE_POINTS}
      />
      <StateCard
        label="After"
        status="Flowing"
        tone="flow"
        diagram={<FlowDiagram />}
        points={AFTER_POINTS}
      />

      <div className="panel panel-hover relative overflow-hidden rounded-xl px-4 py-3.5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_70%_100%_at_100%_50%,rgba(52,211,153,0.10),transparent_70%)]"
        />
        <div className="relative flex items-end justify-between gap-4">
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-ink-4">
            Typical Outcome
          </span>
          <div className="text-right">
            <div className="font-mono text-xl tracking-tight text-ink tabular-nums">40–60 hrs</div>
            <div className="mt-0.5 font-mono text-[10px] text-ink-4">reclaimed / team / week</div>
          </div>
        </div>
      </div>
    </div>
  );
}
