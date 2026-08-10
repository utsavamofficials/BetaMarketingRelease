import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { ContactForm } from '../features/contact/ContactForm';

export function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading eyebrow="Contact" title="Talk to the Utsavam team" description="Questions about pricing, onboarding your mandal, or anything else — we read every message." />
      </Reveal>
      <Reveal delay={0.1}>
        <Card className="mt-10">
          <ContactForm />
        </Card>
      </Reveal>
    </div>
  );
}
