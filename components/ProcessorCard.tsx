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
    <div className="border border-[#E5E5E5] bg-white p-5 rounded-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#FAFAFA] font-mono text-sm font-bold text-[#525252]">
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
        </div>
        {isPositiveSaving && (
          <span className="rounded-sm bg-[#22C55E]/10 px-2 py-0.5 text-xs font-medium text-[#22C55E]">
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

      <a
        href={processor.affiliateHref}
        className="mt-4 inline-block rounded-md border border-[#0EA5E9] px-4 py-2 text-sm font-medium text-[#0EA5E9] transition-colors hover:bg-[#0EA5E9] hover:text-white"
      >
        Switch to {processor.name} &rarr;
      </a>
    </div>
  );
}
