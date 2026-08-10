import { forwardRef } from 'react';
import { Sparkles, HeartHandshake } from 'lucide-react';
import { formatDate, formatInr } from '../../utils/formatters';
import { APP_NAME } from '../../constants/app';
import type { DigitalReceipt } from '../../types/receipt';

interface ReceiptCardProps {
  receipt: DigitalReceipt;
  qrDataUrl: string | null;
}

/**
 * The shareable receipt image (Section 5). Deliberately shows ONLY donor
 * name + amount + event branding — no phone/contact, matching the spec's
 * PII constraint for the public/shareable asset.
 */
export const ReceiptCard = forwardRef<HTMLDivElement, ReceiptCardProps>(({ receipt, qrDataUrl }, ref) => {
  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-[var(--border)] bg-white text-[#1a1523] shadow-2xl"
    >
      <div
        className="relative flex flex-col items-center gap-2 px-8 pb-10 pt-9 text-center text-white"
        style={{ background: `linear-gradient(135deg, ${receipt.brandColor}, #1a1523)` }}
      >
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:16px_16px]" aria-hidden="true" />
        {receipt.logoDataUrl ? (
          <img src={receipt.logoDataUrl} alt="" className="h-14 w-14 rounded-full border-2 border-white/70 object-cover" />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/70 bg-white/10">
            <HeartHandshake className="h-7 w-7" aria-hidden="true" />
          </div>
        )}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Donation Receipt</p>
        <h2 className="max-w-[85%] text-xl font-semibold leading-snug">{receipt.mandalName}</h2>
        <p className="text-sm text-white/80">{receipt.eventName}</p>
      </div>

      <div className="flex flex-col items-center gap-5 px-8 py-8">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text)]">Donated by</p>
          <p className="mt-1 text-2xl font-semibold text-[#1a1523]">{receipt.donorName}</p>
        </div>

        <div className="w-full rounded-2xl bg-[var(--social-bg)] px-6 py-5 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text)]">Amount</p>
          <p className="mt-1 text-3xl font-bold" style={{ color: receipt.brandColor }}>
            {formatInr(receipt.amount)}
          </p>
        </div>

        {qrDataUrl && (
          <div className="flex flex-col items-center gap-2">
            <img src={qrDataUrl} alt="QR code linking to this digital receipt" className="h-32 w-32 rounded-lg border border-[var(--border)]" />
            <p className="text-[11px] text-[var(--text)]">Scan to view or re-download this receipt</p>
          </div>
        )}

        <div className="flex w-full items-center justify-between border-t border-dashed border-[var(--border)] pt-4 text-[11px] text-[var(--text)]">
          <span>{formatDate(receipt.issuedAt)}</span>
          <span className="font-mono">{receipt.id}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--accent)]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Generated with {APP_NAME} · utsavam.app
        </div>
        {receipt.isDemo && (
          <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700">
            Demo receipt — not a real transaction
          </span>
        )}
      </div>
    </div>
  );
});
ReceiptCard.displayName = 'ReceiptCard';
