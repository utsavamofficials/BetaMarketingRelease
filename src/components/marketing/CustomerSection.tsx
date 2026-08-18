import { MapPin, Building2 } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

const customers = [
    {
        mandalName: 'Jay Bhavani Ganesh Mandal',
        mandalLocation: 'Jalgaon 425001',
        description: 'Meharun Yuva Mitra Mandal.',
        city: 'Jalgaon',
        pincode: '425001',
    },
    {
        mandalName: 'Shiv kalyan Mitra Mandal',
        mandalLocation: 'yawal 422001',
        description: 'yawal Ganesh Festival Mandal.',
        city: 'Jalgaon',
        pincode: '425301',
    },
];

const CustomerSection = () => {
    return (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <Reveal>
                <SectionHeading
                    eyebrow="Our customers"
                    title="Built for mandals that want simpler donation management"
                    description="From local Ganesh mandals to growing community organizations, make every donation easier to collect, track, and acknowledge."
                />
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
                {customers.map((customer, index) => (
                    <Reveal key={customer.mandalName} delay={index * 0.08}>
                        <div className="relative flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                            <div className="flex items-start gap-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--accent-bg)] text-[var(--accent)]">
                                    <Building2 className="h-5 w-5" />
                                </span>

                                <div className="min-w-0">
                                    <h3 className="text-base font-semibold text-[var(--text-h)]">
                                        {customer.mandalName}
                                    </h3>

                                    <div className="mt-1 flex items-center gap-1.5 text-sm text-[var(--text)]">
                                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                                        <span>{customer.mandalLocation}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-5 text-sm leading-relaxed text-[var(--text)]">
                                {customer.description}
                            </p>

                            <div className="mt-6 flex items-center gap-2 border-t border-[var(--border)] pt-4 text-xs text-[var(--text)]">
                                <span>{customer.city}</span>
                                <span className="text-[var(--border)]">•</span>
                                <span>{customer.pincode}</span>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

export default CustomerSection;