import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
}

export function Card({ children, className, padded = true, ...rest }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-[var(--shadow)]',
        padded && 'p-6 sm:p-8',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
