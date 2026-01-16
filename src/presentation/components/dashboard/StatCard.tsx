import React from 'react';
import { Card } from '../base';

interface StatCardProps {
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  label: string;
  labelColor?: string;
  value: string | number;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconBgColor = 'bg-[var(--color-primary-light)]',
  iconColor = 'text-[var(--color-primary)]',
  label,
  labelColor = 'text-[var(--color-primary)]',
  value,
  className = '',
}) => {
  return (
    <Card className={`flex flex-col items-center text-center ${className}`} padding="md">
      {/* Icon */}
      <div
        className={`
          flex items-center justify-center rounded-xl mb-3
          ${iconBgColor}
        `}
        style={{
          width: 'clamp(3rem, 4vw, 4rem)',
          height: 'clamp(3rem, 4vw, 4rem)',
        }}
      >
        <span className={iconColor}>
          {icon}
        </span>
      </div>

      {/* Label */}
      <p className={`text-label mb-1 ${labelColor}`}>{label}</p>

      {/* Value */}
      <p className="text-stat">{value.toLocaleString()}</p>
    </Card>
  );
};

export default StatCard;
