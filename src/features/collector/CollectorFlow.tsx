import { useState } from 'react';
import { Stepper } from '../../components/ui/Stepper';
import { DonorEntryForm } from './DonorEntryForm';
import { PaymentStep } from './PaymentStep';
import { ReceiptResult } from './ReceiptResult';
import { recordDonation, updateDonation } from '../../services/mandalService';
import { createReceipt } from '../../services/receiptService';
import { useToast } from '../../contexts/ToastContext';
import type { DonorEntryInput } from '../../utils/validators';
import type { Donation, PaymentMode } from '../../types/donation';
import type { DigitalReceipt } from '../../types/receipt';
import type { CollectorProfile } from '../../types/user';
import type { MandalEvent } from '../../types/event';

type Step = 'entry' | 'payment' | 'receipt';

export function CollectorFlow({
  collector,
  event,
  isDemo,
  onReceiptIssued,
}: {
  collector: CollectorProfile;
  event: MandalEvent;
  isDemo: boolean;
  onReceiptIssued?: (receipt: DigitalReceipt) => void;
}) {
  const [step, setStep] = useState<Step>('entry');
  const [donation, setDonation] = useState<Donation | null>(null);
  const [receipt, setReceipt] = useState<DigitalReceipt | null>(null);
  const { showToast } = useToast();

  const stepIndex = step === 'entry' ? 0 : step === 'payment' ? 1 : 2;

  const handleDonorSubmit = (data: DonorEntryInput) => {
    const created = recordDonation(data, 'upi', collector, event, isDemo);
    setDonation(created);
    setStep('payment');
  };

  const handlePaymentSuccess = (mode: PaymentMode, paymentRef: string) => {
    if (!donation) return;
    updateDonation(donation.id, { paymentStatus: 'success', paymentMode: mode, paymentRef }, isDemo);

    const newReceipt = createReceipt({
      donationId: donation.id,
      mandalName: event.mandalName,
      eventName: event.eventName,
      donorName: donation.donorName,
      amount: donation.amount,
      brandColor: event.brandColor,
      logoDataUrl: event.logoDataUrl,
      isDemo,
    });
    updateDonation(donation.id, { receiptId: newReceipt.id }, isDemo);

    setReceipt(newReceipt);
    setStep('receipt');
    showToast('Receipt generated — show the QR to the donor.', 'success');
    onReceiptIssued?.(newReceipt);
  };

  const reset = () => {
    setDonation(null);
    setReceipt(null);
    setStep('entry');
  };

  return (
    <div className="flex flex-col gap-8">
      <Stepper steps={['Donor details', 'Payment', 'Receipt']} currentIndex={stepIndex} />

      {step === 'entry' && <DonorEntryForm onSubmit={handleDonorSubmit} />}

      {step === 'payment' && donation && (
        <PaymentStep
          amount={donation.amount}
          donorName={donation.donorName}
          isDemo={isDemo}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setStep('entry')}
        />
      )}

      {step === 'receipt' && receipt && <ReceiptResult receipt={receipt} onRecordAnother={reset} />}
    </div>
  );
}
