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
      {/* Hero number — dominant, unmissable */}
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-[#525252]">
          Your monthly impact{includeBnpl ? " (incl. BNPL)" : ""}
        </p>
        <p className="mt-2 font-mono text-5xl font-bold tracking-tight text-[#EF4444] sm:text-6xl">
          -{formatCurrency(totalMonthly)}
          <span className="text-2xl sm:text-3xl">/mo</span>
        </p>
        <p className="mt-2 text-lg text-[#525252] sm:text-xl">
          That&apos;s{" "}
          <span className="font-mono font-semibold text-[#EF4444]">
            -{formatCurrency(totalAnnual)}
          </span>{" "}
          per year
        </p>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-5">
        <p className="text-xs font-medium uppercase tracking-widest text-[#525252]">
          Breakdown
        </p>
        <div className="flex items-baseline justify-between">
          <p className="text-sm text-[#525252]">
            Surcharge revenue you&apos;ll stop collecting
          </p>
          <p className="font-mono text-base font-semibold text-[#EF4444]">
            -{formatCurrency(result.surchargeRevenueLost)}
          </p>
        </div>
        <div className="mt-3 border-t border-[#E5E5E5] pt-3">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[#737373]">
            Context
          </p>
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-[#525252]">
              MSF you continue paying (not new — was offset by surcharge)
            </p>
            <p className="font-mono text-base font-semibold text-[#737373]">
              {formatCurrency(result.msfToAbsorb)}/mo
            </p>
          </div>
          <p className="mt-1 text-xs text-[#737373]">
            This fee existed before the ban. Your surcharge covered it. This is shown for context only — it is not included in your impact figure above.
          </p>
        </div>

        {includeBnpl && (
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-[#525252]">BNPL MSF cost (ongoing)</p>
            <p className="font-mono text-base font-semibold text-[#EF4444]">
              -{formatCurrency(result.bnplMsfCost)}
            </p>
          </div>
        )}
      </div>

      <p className="text-xs italic text-[#525252]">
        Estimates based on your inputs. Actual impact depends on your merchant
        agreement. Verify with your processor.
      </p>

      {result.inputs.monthlyCardRevenue >= 500000 && (
        <div className="rounded-lg border border-[#A855F7]/30 bg-[#A855F7]/5 p-5">
          <p className="text-sm font-semibold text-[#7C3AED]">
            High-volume business? Let us handle the switch.
          </p>
          <p className="mt-1 text-sm text-[#525252]">
            Running $500K+/month in card revenue means a processor switch is
            worth thousands per year. We offer a $299 concierge service: we
            handle the application, merchant setup, and switchover timeline for
            you.
          </p>
          <a
            href="mailto:concierge@surchargeswap.com.au?subject=Concierge%20Switch%20Enquiry"
            className="mt-3 inline-block rounded-md bg-[#7C3AED] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#6D28D9]"
          >
            Enquire about concierge switching →
          </a>
        </div>
      )}

      <div className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-5">
        <p className="text-sm font-semibold text-[#0A0A0A]">
          Amex surcharging — still permitted
        </p>
        <p className="mt-1 text-sm leading-relaxed text-[#525252]">
          American Express operates as a three-party scheme and is not
          designated by the RBA under the surcharge ban. The October 2026 ban
          does not apply to Amex — you can continue surcharging Amex
          transactions regardless of your business size.{" "}
          <span className="text-xs text-[#737373]">
            (As confirmed in the RBA Conclusions Paper, March 2026 — check{" "}
            <a
              href="https://www.rba.gov.au"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              rba.gov.au
            </a>{" "}
            for updates.)
          </span>
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#525252]">
          Ensure your POS supports selective surcharging by card network. Your
          recoverable Amex surcharge:{" "}
          <span className="font-mono font-semibold text-[#22C55E]">
            {formatCurrency(result.amexSurchargeRecovery)}
          </span>
          /mo (based on{" "}
          <span className="font-mono font-semibold text-[#0A0A0A]">
            {formatCurrency(result.amexRevenue)}
          </span>
          /mo Amex revenue).
        </p>
      </div>

      <BNPLToggle
        bnplRevenue={result.bnplRevenue}
        bnplMsfCost={result.bnplMsfCost}
        includeBnpl={includeBnpl}
        onToggle={onToggleBnpl}
      />

      <div className="rounded-lg border border-[#0EA5E9]/30 bg-[#0EA5E9]/5 p-5">
        <p className="text-sm font-semibold text-[#0A0A0A]">
          Reduce this hit — switch to a cheaper processor
        </p>
        <p className="mt-1 text-sm text-[#525252]">
          Compare all AU processors side-by-side and see exactly how much you
          could recover each month.
        </p>
        <a
          href="/compare"
          className="mt-3 inline-block rounded-md bg-[#0EA5E9] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0284C7]"
        >
          Compare processors →
        </a>
      </div>
    </div>
  );
}
