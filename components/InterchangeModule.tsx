"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/calculator";

interface InterchangeModuleProps {
  interchangeSaving: number;
}

export function InterchangeModule({
  interchangeSaving,
}: InterchangeModuleProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-[#E5E5E0] bg-[#F5F5F0] p-5 rounded-md">
      <div className="flex items-start gap-3">
        <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#E8651A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#0B1C3D]">
            Interchange passthrough &mdash; ask your processor this question
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#4A5568]">
            The RBA is reducing credit card interchange from ~0.80% to ~0.30%.
            Blended flat-rate processors (Zeller, Square) may NOT automatically
            pass this saving to you. Cost-plus processors (Tyro, some banks)
            will.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#4A5568]">
            At your volume, the interchange saving is worth approximately{" "}
            <span className="font-mono font-semibold tabular-nums text-[#16A34A]">
              {formatCurrency(interchangeSaving)}
            </span>
            /month <span className="text-[#6B7280]">(est. — cost-plus pricing only; exact rate pending RBA final determination)</span>.
          </p>
          <p className="mt-2 text-sm font-medium text-[#0B1C3D]">
            Ask your processor: &ldquo;Do you use cost-plus pricing or blended
            flat rate?&rdquo;
          </p>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-sm font-medium text-[#E8651A] hover:text-[#C4541A]"
          >
            {expanded ? "Hide details" : "What this means for you"}
          </button>
          {expanded && (
            <div className="mt-3 space-y-2 border-t border-[#E5E5E0] pt-3">
              <p className="text-sm leading-relaxed text-[#4A5568]">
                <strong className="text-[#0B1C3D]">Cost-plus pricing</strong>{" "}
                means you pay the actual interchange fee set by card networks
                plus a fixed processor margin. When interchange drops, your rate
                drops automatically.
              </p>
              <p className="text-sm leading-relaxed text-[#4A5568]">
                <strong className="text-[#0B1C3D]">Blended flat rate</strong>{" "}
                means you pay a single percentage regardless of the underlying
                interchange. The processor pockets any interchange reduction
                unless they voluntarily lower their rate.
              </p>
              <p className="text-sm leading-relaxed text-[#4A5568]">
                At your volume, switching from a flat-rate processor to a
                cost-plus processor could save you an additional{" "}
                <span className="font-mono font-semibold text-[#0B1C3D]">
                  {formatCurrency(interchangeSaving)}
                </span>
                /month on top of any rate improvement.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
