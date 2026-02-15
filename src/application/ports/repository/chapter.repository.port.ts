import {
  ChapterCreateRequest,
  ChapterUpdateRequest,
  ChapterRequest,
  PaginationResponse,
} from '@/application/dto';
import { ChapterEntity } from '@/core/entities';
import { Result } from '@/core/types';

export interface IChapterRepository {
  create(request: ChapterCreateRequest): Promise<Result<ChapterEntity>>;
  update(request: ChapterUpdateRequest): Promise<Result<ChapterEntity>>;
  // delete()
  // getById()
  findChapter(
    criteria: ChapterRequest
  ): Promise<Result<{ data: ChapterEntity[]; meta: PaginationResponse }>>;
}
