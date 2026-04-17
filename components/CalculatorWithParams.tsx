"use client";

import { useSearchParams } from "next/navigation";
import { Calculator } from "./Calculator";

type CalculatorParamValues = {
  monthlyCardRevenue?: number;
  visaMastercardPct?: number;
  eftposPct?: number;
  amexPct?: number;
  bnplPct?: number;
  currentSurchargePct?: number;
  currentMsfPct?: number;
};

function parseNumberParam(
  value: string | null,
  min: number,
  max: number
): number | undefined {
  if (value === null || value.trim() === "") return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return undefined;
  if (parsed < min || parsed > max) return undefined;
  return parsed;
}

export function CalculatorWithParams() {
  const params = useSearchParams();

  const initialValues: CalculatorParamValues = {
    monthlyCardRevenue: parseNumberParam(params.get("rev"), 1, 100000000),
    visaMastercardPct: parseNumberParam(params.get("vm"), 0, 100),
    eftposPct: parseNumberParam(params.get("ep"), 0, 100),
    amexPct: parseNumberParam(params.get("am"), 0, 100),
    bnplPct: parseNumberParam(params.get("bn"), 0, 100),
    currentSurchargePct: parseNumberParam(params.get("sc"), 0, 10),
    currentMsfPct: parseNumberParam(params.get("msf"), 0, 10),
  };

  const validKeys = Object.entries(initialValues).filter(([, value]) => value !== undefined);
  const hasParams = Array.from(params.keys()).length > 0;
  const hasValidParams = validKeys.length > 0;

  const validatedValues = hasValidParams
    ? initialValues
    : undefined;

  return <Calculator initialValues={validatedValues} autoSubmit={hasParams && hasValidParams} />;
}
