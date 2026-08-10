import { Link } from 'react-router-dom';
import { Sparkles, Mail, MapPin } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { APP_NAME, APP_TAGLINE } from '../../constants/app';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--social-bg)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-[var(--text-h)]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-white">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-base font-semibold">{APP_NAME}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--text)]">{APP_TAGLINE}</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-[var(--text)]">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" /> Built for Ganesh mandals across Maharashtra
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--text-h)]">Product</h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--text)]">
            <li><Link to={ROUTES.home} className="hover:text-[var(--accent)]">How it works</Link></li>
            <li><Link to={ROUTES.pricing} className="hover:text-[var(--accent)]">Pricing</Link></li>
            <li><Link to={ROUTES.demo} className="hover:text-[var(--accent)]">Try for Free</Link></li>
            <li><Link to={ROUTES.organizerRegister} className="hover:text-[var(--accent)]">Register your mandal</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--text-h)]">Support</h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--text)]">
            <li><Link to={ROUTES.contact} className="hover:text-[var(--accent)]">Contact us</Link></li>
            <li><Link to={ROUTES.collectorLogin} className="hover:text-[var(--accent)]">Collector login</Link></li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" /> 
              <Link to="mailto:utsavamofficials@gmail.com" className="hover:text-[var(--accent)]">utsavamofficials@gmail.com</Link>
              </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--border)] px-4 py-5 text-center text-xs text-[var(--text)] sm:px-6">
        © {new Date().getFullYear()} {APP_NAME}. Beta release — built for a smoother mandal season.
      </div>
    </footer>
  );
}
