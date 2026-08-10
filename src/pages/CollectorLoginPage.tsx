import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { collectorLoginSchema, type CollectorLoginInput } from '../utils/validators';
import { useCollectorSession } from '../hooks/useCollectorSession';
import { TextInput } from '../components/ui/FormField';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { useToast } from '../contexts/ToastContext';
import { ROUTES } from '../constants/routes';

export function CollectorLoginPage() {
  const { login } = useCollectorSession(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [failed, setFailed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CollectorLoginInput>({ resolver: zodResolver(collectorLoginSchema) });

  const onSubmit = async (data: CollectorLoginInput) => {
    setFailed(false);
    const found = login(data.phone, data.pin);
    if (found) {
      showToast(`Welcome back, ${found.fullName.split(' ')[0]}!`, 'success');
      navigate(ROUTES.collectorCollect);
    } else {
      setFailed(true);
    }
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16 sm:px-6">
      <Reveal>
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-[var(--text-h)]">Donation Collector login</h1>
          <p className="mt-2 text-sm text-[var(--text)]">Use the mobile number and PIN your Organizer set up for you.</p>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
            <TextInput label="Mobile number" htmlFor="phone" required placeholder="98765 43210" inputMode="numeric" error={errors.phone?.message} {...register('phone')} />
            <TextInput label="4-digit PIN" htmlFor="pin" required type="password" placeholder="••••" inputMode="numeric" maxLength={4} error={errors.pin?.message} {...register('pin')} />
            {failed && (
              <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
                That mobile number and PIN don't match any collector. Check with your Organizer.
              </p>
            )}
            <Button type="submit" size="lg" isLoading={isSubmitting}>
              <LogIn className="h-4 w-4" /> Log in
            </Button>
          </form>
        </Card>
      </Reveal>
    </div>
  );
}
