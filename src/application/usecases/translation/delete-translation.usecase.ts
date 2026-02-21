import { ITranslationRepository } from '@/application/ports/repository/translation.repository.port';
import { Result } from '@/core/types';

export class DeleteTranslationUseCase {
  private readonly translationRepository: ITranslationRepository;

  constructor(translationRepository: ITranslationRepository) {
    this.translationRepository = translationRepository;
  }

  async execute(id: number): Promise<Result<boolean>> {
    return await this.translationRepository.delete(id);
  }
}
