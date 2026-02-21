import {
  TranslationRequest,
  TranslationResponse,
} from '@/application/dto/translation.dto';
import { ITranslationRepository } from '@/application/ports/repository/translation.repository.port';
import { mapResult, Result } from '@/core/types';

export class FindTranslationUseCase {
  private readonly translationRepository: ITranslationRepository;

  constructor(translationRepository: ITranslationRepository) {
    this.translationRepository = translationRepository;
  }

  async execute(
    criteria: TranslationRequest
  ): Promise<Result<TranslationResponse>> {
    const result = await this.translationRepository.find(criteria);

    return mapResult(result, (res) => ({
      data: res.data,
      meta: res.meta,
    }));
  }
}
