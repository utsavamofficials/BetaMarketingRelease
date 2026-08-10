import { LayoutDashboard, ShieldCheck, Smartphone, Users2 } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

const features = [
  {
    icon: Users2,
    title: 'Two focused roles',
    description: 'Organizers set up the event and manage collectors. Collectors focus on one job: recording donations fast.',
  },
  {
    icon: Smartphone,
    title: 'Zero friction for donors',
    description: 'No donor accounts, no logins, no app installs — ever. Friction at collection time costs adoption.',
  },
  {
    icon: LayoutDashboard,
    title: 'Collection summaries, exportable',
    description: "Organizers see totals by collector and can export the season's data whenever they need it.",
  },
  {
    icon: ShieldCheck,
    title: 'Privacy-aware receipts',
    description: 'Shareable receipts show only the donor name and amount — contact details never leave the mandal records.',
  },
];

export function FeatureGrid() {
  return (
    <section className="bg-[var(--social-bg)] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Why mandals switch" title="Built around the one thing that matters at the mandap" />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.06}>
              <div className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--accent-bg)] text-[var(--accent)]">
                  <feature.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-h)]">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--text)]">{feature.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
