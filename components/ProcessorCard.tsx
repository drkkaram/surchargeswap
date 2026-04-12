import type { ProcessorComparison } from "@/lib/calculator";
import { formatCurrency } from "@/lib/calculator";

interface ProcessorCardProps {
  comparison: ProcessorComparison;
}

export function ProcessorCard({ comparison }: ProcessorCardProps) {
  const { processor, monthlyCost, monthlySaving, annualSaving, rank } =
    comparison;
  const rateDisplay = (processor.rate * 100).toFixed(1);
  const isPositiveSaving = monthlySaving > 0;

  return (
    <div className="rounded-lg border border-[#E5E5E5] bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FAFAFA] font-mono text-sm font-bold text-[#525252]">
            {rank}
          </span>
          <div>
            <p className="text-base font-semibold text-[#0A0A0A]">
              {processor.name}
            </p>
            <p className="text-sm text-[#525252]">
              ~{rateDisplay}%{" "}
              {processor.pricingModel === "flat"
                ? "flat"
                : processor.pricingModel}
            </p>
          </div>
          {processor.contract.toLowerCase().includes("12 month") && (
            <span className="rounded-md bg-[#F59E0B]/10 px-2 py-0.5 text-xs font-medium text-[#B45309]">
              ⚠ 12-month lock-in
            </span>
          )}
        </div>
        {isPositiveSaving && (
          <span className="rounded-md bg-[#22C55E]/10 px-2 py-0.5 text-xs font-medium text-[#22C55E]">
            Save {formatCurrency(annualSaving)}/yr
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <p className="text-sm font-medium text-[#525252]">Monthly cost</p>
          <p className="font-mono text-lg font-bold text-[#0A0A0A]">
            {formatCurrency(monthlyCost)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-[#525252]">Monthly saving</p>
          <p
            className={`font-mono text-lg font-bold ${isPositiveSaving ? "text-[#22C55E]" : "text-[#EF4444]"}`}
          >
            {isPositiveSaving ? "+" : ""}
            {formatCurrency(monthlySaving)}
          </p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-sm font-medium text-[#525252]">Contract</p>
          <p className="text-sm text-[#0A0A0A]">{processor.contract}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-[#525252]">
        Best for: {processor.bestFor}
      </p>

      <div className="mt-4">
        <a
          href={`/out/${processor.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-md bg-[#0EA5E9] px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#0284C7] sm:inline-block sm:w-auto"
        >
          Apply for {processor.name} →
        </a>
        <span className="mt-1.5 block text-xs text-[#737373] sm:ml-3 sm:mt-0 sm:inline">
          Opens {processor.name} signup
        </span>
      </div>
    </div>
  );
}
