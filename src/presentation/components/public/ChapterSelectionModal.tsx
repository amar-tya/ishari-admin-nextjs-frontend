'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Modal } from '@/presentation/components/base/Modal';
import { useChapter } from '@/presentation/hooks';
import { ChapterEntity } from '@/core/entities';

interface ChapterSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (chapterId: number) => void;
  currentChapterId?: number;
}

export const ChapterSelectionModal: React.FC<ChapterSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentChapterId,
}) => {
  const { findChapter } = useChapter();
  const [chapters, setChapters] = useState<ChapterEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchChapters = async () => {
        setLoading(true);
        try {
          const result = await findChapter({ page: 1, limit: 200 });
          if (result.success) {
            setChapters(result.data.data);
          }
        } catch (error) {
          console.error('Error fetching chapters:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchChapters();
    }
  }, [isOpen, findChapter]);

  // Group chapters by category and get unique categories
  const groupedData = useMemo(() => {
    const grouped = chapters.reduce(
      (acc, chapter) => {
        const category = chapter.category || 'Other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(chapter);
        return acc;
      },
      {} as Record<string, ChapterEntity[]>
    );

    // Sort chapters within each category
    Object.keys(grouped).forEach((cat) => {
      grouped[cat].sort((a, b) => a.chapterNumber - b.chapterNumber);
    });

    const categories = Object.keys(grouped).sort();

    return { grouped, categories };
  }, [chapters]);

  // Set default active category when data is loaded
  useEffect(() => {
    if (groupedData.categories.length > 0 && !activeCategory) {
      // Try to find the category of the current chapter
      const currentChapter = chapters.find((c) => c.id === currentChapterId);
      if (currentChapter && currentChapter.category) {
        setActiveCategory(currentChapter.category);
      } else {
        setActiveCategory(groupedData.categories[0]);
      }
    }
  }, [groupedData.categories, activeCategory, chapters, currentChapterId]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Select Muhud"
      width="max-w-md"
    >
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin size-6 border-2 border-[#51c878] border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Category Tabs */}
            {groupedData.categories.length > 1 && (
              <div className="flex p-1 bg-slate-100 rounded-xl">
                {groupedData.categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                      activeCategory === category
                        ? 'bg-white text-[#3da35f] shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            {/* Chapter List */}
            <div className="grid grid-cols-1 gap-1 max-h-[60vh] overflow-y-auto pr-1">
              {activeCategory &&
                groupedData.grouped[activeCategory]?.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => {
                      onSelect(chapter.id);
                      onClose();
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                      currentChapterId === chapter.id
                        ? 'bg-[#e6f7ec] text-[#3da35f] ring-1 ring-[#51c878]/30'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div
                      className={`size-10 rounded-lg flex items-center justify-center ${
                        currentChapterId === chapter.id
                          ? 'bg-white shadow-sm'
                          : 'bg-slate-100'
                      }`}
                    >
                      <span className="text-sm font-bold">
                        {chapter.chapterNumber}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">
                        {chapter.title}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {chapter.totalVerses} Verses
                      </p>
                    </div>
                    {currentChapterId === chapter.id && (
                      <div className="size-2 bg-[#51c878] rounded-full animate-pulse" />
                    )}
                  </button>
                ))}

              {!activeCategory && chapters.length === 0 && (
                <div className="text-center py-8 text-slate-400 italic text-sm">
                  No chapters found.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
