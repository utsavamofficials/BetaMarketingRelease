import {
  Instagram,
  Mail,
  Phone,
} from 'lucide-react';

import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { ContactForm } from '../features/contact/ContactForm';

export function ContactPage() {
  const contactDetails = [
    {
      icon: Phone,
      label: 'Call us',
      value: '+91 73859 75192',
      href: 'tel:+917385975192',
      description: 'Talk directly with our team',
    },
    {
      icon: Mail,
      label: 'Email us',
      value: 'utsavamofficials@gmail.com',
      href: 'mailto:utsavamofficials@gmail.com',
      description: 'We usually respond within 1–2 days',
    },
    {
      icon: Instagram,
      label: 'Follow us',
      value: '@utsavam_official',
      href: 'https://instagram.com/utsavam_official',
      description: 'Connect with us on Instagram',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
      {/* Heading */}
      <Reveal>
        <SectionHeading
          eyebrow="Contact"
          title="Talk to the Utsavam team"
          description="Questions about pricing, onboarding your mandal, or anything else — we read every message."
        />
      </Reveal>

      {/* Contact Details */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contactDetails.map((item, index) => {
          const Icon = item.icon;

          return (
            <Reveal key={item.label} delay={0.05 * index}>
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  item.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                className="group block h-full"
              >
                <Card
                  className="
                    h-full
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_12px_35px_rgba(0,0,0,0.07)]
                  "
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="
                        flex h-11 w-11 shrink-0 items-center justify-center
                        rounded-xl
                        border border-[var(--border)]
                        bg-[var(--surface-muted)]
                        text-[var(--text-h)]
                        transition-all duration-300
                        group-hover:border-[var(--accent)]
                        group-hover:text-[var(--accent)]
                      "
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                        {item.label}
                      </p>

                      <p
                        className="
                          mt-1 truncate
                          text-sm font-semibold
                          text-[var(--text-h)]
                          transition-colors
                          group-hover:text-[var(--accent)]
                        "
                      >
                        {item.value}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[var(--text)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </a>
            </Reveal>
          );
        })}
      </div>

      {/* Contact Form */}
      <Reveal delay={0.15}>
        <Card className="mt-6 sm:mt-8">
          <div className="mb-7">
            <h2 className="text-lg font-semibold text-[var(--text-h)]">
              Send us a message
            </h2>

            <p className="mt-1 text-sm leading-6 text-[var(--text)]">
              Fill in the details below and our team will get back to you.
            </p>
          </div>

          <ContactForm />
        </Card>
      </Reveal>
    </div>
  );
}