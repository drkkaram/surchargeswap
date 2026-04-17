"use client";
import { useEffect, useState } from "react";

// Target: 1 October 2026 at local Sydney midnight.
// +10:00 is AEST (standard time). Sydney switches to AEDT on the first
// Sunday in October, so the ban's effective date (1 Oct 2026) falls just
// before DST kicks in — AEST is correct.
const BAN_TARGET = new Date("2026-10-01T00:00:00+10:00").getTime();

function computeDaysLeft(): number {
  const diff = Math.ceil((BAN_TARGET - Date.now()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

export function DaysCounter() {
  // Start as null to avoid hydration mismatch — server and client clocks differ.
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDays(computeDaysLeft());
    // Re-compute on window focus so the counter stays accurate if the tab
    // has been open across a day-boundary.
    const handler = () => setDays(computeDaysLeft());
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, []);

  if (days === null) return null;

  return (
    <div
      className="flex flex-col items-start gap-1"
      aria-label={`${days} days until the 1 October 2026 RBA surcharge ban`}
    >
      <time
        dateTime="2026-10-01"
        className="font-mono text-6xl font-bold leading-none tracking-tight text-[#E8651A] tabular-nums sm:text-7xl lg:text-8xl"
      >
        {days}
      </time>
      <span className="text-sm font-medium uppercase tracking-widest text-[#E8651A]/70">
        days until 1 Oct 2026
      </span>
    </div>
  );
}
