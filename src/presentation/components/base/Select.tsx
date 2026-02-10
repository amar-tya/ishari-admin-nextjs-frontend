import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    options?: { value: string | number; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    error,
    helperText,
    className = '',
    id,
    children,
    options,
    ...props
}, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label htmlFor={selectId} className="text-[clamp(0.875rem,1vw,1rem)] font-medium text-[var(--color-text-primary)]">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    ref={ref}
                    id={selectId}
                    className={`
            w-full px-3 py-2.5 rounded-lg border bg-white appearance-none
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
                >
                    {options ? (
                        options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))
                    ) : (
                        children
                    )}
                </select>
                {/* Chevron Icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-secondary)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>
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

Select.displayName = 'Select';
