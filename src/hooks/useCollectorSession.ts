import { useCallback, useEffect, useState } from 'react';
import { readItem, writeItem, STORAGE_KEYS } from '../services/storageService';
import { findCollectorByCredentials } from '../services/mandalService';
import type { CollectorProfile } from '../types/user';

export function useCollectorSession(isDemo: boolean) {
  const [collector, setCollector] = useState<CollectorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCollector(readItem<CollectorProfile>(STORAGE_KEYS.currentCollector, isDemo));
    setLoading(false);
  }, [isDemo]);

  const login = useCallback(
    (phone: string, pin: string): CollectorProfile | null => {
      const found = findCollectorByCredentials(phone, pin, isDemo);
      if (found) {
        writeItem(STORAGE_KEYS.currentCollector, found, isDemo);
        setCollector(found);
      }
      return found;
    },
    [isDemo],
  );

  const logout = useCallback(() => {
    writeItem(STORAGE_KEYS.currentCollector, null, isDemo);
    setCollector(null);
  }, [isDemo]);

  const setActive = useCallback(
    (profile: CollectorProfile) => {
      writeItem(STORAGE_KEYS.currentCollector, profile, isDemo);
      setCollector(profile);
    },
    [isDemo],
  );

  return { collector, loading, login, logout, setActive };
}
