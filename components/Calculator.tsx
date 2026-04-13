"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import posthog from "posthog-js";
import { useForm } from "react-hook-form";
import { calculateResult } from "@/lib/calculator";
import type { CalculatorResult } from "@/lib/calculator";
import { OutputImpact } from "./OutputImpact";
import { OutputCompare } from "./OutputCompare";
import { OutputReprice } from "./OutputReprice";
import { EmailCapture } from "./EmailCapture";

interface FormValues {
  monthlyCardRevenue: number;
  visaMastercardPct: number;
  eftposPct: number;
  amexPct: number;
  bnplPct: number;
  currentSurchargePct: number;
  currentMsfPct: number;
}

interface CalculatorProps {
  initialValues?: Partial<FormValues>;
  /** If true, auto-submit the form on mount after populating initialValues */
  autoSubmit?: boolean;
}

const CARD_MIX_PRESETS = [
  { label: "Café", vm: 65, ep: 25, am: 5, bn: 5 },
  { label: "Restaurant", vm: 60, ep: 20, am: 15, bn: 5 },
  { label: "Retail", vm: 70, ep: 20, am: 7, bn: 3 },
  { label: "Custom", vm: null, ep: null, am: null, bn: null },
];

function buildShareUrl(result: CalculatorResult): string {
  if (typeof window === "undefined") return "";
  const p = new URLSearchParams({
    rev: String(result.inputs.monthlyCardRevenue),
    vm: String(result.inputs.visaMastercardPct),
    ep: String(result.inputs.eftposPct),
    am: String(result.inputs.amexPct),
    bn: String(result.inputs.bnplPct),
    sc: String(result.inputs.currentSurchargePct),
    msf: String(result.inputs.currentMsfPct),
  });
  return `${window.location.origin}/?${p.toString()}`;
}

type OutputPath = "impact" | "compare" | "reprice";

function validateForm(data: FormValues): Record<string, string> | null {
  const errors: Record<string, string> = {};

  if (!data.monthlyCardRevenue || data.monthlyCardRevenue <= 0) {
    errors.monthlyCardRevenue = "Enter your monthly card revenue";
  }

  if (data.currentMsfPct < 0) errors.currentMsfPct = "Cannot be negative";
  if (data.currentMsfPct > 10) errors.currentMsfPct = "Cannot exceed 10%";

  const fields: (keyof FormValues)[] = [
    "visaMastercardPct",
    "eftposPct",
    "amexPct",
    "bnplPct",
  ];
  for (const f of fields) {
    const val = data[f];
    if (val < 0) errors[f] = "Cannot be negative";
    if (val > 100) errors[f] = "Cannot exceed 100";
  }

  if (data.currentSurchargePct < 0)
    errors.currentSurchargePct = "Cannot be negative";
  if (data.currentSurchargePct > 10)
    errors.currentSurchargePct = "Cannot exceed 10%";

  return Object.keys(errors).length > 0 ? errors : null;
}

export function Calculator({ initialValues, autoSubmit }: CalculatorProps) {
  const [outputPath, setOutputPath] = useState<OutputPath>("impact");
  const [showResult, setShowResult] = useState(false);
  const [includeBnpl, setIncludeBnpl] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [mixError, setMixError] = useState<string | null>(null);
  const cardMixRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    watch,
    getValues,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      monthlyCardRevenue: initialValues?.monthlyCardRevenue ?? 50000,
      visaMastercardPct: initialValues?.visaMastercardPct ?? 70,
      eftposPct: initialValues?.eftposPct ?? 20,
      amexPct: initialValues?.amexPct ?? 8,
      bnplPct: initialValues?.bnplPct ?? 2,
      currentSurchargePct: initialValues?.currentSurchargePct ?? 1.5,
      currentMsfPct: initialValues?.currentMsfPct ?? 1.7,
    },
  });

  // On mount: if initialValues were passed (from URL params), push them into the form
  // and optionally auto-submit so the user sees results immediately.
  useEffect(() => {
    if (!initialValues) return;
    const fields: (keyof FormValues)[] = [
      "monthlyCardRevenue",
      "visaMastercardPct",
      "eftposPct",
      "amexPct",
      "bnplPct",
      "currentSurchargePct",
      "currentMsfPct",
    ];
    fields.forEach((key) => {
      if (initialValues[key] !== undefined) {
        setValue(key, initialValues[key] as number);
      }
    });
    if (autoSubmit && formRef.current) {
      // Small delay to ensure setValue has flushed before submit
      setTimeout(() => {
        formRef.current?.requestSubmit();
      }, 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const watchedValues = watch();
  const cardMixTotal =
    (Number(watchedValues.visaMastercardPct) || 0) +
    (Number(watchedValues.eftposPct) || 0) +
    (Number(watchedValues.amexPct) || 0) +
    (Number(watchedValues.bnplPct) || 0);
  const isMixValid = cardMixTotal === 100;

  const result = useMemo(() => {
    if (!showResult) return null;
    const vals = watchedValues;
    return calculateResult({
      monthlyCardRevenue: Number(vals.monthlyCardRevenue),
      visaMastercardPct: Number(vals.visaMastercardPct),
      eftposPct: Number(vals.eftposPct),
      amexPct: Number(vals.amexPct),
      bnplPct: Number(vals.bnplPct),
      currentSurchargePct: Number(vals.currentSurchargePct),
      currentMsfPct: Number(vals.currentMsfPct),
      includeBnpl,
    });
  }, [showResult, watchedValues, includeBnpl]);

  const handlePresetClick = useCallback(
    (preset: (typeof CARD_MIX_PRESETS)[number]) => {
      setActivePreset(preset.label);
      setMixError(null);
      if (preset.vm !== null) {
        setValue("visaMastercardPct", preset.vm);
        setValue("eftposPct", preset.ep!);
        setValue("amexPct", preset.am!);
        setValue("bnplPct", preset.bn!);
      }
    },
    [setValue]
  );

  const handleCalculate = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const raw = getValues();
      const vals: FormValues = {
        monthlyCardRevenue: Number(raw.monthlyCardRevenue),
        visaMastercardPct: Number(raw.visaMastercardPct),
        eftposPct: Number(raw.eftposPct),
        amexPct: Number(raw.amexPct),
        bnplPct: Number(raw.bnplPct),
        currentSurchargePct: Number(raw.currentSurchargePct),
        currentMsfPct: Number(raw.currentMsfPct),
      };

      // Always validate card mix totals 100% (even when accordion is closed)
      const currentTotal =
        vals.visaMastercardPct +
        vals.eftposPct +
        vals.amexPct +
        vals.bnplPct;
      if (currentTotal !== 100) {
        setMixError(
          `Card mix is currently ${currentTotal}% — adjust to reach 100%`
        );
        setShowResult(false);
        // Open the accordion so the user can see the error
        setAdvancedOpen(true);
        setTimeout(() => {
          if (cardMixRef.current) {
            cardMixRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 50);
        return;
      }

      const errs = validateForm(vals);
      if (errs) {
        setFormErrors(errs);
        setMixError(null);
        setShowResult(false);
        return;
      }

      setIsCalculating(true);
      setMixError(null);
      setTimeout(() => {
        setFormErrors({});
        setShowResult(true);
        setOutputPath("impact");
        const rev = vals.monthlyCardRevenue;
        const revBracket =
          rev < 25000
            ? "under-25k"
            : rev < 50000
              ? "25k-50k"
              : rev < 100000
                ? "50k-100k"
                : rev < 250000
                  ? "100k-250k"
                  : "over-250k";
        posthog.capture("calculator_result", {
          revenue_bracket: revBracket,
          output_path: "impact",
          vm_pct: vals.visaMastercardPct,
          eftpos_pct: vals.eftposPct,
          amex_pct: vals.amexPct,
          bnpl_pct: vals.bnplPct,
          surcharge_pct: vals.currentSurchargePct,
          msf_pct: vals.currentMsfPct,
        });
        setIsCalculating(false);
        if (typeof window !== "undefined" && window.innerWidth < 768) {
          setTimeout(() => {
            const el = document.getElementById("calculator-output");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }, 50);
    },
    [getValues, advancedOpen]
  );

  const pathOptions: { value: OutputPath; label: string }[] = [
    { value: "impact", label: "My damage" },
    { value: "compare", label: "Switch processor" },
    { value: "reprice", label: "Reprice my menu" },
  ];

  return (
    <div className="space-y-8">
      {/* Form Card */}
      <form
        ref={formRef}
        onSubmit={handleCalculate}
        className="space-y-6 rounded-lg border border-[#E5E5E5] bg-white p-6 shadow-sm sm:p-8"
      >
        {/* Field 1: Monthly card revenue */}
        <div>
          <label
            htmlFor="monthlyCardRevenue"
            className="block text-sm font-medium text-[#0A0A0A]"
          >
            Monthly card revenue
          </label>
          <p className="mt-0.5 text-xs text-[#737373]">
            Your total card sales per month. Find this in your terminal report or merchant app. Not your cash register total — just card payments.
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#525252]">
              $
            </span>
            <input
              id="monthlyCardRevenue"
              type="number"
              step="1"
              inputMode="numeric"
              {...register("monthlyCardRevenue", { valueAsNumber: true })}
              className="w-full rounded-md border border-[#E5E5E5] bg-[#FAFAFA] py-3 pl-7 pr-4 text-base text-[#0A0A0A] focus:border-[#0EA5E9] focus:outline-none focus:ring-1 focus:ring-[#0EA5E9]"
            />
          </div>
          {formErrors.monthlyCardRevenue && (
            <p className="mt-1.5 text-xs text-[#EF4444]">
              {formErrors.monthlyCardRevenue}
            </p>
          )}
        </div>

        {/* Field 2: MSF */}
        <div>
          <label
            htmlFor="currentMsfPct"
            className="block text-sm font-medium text-[#0A0A0A]"
          >
            Merchant fee (MSF %)
          </label>
          <p className="mt-0.5 text-xs text-[#737373]">
            The % your bank or processor charges you per card transaction. Usually 1.5–2%. Find it on your merchant statement (look for &ldquo;MSF rate&rdquo; or &ldquo;blended rate&rdquo;). Not sure? Leave it at 1.7%.
          </p>
          <div className="relative mt-2">
            <input
              id="currentMsfPct"
              type="number"
              step="0.1"
              inputMode="decimal"
              {...register("currentMsfPct", { valueAsNumber: true })}
              className="w-full rounded-md border border-[#E5E5E5] bg-[#FAFAFA] py-3 pl-3 pr-8 text-base text-[#0A0A0A] focus:border-[#0EA5E9] focus:outline-none focus:ring-1 focus:ring-[#0EA5E9]"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#525252]">
              %
            </span>
          </div>
          {formErrors.currentMsfPct && (
            <p className="mt-1.5 text-xs text-[#EF4444]">
              {formErrors.currentMsfPct}
            </p>
          )}
        </div>

        {/* Advanced settings accordion */}
        <div className="border-t border-[#E5E5E5] pt-4">
          <button
            type="button"
            onClick={() => setAdvancedOpen(!advancedOpen)}
            className="flex w-full items-center gap-2 text-sm font-medium text-[#525252] transition-colors hover:text-[#0A0A0A]"
          >
            <svg
              className={`h-4 w-4 transition-transform ${advancedOpen ? "rotate-90" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            Customise card mix &amp; surcharge rate
            <span className="text-xs font-normal text-[#737373]">
              — uses café defaults if skipped
            </span>
          </button>

          {advancedOpen && (
            <div className="mt-4 space-y-5">
              {/* Card mix section */}
              <div
                ref={cardMixRef}
                className={`space-y-4 rounded-lg p-5 transition-colors ${
                  mixError
                    ? "border-2 border-[#EF4444] bg-[#FEF2F2]"
                    : "border border-[#E5E5E5] bg-[#FAFAFA]"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#0A0A0A]">
                      Card mix
                    </p>
                    <p className="text-xs text-[#737373]">
                      What % of card payments come from each type?
                    </p>
                  </div>
                  <p
                    className={`flex items-center gap-1 font-mono text-sm font-semibold ${
                      isMixValid ? "text-[#22C55E]" : "text-[#EF4444]"
                    }`}
                  >
                    {cardMixTotal}%
                    {isMixValid && (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </p>
                </div>

                {mixError && (
                  <div className="flex items-center gap-2 rounded-md bg-[#EF4444]/10 px-3 py-2">
                    <svg
                      className="h-4 w-4 shrink-0 text-[#EF4444]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                    <p className="text-sm font-medium text-[#EF4444]">
                      {mixError}
                    </p>
                  </div>
                )}

                {/* Presets */}
                <div className="flex flex-wrap gap-2">
                  {CARD_MIX_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handlePresetClick(preset)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                        activePreset === preset.label
                          ? "bg-[#0EA5E9] text-white"
                          : "border border-[#E5E5E5] bg-white text-[#525252] hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      {
                        name: "visaMastercardPct" as const,
                        label: "Visa / Mastercard",
                      },
                      { name: "eftposPct" as const, label: "eftpos" },
                      { name: "amexPct" as const, label: "Amex" },
                      {
                        name: "bnplPct" as const,
                        label: "BNPL (Afterpay / Zip)",
                      },
                    ] as const
                  ).map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm text-[#525252]"
                      >
                        {field.label}
                      </label>
                      <div className="relative mt-1">
                        <input
                          id={field.name}
                          type="number"
                          step="1"
                          inputMode="numeric"
                          {...register(field.name, { valueAsNumber: true })}
                          onChange={(e) => {
                            register(field.name, {
                              valueAsNumber: true,
                            }).onChange(e);
                            setActivePreset("Custom");
                            setMixError(null);
                          }}
                          className="w-full rounded-md border border-[#E5E5E5] bg-white py-3 pl-3 pr-8 text-sm text-[#0A0A0A] focus:border-[#0EA5E9] focus:outline-none focus:ring-1 focus:ring-[#0EA5E9]"
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#525252]">
                          %
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Surcharge rate */}
              <div>
                <label
                  htmlFor="currentSurchargePct"
                  className="block text-sm font-medium text-[#525252]"
                >
                  Surcharge rate you currently charge
                </label>
                <p className="mt-0.5 text-xs text-[#737373]">
                  What % surcharge do you add to customer bills today? Usually 1–1.5%. This is the revenue you&apos;ll lose when the ban hits.
                </p>
                <div className="relative mt-1.5">
                  <input
                    id="currentSurchargePct"
                    type="number"
                    step="0.1"
                    inputMode="decimal"
                    {...register("currentSurchargePct", {
                      valueAsNumber: true,
                    })}
                    className="w-full rounded-md border border-[#E5E5E5] bg-[#FAFAFA] py-3 pl-3 pr-8 text-sm text-[#0A0A0A] focus:border-[#0EA5E9] focus:outline-none focus:ring-1 focus:ring-[#0EA5E9]"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#525252]">
                    %
                  </span>
                </div>
                {formErrors.currentSurchargePct && (
                  <p className="mt-1 text-xs text-[#EF4444]">
                    {formErrors.currentSurchargePct}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Calculate button — always enabled */}
        <button
          type="submit"
          disabled={isCalculating}
          className="w-full rounded-md bg-[#0EA5E9] py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#0284C7] disabled:opacity-50"
        >
          <span className={isCalculating ? "animate-pulse" : ""}>
            {isCalculating ? "Calculating..." : "Calculate my impact →"}
          </span>
        </button>
      </form>

      {/* Results */}
      {result && (
        <div
          id="calculator-output"
          className="space-y-6 rounded-lg border border-[#E5E5E5] bg-white p-6 shadow-sm sm:p-8"
        >
          {/* What do you want to do — tabs ABOVE output */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#525252]">
              What do you want to do about it?
            </p>
            <div className="flex flex-wrap gap-2">
              {pathOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setOutputPath(opt.value)}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    outputPath === opt.value
                      ? "bg-[#0EA5E9] text-white"
                      : "border border-[#E5E5E5] bg-white text-[#525252] hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-[#E5E5E5]" />

          {/* Active output */}
          {outputPath === "impact" && (
            <OutputImpact
              result={result}
              includeBnpl={includeBnpl}
              onToggleBnpl={setIncludeBnpl}
            />
          )}
          {outputPath === "compare" && <OutputCompare result={result} />}
          {outputPath === "reprice" && <OutputReprice result={result} />}

          {/* Email capture */}
          <EmailCapture result={result} />

          {/* Share section */}
          <div className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0EA5E9]/10">
                <svg
                  className="h-4 w-4 text-[#0EA5E9]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#0A0A0A]">
                  Share with your accountant
                </p>
                <p className="mt-0.5 text-xs text-[#525252]">
                  Send this link to your accountant or bookkeeper — they&apos;ll
                  see exactly your numbers and results.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const url = buildShareUrl(result);
                    navigator.clipboard.writeText(url).then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    });
                  }}
                  className="mt-3 inline-flex items-center gap-2 rounded-md border border-[#E5E5E5] bg-white px-4 py-2.5 text-sm font-medium text-[#0A0A0A] transition-colors hover:bg-[#F5F5F5]"
                >
                  {copied ? (
                    <>
                      <svg
                        className="h-4 w-4 text-[#22C55E]"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Link copied!
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.06a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.5 8.25"
                        />
                      </svg>
                      Copy shareable link
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#737373]">
            Estimates only. Actual fees depend on your specific merchant
            agreement and card mix. Verify with your processor before making
            decisions.
          </p>
        </div>
      )}
    </div>
  );
}
