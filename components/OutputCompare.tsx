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
        <p className="text-xs font-medium uppercase tracking-widest text-[#525252]">
          Processor Comparison
        </p>
        <p className="mt-1 text-sm text-[#525252]">
          Based on your{" "}
          <span className="font-mono font-semibold text-[#0A0A0A]">
            {formatCurrency(result.coveredCardRevenue)}
          </span>
          /mo in covered card revenue. Ranked by lowest monthly cost to you.
        </p>
      </div>

      <div className="space-y-4">
        {result.processorComparison.map((comp) => (
          <ProcessorCard key={comp.processor.id} comparison={comp} />
        ))}
      </div>

      <InterchangeModule interchangeSaving={result.interchangeSaving} />
    </div>
  );
}
