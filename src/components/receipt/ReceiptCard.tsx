import { forwardRef } from 'react';
import { formatDate, formatInr } from '../../utils/formatters';
import { APP_NAME } from '../../constants/app';
import type { DigitalReceipt } from '../../types/receipt';
import { GaneshIcon, MandalaWatermark, CornerFlourish, BrandEmblem } from './ReceiptOrnaments';

interface ReceiptCardProps {
  receipt: DigitalReceipt;
  qrDataUrl: string | null;
}

export const ReceiptCard = forwardRef<HTMLDivElement, ReceiptCardProps>(({ receipt, qrDataUrl }, ref) => {
  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[28px] shadow-2xl"
      style={{ fontFamily: 'var(--sans)' }}
    >
      {/* ---------- Header: gradient, mandala watermarks, corner brackets, Ganesh ---------- */}
      <div
        className="relative flex flex-col items-center gap-2.5 overflow-hidden px-8 pb-9 pt-8 text-center"
        style={{ background: `linear-gradient(160deg, ${receipt.brandColor} 0%, var(--receipt-header-end) 85%)` }}
      >
        <MandalaWatermark className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 text-[var(--receipt-gold)] opacity-25" />
        <MandalaWatermark className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 text-[var(--receipt-gold)] opacity-25" />
        <CornerFlourish className="pointer-events-none absolute left-2 top-2 h-8 w-8 text-[var(--receipt-gold)] opacity-80" />
        <CornerFlourish className="pointer-events-none absolute right-2 top-2 h-8 w-8 -scale-x-100 text-[var(--receipt-gold)] opacity-80" />

        {receipt.logoDataUrl ? (
          <img src={receipt.logoDataUrl} alt="" className="relative h-14 w-14 rounded-full border-2 border-[var(--receipt-gold)]/70 object-cover" />
        ) : (
          <GaneshIcon className="relative h-14 w-14 text-[var(--receipt-gold)] drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]" />
        )}

        <p
          className="relative text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--receipt-gold)]"
          style={{ fontFamily: 'var(--receipt-caps)' }}
        >
          Donation Receipt
        </p>
        <h2
          className="relative max-w-[85%] text-xl font-bold leading-snug text-[var(--receipt-gold)]"
          style={{ fontFamily: 'var(--receipt-display)' }}
        >
          {receipt.mandalName}
        </h2>
        <p className="relative text-sm text-white/85">{receipt.eventName}</p>
      </div>

      {/* ---------- Body: textured paper, corner flourishes, details ---------- */}
      <div
        className="relative flex flex-col items-center gap-5 px-7 pb-8 pt-9"
        style={{
          backgroundColor: 'var(--receipt-paper)',
          backgroundImage:
            'radial-gradient(circle at 12% 18%, rgba(42,18,69,0.035) 0, transparent 40%), radial-gradient(circle at 85% 12%, rgba(42,18,69,0.03) 0, transparent 35%), radial-gradient(circle at 30% 85%, rgba(42,18,69,0.03) 0, transparent 45%), radial-gradient(circle at 90% 80%, rgba(42,18,69,0.03) 0, transparent 40%)',
          color: 'var(--receipt-ink)',
        }}
      >
        <CornerFlourish className="pointer-events-none absolute left-2 top-2 h-7 w-7 text-[var(--receipt-gold-deep)] opacity-70" />
        <CornerFlourish className="pointer-events-none absolute right-2 top-2 h-7 w-7 -scale-x-100 text-[var(--receipt-gold-deep)] opacity-70" />
        <CornerFlourish className="pointer-events-none absolute bottom-2 left-2 h-7 w-7 -scale-y-100 text-[var(--receipt-gold-deep)] opacity-70" />
        <CornerFlourish className="pointer-events-none absolute bottom-2 right-2 h-7 w-7 -scale-x-100 -scale-y-100 text-[var(--receipt-gold-deep)] opacity-70" />

        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--receipt-gold-deep)]">Donated by</p>
          <p className="mt-1.5 text-[26px] font-bold leading-tight" style={{ fontFamily: 'var(--receipt-display)' }}>
            {receipt.donorName}
          </p>
        </div>

        {/* Hexagonal "banner tag" amount box */}
        <div
          className="flex w-full items-center justify-center border-2 py-4"
          style={{
            backgroundColor: 'var(--receipt-maroon)',
            borderColor: 'var(--receipt-gold-deep)',
            clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)',
          }}
        >
          <p
            className="text-4xl font-bold tracking-wide text-[var(--receipt-gold)]"
            style={{ fontFamily: 'var(--receipt-display)' }}
          >
            {formatInr(receipt.amount)}
          </p>
        </div>

        {qrDataUrl && (
          <div className="flex flex-col items-center gap-2.5 pt-2">
            <div className="relative rounded-xl border-2 border-[var(--receipt-gold-deep)] bg-white p-3">
              <img src={qrDataUrl} alt="QR code linking to this digital receipt" className="h-32 w-32" />
              <span className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[var(--receipt-gold-deep)] bg-[var(--receipt-paper)]">
                <BrandEmblem className="h-5 w-5 text-[var(--receipt-gold-deep)]" />
              </span>
            </div>
            <p className="text-[11px] text-[var(--receipt-ink)]/70">Scan to view or re-download this receipt</p>
          </div>
        )}

        <div className="flex w-full items-center justify-between border-t border-dashed border-[var(--receipt-ink)]/25 pt-4 text-[11px] text-[var(--receipt-ink)]/80">
          <span>{formatDate(receipt.issuedAt)}</span>
          <span className="font-mono uppercase tracking-wide">{receipt.id}</span>
        </div>

        <div
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--receipt-gold-deep)]"
          style={{ fontFamily: 'var(--receipt-caps)' }}
        >
          <BrandEmblem className="h-5 w-5" />
          Generated with {APP_NAME} · utsavam.app
        </div>

        {receipt.isDemo && (
          <span className="rounded-full bg-[#f3e6c0] px-3.5 py-1.5 text-[11px] font-semibold text-[#8a6d3b]">
            Demo receipt — not a real transaction
          </span>
        )}
      </div>
    </div>
  );
});
ReceiptCard.displayName = 'ReceiptCard';