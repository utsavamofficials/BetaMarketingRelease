import { FlaskConical } from 'lucide-react';

export function DemoBanner() {
  return (
    <div className="flex items-center justify-center gap-2 bg-amber-100 px-4 py-2 text-center text-xs font-medium text-amber-800">
      <FlaskConical className="h-3.5 w-3.5 shrink-0" />
      Demo Mode — mocked payment, isolated data. Nothing here is saved to a real mandal account.
    </div>
  );
}
