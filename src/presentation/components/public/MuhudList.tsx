'use client';

import React, { useEffect, useState } from 'react';
import { useChapter } from '@/presentation/hooks';
import { ChapterEntity } from '@/core/entities';
import { ArrowRightIcon } from '@/presentation/components/base/icons';
import Link from 'next/link';

export function MuhudList() {
  const { findChapter } = useChapter();
  const [chapters, setChapters] = useState<ChapterEntity[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="flex-1 w-full max-w-[1200px] mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Muhud</h1>
        <p className="text-[#475569]">
          Daftar kitab / chapter kategori Diwan dan Muradah
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <div className="animate-spin size-10 border-4 border-[#51c878] border-t-transparent rounded-full" />
        </div>
      ) : chapters.length === 0 ? (
        <div className="text-center p-20 text-slate-500 bg-white rounded-2xl border border-slate-100 shadow-sm">
          Belum ada data muhud yang ditemukan.
        </div>
      ) : (
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
      )}
    </div>
  );
}
