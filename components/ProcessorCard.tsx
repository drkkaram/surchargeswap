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
    <div className="rounded-md border border-[#E5E5E0] bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F5F5F0] font-mono text-sm font-bold text-[#0B1C3D]">
            {rank}
          </span>
          <div>
            <p className="text-base font-semibold text-[#0B1C3D]">
              {processor.name}
            </p>
            <p className="text-sm text-[#4A5568]">
              ~{rateDisplay}%{" "}
              {processor.pricingModel === "flat"
                ? "flat"
                : processor.pricingModel}
            </p>
          </div>
          {processor.contract.toLowerCase().includes("12 month") && (
            <span className="rounded-md bg-[#FEF3C7] px-2 py-0.5 text-xs font-medium text-[#92400E]">
              12-month lock-in
            </span>
          )}
        </div>
        {isPositiveSaving && (
          <span className="rounded-md bg-[#D1FAE5] px-2 py-0.5 text-xs font-medium text-[#065F46]">
            Save {formatCurrency(annualSaving)}/yr
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <p className="text-sm font-medium text-[#4A5568]">Monthly cost</p>
          <p className="font-mono text-lg font-bold text-[#0B1C3D]">
            {formatCurrency(monthlyCost)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-[#4A5568]">Monthly saving</p>
          <p
            className={`font-mono text-lg font-bold ${isPositiveSaving ? "text-[#16A34A]" : "text-[#DC2626]"}`}
          >
            {isPositiveSaving ? "+" : ""}
            {formatCurrency(monthlySaving)}
          </p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-sm font-medium text-[#4A5568]">Contract</p>
          <p className="text-sm text-[#0B1C3D]">{processor.contract}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-[#4A5568]">
        Best for: {processor.bestFor}
      </p>

      <div className="mt-4">
        <a
          href={`/out/${processor.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-md bg-[#E8651A] px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#C4541A] sm:inline-block sm:w-auto"
        >
          Apply for {processor.name} →
        </a>
        <span className="mt-1.5 block text-xs text-[#6B7280] sm:ml-3 sm:mt-0 sm:inline">
          Opens {processor.name} signup
        </span>
      </div>
    </div>
  );
}
