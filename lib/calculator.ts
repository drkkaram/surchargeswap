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

// Canonical rates verification date — update this whenever processor rates are re-checked.
// This is the single source of truth used across homepage, /compare, and processor cards.
export const RATES_VERIFIED_DATE = "April 2026";

// Staleness threshold in days — used client-side to warn if site hasn't been updated.
export const RATES_STALE_AFTER_DAYS = 90;

// Affiliate URLs — verify active program status before launch.
// Zeller and Tyro programs confirmed April 2026. Stripe via Impact.com (pending).
export const PROCESSORS: ProcessorData[] = [
  {
    id: "tyro",
    name: "Tyro",
    rate: 0.012,
    monthlyFee: 29,
    terminalCost: 0,
    contract: "12 months minimum",
    bestFor: "Restaurants and cafes with high eftpos volume",
    affiliateHref: "https://www.tyro.com/referral-program/?utm_source=surchargeswap&utm_medium=referral&utm_campaign=processor-compare",
    pricingModel: "cost-plus",
    lastVerified: RATES_VERIFIED_DATE,
  },
  {
    id: "zeller",
    name: "Zeller",
    rate: 0.014,
    monthlyFee: 0,
    terminalCost: 199,
    contract: "No lock-in",
    bestFor: "High-volume businesses that want simplicity",
    affiliateHref: "https://www.myzeller.com/affiliates?utm_source=surchargeswap&utm_medium=referral&utm_campaign=processor-compare",
    pricingModel: "flat",
    lastVerified: RATES_VERIFIED_DATE,
  },
  {
    id: "stripe",
    name: "Stripe (in-store)",
    rate: 0.015,
    monthlyFee: 0,
    terminalCost: 99,
    contract: "No lock-in",
    bestFor: "Businesses with online + in-store hybrid sales",
    // Stripe AU — no public affiliate program; linking to stripe.com/au directly
    affiliateHref: "https://stripe.com/au?utm_source=surchargeswap&utm_medium=referral&utm_campaign=processor-compare",
    pricingModel: "flat",
    lastVerified: RATES_VERIFIED_DATE,
  },
  {
    id: "pin-payments",
    name: "Pin Payments",
    rate: 0.015,
    monthlyFee: 0,
    terminalCost: 0,
    contract: "No lock-in",
    bestFor: "Online businesses — no in-store terminal",
    affiliateHref: "https://pinpayments.com/?utm_source=surchargeswap&utm_medium=referral&utm_campaign=processor-compare",
    pricingModel: "flat",
    lastVerified: RATES_VERIFIED_DATE,
  },
  {
    id: "square",
    name: "Square",
    rate: 0.016,
    monthlyFee: 0,
    terminalCost: 59,
    contract: "No lock-in",
    bestFor: "Small to medium businesses, free POS ecosystem",
    affiliateHref: "https://squareup.com/au/en/affiliate?utm_source=surchargeswap&utm_medium=referral&utm_campaign=processor-compare",
    pricingModel: "flat",
    lastVerified: RATES_VERIFIED_DATE,
  },
];

export function calculateResult(inputs: CalculatorInputs): CalculatorResult {
  const coveredPct = (inputs.visaMastercardPct + inputs.eftposPct) / 100;
  const coveredCardRevenue = inputs.monthlyCardRevenue * coveredPct;

  const surchargeRevenueLost =
    coveredCardRevenue * (inputs.currentSurchargePct / 100);
  // msfToAbsorb is the total MSF paid post-ban — informational only.
  // It was always being paid (pre-ban the surcharge offset it).
  // The true ban impact delta is ONLY the lost surcharge income.
  const msfToAbsorb = coveredCardRevenue * (inputs.currentMsfPct / 100);
  const netMonthlyImpact = surchargeRevenueLost; // correct: only the lost surcharge revenue is the delta
  const annualImpact = netMonthlyImpact * 12;

  const amexRevenue = inputs.monthlyCardRevenue * (inputs.amexPct / 100);
  // Amex remains outside the October 2026 RBA surcharge ban.
  // This recovery figure is informational only and assumes your merchant agreement still permits
  // cost-based Amex surcharging after the Visa/Mastercard/eftpos ban takes effect.
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

  // Reprice: what % increase on total revenue recovers exactly the lost surcharge income?
  // Formula: lost_surcharge / total_revenue * 100
  // At defaults ($50k rev, 1.5% sc, 90% covered): $675 / $50,000 = 1.35%
  const requiredPriceIncreasePct =
    inputs.monthlyCardRevenue > 0
      ? (surchargeRevenueLost / inputs.monthlyCardRevenue) * 100
      : 0;
  // Annual revenue recovered if all prices raised by requiredPriceIncreasePct
  const annualRepriceRevenue = surchargeRevenueLost * 12;

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
