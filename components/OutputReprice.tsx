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
        <p className="text-xs font-medium uppercase tracking-widest text-[#525252]">
          Repricing Analysis
        </p>
        <p className="mt-2 text-sm text-[#525252]">
          To maintain your current margins without switching processor:
        </p>
      </div>

      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium text-[#0A0A0A]">
          Required price increase
        </p>
        <p className="font-mono text-2xl font-bold text-[#0A0A0A]">
          {pctIncrease.toFixed(1)}%
        </p>
      </div>

      <div className="border border-[#E5E5E5] bg-white p-5 rounded-sm">
        <p className="mb-3 text-sm font-medium text-[#525252]">
          Example impact
        </p>
        <div className="space-y-2">
          {examples.map((ex) => (
            <div key={ex.original} className="flex items-center justify-between">
              <p className="text-sm text-[#525252]">{ex.label}</p>
              <p className="text-sm text-[#0A0A0A]">
                &rarr;{" "}
                <span className="font-mono font-semibold">
                  {formatCurrencyDecimal(ex.original * multiplier)}
                </span>
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-[#737373]">
          In practice, most businesses round to the nearest $0.50 or $1.00 — e.g. $20.34 becomes $20.50 or $21.00. Use whole or half-dollar prices to avoid awkward change.
        </p>
        <div className="mt-4 border-t border-[#E5E5E5] pt-3">
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-[#525252]">
              Annual surcharge revenue recovered
            </p>
            <p className="font-mono text-lg font-bold text-[#22C55E]">
              +{formatCurrency(result.annualRepriceRevenue)}/yr
            </p>
          </div>
        </div>
      </div>

      <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-5 rounded-sm">
        <p className="text-sm font-semibold text-[#0A0A0A]">
          Is repricing right for you?
        </p>
        <div className="mt-3 space-y-2">
          <p className="text-sm text-[#525252]">
            <span className="text-[#22C55E]">&#10003;</span> Works if your
            customers are price-insensitive
          </p>
          <p className="text-sm text-[#525252]">
            <span className="text-[#22C55E]">&#10003;</span> No switching cost,
            no admin
          </p>
          <p className="text-sm text-[#525252]">
            <span className="text-[#EF4444]">&#10007;</span> Risky if direct
            competitors keep prices flat
          </p>
          <p className="text-sm text-[#525252]">
            <span className="text-[#EF4444]">&#10007;</span> Hospitality:
            customers notice small price changes
          </p>
          <p className="text-sm text-[#525252]">
            <span className="text-[#EF4444]">&#10007;</span> If you already feel
            price pressure, this accelerates it
          </p>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[#525252]">
          Most hospitality businesses with thin margins will find switching
          processors delivers better outcomes than repricing.
        </p>
      </div>
    </div>
  );
}
