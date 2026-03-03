import { IVerseMediaRepository } from '../../ports';
import { Result } from '@/core/types';

export class DeleteVerseMediaUseCase {
  constructor(private readonly repository: IVerseMediaRepository) {}

  async execute(id: number, storagePath: string): Promise<Result<void>> {
    return this.repository.delete(id, storagePath);
  }
}
