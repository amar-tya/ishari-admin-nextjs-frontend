import { IVerseRepositoryPort } from '@/application/ports/repository/verse.repository.port';
import { VerseCreateRequest } from '@/application/dto/verse.dto';
import { Result } from '@/core/types';
import { VerseEntity } from '@/core/entities';

export class CreateVerseUseCase {
  private readonly verseRepositoryPort: IVerseRepositoryPort;

  constructor(verseRepositoryPort: IVerseRepositoryPort) {
    this.verseRepositoryPort = verseRepositoryPort;
  }

  async execute(request: VerseCreateRequest): Promise<Result<VerseEntity>> {
    return this.verseRepositoryPort.create(request);
  }
}
