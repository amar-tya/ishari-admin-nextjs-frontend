'use client';

import React, { useEffect, useState } from 'react';
import { useBook } from '@/presentation/hooks';
import { BookEntity } from '@/core/entities';
import {
  BookIcon,
  ArrowRightIcon,
  SkipForwardIcon,
} from '@/presentation/components/base/icons';
import { Modal } from '@/presentation/components/base/Modal';

export function KitabList() {
  const { listBook } = useBook();
  const [books, setBooks] = useState<BookEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<BookEntity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await listBook({
          page: 1,
          limit: 100,
        });

        if (res.success && res.data.data) {
          setBooks(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [listBook]);

  const handleBookClick = (book: BookEntity) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto p-6 pb-20">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#0f172a] mb-2 tracking-tight">
          {' '}
          Kitab{' '}
        </h1>
        <p className="text-slate-500 font-medium">
          {' '}
          Koleksi kitab digital ISHARI{' '}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <div className="animate-spin size-10 border-4 border-[#51c878] border-t-transparent rounded-full" />
        </div>
      ) : books.length === 0 ? (
        <div className="text-center p-20 text-slate-500 bg-white rounded-2xl border border-slate-100 shadow-sm">
          Belum ada data kitab yang ditemukan.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book)}
              className="group cursor-pointer relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-slate-200 hover:border-[#51c878]/50 hover:shadow-[0_12px_40px_-15px_rgba(81,200,120,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Decorative Background Blob */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#51c878]/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="size-12 rounded-2xl bg-gradient-to-br from-[#e6f7ec] to-white border border-[#51c878]/10 flex items-center justify-center text-[#258b45] group-hover:from-[#51c878] group-hover:to-[#3da35f] group-hover:text-white transition-all duration-300 shadow-sm">
                    <BookIcon size={24} />
                  </div>
                  <div className="size-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#51c878] group-hover:text-white group-hover:border-[#51c878] transition-all duration-300 shadow-sm group-hover:shadow-[0_4px_12px_rgba(81,200,120,0.3)]">
                    <ArrowRightIcon
                      size={20}
                      className="transform group-hover:translate-x-0.5 transition-transform duration-300"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#0f172a] mb-2 group-hover:text-[#51c878] transition-colors duration-300 tracking-tight line-clamp-2">
                  {book.title}
                </h3>

                {book.author && (
                  <p className="text-slate-500 text-sm font-medium mb-4">
                    Karya: {book.author}
                  </p>
                )}

                {book.description && (
                  <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                    {book.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Maintenance Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Informasi"
        width="max-w-md"
      >
        <div className="py-6 text-center">
          <div className="size-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <SkipForwardIcon size={40} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Dalam Perbaikan
          </h3>
          <p className="text-slate-500 leading-relaxed">
            Perbaikan.. tunggu update selanjutnya.
            <br />
            Fitur untuk {selectedBook?.title} sedang kami kembangkan.
          </p>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-8 w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
          >
            Dimengerti
          </button>
        </div>
      </Modal>
    </div>
  );
}
