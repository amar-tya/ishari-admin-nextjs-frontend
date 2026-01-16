import React from 'react';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className = '',
}) => {
  const variantStyles = {
    success: 'bg-[#DCFCE7] text-[#166534]',
    warning: 'bg-[#FEF3C7] text-[#92400E]',
    error: 'bg-[#FEE2E2] text-[#991B1B]',
    info: 'bg-[#DBEAFE] text-[#1E40AF]',
    default: 'bg-[var(--color-border-light)] text-[var(--color-text-secondary)]',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        px-2 py-0.5 rounded-full
        text-[clamp(0.625rem,0.75vw,0.75rem)]
        font-medium
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
