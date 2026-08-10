import { readItem, writeItem, readList, appendToList, updateInList, STORAGE_KEYS } from './storageService';
import { generateId } from '../utils/ids';
import type { OrganizerProfile, CollectorProfile } from '../types/user';
import type { MandalEvent } from '../types/event';
import type { Donation, DonorInput, PaymentMode } from '../types/donation';
import type { OrganizerRegisterInput, EventSetupInput, CollectorFormInput } from '../utils/validators';

/** Everything an Organizer/Collector touches, namespaced by isDemo so the
 *  "Try for Free" walkthrough never mixes with a real mandal's data. */

export function registerOrganizer(input: OrganizerRegisterInput, isDemo: boolean): OrganizerProfile {
  const organizer: OrganizerProfile = {
    id: generateId('org'),
    role: 'organizer',
    fullName: input.fullName,
    mandalName: input.mandalName,
    phone: input.phone,
    email: input.email,
    city: input.city,
    planId: input.planId,
    createdAt: new Date().toISOString(),
  };
  writeItem(STORAGE_KEYS.organizer, organizer, isDemo);
  return organizer;
}

export function getOrganizer(isDemo: boolean): OrganizerProfile | null {
  return readItem<OrganizerProfile>(STORAGE_KEYS.organizer, isDemo);
}

export function saveEvent(
  input: EventSetupInput,
  organizer: OrganizerProfile,
  logoDataUrl: string | null,
  isDemo: boolean,
): MandalEvent {
  const event: MandalEvent = {
    id: generateId('evt'),
    mandalId: organizer.id,
    mandalName: organizer.mandalName,
    eventName: input.eventName,
    startDate: input.startDate,
    endDate: input.endDate,
    city: organizer.city,
    address: input.address,
    brandColor: input.brandColor,
    logoDataUrl,
    createdAt: new Date().toISOString(),
  };
  writeItem(STORAGE_KEYS.event, event, isDemo);
  return event;
}

export function getEvent(isDemo: boolean): MandalEvent | null {
  return readItem<MandalEvent>(STORAGE_KEYS.event, isDemo);
}

export function addCollector(input: CollectorFormInput, mandalId: string, isDemo: boolean): CollectorProfile {
  const collector: CollectorProfile = {
    id: generateId('col'),
    role: 'collector',
    fullName: input.fullName,
    phone: input.phone,
    pin: input.pin,
    mandalId,
    createdAt: new Date().toISOString(),
  };
  appendToList(STORAGE_KEYS.collectors, collector, isDemo);
  return collector;
}

export function listCollectors(isDemo: boolean): CollectorProfile[] {
  return readList<CollectorProfile>(STORAGE_KEYS.collectors, isDemo);
}

export function removeCollector(collectorId: string, isDemo: boolean): CollectorProfile[] {
  const remaining = listCollectors(isDemo).filter((c) => c.id !== collectorId);
  writeItem(STORAGE_KEYS.collectors, remaining, isDemo);
  return remaining;
}

export function findCollectorByCredentials(phone: string, pin: string, isDemo: boolean): CollectorProfile | null {
  return listCollectors(isDemo).find((c) => c.phone === phone && c.pin === pin) ?? null;
}

export function recordDonation(
  donor: DonorInput,
  mode: PaymentMode,
  collector: CollectorProfile,
  event: MandalEvent,
  isDemo: boolean,
): Donation {
  const donation: Donation = {
    id: generateId('don'),
    mandalId: event.mandalId,
    eventId: event.id,
    collectorId: collector.id,
    collectorName: collector.fullName,
    donorName: donor.donorName,
    amount: donor.amount,
    contact: donor.contact,
    paymentMode: mode,
    paymentStatus: 'idle',
    paymentRef: null,
    receiptId: null,
    createdAt: new Date().toISOString(),
    isDemo,
  };
  appendToList(STORAGE_KEYS.donations, donation, isDemo);
  return donation;
}

export function updateDonation(id: string, patch: Partial<Donation>, isDemo: boolean): Donation[] {
  return updateInList<Donation>(STORAGE_KEYS.donations, id, patch, isDemo);
}

export function listDonations(isDemo: boolean): Donation[] {
  return readList<Donation>(STORAGE_KEYS.donations, isDemo).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function collectionSummary(isDemo: boolean) {
  const donations = listDonations(isDemo).filter((d) => d.paymentStatus === 'success');
  const total = donations.reduce((sum, d) => sum + d.amount, 0);
  const byCollector = new Map<string, { name: string; count: number; total: number }>();
  for (const d of donations) {
    const entry = byCollector.get(d.collectorId) ?? { name: d.collectorName, count: 0, total: 0 };
    entry.count += 1;
    entry.total += d.amount;
    byCollector.set(d.collectorId, entry);
  }
  return {
    totalDonations: donations.length,
    totalAmount: total,
    averageAmount: donations.length ? Math.round(total / donations.length) : 0,
    byCollector: Array.from(byCollector.values()),
  };
}

export function exportDonationsAsCsv(isDemo: boolean): string {
  const rows = listDonations(isDemo);
  const header = ['Donor', 'Amount (INR)', 'Contact', 'Collector', 'Payment Mode', 'Status', 'Date'];
  const lines = rows.map((d) =>
    [d.donorName, d.amount, d.contact, d.collectorName, d.paymentMode, d.paymentStatus, d.createdAt]
      .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
      .join(','),
  );
  return [header.join(','), ...lines].join('\n');
}
