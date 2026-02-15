'use client';

import { useEffect, useState, useCallback } from 'react';
import { useChapterViewModel } from '@/presentation/view-models/chapter/ChapterViewModel';
import { useBookViewModel } from '@/presentation/view-models/book/BookViewModel';
import { ChapterList } from '@/presentation/components/chapter/ChapterList';
import { ChapterToolbar } from '@/presentation/components/chapter/ChapterToolbar';
import { Pagination } from '@/presentation/components/books/Pagination';
import {
  ChapterForm,
  ChapterFormMode,
} from '@/presentation/components/chapter/ChapterForm';
import { ChapterEntity } from '@/core/entities';
import { ChapterCreateRequest } from '@/application/dto';

export default function ChapterPage() {
  const {
    isLoading: isChapterLoading,
    error: chapterError,
    chapterList,
    findChapter,
    setCriteria,
    createChapter,
  } = useChapterViewModel();

  const {
    getBookList,
    bookList,
    isLoading: isBooksLoading,
  } = useBookViewModel();

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<ChapterFormMode>('create');
  const [selectedChapter, setSelectedChapter] = useState<
    ChapterEntity | undefined
  >(undefined);

  useEffect(() => {
    findChapter();
    getBookList(1, ''); // Fetch books for dropdown, maybe increase limit if possible or implement search in dropdown
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setCriteria({ page: 1, limit: 10, search });
      findChapter();
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handlePageChange = useCallback(
    (page: number) => {
      setCriteria({ page, limit: 10, search });
      findChapter();
    },
    [search, setCriteria, findChapter]
  );

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  const handleFilter = () => {
    console.log('Filter clicked');
  };

  const handleNewChapter = () => {
    setFormMode('create');
    setSelectedChapter(undefined);
    setIsModalOpen(true);
  };

  const handleEditChapter = (chapter: ChapterEntity) => {
    setFormMode('edit');
    setSelectedChapter(chapter);
    setIsModalOpen(true);
  };

  const handleBulkDelete = () => {
    console.log('Bulk Delete clicked');
  };

  const handleFormSubmit = async (data: ChapterCreateRequest) => {
    if (formMode === 'create') {
      const success = await createChapter(data);
      if (success) {
        setIsModalOpen(false);
      }
      return success;
    } else {
      // Handle edit submission here
      console.log('Update chapter', data);
      setIsModalOpen(false);
      return true;
    }
  };

  return (
    <div className="min-h-screen bg-bg-main p-[clamp(1rem,2vw,2rem)] flex flex-col gap-[clamp(1.5rem,2.5vw,2.5rem)]">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-primary">
          Chapters Library
        </h1>
        <p className="text-text-secondary text-[clamp(0.875rem,1vw,1rem)]">
          Manage, edit, and organize the complete collection of book chapters.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-[clamp(1rem,2vw,1.5rem)]">
        <ChapterToolbar
          onSearch={handleSearch}
          onFilterClick={handleFilter}
          onNewChapterClick={handleNewChapter}
          onBulkDeleteClick={handleBulkDelete}
        />

        {/* Loading State */}
        {isChapterLoading && !chapterList && (
          <div className="flex items-center justify-center py-12">
            <div className="text-text-secondary">Loading...</div>
          </div>
        )}

        {/* Error State */}
        {chapterError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {chapterError}
          </div>
        )}

        {/* Chapter List */}
        {(!isChapterLoading || chapterList) && !chapterError && (
          <ChapterList
            chapters={chapterList?.data || []}
            onEdit={handleEditChapter}
            onDelete={(chapter) => console.log('Delete', chapter)}
          />
        )}

        {/* Pagination */}
        {chapterList && chapterList.meta && (
          <Pagination
            currentPage={chapterList.meta.page}
            totalPages={chapterList.meta.totalPages}
            totalEntries={chapterList.meta.total}
            pageSize={chapterList.meta.limit}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <ChapterForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          isLoading={isChapterLoading}
          mode={formMode}
          initialData={selectedChapter}
          books={bookList?.data || []}
        />
      )}
    </div>
  );
}
