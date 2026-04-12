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
    <div className="border border-amber-200 bg-amber-50/50 p-5 rounded-sm">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-lg">&#9888;&#65039;</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#0A0A0A]">
            BNPL is not covered by this ban
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#525252]">
            <strong>Note:</strong> This ban covers credit and debit card surcharges only.
            Buy Now Pay Later (BNPL) services like Afterpay and Zip have separate
            surcharge rules and are not covered by this ban.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#525252]">
            Your BNPL volume: {formatCurrency(bnplRevenue)}/mo at ~4.5% MSF (est. Afterpay/Zip; Klarna/Humm varies) ={" "}
            {formatCurrency(bnplMsfCost)}/mo ongoing cost.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#525252]">
            <strong>BNPL MSF is a pre-existing cost</strong> — most BNPL agreements already prohibit you from surcharging customers for it. Toggle it on to see your total payment cost picture.
          </p>
          <button
            type="button"
            onClick={() => onToggle(!includeBnpl)}
            className="mt-3 flex items-center gap-2 text-sm font-medium text-[#0A0A0A]"
          >
            <span
              className={`flex h-5 w-9 items-center rounded-sm p-0.5 transition-colors ${
                includeBnpl ? "bg-[#0EA5E9]" : "bg-[#E5E5E5]"
              }`}
            >
              <span
                className={`h-4 w-4 rounded-sm bg-white shadow transition-transform ${
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
