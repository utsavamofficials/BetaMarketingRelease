import type { ReactNode } from 'react';

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--border)] px-6 py-14 text-center">
      {icon && <div className="text-[var(--accent)]">{icon}</div>}
      <h3 className="text-base font-semibold text-[var(--text-h)]">{title}</h3>
      {description && <p className="max-w-sm text-sm text-[var(--text)]">{description}</p>}
      {action}
    </div>
  );
}
