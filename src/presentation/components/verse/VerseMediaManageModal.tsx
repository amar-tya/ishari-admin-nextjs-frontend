'use client';

import React, { useEffect, useState } from 'react';
import { VerseEntity, VerseMediaEntity } from '@/core/entities';
import { CreateVerseMediaDTO, UpdateVerseMediaDTO } from '@/application/dto';
import { Modal, ConfirmModal, SuccessModal, Button } from '../base';
import { VerseMediaList, VerseMediaUploadForm } from '../verse-media';
import {
  useVerseMediaViewModel,
  useHadiViewModel,
} from '@/presentation/view-models';

interface VerseMediaManageModalProps {
  verse: VerseEntity;
  isOpen: boolean;
  onClose: () => void;
}

export const VerseMediaManageModal: React.FC<VerseMediaManageModalProps> = ({
  verse,
  isOpen,
  onClose,
}) => {
  const {
    isLoading,
    error,
    verseMediaList,
    getVerseMediaList,
    storeVerseMedia,
    updateVerseMedia,
    removeVerseMedia,
  } = useVerseMediaViewModel();

  const { hadiList, getHadiList } = useHadiViewModel();

  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedMedia, setSelectedMedia] = useState<VerseMediaEntity | undefined>(undefined);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    mediaId: 0,
    storagePath: '',
  });
  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    message: '',
  });

  useEffect(() => {
    if (isOpen) {
      getVerseMediaList(1, undefined, undefined, verse.id);
      getHadiList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, verse.id]);

  const handleNewMedia = () => {
    setFormMode('create');
    setSelectedMedia(undefined);
    setIsUploadFormOpen(true);
  };

  const handleEditMedia = (id: number) => {
    const media = verseMediaList?.data.find((m) => m.id === id);
    if (media) {
      setFormMode('edit');
      setSelectedMedia(media);
      setIsUploadFormOpen(true);
    }
  };

  const handleDeleteMedia = (id: number) => {
    const media = verseMediaList?.data.find((m) => m.id === id);
    if (!media) return;

    const storagePathMatch = media.mediaUrl.match(/verse-media\/(.+)$/);
    const storagePath = storagePathMatch
      ? decodeURIComponent(storagePathMatch[1])
      : '';

    setConfirmModal({ isOpen: true, mediaId: id, storagePath });
  };

  const handleConfirmDelete = async () => {
    const success = await removeVerseMedia(
      confirmModal.mediaId,
      confirmModal.storagePath
    );
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
    if (success) {
      setSuccessModal({ isOpen: true, message: 'Media berhasil dihapus.' });
      getVerseMediaList(1, undefined, undefined, verse.id);
    }
  };

  const handleFormSubmit = async (
    data: CreateVerseMediaDTO | UpdateVerseMediaDTO
  ) => {
    let result = false;
    if (formMode === 'create') {
      result = await storeVerseMedia(data as CreateVerseMediaDTO);
    } else if (selectedMedia) {
      result = await updateVerseMedia(selectedMedia.id, data as UpdateVerseMediaDTO);
    }

    if (result) {
      setSuccessModal({
        isOpen: true,
        message:
          formMode === 'create'
            ? 'Media berhasil ditambahkan.'
            : 'Media berhasil diperbarui.',
      });
      getVerseMediaList(1, undefined, undefined, verse.id);
    }

    return result;
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`Media · Ayat ${verse.verseNumber}`}
        width="max-w-4xl"
      >
        <div className="flex flex-col gap-4">
          {/* Verse info + Upload button */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Chapter
              </span>
              <span className="text-sm font-medium text-text-primary">
                {verse.chapter?.title}
              </span>
            </div>
            <Button variant="primary" onClick={handleNewMedia}>
              Upload Audio
            </Button>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Loading */}
          {isLoading && !verseMediaList && (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Media list */}
          {(!isLoading || verseMediaList) && (
            <VerseMediaList
              mediaList={verseMediaList?.data || []}
              hadiList={hadiList}
              onEdit={handleEditMedia}
              onDelete={handleDeleteMedia}
            />
          )}
        </div>
      </Modal>

      {/* Upload / Edit form */}
      <VerseMediaUploadForm
        isOpen={isUploadFormOpen}
        onClose={() => setIsUploadFormOpen(false)}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        mode={formMode}
        initialData={selectedMedia}
        hadiList={hadiList}
        error={error}
        preSelectedVerse={formMode === 'create' ? verse : undefined}
      />

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmDelete}
        title="Hapus Media?"
        message="Apakah Anda yakin ingin menghapus media ini? File audio juga akan dihapus dari storage."
        confirmText="Hapus"
        cancelText="Batal"
        isLoading={isLoading}
      />

      {/* Success */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal((prev) => ({ ...prev, isOpen: false }))}
        message={successModal.message}
      />
    </>
  );
};
