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
      className="inline-flex items-center gap-2 rounded-sm border border-[#EF4444]/30 bg-[#EF4444]/5 px-3 py-1.5 text-sm"
      aria-label={`${days} days until the 1 October 2026 RBA surcharge ban`}
    >
      <time dateTime="2026-10-01" className="font-mono font-bold text-[#EF4444]">{days}</time>
      <span className="text-[#525252]">days until 1 October 2026 surcharge ban</span>
    </div>
  );
}
