import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { APP_NAME } from '../../constants/app';
import { Button } from '../ui/Button';
import circleLogo from '../../assets/logoCircleNoBg.png';

const navLinks = [
  { to: ROUTES.home, label: 'Home' },
  { to: ROUTES.pricing, label: 'Pricing' },
  { to: ROUTES.demo, label: 'Try for Free' },
  { to: ROUTES.contact, label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Primary">
        <Link to={ROUTES.home} className="flex items-center gap-2 text-[var(--text-h)]" onClick={() => setOpen(false)}>
          <span className="flex h-auto w-auto items-center justify-center text-white">
            <img src={circleLogo} alt="Logo" className="h-12 w-12 " aria-hidden="true"  />
          </span>
          <span className="text-lg font-bold tracking-tight text-[var(--accent)] uppercase">{APP_NAME}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-[var(--accent-bg)] text-[var(--accent)]' : 'text-[var(--text)] hover:text-[var(--text-h)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link to={ROUTES.organizerRegister}>
            <Button variant="outline" size="sm">
              Organizer sign in
            </Button>
          </Link>
          <Link to={ROUTES.demo}>
            <Button size="sm">Try for Free</Button>
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-[var(--text-h)] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[var(--border)] px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-[var(--accent-bg)] text-[var(--accent)]' : 'text-[var(--text)]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to={ROUTES.organizerRegister} onClick={() => setOpen(false)} className="mt-2">
              <Button variant="outline" size="sm" fullWidth>
                Organizer sign in
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
