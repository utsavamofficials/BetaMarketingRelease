import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { organizerRegisterSchema, type OrganizerRegisterInput } from '../../utils/validators';
import { registerOrganizer } from '../../services/mandalService';
import { TextInput, Select } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../contexts/ToastContext';
import { ROUTES } from '../../constants/routes';
import pricing from '../../data/pricing.json';

export function RegisterForm() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrganizerRegisterInput>({
    resolver: zodResolver(organizerRegisterSchema),
    defaultValues: { planId: 'base' },
  });

  const onSubmit = async (data: OrganizerRegisterInput) => {
    registerOrganizer(data, false);
    showToast(`Welcome, ${data.fullName.split(' ')[0]}! Let's set up your event.`, 'success');
    navigate(ROUTES.organizerEventSetup);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <TextInput label="Your full name" htmlFor="fullName" required placeholder="Ganesh Patil" error={errors.fullName?.message} {...register('fullName')} />
      <TextInput label="Mandal name" htmlFor="mandalName" required placeholder="Shree Ganesh Mitra Mandal" error={errors.mandalName?.message} {...register('mandalName')} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="City" htmlFor="city" required placeholder="Nashik" error={errors.city?.message} {...register('city')} />
        <TextInput label="Mobile number" htmlFor="phone" required placeholder="98765 43210" inputMode="numeric" error={errors.phone?.message} {...register('phone')} />
      </div>
      <TextInput label="Email address" htmlFor="email" type="email" required placeholder="adhyaksha@mandal.org" error={errors.email?.message} {...register('email')} />
      <Select label="Subscription plan" htmlFor="planId" required error={errors.planId?.message} {...register('planId')}>
        {pricing.plans.map((plan) => (
          <option key={plan.id} value={plan.id}>
            {plan.name} — up to {plan.collectors} collectors
          </option>
        ))}
      </Select>
      <Button type="submit" size="lg" isLoading={isSubmitting} className="mt-2">
        Continue to event setup
      </Button>
      <p className="text-center text-xs text-[var(--text)]">
        This beta uses a lightweight sign-in for demonstration — no password or OTP is required yet.
      </p>
    </form>
  );
}
