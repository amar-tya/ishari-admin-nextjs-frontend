import { ChapterRequest, ChapterResponse } from '@/application/dto/chapter.dto';
import { IChapterRepository } from '@/application/ports/repository/chapter.repository.port';
import { Result, mapResult } from '@/core/types';

export class FindChapterUseCase {
  private readonly chapterRepository: IChapterRepository;

  constructor(chapterRepository: IChapterRepository) {
    this.chapterRepository = chapterRepository;
  }

  async execute(criteria: ChapterRequest): Promise<Result<ChapterResponse>> {
    const result = await this.chapterRepository.findChapter(criteria);

    return mapResult(result, (res) => ({
      data: res.data,
      meta: res.meta,
    }));
  }
}
