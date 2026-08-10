import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Sparkles } from 'lucide-react';
import { Spinner } from '../components/ui/Spinner';
import { CollectorFlow } from '../features/collector/CollectorFlow';
import { useCollectorSession } from '../hooks/useCollectorSession';
import { getEvent } from '../services/mandalService';
import { ROUTES } from '../constants/routes';
import { APP_NAME } from '../constants/app';

export function CollectorCollectPage() {
  const { collector, loading, logout } = useCollectorSession(false);
  const navigate = useNavigate();
  const event = getEvent(false);

  useEffect(() => {
    if (loading) return;
    if (!collector) {
      navigate(ROUTES.collectorLogin, { replace: true });
    }
  }, [loading, collector, navigate]);

  if (loading || !collector) {
    return <Spinner label="Loading…" />;
  }

  if (!event) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-24 text-center">
        <h1 className="text-lg font-semibold text-[var(--text-h)]">Event not set up yet</h1>
        <p className="text-sm text-[var(--text)]">
          Ask your mandal's Organizer to finish event setup before you start recording donations.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col px-4 py-8 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <Link to={ROUTES.home} className="flex items-center gap-2 text-[var(--text-h)]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold">{APP_NAME}</span>
        </Link>
        <button onClick={() => { logout(); navigate(ROUTES.collectorLogin); }} className="flex items-center gap-1.5 text-sm text-[var(--text)] hover:text-rose-600">
          <LogOut className="h-4 w-4" /> {collector.fullName.split(' ')[0]}
        </button>
      </div>

      <div className="flex-1 rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-[var(--shadow)] sm:p-8">
        <CollectorFlow collector={collector} event={event} isDemo={false} />
      </div>
    </div>
  );
}
