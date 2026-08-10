import type { ReactNode } from 'react';
import clsx from 'clsx';

type Tone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral';

const toneClasses: Record<Tone, string> = {
  accent: 'bg-[var(--accent-bg)] text-[var(--accent)]',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-rose-50 text-rose-700',
  neutral: 'bg-[var(--social-bg)] text-[var(--text-h)]',
};

export function Badge({ children, tone = 'accent' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={clsx('inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold', toneClasses[tone])}>
      {children}
    </span>
  );
}
