import { IChapterRepository } from '@/application/ports/repository/chapter.repository.port';
import { Result } from '@/core/types';

export class BulkDeleteChapterUseCase {
  constructor(private readonly chapterRepository: IChapterRepository) {}

  async execute(ids: number[]): Promise<Result<boolean>> {
    return this.chapterRepository.bulkDelete(ids);
  }
}
