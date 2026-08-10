import QRCode from 'qrcode';
import { env } from '../config/env';
import { ROUTES } from '../constants/routes';
import { readItem, writeItem } from './storageService';
import type { DigitalReceipt } from '../types/receipt';
import { generateReceiptCode } from '../utils/ids';

/**
 * Builds the stable, donor-accessible URL the QR code resolves to.
 * (Section 5: "not a session-bound URL that expires when the collector's
 * device disconnects" — this route is public and reads from storage,
 * not from any in-memory session.)
 */
export function receiptUrl(receiptId: string): string {
  return `${env.siteUrl}${ROUTES.receiptFor(receiptId)}`;
}

export async function generateReceiptQrDataUrl(receiptId: string): Promise<string> {
  return QRCode.toDataURL(receiptUrl(receiptId), {
    margin: 1,
    width: 320,
    color: { dark: '#1a1523', light: '#ffffff' },
  });
}

export function createReceipt(input: {
  donationId: string;
  mandalName: string;
  eventName: string;
  donorName: string;
  amount: number;
  brandColor: string;
  logoDataUrl: string | null;
  isDemo: boolean;
}): DigitalReceipt {
  const receipt: DigitalReceipt = {
    id: generateReceiptCode(),
    donationId: input.donationId,
    mandalName: input.mandalName,
    eventName: input.eventName,
    donorName: input.donorName,
    amount: input.amount,
    brandColor: input.brandColor,
    logoDataUrl: input.logoDataUrl,
    issuedAt: new Date().toISOString(),
    isDemo: input.isDemo,
  };

  // Receipts are looked up by id alone (see ReceiptPage), independent of
  // whichever namespace created them, so the QR link works the same way
  // for demo and production receipts. Demo receipts are still flagged
  // `isDemo: true` end-to-end — this only lets the *shareable link itself*
  // resolve; it never creates a real mandal/collector/donation record,
  // which is what Section 6 actually requires stay isolated.
  const all = readItem<Record<string, DigitalReceipt>>('receipts_index', false) ?? {};
  all[receipt.id] = receipt;
  writeItem('receipts_index', all, false);

  return receipt;
}

export function getReceiptById(receiptId: string): DigitalReceipt | null {
  const all = readItem<Record<string, DigitalReceipt>>('receipts_index', false) ?? {};
  return all[receiptId] ?? null;
}
