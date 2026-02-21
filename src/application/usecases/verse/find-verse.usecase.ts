import { VerseRequest, VerseResponse } from '@/application/dto/verse.dto';
import { IVerseRepositoryPort } from '@/application/ports/repository/verse.repository.port';
import { mapResult, Result } from '@/core/types';

export class FindVerseUseCase {
  private readonly verseRepositoryPort: IVerseRepositoryPort;
  constructor(verseRepositoryPort: IVerseRepositoryPort) {
    this.verseRepositoryPort = verseRepositoryPort;
  }

  async execute(criteria: VerseRequest): Promise<Result<VerseResponse>> {
    const result = await this.verseRepositoryPort.find(criteria);

    return mapResult(result, (res) => ({
      data: res.data,
      meta: res.meta,
    }));
  }
}
