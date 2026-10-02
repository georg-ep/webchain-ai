"use client";

import { Scene, useOn } from "@/components/explainers/scene";
import { cn } from "@/lib/utils";

export interface ActivityEntry {
  time: string;
  title: string;
  detail: string;
  /** `review` waits on the customer; `approved` is their decision. */
  tone?: "done" | "review" | "approved";
}

const TONE_DOT = {
  done: "bg-ink-3",
  review: "bg-ember",
  approved: "bg-signal",
} as const;

const TONE_TAG = {
  done: null,
  review: { text: "Needs you", className: "bg-ember-soft text-ember" },
  approved: { text: "Approved", className: "bg-signal-soft text-signal" },
} as const;

function Rows({ entries }: { entries: ActivityEntry[] }) {
  const on = useOn();
  return (
    <ol className="divide-y divide-line">
      {entries.map(({ time, title, detail, tone = "done" }, i) => {
        const tag = TONE_TAG[tone];
        return (
          <li key={time + title} className="x-row flex items-start gap-4 px-5 py-4 sm:px-6" {...on(i)}>
            <span className="w-11 shrink-0 pt-0.5 font-mono text-[11px] tabular-nums text-ink-4">
              {time}
            </span>
            <span className={cn("mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full", TONE_DOT[tone])} />
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-ink">{title}</span>
                {tag && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em]",
                      tag.className,
                    )}
                  >
                    {tag.text}
                  </span>
                )}
              </span>
              <span className="mt-1 block text-[13px] leading-relaxed text-ink-3">{detail}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * "You see every action", shown rather than told: a day's log filling in
 * line by line, with the one item that waits on the customer marked in
 * ember and their approval landing at the end.
 */
export function ActivityLog({
  entries,
  heading = "Activity · today",
}: {
  entries: ActivityEntry[];
  heading?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface-0">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5 sm:px-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
          {heading}
        </span>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-4">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-breathe" />
          Live
        </span>
      </div>
      <Scene steps={entries.length} interval={1300} hold={4}>
        <Rows entries={entries} />
      </Scene>
    </div>
  );
}
