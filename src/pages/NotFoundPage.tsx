import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../constants/routes';

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-bg)] text-[var(--accent)]">
        <Compass className="h-7 w-7" />
      </span>
      <h1 className="text-2xl font-semibold text-[var(--text-h)]">Page not found</h1>
      <p className="text-sm text-[var(--text)]">
        This beta only ships the flows described in its spec — this page isn't one of them.
      </p>
      <Link to={ROUTES.home}>
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
