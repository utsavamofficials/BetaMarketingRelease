export type PlanId = 'base' | 'satisfy';

export interface SubscriptionPlan {
  id: PlanId;
  name: string;
  tagline: string;
  admins: number;
  collectors: number;
  activeSeasonMonths: number;
  dataRetentionMonths: number;
  priceAnnualInr: number;
  features: string[];
  highlighted: boolean;
}
