import React, { useState } from 'react';
import { CreateVerseMediaDTO, UpdateVerseMediaDTO } from '@/application/dto';
import { Modal, Input, TextArea, Button } from '../base';
import { VerseMediaEntity, HadiEntityList } from '@/core/entities';

export type VerseMediaFormMode = 'create' | 'edit';

interface VerseMediaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateVerseMediaDTO | UpdateVerseMediaDTO
  ) => Promise<boolean>;
  isLoading?: boolean;
  mode?: VerseMediaFormMode;
  initialData?: VerseMediaEntity;
  hadiList: HadiEntityList | null;
  error?: string | null;
}

interface FormData {
  verseId: string;
  hadiId: string;
  description: string;
  file: File | null;
}

const VerseMediaFormInternal: React.FC<{
  onClose: () => void;
  onSubmit: (
    data: CreateVerseMediaDTO | UpdateVerseMediaDTO
  ) => Promise<boolean>;
  isLoading: boolean;
  mode: VerseMediaFormMode;
  initialData?: VerseMediaEntity;
  hadiList: HadiEntityList | null;
  error?: string | null;
}> = ({ onClose, onSubmit, isLoading, mode, initialData, hadiList, error }) => {
  const [formData, setFormData] = useState<FormData>({
    verseId: mode === 'edit' && initialData ? String(initialData.verseId) : '',
    hadiId:
      mode === 'edit' && initialData?.hadiId ? String(initialData.hadiId) : '',
    description:
      mode === 'edit' && initialData?.description
        ? initialData.description
        : '',
    file: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (mode === 'create') {
      if (!formData.verseId) newErrors.verseId = 'Verse ID is required';
      else if (isNaN(Number(formData.verseId)))
        newErrors.verseId = 'Verse ID must be a number';

      if (!formData.file)
        newErrors.file = 'File audio is required for new media';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    let submitData: CreateVerseMediaDTO | UpdateVerseMediaDTO;

    const hadiName =
      formData.hadiId && hadiList
        ? hadiList.data.find((h) => String(h.id) === formData.hadiId)?.name ||
          'unknown-hadi'
        : 'unknown-hadi';

    if (mode === 'edit' && initialData) {
      submitData = {
        description: formData.description.trim() || undefined,
      } as UpdateVerseMediaDTO;

      if (formData.file) {
        submitData.file = formData.file;
        const fileName = formData.file.name
          .replace(/[^a-zA-Z0-9.\-_]/g, '-')
          .toLowerCase();
        const hadiSlug = hadiName.replace(/\s+/g, '-').toLowerCase();
        submitData.storagePath = `${hadiSlug}/${Date.now()}-${fileName}`;
      }
    } else {
      const parsedVerseId = Number(formData.verseId);
      const parsedHadiId = formData.hadiId
        ? Number(formData.hadiId)
        : undefined;
      const file = formData.file as File;

      const fileName = file.name
        .replace(/[^a-zA-Z0-9.\-_]/g, '-')
        .toLowerCase();
      const hadiSlug = hadiName.replace(/\s+/g, '-').toLowerCase();
      const storagePath = `${hadiSlug}/${Date.now()}-${fileName}`;

      submitData = {
        verseId: parsedVerseId,
        hadiId: parsedHadiId,
        mediaType: 'audio',
        file: file,
        description: formData.description.trim() || undefined,
        storagePath,
      } as CreateVerseMediaDTO;
    }

    const success = await onSubmit(submitData);
    if (success) {
      onClose();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
      if (errors.file) setErrors((prev) => ({ ...prev, file: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {mode === 'create' && (
        <>
          <Input
            label="Verse ID *"
            name="verseId"
            type="number"
            placeholder="ID Verse (contoh: 12)"
            value={formData.verseId}
            onChange={handleInputChange}
            error={errors.verseId}
            disabled={isLoading}
          />
        </>
      )}

      {mode === 'create' && (
        <div className="flex flex-col gap-2">
          <label className="text-body font-semibold text-text-primary">
            Hadi (Optional)
          </label>
          <select
            name="hadiId"
            className="w-full px-4 py-3 border border-border-light rounded-xl text-body bg-bg-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={formData.hadiId}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value="">Pilih Hadi...</option>
            {hadiList?.data.map((h) => (
              <option key={h.id} value={String(h.id)}>
                {h.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <TextArea
        label="Description"
        name="description"
        placeholder="Deskripsi media ini (optional)"
        value={formData.description}
        onChange={handleInputChange}
        error={errors.description}
        disabled={isLoading}
        rows={3}
      />

      <div className="flex flex-col gap-2">
        <label className="text-body font-semibold text-text-primary">
          File Audio {mode === 'create' && '*'}
        </label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          disabled={isLoading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-primary/10 file:text-primary
            hover:file:bg-primary/20 cursor-pointer"
        />
        {errors.file && (
          <p className="text-sm text-error mt-1">{errors.file}</p>
        )}
        {mode === 'edit' && !formData.file && (
          <p className="text-sm text-text-secondary">
            Biarkan kosong jika tidak ingin mengubah audio.
          </p>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          variant="secondary"
          type="button"
          onClick={onClose}
          disabled={isLoading}
        >
          Batal
        </Button>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {mode === 'edit' ? 'Update Audio' : 'Upload Audio'}
        </Button>
      </div>
    </form>
  );
};

export const VerseMediaUploadForm: React.FC<VerseMediaFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  mode = 'create',
  initialData,
  hadiList,
  error,
}) => {
  const modalTitle = mode === 'edit' ? 'Edit Audio' : 'Upload Audio Baru';
  const formKey = `${mode}-${initialData?.id ?? 'new'}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
      <VerseMediaFormInternal
        key={formKey}
        onClose={onClose}
        onSubmit={onSubmit}
        isLoading={isLoading}
        mode={mode}
        initialData={initialData}
        hadiList={hadiList}
        error={error}
      />
    </Modal>
  );
};
