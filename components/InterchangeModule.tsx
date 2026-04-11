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
    <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-5 rounded-sm">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-base">&#128161;</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#0A0A0A]">
            Interchange passthrough &mdash; ask your processor this question
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#525252]">
            The RBA is reducing credit card interchange from ~0.80% to ~0.30%.
            Blended flat-rate processors (Zeller, Square) may NOT automatically
            pass this saving to you. Cost-plus processors (Tyro, some banks)
            will.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#525252]">
            At your volume, the interchange saving is worth ~
            <span className="font-mono font-bold text-[#0A0A0A]">
              {formatCurrency(interchangeSaving)}
            </span>
            /month.
          </p>
          <p className="mt-2 text-sm font-medium text-[#0A0A0A]">
            Ask your processor: &ldquo;Do you use cost-plus pricing or blended
            flat rate?&rdquo;
          </p>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-sm font-medium text-[#0EA5E9] hover:text-[#0284C7]"
          >
            {expanded ? "▾ Hide details" : "▸ What this means for you"}
          </button>
          {expanded && (
            <div className="mt-3 space-y-2 border-t border-[#E5E5E5] pt-3">
              <p className="text-sm leading-relaxed text-[#525252]">
                <strong className="text-[#0A0A0A]">Cost-plus pricing</strong>{" "}
                means you pay the actual interchange fee set by card networks
                plus a fixed processor margin. When interchange drops, your rate
                drops automatically.
              </p>
              <p className="text-sm leading-relaxed text-[#525252]">
                <strong className="text-[#0A0A0A]">Blended flat rate</strong>{" "}
                means you pay a single percentage regardless of the underlying
                interchange. The processor pockets any interchange reduction
                unless they voluntarily lower their rate.
              </p>
              <p className="text-sm leading-relaxed text-[#525252]">
                At your volume, switching from a flat-rate processor to a
                cost-plus processor could save you an additional{" "}
                <span className="font-mono font-semibold text-[#0A0A0A]">
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
