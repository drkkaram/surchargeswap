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
      className="inline-flex flex-col items-center gap-2 rounded-lg border-2 border-[#F97316] bg-[#0F172A] px-8 py-6"
      aria-label={`${days} days until the 1 October 2026 RBA surcharge ban`}
    >
      <time 
        dateTime="2026-10-01" 
        className="font-mono text-7xl font-black leading-none text-[#F97316] sm:text-8xl"
      >
        {days}
      </time>
      <span className="text-center text-sm font-medium leading-tight text-white/90 sm:text-base">
        days until 1 Oct 2026 surcharge ban
      </span>
    </div>
  );
}
