import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, LogOut, MapPin } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { Spinner } from '../components/ui/Spinner';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CollectorManager } from '../features/organizer/CollectorManager';
import { CollectionSummary } from '../features/organizer/CollectionSummary';
import { useOrganizerSession } from '../hooks/useOrganizerSession';
import { listCollectors } from '../services/mandalService';
import { writeItem, STORAGE_KEYS } from '../services/storageService';
import { formatDate } from '../utils/formatters';
import { ROUTES } from '../constants/routes';
import type { CollectorProfile } from '../types/user';

export function OrganizerDashboardPage() {
  const { organizer, event, loading } = useOrganizerSession(false);
  const navigate = useNavigate();
  const [collectors, setCollectors] = useState<CollectorProfile[]>([]);

  useEffect(() => {
    if (loading) return;
    if (!organizer) {
      navigate(ROUTES.organizerRegister, { replace: true });
      return;
    }
    if (!event) {
      navigate(ROUTES.organizerEventSetup, { replace: true });
      return;
    }
    setCollectors(listCollectors(false));
  }, [loading, organizer, event, navigate]);

  const handleSignOut = () => {
    writeItem(STORAGE_KEYS.organizer, null, false);
    navigate(ROUTES.home);
  };

  if (loading || !organizer || !event) {
    return <Spinner label="Loading your dashboard…" />;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Reveal>
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <Badge tone="accent">{organizer.planId === 'satisfy' ? 'Satisfy plan' : 'Base plan'}</Badge>
            <h1 className="mt-3 text-2xl font-semibold text-[var(--text-h)]">{event.eventName}</h1>
            <p className="text-sm text-[var(--text)]">{event.mandalName}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-[var(--text)]">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" /> {formatDate(event.startDate)} – {formatDate(event.endDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {event.city}
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
        <Reveal delay={0.06}>
          <CollectorManager mandalId={organizer.id} planId={organizer.planId} collectors={collectors} onChange={setCollectors} />
        </Reveal>
        <Reveal delay={0.1}>
          <CollectionSummary />
        </Reveal>
      </div>
    </div>
  );
}
