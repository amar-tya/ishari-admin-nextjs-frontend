import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  className = '',
  id,
  type = 'text',
  ...props
}, ref) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-[clamp(0.875rem,1vw,1rem)] font-medium text-[var(--color-text-primary)]">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        className={`
          w-full px-3 py-2.5 rounded-lg border bg-white
          text-[clamp(0.875rem,0.9vw,0.938rem)] text-[var(--color-text-primary)]
          placeholder:text-[var(--color-text-muted)]
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-opacity-20
          ${error 
            ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]' 
            : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] hover:border-[var(--color-border-hover)]'
          }
          disabled:bg-[var(--color-bg-base)] disabled:cursor-not-allowed disabled:opacity-75
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-[var(--color-error)] animate-in slide-in-from-top-1 px-1">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-xs text-[var(--color-text-secondary)] px-1">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
