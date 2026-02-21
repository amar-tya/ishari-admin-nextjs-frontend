import { IVerseRepositoryPort } from '@/application/ports/repository/verse.repository.port';
import { Result } from '@/core/types';

export class DeleteVerseUseCase {
  private readonly verseRepositoryPort: IVerseRepositoryPort;

  constructor(verseRepositoryPort: IVerseRepositoryPort) {
    this.verseRepositoryPort = verseRepositoryPort;
  }

  async execute(id: number): Promise<Result<boolean>> {
    return this.verseRepositoryPort.delete(id);
  }
}
