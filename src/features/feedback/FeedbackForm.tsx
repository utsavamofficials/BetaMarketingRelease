import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star, CheckCircle2 } from 'lucide-react';
import { feedbackSchema, type FeedbackInput } from '../../utils/validators';
import { submitFeedback } from '../../services/mailService';
import { TextArea, TextInput } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../contexts/ToastContext';

export function FeedbackForm({ onDone }: { onDone?: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackInput>({ resolver: zodResolver(feedbackSchema), defaultValues: { rating: 5 } });

  const rating = watch('rating');

  const onSubmit = async (data: FeedbackInput) => {
    const result = await submitFeedback(data);
    if (result.delivered) {
      showToast('Thanks — your feedback was sent to the team.', 'success');
    } else {
      showToast('Feedback saved locally (mail delivery not configured in this environment).', 'info');
    }
    setSubmitted(true);
    onDone?.();
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-2 py-6 text-center">
        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
        <h3 className="text-lg font-semibold text-[var(--text-h)]">Thanks for trying the demo!</h3>
        <p className="text-sm text-[var(--text)]">Your feedback helps us shape the full release.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div>
        <p className="mb-2 text-sm font-medium text-[var(--text-h)]">How was your demo experience?</p>
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <div className="flex gap-1" role="radiogroup" aria-label="Rating out of 5">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  type="button"
                  key={value}
                  role="radio"
                  aria-checked={rating === value}
                  onClick={() => field.onChange(value)}
                  className="p-1"
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${value <= (rating ?? 0) ? 'fill-[var(--accent)] text-[var(--accent)]' : 'text-[var(--border)]'}`}
                  />
                </button>
              ))}
            </div>
          )}
        />
        {errors.rating && <p className="mt-1 text-xs font-medium text-rose-600">{errors.rating.message}</p>}
      </div>

      <TextArea label="What stood out?" htmlFor="liked" required placeholder="e.g. the receipt looked great and shared easily" error={errors.liked?.message} {...register('liked')} />
      <TextArea label="What could be better? (optional)" htmlFor="improve" placeholder="Anything that felt confusing or missing" error={errors.improve?.message} {...register('improve')} />
      <TextInput label="Email (optional, if you'd like a reply)" htmlFor="contactEmail" type="email" placeholder="you@mandal.org" error={errors.contactEmail?.message} {...register('contactEmail')} />

      <Button type="submit" isLoading={isSubmitting} size="lg">
        Send feedback
      </Button>
    </form>
  );
}
