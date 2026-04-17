"use client";

import { formatCurrency } from "@/lib/calculator";

interface BNPLToggleProps {
  bnplRevenue: number;
  bnplMsfCost: number;
  includeBnpl: boolean;
  onToggle: (value: boolean) => void;
}

export function BNPLToggle({
  bnplRevenue,
  bnplMsfCost,
  includeBnpl,
  onToggle,
}: BNPLToggleProps) {
  return (
    <div className="border border-[#E5E5E0] bg-[#F5F5F0] p-5 rounded-md">
      <div className="flex items-start gap-3">
        <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#E8651A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#0B1C3D]">
            BNPL is not covered by this ban
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#4A5568]">
            <strong>Note:</strong> This ban covers credit and debit card surcharges only.
            Buy Now Pay Later (BNPL) services like Afterpay and Zip have separate
            surcharge rules and are not covered by this ban.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#4A5568]">
            Your BNPL volume: {formatCurrency(bnplRevenue)}/mo at ~4.5% MSF (est. Afterpay/Zip; Klarna/Humm varies) ={" "}
            {formatCurrency(bnplMsfCost)}/mo ongoing cost.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#4A5568]">
            <strong>BNPL MSF is a pre-existing cost</strong> — most BNPL agreements already prohibit you from surcharging customers for it. Toggle it on to see your total payment cost picture.
          </p>
          <button
            type="button"
            onClick={() => onToggle(!includeBnpl)}
            className="mt-3 flex items-center gap-2 text-sm font-medium text-[#0B1C3D]"
          >
            <span
              className={`flex h-5 w-9 items-center rounded-md p-0.5 transition-colors ${
                includeBnpl ? "bg-[#E8651A]" : "bg-[#E5E5E0]"
              }`}
            >
              <span
                className={`h-4 w-4 rounded-md bg-white shadow-sm transition-transform ${
                  includeBnpl ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </span>
            Include BNPL in my total cost analysis
          </button>
        </div>
      </div>
    </div>
  );
}
