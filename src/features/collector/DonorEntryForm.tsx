import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HandCoins } from 'lucide-react';
import { donorEntrySchema, type DonorEntryInput } from '../../utils/validators';
import { TextInput } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';

const QUICK_AMOUNTS = [101, 251, 501, 1001];

export function DonorEntryForm({ onSubmit }: { onSubmit: (data: DonorEntryInput) => void }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DonorEntryInput>({ resolver: zodResolver(donorEntrySchema) });

  const amount = watch('amount');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="flex items-center gap-2 text-[var(--accent)]">
        <HandCoins className="h-5 w-5" />
        <h2 className="text-lg font-semibold text-[var(--text-h)]">Record a donation</h2>
      </div>

      <TextInput label="Donor's name" htmlFor="donorName" required placeholder="Rohan Deshmukh" error={errors.donorName?.message} {...register('donorName')} />
      <TextInput
        label="Donor's mobile number"
        htmlFor="contact"
        required
        placeholder="98765 43210"
        inputMode="numeric"
        hint="Used only for the mandal's internal records — never shown on the shared receipt."
        error={errors.contact?.message}
        {...register('contact')}
      />

      <div className="flex flex-col gap-2">
        <TextInput label="Amount (₹)" htmlFor="amount" required type="number" min={1} placeholder="501" error={errors.amount?.message} {...register('amount')} />
        <div className="flex flex-wrap gap-2">
          {QUICK_AMOUNTS.map((value) => (
            <button
              type="button"
              key={value}
              onClick={() => setValue('amount', value, { shouldValidate: true })}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                Number(amount) === value
                  ? 'border-[var(--accent)] bg-[var(--accent-bg)] text-[var(--accent)]'
                  : 'border-[var(--border)] text-[var(--text)] hover:border-[var(--accent-border)]'
              }`}
            >
              ₹{value}
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" size="lg" isLoading={isSubmitting}>
        Continue to payment
      </Button>
    </form>
  );
}
