import { ArrowRight, HandCoins, QrCode, Receipt, UserRoundCheck } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

const steps = [
  {
    icon: UserRoundCheck,
    title: 'Donor approaches Collector',
    description: 'No app to install, no account to create — the donor just walks up.',
  },
  {
    icon: HandCoins,
    title: 'Collector records the donation',
    description: 'Name, amount, and contact — entered in seconds on any phone.',
  },
  {
    icon: Receipt,
    title: 'Payment confirmed',
    description: 'UPI, card, or cash — the moment payment succeeds, the receipt is generated.',
  },
  {
    icon: QrCode,
    title: 'Digital receipt, shared instantly',
    description: 'A QR code for the donor to self-download, or the collector shares it directly.',
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Core flow"
          title="Donation to digital receipt, in one smooth motion"
          description="This is the moment the entire product is built around — everything else exists to support it."
        />
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.08}>
            <div className="relative flex h-full flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-bg)] text-[var(--accent)]">
                <step.icon className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold text-[var(--text-h)]">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--text)]">{step.description}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-[var(--border)] lg:block" aria-hidden="true" />
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
