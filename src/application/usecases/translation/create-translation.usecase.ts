import { TranslationCreateRequest } from '@/application/dto/translation.dto';
import { ITranslationRepository } from '@/application/ports/repository/translation.repository.port';
import { TranslationEntity } from '@/core/entities';
import { Result } from '@/core/types';

export class CreateTranslationUseCase {
  private readonly translationRepository: ITranslationRepository;

  constructor(translationRepository: ITranslationRepository) {
    this.translationRepository = translationRepository;
  }

  async execute(
    request: TranslationCreateRequest
  ): Promise<Result<TranslationEntity>> {
    return await this.translationRepository.create(request);
  }
}
