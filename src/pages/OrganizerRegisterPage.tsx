import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import { Card } from '../components/ui/Card';
import { RegisterForm } from '../features/organizer/RegisterForm';
import { useOrganizerSession } from '../hooks/useOrganizerSession';
import { ROUTES } from '../constants/routes';
import { APP_NAME } from '../constants/app';

export function OrganizerRegisterPage() {
  const { organizer, loading } = useOrganizerSession(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && organizer) {
      navigate(ROUTES.organizerDashboard, { replace: true });
    }
  }, [loading, organizer, navigate]);

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <Reveal>
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-[var(--text-h)]">Register your mandal on {APP_NAME}</h1>
          <p className="mt-2 text-sm text-[var(--text)]">
            Already registered?{' '}
            <Link to={ROUTES.collectorLogin} className="font-medium text-[var(--accent)] hover:underline">
              Collector login
            </Link>
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <Card>
          <RegisterForm />
        </Card>
      </Reveal>
    </div>
  );
}
