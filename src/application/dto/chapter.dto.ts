import { ChapterEntity } from '@/core/entities';
import { PaginationResponse } from '@/application/dto/pagination.dto';

export interface ChapterResponse {
  data: ChapterEntity[];
  meta: PaginationResponse;
}

export interface ChapterRequest {
  page: number;
  limit?: number;
  search?: string;
  bookId?: number;
  chapterId?: number;
  category?: string;
}

export interface ChapterCreateRequest {
  bookId: number;
  chapterNumber: number;
  title: string;
  category: string;
  description?: string;
  totalVerses?: number;
}

export interface ChapterUpdateRequest {
  chapterId: number;
  bookId?: number;
  chapterNumber?: number;
  title?: string;
  category?: string;
  description?: string;
  totalVerses?: number;
}
