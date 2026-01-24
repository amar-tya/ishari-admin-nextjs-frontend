import React from 'react';
import { Button } from '../base/Button';
import { SearchInput } from '../base/SearchInput';

interface BookToolbarProps {
  onSearch: (query: string) => void;
  onFilterClick: () => void;
  onNewBookClick: () => void;
}

export const BookToolbar: React.FC<BookToolbarProps> = ({ onSearch, onFilterClick, onNewBookClick }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-[clamp(1rem,2vw,1.5rem)] bg-white p-[clamp(1rem,1.5vw,1.25rem)] rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
      {/* Search Bar - Grows to fill available space */}
      <div className="flex-1 min-w-[min(100%,300px)]">
        <SearchInput
          placeholder="Search by Title, Author, or ISBN..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Actions Group - Wraps if needed */}
      <div className="flex items-center gap-[clamp(0.5rem,1vw,1rem)] shrink-0">
        <Button 
            variant="primary"
            onClick={onNewBookClick} 
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            }
        >
          New Book
        </Button>
      </div>
    </div>
  );
};
