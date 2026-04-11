export interface CalculatorInputs {
  monthlyCardRevenue: number;
  visaMastercardPct: number;
  eftposPct: number;
  amexPct: number;
  bnplPct: number;
  currentSurchargePct: number;
  currentMsfPct: number;
  includeBnpl: boolean;
}

export interface ProcessorData {
  id: string;
  name: string;
  rate: number;
  monthlyFee: number;
  terminalCost: number;
  contract: string;
  bestFor: string;
  affiliateHref: string;
  pricingModel: "flat" | "cost-plus" | "interchange-plus";
  lastVerified: string;
}

export interface ProcessorComparison {
  processor: ProcessorData;
  monthlyCost: number;
  monthlySaving: number;
  annualSaving: number;
  rank: number;
}

export interface CalculatorResult {
  inputs: CalculatorInputs;
  coveredCardRevenue: number;
  surchargeRevenueLost: number;
  msfToAbsorb: number;
  netMonthlyImpact: number;
  annualImpact: number;
  amexRevenue: number;
  amexSurchargeRecovery: number;
  bnplRevenue: number;
  bnplMsfCost: number;
  interchangeSaving: number;
  processorComparison: ProcessorComparison[];
  requiredPriceIncreasePct: number;
  annualRepriceRevenue: number;
}

export const PROCESSORS: ProcessorData[] = [
  {
    id: "tyro",
    name: "Tyro",
    rate: 0.012,
    monthlyFee: 29,
    terminalCost: 0,
    contract: "12 months minimum",
    bestFor: "Restaurants and cafes with high eftpos volume",
    affiliateHref: "#affiliate-tyro",
    pricingModel: "cost-plus",
    lastVerified: "April 2026",
  },
  {
    id: "zeller",
    name: "Zeller",
    rate: 0.014,
    monthlyFee: 0,
    terminalCost: 199,
    contract: "No lock-in",
    bestFor: "High-volume businesses that want simplicity",
    affiliateHref: "#affiliate-zeller",
    pricingModel: "flat",
    lastVerified: "April 2026",
  },
  {
    id: "stripe",
    name: "Stripe (in-store)",
    rate: 0.015,
    monthlyFee: 0,
    terminalCost: 99,
    contract: "No lock-in",
    bestFor: "Businesses with online + in-store hybrid sales",
    affiliateHref: "#affiliate-stripe",
    pricingModel: "flat",
    lastVerified: "April 2026",
  },
  {
    id: "pin-payments",
    name: "Pin Payments",
    rate: 0.015,
    monthlyFee: 0,
    terminalCost: 0,
    contract: "No lock-in",
    bestFor: "Online businesses — no in-store terminal",
    affiliateHref: "#affiliate-pin",
    pricingModel: "flat",
    lastVerified: "April 2026",
  },
  {
    id: "square",
    name: "Square",
    rate: 0.016,
    monthlyFee: 0,
    terminalCost: 59,
    contract: "No lock-in",
    bestFor: "Small to medium businesses, free POS ecosystem",
    affiliateHref: "#affiliate-square",
    pricingModel: "flat",
    lastVerified: "April 2026",
  },
];

export function calculateResult(inputs: CalculatorInputs): CalculatorResult {
  const coveredPct = (inputs.visaMastercardPct + inputs.eftposPct) / 100;
  const coveredCardRevenue = inputs.monthlyCardRevenue * coveredPct;

  const surchargeRevenueLost =
    coveredCardRevenue * (inputs.currentSurchargePct / 100);
  const msfToAbsorb = coveredCardRevenue * (inputs.currentMsfPct / 100);
  const netMonthlyImpact = surchargeRevenueLost;
  const annualImpact = netMonthlyImpact * 12;

  const amexRevenue = inputs.monthlyCardRevenue * (inputs.amexPct / 100);
  const amexSurchargeRecovery =
    amexRevenue * (inputs.currentSurchargePct / 100);

  const bnplRevenue = inputs.monthlyCardRevenue * (inputs.bnplPct / 100);
  const bnplMsfCost = bnplRevenue * 0.045;

  const interchangeSaving =
    inputs.monthlyCardRevenue * (inputs.visaMastercardPct / 100) * 0.005;

  const currentMonthlyCost = coveredCardRevenue * (inputs.currentMsfPct / 100);

  const processorComparison: ProcessorComparison[] = PROCESSORS.map((p) => {
    const monthlyCost = coveredCardRevenue * p.rate + p.monthlyFee;
    const monthlySaving = currentMonthlyCost - monthlyCost;
    const annualSaving = monthlySaving * 12;
    return { processor: p, monthlyCost, monthlySaving, annualSaving, rank: 0 };
  })
    .sort((a, b) => b.monthlySaving - a.monthlySaving)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  const requiredPriceIncreasePct = inputs.currentMsfPct;
  const annualRepriceRevenue =
    inputs.monthlyCardRevenue * 12 * (requiredPriceIncreasePct / 100);

  return {
    inputs,
    coveredCardRevenue,
    surchargeRevenueLost,
    msfToAbsorb,
    netMonthlyImpact,
    annualImpact,
    amexRevenue,
    amexSurchargeRecovery,
    bnplRevenue,
    bnplMsfCost,
    interchangeSaving,
    processorComparison,
    requiredPriceIncreasePct,
    annualRepriceRevenue,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencyDecimal(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
