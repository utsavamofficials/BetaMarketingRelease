export interface MandalEvent {
  id: string;
  mandalId: string;
  mandalName: string;
  eventName: string;
  startDate: string;
  endDate: string;
  city: string;
  address: string;
  brandColor: string;
  logoDataUrl: string | null;
  createdAt: string;
}
