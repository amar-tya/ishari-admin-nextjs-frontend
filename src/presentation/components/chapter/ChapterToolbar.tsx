import React, { useState } from 'react';
import { Button } from '../base/Button';
import { SearchInput } from '../base/SearchInput';
import { FilterIcon, TrashIcon, PlusIcon } from '../base/icons';
import { ChapterFilter } from './ChapterFilter';
import { BookEntity } from '@/core/entities';

interface ChapterToolbarProps {
  onSearch: (query: string) => void;
  onFilterApply: (criteria: {
    bookId: number | null;
    chapterTitle: string | null;
    category: string | null;
  }) => void;
  onNewChapterClick: () => void;
  onBulkDeleteClick: () => void;
  books: BookEntity[];
  initialCriteria: {
    bookId: number | null;
    chapterTitle: string | null;
    category: string | null;
  };
}

export const ChapterToolbar: React.FC<ChapterToolbarProps> = ({
  onSearch,
  onFilterApply,
  onNewChapterClick,
  onBulkDeleteClick,
  books,
  initialCriteria,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Dynamic styles for responsiveness without media queries
  const textStyle: React.CSSProperties = {
    maxWidth: 'clamp(0px, calc( ( 100vw - 600px ) * 1000 ), 100%)',
    opacity: 'clamp(0, calc( ( 100vw - 600px ) * 1000 ), 1)',
    fontSize: 'clamp(0px, calc( ( 100vw - 600px ) * 1000 ), 1em)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    verticalAlign: 'middle',
  };

  const buttonGapStyle = {
    gap: 'clamp(0px, calc( ( 100vw - 600px ) * 1000 ), 0.5rem)',
  };

  const buttonPaddingStyle = {
    paddingLeft: 'clamp(8px, calc( ( 100vw - 600px ) * 1000 ), 1rem)',
    paddingRight: 'clamp(8px, calc( ( 100vw - 600px ) * 1000 ), 1rem)',
    ...buttonGapStyle,
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-[clamp(0.75rem,2vw,1.5rem)] bg-white p-[clamp(0.75rem,1.5vw,1.25rem)] rounded-xl border border-border shadow-sm">
      {/* Search Bar */}
      <div className="flex-[999_1_150px] w-full min-w-[150px]">
        <SearchInput
          placeholder="Search by Chapter, Title..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Actions Group */}
      <div className="flex flex-wrap items-center gap-[clamp(0.5rem,1vw,1rem)] flex-[1_1_auto] justify-end relative">
        <Button
          variant="secondary"
          className="text-red-600! border-red-100! hover:bg-red-50! transition-all duration-300"
          style={buttonPaddingStyle}
          icon={<TrashIcon size={18} />}
          onClick={onBulkDeleteClick}
          title="Bulk Delete"
        >
          <span style={textStyle}>Bulk Delete</span>
        </Button>

        <div className="relative">
          <Button
            variant="secondary"
            className={`transition-all duration-300 ${initialCriteria.bookId || initialCriteria.chapterTitle || initialCriteria.category ? 'bg-primary/10 border-primary text-primary' : ''}`}
            style={buttonPaddingStyle}
            icon={<FilterIcon size={18} />}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            title="Filter"
          >
            <span style={textStyle}>Filter</span>
            {(initialCriteria.bookId ||
              initialCriteria.chapterTitle ||
              initialCriteria.category) && (
              <span className="w-2 h-2 rounded-full bg-primary absolute -top-1 -right-1" />
            )}
          </Button>

          <ChapterFilter
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            books={books}
            initialCriteria={initialCriteria}
            onApply={(criteria) => {
              onFilterApply(criteria);
              setIsFilterOpen(false);
            }}
          />
        </div>

        <Button
          variant="primary"
          className="transition-all duration-300"
          style={buttonPaddingStyle}
          onClick={onNewChapterClick}
          icon={<PlusIcon size={18} />}
          title="New Chapter"
        >
          <span style={textStyle}>New Chapter</span>
        </Button>
      </div>
    </div>
  );
};
