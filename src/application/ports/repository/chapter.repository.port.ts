import { ChapterCreateRequest, ChapterRequest, PaginationResponse } from '@/application/dto';
import { ChapterEntity } from '@/core/entities';
import { Result } from '@/core/types';

export interface IChapterRepository {
  create(request: ChapterCreateRequest): Promise<Result<ChapterEntity>>
  // update()
  // delete()
  // getById()
  findChapter(
    criteria: ChapterRequest
  ): Promise<Result<{ data: ChapterEntity[]; meta: PaginationResponse }>>;
}
