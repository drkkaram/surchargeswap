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
  const examples = [
    { original: avgClamped, label: `$${avgClamped}.00 avg transaction` },
    { original: smallItem, label: `$${smallItem}.00 small item` },
    { original: largeOrder, label: `$${largeOrder}.00 large order` },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-[#374151]">
          Repricing Analysis
        </p>
        <p className="mt-2 text-sm text-[#374151]">
          To maintain your current margins without switching processor:
        </p>
      </div>

      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium text-[#0F172A]">
          Required price increase
        </p>
        <p className="font-mono text-2xl font-bold text-[#0F172A]">
          {pctIncrease.toFixed(1)}%
        </p>
      </div>

      <div className="border border-[#E2E8F0] bg-white p-5 rounded-sm">
        <p className="mb-3 text-sm font-medium text-[#374151]">
          Example impact
        </p>
        <div className="space-y-2">
          {examples.map((ex) => (
            <div key={ex.original} className="flex items-center justify-between">
              <p className="text-sm text-[#374151]">{ex.label}</p>
              <p className="text-sm text-[#0F172A]">
                &rarr;{" "}
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
        <div className="mt-4 border-t border-[#E2E8F0] pt-3">
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-[#374151]">
              Annual surcharge revenue recovered
            </p>
            <p className="font-mono text-lg font-bold text-[#16A34A]">
              +{formatCurrency(result.annualRepriceRevenue)}/yr
            </p>
          </div>
        </div>
      </div>

      <div className="border border-[#E2E8F0] bg-[#F8FAFC] p-5 rounded-sm">
        <p className="text-sm font-semibold text-[#0F172A]">
          Is repricing right for you?
        </p>
        <div className="mt-3 space-y-2">
          <p className="text-sm text-[#374151]">
            <span className="text-[#16A34A]">&#10003;</span> Works if your
            customers are price-insensitive
          </p>
          <p className="text-sm text-[#374151]">
            <span className="text-[#16A34A]">&#10003;</span> No switching cost,
            no admin
          </p>
          <p className="text-sm text-[#374151]">
            <span className="text-[#DC2626]">&#10007;</span> Risky if direct
            competitors keep prices flat
          </p>
          <p className="text-sm text-[#374151]">
            <span className="text-[#DC2626]">&#10007;</span> Hospitality:
            customers notice small price changes
          </p>
          <p className="text-sm text-[#374151]">
            <span className="text-[#DC2626]">&#10007;</span> If you already feel
            price pressure, this accelerates it
          </p>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[#374151]">
          Most hospitality businesses with thin margins will find switching
          processors delivers better outcomes than repricing.
        </p>
      </div>
    </div>
  );
}
