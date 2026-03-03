'use client';

import React, { useEffect, useState } from 'react';
import {
  VerseMediaList,
  VerseMediaToolbar,
  VerseMediaUploadForm,
} from '@/presentation/components/verse-media';
import {
  useVerseMediaViewModel,
  useHadiViewModel,
} from '@/presentation/view-models';
import { VerseMediaEntity } from '@/core/entities';
import { CreateVerseMediaDTO, UpdateVerseMediaDTO } from '@/application/dto';

export default function VerseMediaPage() {
  const {
    isLoading,
    error,
    verseMediaList,
    getVerseMediaList,
    storeVerseMedia,
    updateVerseMedia,
    removeVerseMedia,
    setHadiId,
    setSearch,
  } = useVerseMediaViewModel();

  const { hadiList, getHadiList } = useHadiViewModel();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedMedia, setSelectedMedia] = useState<
    VerseMediaEntity | undefined
  >(undefined);

  useEffect(() => {
    getVerseMediaList();
    getHadiList();
  }, [getVerseMediaList, getHadiList]);

  const handleSearch = (query: string) => {
    setSearch(query);
    getVerseMediaList(1, query);
  };

  const handleHadiChange = (id: number | null) => {
    setHadiId(id);
    getVerseMediaList(1, undefined, id || undefined);
  };

  const handleNewMedia = () => {
    setFormMode('create');
    setSelectedMedia(undefined);
    setIsFormOpen(true);
  };

  const handleEditMedia = (id: number) => {
    const media = verseMediaList?.data.find((m) => m.id === id);
    if (media) {
      setFormMode('edit');
      setSelectedMedia(media);
      setIsFormOpen(true);
    }
  };

  const handleDeleteMedia = async (id: number) => {
    const media = verseMediaList?.data.find((m) => m.id === id);
    if (
      media &&
      window.confirm('Apakah Anda yakin ingin menghapus media ini?')
    ) {
      const storagePathMatch = media.mediaUrl.match(/verse-media\/(.+)$/);
      const storagePath = storagePathMatch ? storagePathMatch[1] : '';
      if (storagePath) {
        await removeVerseMedia(id, storagePath);
      } else {
        await removeVerseMedia(id, ''); // Fallback
      }
    }
  };

  const handleFormSubmit = async (
    data: CreateVerseMediaDTO | UpdateVerseMediaDTO
  ) => {
    if (formMode === 'create') {
      return await storeVerseMedia(data as CreateVerseMediaDTO);
    } else if (selectedMedia) {
      return await updateVerseMedia(
        selectedMedia.id,
        data as UpdateVerseMediaDTO
      );
    }
    return false;
  };

  return (
    <div className="p-[clamp(1rem,2vw,2rem)] flex flex-col gap-[clamp(1rem,2vw,1.5rem)] max-w-[1600px] mx-auto w-full animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-primary">
          Verse Media
        </h1>
        <p className="text-text-secondary text-[clamp(0.875rem,1vw,1rem)]">
          Manage, edit, and organize audio files for verses.
        </p>
      </div>

      {/* Toolbar Section */}
      <VerseMediaToolbar
        onSearch={handleSearch}
        onHadiChange={handleHadiChange}
        onNewMediaClick={handleNewMedia}
        hadiList={hadiList}
        selectedHadiId={null}
      />

      {/* Main Content Card/Table */}
      <div className="flex-1 flex flex-col min-h-0">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => getVerseMediaList()}
              className="underline font-semibold"
            >
              Retry
            </button>
          </div>
        )}

        {isLoading && !verseMediaList ? (
          <div className="flex-1 flex items-center justify-center p-12 bg-white rounded-xl border border-border shadow-card">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-text-secondary font-medium animate-pulse">
                Loading Media...
              </p>
            </div>
          </div>
        ) : (
          <VerseMediaList
            mediaList={verseMediaList?.data || []}
            hadiList={hadiList}
            onEdit={handleEditMedia}
            onDelete={handleDeleteMedia}
          />
        )}
      </div>

      {/* Verse Media Form Modal */}
      <VerseMediaUploadForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        mode={formMode}
        initialData={selectedMedia}
        hadiList={hadiList}
        error={error}
      />
    </div>
  );
}
