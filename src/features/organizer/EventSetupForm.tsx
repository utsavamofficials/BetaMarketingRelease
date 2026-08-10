import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { ImagePlus, X } from 'lucide-react';
import { eventSetupSchema, type EventSetupInput } from '../../utils/validators';
import { saveEvent } from '../../services/mandalService';
import { TextInput, TextArea } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../contexts/ToastContext';
import { ROUTES } from '../../constants/routes';
import type { OrganizerProfile } from '../../types/user';

const BRAND_SWATCHES = ['#aa3bff', '#f97316', '#dc2626', '#059669', '#2563eb', '#c026d3'];

export function EventSetupForm({ organizer, isDemo = false }: { organizer: OrganizerProfile; isDemo?: boolean }) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EventSetupInput>({
    resolver: zodResolver(eventSetupSchema),
    defaultValues: { brandColor: BRAND_SWATCHES[0] },
  });

  const brandColor = watch('brandColor');

  const onLogoChange = (file: File | undefined) => {
    if (!file) return;
    if (file.size > 1.5 * 1024 * 1024) {
      showToast('Logo image should be under 1.5MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setLogoDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: EventSetupInput) => {
    saveEvent(data, organizer, logoDataUrl, isDemo);
    showToast('Event is set up. You can now add Donation Collectors.', 'success');
    navigate(isDemo ? ROUTES.demo : ROUTES.organizerDashboard);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <TextInput
        label="Event name"
        htmlFor="eventName"
        required
        placeholder="Ganeshotsav 2026"
        error={errors.eventName?.message}
        {...register('eventName')}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="Start date" htmlFor="startDate" type="date" required error={errors.startDate?.message} {...register('startDate')} />
        <TextInput label="End date" htmlFor="endDate" type="date" required error={errors.endDate?.message} {...register('endDate')} />
      </div>
      <TextArea label="Venue address" htmlFor="address" required placeholder="Mandal mandap address" error={errors.address?.message} {...register('address')} />

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-[var(--text-h)]">Receipt brand color</span>
        <div className="flex flex-wrap items-center gap-2">
          {BRAND_SWATCHES.map((color) => (
            <button
              type="button"
              key={color}
              onClick={() => setValue('brandColor', color, { shouldValidate: true })}
              className="h-9 w-9 rounded-full border-2 transition-transform hover:scale-105"
              style={{ backgroundColor: color, borderColor: brandColor === color ? '#1a1523' : 'transparent' }}
              aria-label={`Use brand color ${color}`}
              aria-pressed={brandColor === color}
            />
          ))}
          <input type="hidden" {...register('brandColor')} />
        </div>
        <p className="text-xs text-[var(--text)]">Used on the digital receipt so it matches your mandal's identity.</p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-[var(--text-h)]">Mandal logo (optional)</span>
        {logoDataUrl ? (
          <div className="flex items-center gap-3">
            <img src={logoDataUrl} alt="Mandal logo preview" className="h-14 w-14 rounded-full border border-[var(--border)] object-cover" />
            <button type="button" onClick={() => setLogoDataUrl(null)} className="flex items-center gap-1 text-sm text-rose-600 hover:underline">
              <X className="h-4 w-4" /> Remove
            </button>
          </div>
        ) : (
          <label className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed border-[var(--border)] px-4 py-3 text-sm text-[var(--text)] hover:border-[var(--accent-border)] hover:text-[var(--accent)]">
            <ImagePlus className="h-4 w-4" />
            Upload logo
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onLogoChange(e.target.files?.[0])} />
          </label>
        )}
      </div>

      <Button type="submit" size="lg" isLoading={isSubmitting} className="mt-2">
        Save event & continue
      </Button>
    </form>
  );
}
