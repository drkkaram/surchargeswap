"use client";

import type { CalculatorResult } from "@/lib/calculator";
import { formatCurrency } from "@/lib/calculator";
import { ProcessorCard } from "./ProcessorCard";
import { InterchangeModule } from "./InterchangeModule";

interface OutputCompareProps {
  result: CalculatorResult;
}

export function OutputCompare({ result }: OutputCompareProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-[#374151]">
          Processor Comparison
        </p>
        <p className="mt-1 text-sm text-[#374151]">
          Based on your{" "}
          <span className="font-mono font-semibold text-[#0F172A]">
            {formatCurrency(result.coveredCardRevenue)}
          </span>
          /mo in covered card revenue (Visa, Mastercard and eftpos only). Ranked by lowest monthly cost to you.
        </p>
        <p className="text-xs text-[#374151] mt-1">
          Amex and BNPL volume not included. Those run at separate rates outside this comparison.
        </p>
      </div>

      <div className="space-y-4">
        {result.processorComparison.map((comp) => (
          <ProcessorCard key={comp.processor.id} comparison={comp} />
        ))}
      </div>

      <InterchangeModule interchangeSaving={result.interchangeSaving} />

      <p className="text-xs text-[#6B7280] mt-2">
        * SurchargeSwap may earn a referral fee if you sign up through our links. This doesn&apos;t affect our rankings or fee data.{' '}
        <a href="/affiliate-disclosure" className="underline">Learn more</a>
      </p>
    </div>
  );
}
