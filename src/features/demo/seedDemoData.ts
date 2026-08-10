import { registerOrganizer, saveEvent, addCollector, getOrganizer, getEvent, listCollectors } from '../../services/mandalService';
import type { OrganizerProfile } from '../../types/user';
import type { MandalEvent } from '../../types/event';
import type { CollectorProfile } from '../../types/user';

/**
 * Seeds a self-contained demo mandal so a visitor can jump straight into the
 * Collector → Receipt flow (Section 6: "zero setup friction... within one or
 * two clicks"). Everything here is written to the isDemo=true namespace only.
 */
export function seedOrLoadDemo(): { organizer: OrganizerProfile; event: MandalEvent; collector: CollectorProfile } {
  let organizer = getOrganizer(true);
  if (!organizer) {
    organizer = registerOrganizer(
      {
        fullName: 'Demo Adhyaksha',
        mandalName: 'Shree Sample Ganesh Mandal',
        city: 'Pune',
        phone: '9000000000',
        email: 'demo@utsavam.app',
        planId: 'satisfy',
      },
      true,
    );
  }

  let event = getEvent(true);
  if (!event) {
    const today = new Date();
    const end = new Date();
    end.setDate(today.getDate() + 10);
    event = saveEvent(
      {
        eventName: 'Ganeshotsav — Demo Walkthrough',
        startDate: today.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
        address: 'Demo Mandap, FC Road',
        brandColor: '#aa3bff',
      },
      organizer,
      null,
      true,
    );
  }

  let collector = listCollectors(true)[0] ?? null;
  if (!collector) {
    collector = addCollector({ fullName: 'Demo Collector', phone: '9111111111', pin: '0000' }, organizer.id, true);
  }

  return { organizer, event, collector };
}
