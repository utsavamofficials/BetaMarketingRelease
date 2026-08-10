export type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';
export type PaymentMode = 'upi' | 'card' | 'cash';

export interface DonorInput {
  donorName: string;
  amount: number;
  contact: string;
}

export interface Donation {
  id: string;
  mandalId: string;
  eventId: string;
  collectorId: string;
  collectorName: string;
  donorName: string;
  amount: number;
  contact: string;
  paymentMode: PaymentMode;
  paymentStatus: PaymentStatus;
  paymentRef: string | null;
  receiptId: string | null;
  createdAt: string;
  isDemo: boolean;
}
