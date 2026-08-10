import { Loader2 } from 'lucide-react';

export function Spinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-[var(--text)]">
      <Loader2 className="h-7 w-7 animate-spin text-[var(--accent)]" aria-hidden="true" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
