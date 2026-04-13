"use client";
import { useEffect, useState } from "react";

export function DaysCounter() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date("2026-10-01T00:00:00+10:00");
    const diff = Math.ceil((target.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    setDays(diff > 0 ? diff : 0);
  }, []);

  if (days === null) return null;

  return (
    <div
      className="flex flex-col items-center gap-1"
      aria-label={`${days} days until the 1 October 2026 RBA surcharge ban`}
    >
      <time
        dateTime="2026-10-01"
        className="font-mono text-7xl font-bold leading-none tracking-tight text-[#F97316] sm:text-8xl"
      >
        {days}
      </time>
      <span className="text-sm font-medium uppercase tracking-widest text-[#F97316]/70">
        days until 1 Oct 2026
      </span>
    </div>
  );
}
