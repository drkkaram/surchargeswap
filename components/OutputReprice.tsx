import type { CalculatorResult } from "@/lib/calculator";
import { formatCurrency, formatCurrencyDecimal } from "@/lib/calculator";

interface OutputRepriceProps {
  result: CalculatorResult;
}

export function OutputReprice({ result }: OutputRepriceProps) {
  const pctIncrease = result.requiredPriceIncreasePct;
  const multiplier = 1 + pctIncrease / 100;

  const estimatedAvgTransaction = Math.round(result.inputs.monthlyCardRevenue / 800);
  const avgClamped = Math.max(10, Math.min(estimatedAvgTransaction, 500));

  const smallItem = Math.max(1, Math.round(avgClamped * 0.25));
  const largeOrder = Math.round(avgClamped * 3);
  // Use stable role-based ids so React doesn't warn when two computed values
  // collide (e.g. at tiny revenues where avg clamps to 10 and large = 30).
  const examples = [
    { id: "avg", original: avgClamped, label: `$${avgClamped}.00 avg transaction` },
    { id: "small", original: smallItem, label: `$${smallItem}.00 small item` },
    { id: "large", original: largeOrder, label: `$${largeOrder}.00 large order` },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-[#4A5568]">
          Repricing Analysis
        </p>
        <p className="mt-2 text-sm text-[#4A5568]">
          To maintain your current margins without switching processor:
        </p>
      </div>

      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium text-[#0B1C3D]">
          Required price increase
        </p>
        <p className="font-mono text-2xl font-bold text-[#0B1C3D]">
          {pctIncrease.toFixed(1)}%
        </p>
      </div>

      <div className="bg-[#F5F5F0] rounded-md border border-[#E5E5E0] p-5">
        <p className="mb-3 text-sm font-medium text-[#4A5568]">
          Example impact
        </p>
        <div className="space-y-2">
          {examples.map((ex) => (
            <div key={ex.id} className="flex items-center justify-between">
              <p className="text-sm text-[#4A5568]">{ex.label}</p>
              <p className="text-sm text-[#0B1C3D]">
                <span className="font-mono font-semibold">
                  {formatCurrencyDecimal(ex.original * multiplier)}
                </span>
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-[#6B7280]">
          In practice, most businesses round to the nearest $0.50 or $1.00 — e.g. $20.34 becomes $20.50 or $21.00. Use whole or half-dollar prices to avoid awkward change.
        </p>
        <div className="mt-4 border-t border-[#E5E5E0] pt-3">
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-[#4A5568]">
              Annual surcharge revenue recovered
            </p>
            <p className="font-mono text-lg font-bold text-[#16A34A]">
              +{formatCurrency(result.annualRepriceRevenue)}/yr
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#F5F5F0] rounded-md border border-[#E5E5E0] p-5">
        <p className="text-sm font-semibold text-[#0B1C3D]">
          Is repricing right for you?
        </p>
        <div className="mt-3 space-y-2">
          <p className="text-sm text-[#4A5568]">
            <span className="text-[#16A34A]">&#10003;</span> Works if your
            customers are price-insensitive
          </p>
          <p className="text-sm text-[#4A5568]">
            <span className="text-[#16A34A]">&#10003;</span> No switching cost,
            no admin
          </p>
          <p className="text-sm text-[#4A5568]">
            <span className="text-[#DC2626]">&#10007;</span> Risky if direct
            competitors keep prices flat
          </p>
          <p className="text-sm text-[#4A5568]">
            <span className="text-[#DC2626]">&#10007;</span> Hospitality:
            customers notice small price changes
          </p>
          <p className="text-sm text-[#4A5568]">
            <span className="text-[#DC2626]">&#10007;</span> If you already feel
            price pressure, this accelerates it
          </p>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[#4A5568]">
          Most hospitality businesses with thin margins will find switching
          processors delivers better outcomes than repricing.
        </p>
      </div>
    </div>
  );
}
