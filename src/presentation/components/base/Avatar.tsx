import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  bgColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  className = '',
  bgColor,
}) => {
  const sizeStyles = {
    sm: 'w-[clamp(1.5rem,2.5vw,2rem)] h-[clamp(1.5rem,2.5vw,2rem)] text-[clamp(0.625rem,0.8vw,0.75rem)]',
    md: 'w-[clamp(2rem,3vw,2.5rem)] h-[clamp(2rem,3vw,2.5rem)] text-[clamp(0.75rem,0.9vw,0.875rem)]',
    lg: 'w-[clamp(2.5rem,4vw,3rem)] h-[clamp(2.5rem,4vw,3rem)] text-[clamp(0.875rem,1vw,1rem)]',
  };

  const getInitials = (name?: string) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const baseStyles = `
    inline-flex items-center justify-center 
    rounded-full font-medium
    overflow-hidden flex-shrink-0
  `;

  if (src) {
    return (
      <div className={`${baseStyles} ${sizeStyles[size]} ${className}`}>
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const defaultBg = bgColor || 'bg-[var(--color-primary-light)]';
  
  return (
    <div 
      className={`
        ${baseStyles} 
        ${sizeStyles[size]} 
        ${defaultBg}
        text-[var(--color-primary)]
        ${className}
      `}
    >
      {getInitials(initials)}
    </div>
  );
};

export default Avatar;
