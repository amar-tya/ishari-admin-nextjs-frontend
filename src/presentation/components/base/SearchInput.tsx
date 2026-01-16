import React from 'react';
import { SearchIcon } from './icons';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  className = '',
  placeholder = 'Search data...',
  ...props
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
        <SearchIcon size={18} />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="
          w-full
          pl-10 pr-4 py-2
          bg-[var(--color-bg-main)]
          border border-[var(--color-border)]
          rounded-lg
          text-[clamp(0.813rem,1vw,0.875rem)]
          text-[var(--color-text-primary)]
          placeholder:text-[var(--color-text-muted)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20
          focus:border-[var(--color-primary)]
          transition-all duration-200
        "
        {...props}
      />
    </div>
  );
};

export default SearchInput;
