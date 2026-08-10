import { Check } from 'lucide-react';
import clsx from 'clsx';

export function Stepper({ steps, currentIndex }: { steps: string[]; currentIndex: number }) {
  return (
    <ol className="flex w-full items-center gap-2 sm:gap-3" aria-label="Progress">
      {steps.map((step, index) => {
        const state = index < currentIndex ? 'done' : index === currentIndex ? 'active' : 'upcoming';
        return (
          <li key={step} className="flex flex-1 items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <div
                className={clsx(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors',
                  state === 'done' && 'border-[var(--accent)] bg-[var(--accent)] text-white',
                  state === 'active' && 'border-[var(--accent)] bg-[var(--accent-bg)] text-[var(--accent)]',
                  state === 'upcoming' && 'border-[var(--border)] text-[var(--text)]',
                )}
                aria-current={state === 'active' ? 'step' : undefined}
              >
                {state === 'done' ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span
                className={clsx(
                  'hidden text-xs font-medium sm:block',
                  state === 'upcoming' ? 'text-[var(--text)]' : 'text-[var(--text-h)]',
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={clsx('h-px flex-1', state === 'done' ? 'bg-[var(--accent)]' : 'bg-[var(--border)]')} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
