"use client";

import { useSearchParams } from "next/navigation";
import { Calculator } from "./Calculator";

export function CalculatorWithParams() {
  const params = useSearchParams();

  const hasParams = Array.from(params.keys()).length > 0;
  const initialValues = hasParams ? {
    monthlyCardRevenue: params.get("rev") ? Number(params.get("rev")) : undefined,
    visaMastercardPct: params.get("vm") ? Number(params.get("vm")) : undefined,
    eftposPct: params.get("ep") ? Number(params.get("ep")) : undefined,
    amexPct: params.get("am") ? Number(params.get("am")) : undefined,
    bnplPct: params.get("bn") ? Number(params.get("bn")) : undefined,
    currentSurchargePct: params.get("sc") ? Number(params.get("sc")) : undefined,
    currentMsfPct: params.get("msf") ? Number(params.get("msf")) : undefined,
  } : undefined;

  return <Calculator initialValues={initialValues} autoSubmit={hasParams} />;
}
