"use client";

import { useEffect, useState, useCallback } from "react";
import { useChapterViewModel } from "@/presentation/view-models/chapter/ChapterViewModel";
import { ChapterList } from "@/presentation/components/chapter/ChapterList";
import { ChapterToolbar } from "@/presentation/components/chapter/ChapterToolbar";
import { Pagination } from "@/presentation/components/books/Pagination";

export default function ChapterPage() {
  const {
    isLoading,
    error,
    chapterList,
    findChapter,
    setCriteria,
  } = useChapterViewModel();

  const [search, setSearch] = useState("");

  useEffect(() => {
    findChapter();
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

  const handlePageChange = useCallback((page: number) => {
    setCriteria({ page, limit: 10, search });
    findChapter();
  }, [search, setCriteria, findChapter]);

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  const handleFilter = () => {
    console.log("Filter clicked");
  };

  const handleNewChapter = () => {
    console.log("New Chapter clicked");
  };

  const handleBulkDelete = () => {
    console.log("Bulk Delete clicked");
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] p-[clamp(1rem,2vw,2rem)] flex flex-col gap-[clamp(1.5rem,2.5vw,2.5rem)]">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-[var(--color-text-primary)]">
          Chapters Library
        </h1>
        <p className="text-[var(--color-text-secondary)] text-[clamp(0.875rem,1vw,1rem)]">
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
        {isLoading && !chapterList && (
          <div className="flex items-center justify-center py-12">
            <div className="text-[var(--color-text-secondary)]">Loading...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Chapter List */}
        {(!isLoading || chapterList) && !error && (
          <ChapterList
            chapters={chapterList?.data || []}
            onEdit={(chapter) => console.log('Edit', chapter)}
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
    </div>
  );
}
