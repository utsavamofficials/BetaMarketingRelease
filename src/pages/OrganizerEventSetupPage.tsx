import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import { Card } from '../components/ui/Card';
import { Spinner } from '../components/ui/Spinner';
import { EventSetupForm } from '../features/organizer/EventSetupForm';
import { useOrganizerSession } from '../hooks/useOrganizerSession';
import { ROUTES } from '../constants/routes';

export function OrganizerEventSetupPage() {
  const { organizer, event, loading } = useOrganizerSession(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!organizer) {
      navigate(ROUTES.organizerRegister, { replace: true });
      return;
    }
    if (event) {
      navigate(ROUTES.organizerDashboard, { replace: true });
    }
  }, [loading, organizer, event, navigate]);

  if (loading || !organizer) {
    return <Spinner label="Loading your mandal…" />;
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <Reveal>
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-[var(--text-h)]">Set up your event</h1>
          <p className="mt-2 text-sm text-[var(--text)]">
            These details appear on every digital receipt {organizer.mandalName} issues this season.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <Card>
          <EventSetupForm organizer={organizer} />
        </Card>
      </Reveal>
    </div>
  );
}
