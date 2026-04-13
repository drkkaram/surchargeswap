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
      className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5"
      aria-label={`${days} days until the 1 October 2026 RBA surcharge ban`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
      <span className="text-sm font-semibold text-red-600">
        <time dateTime="2026-10-01">{days} days</time>
        {" "}until surcharges are banned
      </span>
    </div>
  );
}
