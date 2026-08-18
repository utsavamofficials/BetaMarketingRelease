import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Reveal } from '../ui/Reveal';
import { formatInr, formatMonthlyEquivalent } from '../../utils/formatters';
import { ROUTES } from '../../constants/routes';
import pricing from '../../data/pricing.json';
import type { SubscriptionPlan } from '../../types/plan';

export function PricingTable({ compact = false }: { compact?: boolean }) {
  const plans = pricing.plans as SubscriptionPlan[];

  return (
    <div className={`grid gap-6 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-1 lg:mx-auto lg:max-w-3xl'}`}>
      {plans.map((plan, index) => (
        <Reveal key={plan.id} delay={index * 0.08}>
          <div
            className={`relative flex h-full flex-col gap-5 rounded-3xl border p-7 ${
              plan.highlighted ? 'border-[var(--accent)] bg-[var(--accent-bg)] shadow-lg' : 'border-[var(--border)] bg-[var(--bg)]'
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-7">
                <Badge tone="accent">
                  <Sparkles className="h-3 w-3" /> Most popular
                </Badge>
              </span>
            )}
            <div>
              <h3 className="text-xl font-semibold text-[var(--text-h)]">{plan.name}</h3>
              <p className="mt-1 text-sm text-[var(--text)]">{plan.tagline}</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-[var(--text-h)]">
                {formatMonthlyEquivalent(plan.priceAnnualInr, 12)}
                <span className="text-base font-medium text-[var(--text)]">/month</span>
              </p>
              <p className="text-xs text-[var(--text)]">
                Billed as {formatInr(plan.priceAnnualInr)} once a year — no recurring auto-debit.
              </p>
            </div>

            <ul className="flex flex-1 flex-col gap-2.5 text-sm text-[var(--text-h)]">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl bg-[var(--social-bg)] px-4 py-3 text-xs text-[var(--text)]">
              <p>
                <strong className="text-[var(--text-h)]">{plan.activeSeasonMonths} months</strong> active season for new
                receipts, <strong className="text-[var(--text-h)]">{plan.dataRetentionMonths} months</strong> of data &amp;
                reports access.
              </p>
            </div>

            <Link to={ROUTES.organizerRegister}>
              <Button fullWidth variant={plan.highlighted ? 'primary' : 'outline'}>
                Choose {plan.name}
              </Button>
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
