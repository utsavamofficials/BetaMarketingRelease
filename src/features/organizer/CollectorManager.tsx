import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, UserRound } from 'lucide-react';
import { collectorFormSchema, type CollectorFormInput } from '../../utils/validators';
import { addCollector, removeCollector } from '../../services/mandalService';
import { TextInput } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { useToast } from '../../contexts/ToastContext';
import type { CollectorProfile } from '../../types/user';
import pricing from '../../data/pricing.json';

export function CollectorManager({
  mandalId,
  planId,
  collectors,
  onChange,
  isDemo = false,
}: {
  mandalId: string;
  planId: 'base' | 'satisfy';
  collectors: CollectorProfile[];
  onChange: (next: CollectorProfile[]) => void;
  isDemo?: boolean;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();
  const seatLimit = pricing.plans.find((p) => p.id === planId)?.collectors ?? 2;
  const atLimit = collectors.length >= seatLimit;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CollectorFormInput>({ resolver: zodResolver(collectorFormSchema) });

  const onSubmit = async (data: CollectorFormInput) => {
    if (collectors.some((c) => c.phone === data.phone)) {
      showToast('A collector with this mobile number already exists.', 'error');
      return;
    }
    const next = addCollector(data, mandalId, isDemo);
    onChange([...collectors, next]);
    reset();
    setModalOpen(false);
    showToast(`${data.fullName} added as a Donation Collector.`, 'success');
  };

  const handleRemove = (id: string, name: string) => {
    const next = removeCollector(id, isDemo);
    onChange(next);
    showToast(`${name} removed.`, 'info');
  };

  return (
    <Card>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-h)]">Donation Collectors</h3>
          <p className="text-sm text-[var(--text)]">
            {collectors.length} of {seatLimit} seats used on the {planId === 'satisfy' ? 'Satisfy' : 'Base'} plan
          </p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)} disabled={atLimit}>
          <Plus className="h-4 w-4" /> Add collector
        </Button>
      </div>

      {atLimit && (
        <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
          You've reached the seat limit for this plan. Remove a collector or upgrade to add more.
        </p>
      )}

      {collectors.length === 0 ? (
        <EmptyState
          icon={<UserRound className="h-8 w-8" />}
          title="No collectors yet"
          description="Add the people who'll be collecting donations at your mandal so they can log in and start issuing receipts."
          action={
            <Button size="sm" variant="secondary" onClick={() => setModalOpen(true)}>
              Add your first collector
            </Button>
          }
        />
      ) : (
        <ul className="flex flex-col divide-y divide-[var(--border)]">
          {collectors.map((collector) => (
            <li key={collector.id} className="flex items-center justify-between gap-3 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-bg)] text-sm font-semibold text-[var(--accent)]">
                  {collector.fullName.charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="text-sm font-medium text-[var(--text-h)]">{collector.fullName}</p>
                  <p className="text-xs text-[var(--text)]">+91 {collector.phone} · PIN set</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(collector.id, collector.fullName)}
                className="rounded-full p-2 text-[var(--text)] hover:bg-rose-50 hover:text-rose-600"
                aria-label={`Remove ${collector.fullName}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add a Donation Collector">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          <TextInput label="Full name" htmlFor="collectorName" required placeholder="Sanika Joshi" error={errors.fullName?.message} {...register('fullName')} />
          <TextInput label="Mobile number" htmlFor="collectorPhone" required placeholder="98765 43210" inputMode="numeric" error={errors.phone?.message} {...register('phone')} />
          <TextInput label="4-digit login PIN" htmlFor="collectorPin" required placeholder="1234" inputMode="numeric" maxLength={4} error={errors.pin?.message} {...register('pin')} />
          <Button type="submit" isLoading={isSubmitting} fullWidth>
            Add collector
          </Button>
        </form>
      </Modal>
    </Card>
  );
}
