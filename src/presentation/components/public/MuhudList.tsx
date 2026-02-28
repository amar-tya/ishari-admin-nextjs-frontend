'use client';

import React, { useEffect, useState } from 'react';
import { useChapter } from '@/presentation/hooks';
import { ChapterEntity } from '@/core/entities';
import {
  ArrowRightIcon,
  BookIcon,
  ChaptersIcon,
  DashboardIcon,
} from '@/presentation/components/base/icons';
import Link from 'next/link';

export function MuhudList() {
  const { findChapter } = useChapter();
  const [chapters, setChapters] = useState<ChapterEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true);
      try {
        // Fetch chapters explicitly defined in the category param
        const res = await findChapter({
          page: 1,
          limit: 100, // Reasonable limit to get all relevant chapters
          category: 'Diwan,Muradah,Diba',
        });

        if (res.success && res.data.data) {
          setChapters(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching muhud chapters:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [findChapter]);

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto p-6 pb-20">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#0f172a] mb-2 tracking-tight">
            Muhud
          </h1>
          <p className="text-slate-500 font-medium">
            Daftar kitab / chapter kategori Diwan dan Muradah
          </p>
        </div>

        <div className="flex bg-slate-100/50 backdrop-blur-sm p-1.5 rounded-2xl border border-slate-200/60 shadow-inner w-fit">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-[#51c878] text-white shadow-[0_4px_12px_rgba(81,200,120,0.3)]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <DashboardIcon size={16} />
            CARD
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              viewMode === 'list'
                ? 'bg-[#51c878] text-white shadow-[0_4px_12px_rgba(81,200,120,0.3)]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ChaptersIcon size={16} />
            LIST
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <div className="animate-spin size-10 border-4 border-[#51c878] border-t-transparent rounded-full" />
        </div>
      ) : chapters.length === 0 ? (
        <div className="text-center p-20 text-slate-500 bg-white rounded-2xl border border-slate-100 shadow-sm">
          Belum ada data muhud yang ditemukan.
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/?id=${chapter.id}`}
              className="group relative overflow-hidden block bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-slate-200 hover:border-[#51c878]/50 hover:shadow-[0_12px_40px_-15px_rgba(81,200,120,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Decorative Background Blob */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#51c878]/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-flex items-center justify-center px-4 py-1.5 bg-gradient-to-r from-[#e6f7ec] to-white border border-[#51c878]/20 text-[#258b45] text-xs font-bold rounded-full shadow-[0_2px_10px_-4px_rgba(81,200,120,0.2)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#51c878] mr-2"></span>
                    {chapter.category}
                  </span>
                  <div className="size-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#51c878] group-hover:text-white group-hover:border-[#51c878] transition-all duration-300 shadow-sm group-hover:shadow-[0_4px_12px_rgba(81,200,120,0.3)]">
                    <div className="transform group-hover:translate-x-0.5 transition-transform duration-300">
                      <ArrowRightIcon size={20} />
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#0f172a] mb-2 group-hover:text-[#51c878] transition-colors duration-300 tracking-tight">
                  {chapter.title}
                </h3>

                {chapter.description && (
                  <p
                    className="font-serif text-[#64748b] text-2xl leading-relaxed mt-4 group-hover:text-[#334155] transition-colors"
                    dir="rtl"
                  >
                    {chapter.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/?id=${chapter.id}`}
              className="group flex flex-col md:flex-row md:items-center bg-white/70 backdrop-blur-md rounded-3xl p-5 border border-slate-200 hover:border-[#51c878]/40 hover:bg-white hover:shadow-xl hover:shadow-[#51c878]/5 transition-all duration-300"
            >
              <div className="flex items-center flex-1">
                <div className="size-12 rounded-2xl bg-gradient-to-br from-[#e6f7ec] to-white border border-[#51c878]/10 flex items-center justify-center text-[#258b45] group-hover:from-[#51c878] group-hover:to-[#3da35f] group-hover:text-white transition-all duration-300 shrink-0 shadow-sm">
                  <BookIcon size={24} />
                </div>
                <div className="ml-5 flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-[#0f172a] truncate group-hover:text-[#258b45] transition-colors">
                      {chapter.title}
                    </h3>
                    <span className="hidden xs:inline-block text-[10px] font-black tracking-widest text-[#258b45] px-2.5 py-1 bg-[#e6f7ec] rounded-lg border border-[#51c878]/10">
                      {chapter.category.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center text-slate-400 text-xs font-medium uppercase tracking-wider">
                    <span className="truncate">ISHARI DIGITAL COLLECTION</span>
                    <span className="mx-2 opacity-30">•</span>
                    <span>{chapter.category}</span>
                  </div>
                </div>
              </div>

              {chapter.description && (
                <div className="mt-4 md:mt-0 md:ml-auto md:mr-8 text-right flex flex-col items-end">
                  <p
                    className="font-serif text-slate-500 text-2xl leading-tight group-hover:text-[#0f172a] transition-colors"
                    dir="rtl"
                  >
                    {chapter.description}
                  </p>
                </div>
              )}

              <div className="hidden md:flex size-11 rounded-full bg-slate-50 border border-slate-100 items-center justify-center text-slate-300 group-hover:bg-[#51c878] group-hover:text-white group-hover:border-[#51c878] transition-all duration-300 group-hover:shadow-[0_4px_12px_rgba(81,200,120,0.3)]">
                <ArrowRightIcon
                  size={20}
                  className="transform group-hover:translate-x-0.5 transition-transform"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
