/**
 * Thin, typed wrapper around Web Storage.
 *
 * Production data lives in localStorage under the `utsavam:` namespace.
 * Demo Mode data lives in sessionStorage under `utsavam:demo:` — this is
 * what "isolated from production data and does not persist" (Section 6)
 * means on a static frontend: it never touches the production namespace
 * and disappears when the tab closes.
 *
 * NOTE: this is a beta-appropriate stand-in for a real backend/database.
 * A production launch needs a server so receipts resolve from any device
 * (see README "Backend requirements").
 */

const PROD_PREFIX = 'utsavam:';
const DEMO_PREFIX = 'utsavam:demo:';

function backendFor(isDemo: boolean): Storage {
  return isDemo ? sessionStorage : localStorage;
}

function keyFor(isDemo: boolean, key: string): string {
  return `${isDemo ? DEMO_PREFIX : PROD_PREFIX}${key}`;
}

export function readItem<T>(key: string, isDemo: boolean): T | null {
  try {
    const raw = backendFor(isDemo).getItem(keyFor(isDemo, key));
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeItem<T>(key: string, value: T, isDemo: boolean): void {
  try {
    backendFor(isDemo).setItem(keyFor(isDemo, key), JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode / quota) — fail silently, UI still works in-memory */
  }
}

export function readList<T>(key: string, isDemo: boolean): T[] {
  return readItem<T[]>(key, isDemo) ?? [];
}

export function appendToList<T>(key: string, item: T, isDemo: boolean): T[] {
  const list = readList<T>(key, isDemo);
  const next = [...list, item];
  writeItem(key, next, isDemo);
  return next;
}

export function updateInList<T extends { id: string }>(
  key: string,
  id: string,
  patch: Partial<T>,
  isDemo: boolean,
): T[] {
  const list = readList<T>(key, isDemo);
  const next = list.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry));
  writeItem(key, next, isDemo);
  return next;
}

export function clearDemoData(): void {
  Object.keys(sessionStorage)
    .filter((k) => k.startsWith(DEMO_PREFIX))
    .forEach((k) => sessionStorage.removeItem(k));
}

export const STORAGE_KEYS = {
  organizer: 'organizer',
  event: 'event',
  collectors: 'collectors',
  donations: 'donations',
  currentCollector: 'current_collector',
} as const;
