import React, { useState } from 'react';
import { ChapterCreateRequest } from '@/application/dto'; // Assuming request DTOs
import { Modal, Input, TextArea, Button, Select } from '../base';
import { ChapterEntity, BookEntity } from '@/core/entities';

export type ChapterFormMode = 'create' | 'edit';

export interface ChapterFormData {
    bookId: string;
    chapterNumber: string;
    title: string;
    category: string;
    totalVerses: string;
    description: string;
}

interface ChapterFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ChapterCreateRequest) => Promise<boolean>;
    isLoading?: boolean;
    mode?: ChapterFormMode;
    initialData?: ChapterEntity;
    books: BookEntity[]; // List of books for the dropdown
}

function entityToFormData(entity: ChapterEntity): ChapterFormData {
    return {
        bookId: entity.bookId.toString(),
        chapterNumber: entity.chapterNumber.toString(),
        title: entity.title,
        category: entity.category,
        totalVerses: entity.totalVerses ? entity.totalVerses.toString() : '0',
        description: entity.description || '',
    };
}

const INITIAL_STATE: ChapterFormData = {
    bookId: '',
    chapterNumber: '',
    title: '',
    category: 'Muhud',
    totalVerses: '0',
    description: '',
};

const CATEGORY_OPTIONS = [
    { value: '', label: 'Pilih Kategori' },
    { value: 'Diwan', label: 'Diwan' },
    { value: 'Muhud', label: 'Muhud' },
    { value: 'Diba', label: 'Diba' },
    { value: 'Rowi', label: 'Rowi' },
    { value: 'Muradah', label: 'Muradah' },
];

const ChapterFormInternal: React.FC<{
    onClose: () => void;
    onSubmit: (data: ChapterCreateRequest) => Promise<boolean>;
    isLoading: boolean;
    mode: ChapterFormMode;
    initialData?: ChapterEntity;
    books: BookEntity[];
}> = ({ onClose, onSubmit, isLoading, mode, initialData, books }) => {
    const initialFormData =
        mode === 'edit' && initialData
            ? entityToFormData(initialData)
            : INITIAL_STATE;

    const [formData, setFormData] = useState<ChapterFormData>(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.bookId) newErrors.bookId = 'Buku Referensi is required';
        if (!formData.chapterNumber) newErrors.chapterNumber = 'Chapter Number is required';
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.category) newErrors.category = 'Category is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const submitData: ChapterCreateRequest = {
            bookId: Number(formData.bookId),
            chapterNumber: Number(formData.chapterNumber),
            title: formData.title,
            category: formData.category,
            totalVerses: Number(formData.totalVerses) || 0,
            description: formData.description.trim() || undefined,
        };

        // If edit mode, we might need ID or different DTO, but for now assuming create structure 
        // or that parent handles the ID injection if needed (UpdateChapterDTO usually has ID).
        // The prompt only showed Create modal, but said "create / edit". 
        // I'll stick to ChapterCreateRequest structure for the data payload.

        const success = await onSubmit(submitData);

        if (success) {
            onClose();
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Buku Referensi */}
            <Select
                label="Buku Referensi"
                name="bookId"
                value={formData.bookId}
                onChange={handleChange}
                error={errors.bookId}
                disabled={isLoading}
            >
                <option value="">Pilih Buku Referensi</option>
                {books.map((book) => (
                    <option key={book.id} value={book.id}>{book.title}</option>
                ))}
            </Select>

            <div className="flex flex-col md:flex-row gap-4">
                {/* Nomor Chapter */}
                <div className="w-full md:w-1/3">
                    <Input
                        label="Nomor Chapter"
                        name="chapterNumber"
                        type="number"
                        placeholder="Nomor / Urutan"
                        value={formData.chapterNumber}
                        onChange={handleChange}
                        error={errors.chapterNumber}
                        disabled={isLoading}
                    />
                </div>

                {/* Nama Chapter */}
                <div className="w-full md:w-2/3">
                    <Input
                        label="Nama Chapter"
                        name="title"
                        placeholder="Masukkan nama chapter"
                        value={formData.title}
                        onChange={handleChange}
                        error={errors.title}
                        disabled={isLoading}
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                {/* Kategori Chapter */}
                <div className="w-full md:w-1/2">
                    <Select
                        label="Kategori Chapter"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        error={errors.category}
                        disabled={isLoading}
                        options={CATEGORY_OPTIONS}
                    />
                </div>

                {/* Total Larik */}
                <div className="w-full md:w-1/2">
                    <Input
                        label="Total Larik (Kalimat)"
                        name="totalVerses"
                        type="number"
                        placeholder="0"
                        value={formData.totalVerses}
                        onChange={handleChange}
                        error={errors.totalVerses}
                        disabled={isLoading}
                    />
                </div>
            </div>

            {/* Deskripsi */}
            <TextArea
                label="Deskripsi"
                name="description"
                placeholder="Tuliskan ringkasan atau deskripsi chapter..."
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
                disabled={isLoading}
                rows={4}
            />

            {/* Footer Actions */}
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
                    {mode === 'edit' ? 'Update' : 'Simpan'}
                </Button>
            </div>
        </form>
    );
};

export const ChapterForm: React.FC<ChapterFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading = false,
    mode = 'create',
    initialData,
    books,
}) => {
    const modalTitle = mode === 'edit' ? 'Edit Chapter' : 'Create Chapter';
    const formKey = `${mode}-${initialData?.id ?? 'new'}`;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
            <ChapterFormInternal
                key={formKey}
                onClose={onClose}
                onSubmit={onSubmit}
                isLoading={isLoading}
                mode={mode}
                initialData={initialData}
                books={books}
            />
        </Modal>
    );
};
