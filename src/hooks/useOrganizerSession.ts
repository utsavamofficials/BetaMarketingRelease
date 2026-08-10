import { useCallback, useEffect, useState } from 'react';
import { getOrganizer, getEvent } from '../services/mandalService';
import type { OrganizerProfile } from '../types/user';
import type { MandalEvent } from '../types/event';

/** Reads the (client-side, beta-only) organizer session for a given namespace. */
export function useOrganizerSession(isDemo: boolean) {
  const [organizer, setOrganizer] = useState<OrganizerProfile | null>(null);
  const [event, setEvent] = useState<MandalEvent | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setOrganizer(getOrganizer(isDemo));
    setEvent(getEvent(isDemo));
    setLoading(false);
  }, [isDemo]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { organizer, event, loading, refresh };
}
