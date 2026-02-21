import { ITranslationRepository } from '@/application/ports/repository/translation.repository.port';
import { Result } from '@/core/types';

export class BulkDeleteTranslationUseCase {
  private readonly translationRepository: ITranslationRepository;

  constructor(translationRepository: ITranslationRepository) {
    this.translationRepository = translationRepository;
  }

  async execute(ids: number[]): Promise<Result<boolean>> {
    return await this.translationRepository.bulkDelete(ids);
  }
}
