import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[var(--accent)] text-white shadow-sm shadow-[var(--accent-border)] hover:brightness-110 active:brightness-95',
  secondary: 'bg-[var(--accent-bg)] text-[var(--accent)] hover:bg-[var(--accent-border)]/20',
  outline: 'border border-[var(--border)] text-[var(--text-h)] hover:border-[var(--accent-border)] hover:text-[var(--accent)]',
  ghost: 'text-[var(--text-h)] hover:bg-[var(--social-bg)]',
  danger: 'bg-rose-600 text-white hover:bg-rose-700',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 px-7 text-base gap-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, fullWidth, className, children, disabled, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200',
          'disabled:cursor-not-allowed disabled:opacity-60',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className,
        )}
        {...rest}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
