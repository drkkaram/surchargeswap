"use client";

import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { calculateResult } from "@/lib/calculator";
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

type OutputPath = "impact" | "compare" | "reprice";

function validateForm(data: FormValues): Record<string, string> | null {
  const errors: Record<string, string> = {};

  if (!data.monthlyCardRevenue || data.monthlyCardRevenue <= 0) {
    errors.monthlyCardRevenue = "Must be greater than 0";
  }

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
  if (data.currentMsfPct < 0) errors.currentMsfPct = "Cannot be negative";
  if (data.currentMsfPct > 10) errors.currentMsfPct = "Cannot exceed 10%";

  const sum =
    data.visaMastercardPct + data.eftposPct + data.amexPct + data.bnplPct;
  if (sum !== 100) {
    errors.visaMastercardPct = "Card mix must total 100%";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

export function Calculator() {
  const [outputPath, setOutputPath] = useState<OutputPath>("impact");
  const [showResult, setShowResult] = useState(false);
  const [includeBnpl, setIncludeBnpl] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const {
    register,
    watch,
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      monthlyCardRevenue: 50000,
      visaMastercardPct: 70,
      eftposPct: 20,
      amexPct: 8,
      bnplPct: 2,
      currentSurchargePct: 1.5,
      currentMsfPct: 1.7,
    },
  });

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
      const errs = validateForm(vals);
      if (errs) {
        setFormErrors(errs);
        setShowResult(false);
        return;
      }
      setFormErrors({});
      setShowResult(true);
    },
    [getValues]
  );

  const pathOptions: { value: OutputPath; label: string; desc: string }[] = [
    {
      value: "impact",
      label: "Show my impact",
      desc: "Simple loss calculation",
    },
    {
      value: "compare",
      label: "Compare processors",
      desc: "Find a cheaper rate",
    },
    {
      value: "reprice",
      label: "Reprice instead",
      desc: "Calculate menu price increase",
    },
  ];

  return (
    <div className="space-y-8">
      <form onSubmit={handleCalculate} className="space-y-8">
        {/* Step 1: Your Numbers */}
        <div className="space-y-6">
          <p className="text-xs font-medium uppercase tracking-widest text-[#525252]">
            Step 1 &mdash; Your numbers
          </p>

          <div>
            <label
              htmlFor="monthlyCardRevenue"
              className="block text-sm font-medium text-[#525252]"
            >
              Monthly card revenue (AUD)
            </label>
            <div className="relative mt-1.5">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#525252]">
                $
              </span>
              <input
                id="monthlyCardRevenue"
                type="number"
                step="1"
                {...register("monthlyCardRevenue", { valueAsNumber: true })}
                className="w-full rounded-md border border-[#E5E5E5] bg-[#FAFAFA] py-2.5 pl-7 pr-4 text-sm text-[#0A0A0A] focus:border-[#0EA5E9] focus:outline-none focus:ring-1 focus:ring-[#0EA5E9]"
              />
            </div>
            {formErrors.monthlyCardRevenue && (
              <p className="mt-1 text-xs text-[#EF4444]">
                {formErrors.monthlyCardRevenue}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-medium text-[#525252]">Card mix</p>
              <p
                className={`text-sm font-mono font-semibold ${isMixValid ? "text-[#22C55E]" : "text-[#EF4444]"}`}
              >
                Total: {cardMixTotal}%{isMixValid ? " \u2713" : ""}
              </p>
            </div>
            <p className="mt-0.5 text-xs text-[#525252]">Must total 100%</p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
                      {...register(field.name, { valueAsNumber: true })}
                      className="w-full rounded-md border border-[#E5E5E5] bg-[#FAFAFA] py-2 pl-3 pr-8 text-sm text-[#0A0A0A] focus:border-[#0EA5E9] focus:outline-none focus:ring-1 focus:ring-[#0EA5E9]"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#525252]">
                      %
                    </span>
                  </div>
                  {formErrors[field.name] && (
                    <p className="mt-1 text-xs text-[#EF4444]">
                      {formErrors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {formErrors.visaMastercardPct && !formErrors.eftposPct && (
              <p className="mt-1 text-xs text-[#EF4444]">
                {formErrors.visaMastercardPct}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="currentSurchargePct"
                className="block text-sm font-medium text-[#525252]"
              >
                Surcharge rate you charge
              </label>
              <div className="relative mt-1.5">
                <input
                  id="currentSurchargePct"
                  type="number"
                  step="0.1"
                  {...register("currentSurchargePct", { valueAsNumber: true })}
                  className="w-full rounded-md border border-[#E5E5E5] bg-[#FAFAFA] py-2.5 pl-3 pr-8 text-sm text-[#0A0A0A] focus:border-[#0EA5E9] focus:outline-none focus:ring-1 focus:ring-[#0EA5E9]"
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
            <div>
              <label
                htmlFor="currentMsfPct"
                className="block text-sm font-medium text-[#525252]"
              >
                MSF rate you currently pay
              </label>
              <div className="relative mt-1.5">
                <input
                  id="currentMsfPct"
                  type="number"
                  step="0.1"
                  {...register("currentMsfPct", { valueAsNumber: true })}
                  className="w-full rounded-md border border-[#E5E5E5] bg-[#FAFAFA] py-2.5 pl-3 pr-8 text-sm text-[#0A0A0A] focus:border-[#0EA5E9] focus:outline-none focus:ring-1 focus:ring-[#0EA5E9]"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#525252]">
                  %
                </span>
              </div>
              {formErrors.currentMsfPct && (
                <p className="mt-1 text-xs text-[#EF4444]">
                  {formErrors.currentMsfPct}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Step 2: Output Path */}
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-widest text-[#525252]">
            Step 2 &mdash; What do you want to know?
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {pathOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setOutputPath(opt.value);
                  setShowResult(false);
                }}
                className={`rounded-sm border p-4 text-left transition-colors ${
                  outputPath === opt.value
                    ? "border-[#0EA5E9] bg-[#0EA5E9]/5"
                    : "border-[#E5E5E5] bg-white hover:border-[#525252]/30"
                }`}
              >
                <p className="text-sm font-semibold text-[#0A0A0A]">
                  {opt.label}
                </p>
                <p className="mt-0.5 text-xs text-[#525252]">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isMixValid}
          className="w-full rounded-md bg-[#0EA5E9] py-3 text-sm font-medium text-white transition-colors hover:bg-[#0284C7] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-8"
        >
          Calculate &rarr;
        </button>
      </form>

      {/* Results */}
      {result && (
        <div className="space-y-8 border-t border-[#E5E5E5] pt-8">
          {outputPath === "impact" && (
            <OutputImpact
              result={result}
              includeBnpl={includeBnpl}
              onToggleBnpl={setIncludeBnpl}
            />
          )}
          {outputPath === "compare" && <OutputCompare result={result} />}
          {outputPath === "reprice" && <OutputReprice result={result} />}

          <EmailCapture result={result} />
        </div>
      )}
    </div>
  );
}
