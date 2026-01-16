import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-[clamp(0.75rem,1.5vw,1rem)]',
    md: 'p-[clamp(1rem,2vw,1.5rem)]',
    lg: 'p-[clamp(1.5rem,2.5vw,2rem)]',
  };

  return (
    <div
      className={`
        bg-[var(--color-bg-card)] 
        rounded-xl 
        shadow-[var(--shadow-sm)]
        border border-[var(--color-border-light)]
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
