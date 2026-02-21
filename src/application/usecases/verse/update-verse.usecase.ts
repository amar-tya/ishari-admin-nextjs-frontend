import { IVerseRepositoryPort } from '@/application/ports/repository/verse.repository.port';
import { VerseUpdateRequest } from '@/application/dto/verse.dto';
import { Result } from '@/core/types';
import { VerseEntity } from '@/core/entities';

export class UpdateVerseUseCase {
  private readonly verseRepositoryPort: IVerseRepositoryPort;

  constructor(verseRepositoryPort: IVerseRepositoryPort) {
    this.verseRepositoryPort = verseRepositoryPort;
  }

  async execute(request: VerseUpdateRequest): Promise<Result<VerseEntity>> {
    return this.verseRepositoryPort.update(request);
  }
}
