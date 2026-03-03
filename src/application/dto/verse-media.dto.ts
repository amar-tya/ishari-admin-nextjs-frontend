import { VerseMediaEntity } from '@/core/entities';

export interface CreateVerseMediaDTO {
  verseId: number;
  hadiId?: number;
  mediaType: 'audio' | 'image';
  file: File;
  description?: string;
  storagePath: string; // The path to save in Supabase Storage
}

export interface UpdateVerseMediaDTO {
  description?: string;
  file?: File;
  storagePath?: string;
}

export interface ListVerseMediaDTO {
  page: number;
  limit?: number;
  search?: string;
  verseId?: number;
  hadiId?: number;
}

export interface ListVerseMediaResponseDTO {
  data: VerseMediaEntity[];
  meta: {
    total: number;
    total_pages: number;
    page: number;
    limit: number;
    count: number;
  };
}
