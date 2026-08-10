import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Landmark, Smartphone, Wallet, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { formatInr } from '../../utils/formatters';
import { runPayment } from '../../services/paymentService';
import type { PaymentMode } from '../../types/donation';

const MODES: { id: PaymentMode; label: string; icon: typeof Smartphone }[] = [
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'card', label: 'Card', icon: Landmark },
  { id: 'cash', label: 'Cash', icon: Wallet },
];

export function PaymentStep({
  amount,
  donorName,
  isDemo,
  onSuccess,
  onCancel,
}: {
  amount: number;
  donorName: string;
  isDemo: boolean;
  onSuccess: (mode: PaymentMode, paymentRef: string) => void;
  onCancel: () => void;
}) {
  const [mode, setMode] = useState<PaymentMode>('upi');
  const [status, setStatus] = useState<'idle' | 'processing' | 'failed'>('idle');

  const handlePay = async () => {
    setStatus('processing');
    const result = await runPayment({ amount, mode, isDemo });
    if (result.success && result.paymentRef) {
      onSuccess(mode, result.paymentRef);
    } else {
      setStatus('failed');
    }
  };

  if (status === 'processing') {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <Spinner label={isDemo ? 'Simulating payment confirmation…' : `Confirming ${mode.toUpperCase()} payment…`} />
        <p className="text-sm text-[var(--text)]">Please don't close this screen.</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-5">
      <div>
        <p className="text-sm text-[var(--text)]">Collecting from</p>
        <h2 className="text-lg font-semibold text-[var(--text-h)]">{donorName}</h2>
      </div>

      <div className="rounded-2xl bg-[var(--social-bg)] px-6 py-5 text-center">
        <p className="text-xs uppercase tracking-wide text-[var(--text)]">Amount to collect</p>
        <p className="mt-1 text-3xl font-bold text-[var(--text-h)]">{formatInr(amount)}</p>
      </div>

      {isDemo && (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-center text-xs font-medium text-amber-700">
          Demo mode — no real payment gateway or money movement.
        </p>
      )}

      <div className="grid grid-cols-3 gap-2">
        {MODES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-sm font-medium transition-colors ${
              mode === id ? 'border-[var(--accent)] bg-[var(--accent-bg)] text-[var(--accent)]' : 'border-[var(--border)] text-[var(--text)]'
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </div>

      {status === 'failed' && (
        <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2.5 text-sm text-rose-700">
          <XCircle className="h-4 w-4 shrink-0" />
          Payment could not be confirmed. Please try again.
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel} fullWidth>
          Back
        </Button>
        <Button onClick={handlePay} fullWidth>
          <CheckCircle2 className="h-4 w-4" /> {mode === 'cash' ? 'Confirm cash received' : `Collect via ${mode.toUpperCase()}`}
        </Button>
      </div>
    </motion.div>
  );
}
