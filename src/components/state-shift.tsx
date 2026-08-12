import { Reveal } from "@/components/reveal";
import { FaultDiagram, FlowDiagram } from "@/components/system-diagram";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

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
        "panel panel-hover group relative h-full w-full overflow-hidden rounded-2xl p-5 md:p-6",
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

/**
 * The state shift: the two system states side by side, with the transition
 * marker between them and the anchoring metric beneath.
 */
export function StateShift() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
        <Reveal className="flex">
          <StateCard
            label="Before"
            status="Stuck"
            tone="fault"
            diagram={<FaultDiagram />}
            points={BEFORE_POINTS}
          />
        </Reveal>

        {/* Transition marker: points right on wide screens, down when stacked */}
        <Reveal delay={120} className="flex items-center justify-center lg:px-2">
          {/* Stacked on small screens, so the marker points down there and
              right once the cards sit side by side. */}
          <div aria-hidden className="flex flex-col items-center gap-2 lg:flex-row">
            <span className="h-8 w-px bg-gradient-to-b from-fault/30 to-signal/40 lg:h-px lg:w-8 lg:bg-gradient-to-r" />
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-signal/25 bg-signal-soft text-signal">
              <ArrowRight className="h-3.5 w-3.5 rotate-90 lg:rotate-0" strokeWidth={1.5} />
            </span>
            <span className="h-8 w-px bg-gradient-to-b from-signal/40 to-transparent lg:h-px lg:w-8 lg:bg-gradient-to-r" />
          </div>
        </Reveal>

        <Reveal delay={220} className="flex">
          <StateCard
            label="After"
            status="Flowing"
            tone="flow"
            diagram={<FlowDiagram />}
            points={AFTER_POINTS}
          />
        </Reveal>
      </div>

      <Reveal delay={300}>
        <div className="panel panel-hover relative mt-6 overflow-hidden rounded-2xl px-6 py-5 lg:mt-4">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_70%_100%_at_100%_50%,rgba(52,211,153,0.10),transparent_70%)]"
          />
          <div className="relative flex flex-wrap items-end justify-between gap-4">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-ink-4">
              Typical Outcome
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-2xl tracking-tight text-ink tabular-nums md:text-3xl">
                40–60 hrs
              </span>
              <span className="font-mono text-[10px] text-ink-4">reclaimed / team / week</span>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
