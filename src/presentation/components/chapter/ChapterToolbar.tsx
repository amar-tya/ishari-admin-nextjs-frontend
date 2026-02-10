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
    // Dynamic styles for responsiveness without media queries
    // textStyle: hides text below ~600px viewport width
    // using fontSize 0 ensures the text collapses completely
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

    // Dynamic gap for buttons to collapse the gap when text is hidden
    const buttonGapStyle = {
        gap: 'clamp(0px, calc( ( 100vw - 600px ) * 1000 ), 0.5rem)',
    };

    // Dynamic padding to collapse button width when text is hidden
    const buttonPaddingStyle = {
        paddingLeft: 'clamp(8px, calc( ( 100vw - 600px ) * 1000 ), 1rem)',
        paddingRight: 'clamp(8px, calc( ( 100vw - 600px ) * 1000 ), 1rem)',
        ...buttonGapStyle, // Merge gap style here
    };

    return (
        <div className="flex flex-wrap items-center justify-between gap-[clamp(0.75rem,2vw,1.5rem)] bg-white p-[clamp(0.75rem,1.5vw,1.25rem)] rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
            {/* Search Bar - Fluid width, wraps if needed */}
            <div className="flex-[999_1_150px] w-full min-w-[150px]">
                <SearchInput
                    placeholder="Search by Chapter, Title..."
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>

            {/* Actions Group - Wraps if needed */}
            <div className="flex flex-wrap items-center gap-[clamp(0.5rem,1vw,1rem)] flex-[1_1_auto] justify-end">
                <Button
                    variant="secondary"
                    className="!text-red-600 !border-red-100 hover:!bg-red-50 transition-all duration-300"
                    style={buttonPaddingStyle}
                    icon={<TrashIcon size={18} />}
                    onClick={onBulkDeleteClick}
                    title="Bulk Delete"
                >
                    <span style={textStyle}>Bulk Delete</span>
                </Button>
                <Button
                    variant="secondary"
                    className="transition-all duration-300"
                    style={buttonPaddingStyle}
                    icon={<FilterIcon size={18} />}
                    onClick={onFilterClick}
                    title="Filter"
                >
                    <span style={textStyle}>Filter</span>
                </Button>
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
