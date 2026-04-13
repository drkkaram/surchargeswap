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
      className="inline-flex flex-col items-center gap-2 rounded-2xl border border-red-200/60 bg-red-50/80 backdrop-blur-sm px-6 py-3 text-center"
      aria-label={`${days} days until the 1 October 2026 RBA surcharge ban`}
    >
      <time 
        dateTime="2026-10-01" 
        className="font-mono text-4xl font-bold text-[#DC2626]"
      >
        {days}
      </time>
      <span className="text-center text-sm font-medium leading-tight text-[#DC2626]/80">
        days until 1 Oct 2026 surcharge ban
      </span>
    </div>
  );
}
