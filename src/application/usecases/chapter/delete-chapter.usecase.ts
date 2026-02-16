import { IChapterRepository } from '@/application/ports/repository/chapter.repository.port';
import { Result } from '@/core/types';

export class DeleteChapterUseCase {
  constructor(private readonly chapterRepository: IChapterRepository) {}

  async execute(id: number): Promise<Result<boolean>> {
    return this.chapterRepository.delete(id);
  }
}
