import { cn } from "@/lib/utils";

/**
 * The small monospaced eyebrow used to open every section, with a hairline
 * rule that ties it back to the grid.
 */
export function SectionLabel({
  children,
  className,
  tone = "muted",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "muted" | "signal";
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "h-1 w-1 rotate-45",
          tone === "signal" ? "bg-signal" : "bg-ink-4",
        )}
      />
      <span
        className={cn(
          "font-mono text-[10px] font-medium uppercase tracking-[0.28em]",
          tone === "signal" ? "text-signal/80" : "text-ink-3",
        )}
      >
        {children}
      </span>
      <span className="rule h-px flex-1 max-w-24" />
    </div>
  );
}
