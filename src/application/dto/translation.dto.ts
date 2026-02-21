import { TranslationEntity } from '@/core/entities';
import { PaginationResponse } from './pagination.dto';

export interface TranslationResponse {
  data: TranslationEntity[];
  meta: PaginationResponse;
}

export interface TranslationRequest {
  page: number;
  limit?: number;
  search?: string;
  verseId?: number;
  languageCode?: string;
  translator?: string;
}

export interface TranslationCreateRequest {
  verseId: number;
  languageCode: string;
  translator: string;
  translation: string;
}

export interface TranslationUpdateRequest {
  translationId: number;
  verseId?: number;
  languageCode?: string;
  translator?: string;
  translation?: string;
}
