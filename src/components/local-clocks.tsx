"use client";

import { useEffect, useState } from "react";

const OFFICES = [
  { city: "Dubai", zone: "Asia/Dubai", code: "DXB" },
  { city: "London", zone: "Europe/London", code: "LDN" },
] as const;

function formatTime(zone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: zone,
  }).format(new Date());
}

/**
 * Live office clocks for the footer. Renders placeholders on the server and
 * starts ticking after mount, so hydration never sees a stale timestamp.
 */
export function LocalClocks() {
  const [times, setTimes] = useState<string[] | null>(null);

  useEffect(() => {
    const tick = () => setTimes(OFFICES.map(({ zone }) => formatTime(zone)));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ul className="space-y-4">
      {OFFICES.map(({ city, code }, i) => (
        <li key={code} className="flex items-baseline justify-between gap-6 border-b border-line pb-3">
          <span className="text-xs font-light text-ink-3">
            {city}
            <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-4">
              {code}
            </span>
          </span>
          <span className="font-mono text-xs tabular-nums text-ink-2" suppressHydrationWarning>
            {times ? times[i] : "--:--:--"}
          </span>
        </li>
      ))}
    </ul>
  );
}
