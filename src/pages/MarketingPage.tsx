
import { HowItWorks } from '../components/marketing/HowItWorks';
import { FeatureGrid } from '../components/marketing/FeatureGrid';
// import { DeveloperSection } from '../components/marketing/DeveloperSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PricingTable } from '../components/marketing/PricingTable';
import { Reveal } from '../components/ui/Reveal';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '../constants/routes';
import Hero from '../components/marketing/Hero';

export function MarketingPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeatureGrid />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Pricing" title="Simple, seasonal pricing" description="One upfront payment for the full festival season — no auto-debit to manage." />
        </Reveal>
        <div className="mt-12">
          <PricingTable />
        </div>
        <div className="mt-8 text-center">
          <Link to={ROUTES.pricing} className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline">
            See full plan comparison <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* <CTASection /> */}
      {/* <DeveloperSection /> */}
    </>
  );
}
