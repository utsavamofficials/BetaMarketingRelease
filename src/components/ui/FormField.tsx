import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

export function FieldWrapper({ label, htmlFor, error, hint, required, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label htmlFor={htmlFor} className="text-sm font-medium text-[var(--text-h)]">
        {label}
        {required && <span className="ml-0.5 text-[var(--accent)]">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-[var(--text)]">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs font-medium text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}

const fieldBase =
  'h-11 w-full rounded-lg border bg-[var(--bg)] px-3.5 text-sm text-[var(--text-h)] outline-none transition-colors placeholder:text-[var(--text)]/60 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]';

type InputProps = InputHTMLAttributes<HTMLInputElement> & Omit<FieldWrapperProps, 'children'>;

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, htmlFor, error, hint, required, className, ...rest }, ref) => (
    <FieldWrapper label={label} htmlFor={htmlFor} error={error} hint={hint} required={required}>
      <input
        id={htmlFor}
        ref={ref}
        aria-invalid={!!error}
        className={clsx(fieldBase, error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-100', !error && 'border-[var(--border)]', className)}
        {...rest}
      />
    </FieldWrapper>
  ),
);
TextInput.displayName = 'TextInput';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & Omit<FieldWrapperProps, 'children'>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, htmlFor, error, hint, required, className, ...rest }, ref) => (
    <FieldWrapper label={label} htmlFor={htmlFor} error={error} hint={hint} required={required}>
      <textarea
        id={htmlFor}
        ref={ref}
        aria-invalid={!!error}
        rows={4}
        className={clsx(fieldBase, 'h-auto resize-y py-2.5', error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-100', !error && 'border-[var(--border)]', className)}
        {...rest}
      />
    </FieldWrapper>
  ),
);
TextArea.displayName = 'TextArea';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & Omit<FieldWrapperProps, 'children'>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, htmlFor, error, hint, required, className, children, ...rest }, ref) => (
    <FieldWrapper label={label} htmlFor={htmlFor} error={error} hint={hint} required={required}>
      <div className="relative">
        <select
          id={htmlFor}
          ref={ref}
          aria-invalid={!!error}
          className={clsx(fieldBase, 'appearance-none pr-9', error && 'border-rose-400', !error && 'border-[var(--border)]', className)}
          {...rest}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text)]" aria-hidden="true" />
      </div>
    </FieldWrapper>
  ),
);
Select.displayName = 'Select';
