export interface DigitalReceipt {
  id: string;
  donationId: string;
  mandalName: string;
  eventName: string;
  donorName: string;
  amount: number;
  brandColor: string;
  logoDataUrl: string | null;
  issuedAt: string;
  isDemo: boolean;
}
