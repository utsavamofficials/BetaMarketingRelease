import type { ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full bg-[var(--accent-bg)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-medium tracking-tight text-[var(--text-h)] sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-[var(--text)]">{description}</p>}
    </div>
  );
}
