import { ChapterRequest } from '@/application/dto/chapter.dto';
import { PaginationResponse } from '@/application/dto/pagination.dto';
import { ChapterEntity } from '@/core/entities';
import { Result } from '@/core/types';

export interface IChapterRepository {
  // create()
  // update()
  // delete()
  // getById()
  findChapter(
    criteria: ChapterRequest
  ): Promise<Result<{ data: ChapterEntity[]; meta: PaginationResponse }>>;
}
