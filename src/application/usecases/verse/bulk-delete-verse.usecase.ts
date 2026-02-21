import { IVerseRepositoryPort } from '@/application/ports/repository/verse.repository.port';
import { Result } from '@/core/types';

export class DeleteBulkVerseUseCase {
  private readonly verseRepositoryPort: IVerseRepositoryPort;

  constructor(verseRepositoryPort: IVerseRepositoryPort) {
    this.verseRepositoryPort = verseRepositoryPort;
  }

  async execute(ids: number[]): Promise<Result<boolean>> {
    return this.verseRepositoryPort.bulkDelete(ids);
  }
}
