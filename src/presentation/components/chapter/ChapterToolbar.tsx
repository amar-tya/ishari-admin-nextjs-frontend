import React from 'react';
import { Button } from '../base/Button';
import { SearchInput } from '../base/SearchInput';
import { FilterIcon, TrashIcon, PlusIcon } from '../base/icons';

interface ChapterToolbarProps {
    onSearch: (query: string) => void;
    onFilterClick: () => void;
    onNewChapterClick: () => void;
    onBulkDeleteClick: () => void;
}

export const ChapterToolbar: React.FC<ChapterToolbarProps> = ({
    onSearch,
    onFilterClick,
    onNewChapterClick,
    onBulkDeleteClick
}) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-[clamp(1rem,2vw,1.5rem)] bg-white p-[clamp(1rem,1.5vw,1.25rem)] rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
            {/* Search Bar - Grows to fill available space */}
            <div className="flex-1 min-w-[min(100%,300px)]">
                <SearchInput
                    placeholder="Search by Chapter, Title..."
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>

            {/* Actions Group - Wraps if needed */}
            <div className="flex flex-wrap items-center gap-[clamp(0.5rem,1vw,1rem)] shrink-0">
                <Button
                    variant="secondary"
                    className="!text-red-600 !border-red-100 hover:!bg-red-50"
                    icon={<TrashIcon size={18} />}
                    onClick={onBulkDeleteClick}
                >
                    Bulk Delete
                </Button>
                <Button
                    variant="secondary"
                    icon={<FilterIcon size={18} />}
                    onClick={onFilterClick}
                >
                    Filter
                </Button>
                <Button
                    variant="primary"
                    onClick={onNewChapterClick}
                    icon={<PlusIcon size={18} />}
                >
                    New Chapter
                </Button>
            </div>
        </div>
    );
};
