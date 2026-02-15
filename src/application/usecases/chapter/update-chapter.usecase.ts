import { ChapterUpdateRequest } from '@/application/dto';
import { IChapterRepository } from '@/application/ports';
import { ChapterEntity } from '@/core/entities';
import { Result } from '@/core/types';

export class UpdateChapterUseCase {
  constructor(private readonly chapterRepository: IChapterRepository) {}

  async execute(request: ChapterUpdateRequest): Promise<Result<ChapterEntity>> {
    return await this.chapterRepository.update(request);
  }
}
