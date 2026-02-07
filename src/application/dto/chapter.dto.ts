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
