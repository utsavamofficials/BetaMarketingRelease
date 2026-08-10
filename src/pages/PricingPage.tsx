import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PricingTable } from '../components/marketing/PricingTable';
import { Reveal } from '../components/ui/Reveal';
import { ROUTES } from '../constants/routes';

const faqs = [
  {
    q: 'Is billing really just once a year?',
    a: 'Yes — Utsavam is billed as a single upfront annual payment. The "per month" figure is shown so it\'s easy to compare, but there is no recurring auto-debit or renewal mandate to manage.',
  },
  {
    q: "What's the difference between the active season and data retention?",
    a: 'New receipts can only be created during the 3-month active season, aligned to your collection period. Reports and exports, however, stay accessible for a full 12 months so you can hand over records to next year\'s committee.',
  },
  {
    q: 'Can I try it before registering?',
    a: 'Yes — use "Try for Free" to walk the full Organizer → Collector → Receipt flow with a mocked payment and no signup.',
  },
];

export function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Pricing"
          title="Plans built around your collection season"
          description="Both plans include unlimited digital receipts during the active season and a full year of data access."
        />
      </Reveal>

      <div className="mt-14">
        <PricingTable />
      </div>

      <Reveal>
        <div className="mx-auto mt-20 max-w-2xl">
          <h2 className="mb-6 text-center text-2xl font-medium text-[var(--text-h)]">Frequently asked</h2>
          <div className="flex flex-col divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)]">
            {faqs.map((item) => (
              <div key={item.q} className="flex gap-3 p-5">
                <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold text-[var(--text-h)]">{item.q}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--text)]">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-[var(--text)]">
            Still have questions?{' '}
            <Link to={ROUTES.contact} className="font-medium text-[var(--accent)] hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </Reveal>
    </div>
  );
}
