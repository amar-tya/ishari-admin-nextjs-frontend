import React, { useState, useEffect } from 'react';
import { Button, Modal } from '../base';
import { BookEntity } from '@/core/entities';

interface ChapterFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (criteria: {
    bookId: number | null;
    chapterTitle: string | null;
    category: string | null;
  }) => void;
  books: BookEntity[];
  initialCriteria: {
    bookId: number | null;
    chapterTitle: string | null;
    category: string | null;
  };
}

export const ChapterFilter: React.FC<ChapterFilterProps> = ({
  isOpen,
  onClose,
  onApply,
  books,
  initialCriteria,
}) => {
  const [selectedBookId, setSelectedBookId] = useState<number | null>(
    initialCriteria.bookId
  );
  const [selectedChapterTitle, setSelectedChapterTitle] = useState<
    string | null
  >(initialCriteria.chapterTitle);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCriteria.category
  );

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedBookId(initialCriteria.bookId);
      setSelectedChapterTitle(initialCriteria.chapterTitle);
      setSelectedCategory(initialCriteria.category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleReset = () => {
    setSelectedBookId(null);
    setSelectedChapterTitle(null);
    setSelectedCategory(null);
  };

  const handleApply = () => {
    onApply({
      bookId: selectedBookId,
      chapterTitle: selectedChapterTitle,
      category: selectedCategory,
    });
  };

  // Categories matching ChapterForm
  const CATEGORY_OPTIONS = [
    { value: 'Diwan', label: 'Diwan' },
    { value: 'Muhud', label: 'Muhud' },
    { value: 'Diba', label: 'Diba' },
    { value: 'Rowi', label: 'Rowi' },
    { value: 'Muradah', label: 'Muradah' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Filter Chapters"
      width="max-w-md"
    >
      <div className="flex flex-col gap-6 py-2">
        {/* Book Selection */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="book-select"
            className="text-sm font-medium text-text-primary"
          >
            Book
          </label>
          <select
            id="book-select"
            value={selectedBookId || ''}
            onChange={(e) => {
              setSelectedBookId(e.target.value ? Number(e.target.value) : null);
              setSelectedChapterTitle(null); // Reset chapter search if book changes
            }}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-[#F9FAFB] text-sm focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
          >
            <option value="">Select a book...</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        {/* Chapter Selection */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="chapter-search"
            className="text-sm font-medium text-text-primary"
          >
            Chapter Name
          </label>
          <input
            id="chapter-search"
            type="text"
            placeholder="Search specific chapter..."
            value={selectedChapterTitle || ''}
            onChange={(e) => setSelectedChapterTitle(e.target.value || null)}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-[#F9FAFB] text-sm focus:outline-none focus:border-primary transition-all"
          />
        </div>

        {/* Category Selection */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="category-select"
            className="text-sm font-medium text-text-primary"
          >
            Category
          </label>
          <select
            id="category-select"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-[#F9FAFB] text-sm focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
          >
            <option value="">Filter by category...</option>
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4">
          <Button
            variant="secondary"
            className="flex-1 py-2.5 text-sm font-semibold border-border bg-white hover:bg-bg-base transition-all"
            onClick={handleReset}
          >
            Reset Filter
          </Button>
          <Button
            variant="primary"
            className="flex-1 py-2.5 text-sm font-semibold bg-[#00C853] hover:bg-[#00B248] text-white transition-all rounded-lg"
            onClick={handleApply}
          >
            Terapkan Filter
          </Button>
        </div>
      </div>
    </Modal>
  );
};
