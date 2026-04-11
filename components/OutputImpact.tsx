"use client";

import type { CalculatorResult } from "@/lib/calculator";
import { formatCurrency } from "@/lib/calculator";
import { BNPLToggle } from "./BNPLToggle";

interface OutputImpactProps {
  result: CalculatorResult;
  includeBnpl: boolean;
  onToggleBnpl: (value: boolean) => void;
}

export function OutputImpact({
  result,
  includeBnpl,
  onToggleBnpl,
}: OutputImpactProps) {
  const totalMonthly = includeBnpl
    ? result.netMonthlyImpact + result.bnplMsfCost
    : result.netMonthlyImpact;
  const totalAnnual = totalMonthly * 12;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-[#525252]">
          Monthly Impact
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <p className="text-sm text-[#525252]">
            Revenue you&apos;ll stop collecting
          </p>
          <p className="font-mono text-lg font-bold text-[#EF4444]">
            -{formatCurrency(result.surchargeRevenueLost)}
          </p>
        </div>

        {includeBnpl && (
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-[#525252]">BNPL MSF cost (ongoing)</p>
            <p className="font-mono text-lg font-bold text-[#EF4444]">
              -{formatCurrency(result.bnplMsfCost)}
            </p>
          </div>
        )}

        <div className="border-t-2 border-[#0A0A0A] pt-3">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-semibold text-[#0A0A0A]">
              Net monthly hit
            </p>
            <p className="font-mono text-2xl font-bold text-[#EF4444]">
              -{formatCurrency(totalMonthly)}
            </p>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <p className="text-sm text-[#525252]">Annual equivalent</p>
            <p className="font-mono text-lg font-bold text-[#EF4444]">
              -{formatCurrency(totalAnnual)}
            </p>
          </div>
        </div>
      </div>

      <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-5 rounded-sm">
        <p className="text-sm font-semibold text-[#0A0A0A]">
          Amex is exempt from the ban
        </p>
        <p className="mt-1 text-sm leading-relaxed text-[#525252]">
          You can still surcharge Amex payments. Your Amex revenue:{" "}
          <span className="font-mono font-semibold text-[#0A0A0A]">
            {formatCurrency(result.amexRevenue)}
          </span>
          /mo &rarr; recoverable surcharge:{" "}
          <span className="font-mono font-semibold text-[#22C55E]">
            {formatCurrency(result.amexSurchargeRecovery)}
          </span>
          /mo
        </p>
      </div>

      <BNPLToggle
        bnplRevenue={result.bnplRevenue}
        bnplMsfCost={result.bnplMsfCost}
        includeBnpl={includeBnpl}
        onToggle={onToggleBnpl}
      />
    </div>
  );
}
