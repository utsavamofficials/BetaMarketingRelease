import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { ROUTES } from '../../constants/routes';

export function CTASection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-[var(--accent)] px-8 py-14 text-center text-white sm:px-16">
          <div
            className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_15%_25%,white_1px,transparent_1px)] [background-size:18px_18px]"
            aria-hidden="true"
          />
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Ready to see it for yourself?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Walk through the full Organizer → Collector → Receipt flow in under a minute. No signup, no real
            payment, no commitment.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to={ROUTES.demo}>
              <Button size="lg" className="bg-white text-[var(--accent)] hover:brightness-95">
                <PlayCircle className="h-5 w-5" /> Try for Free
              </Button>
            </Link>
            <Link to={ROUTES.organizerRegister}>
              <Button size="lg" variant="outline" className="border-white/60 text-white hover:border-white hover:text-white">
                Register your mandal <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
