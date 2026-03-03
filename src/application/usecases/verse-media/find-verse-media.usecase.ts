import { IVerseMediaRepository } from '../../ports';
import { VerseMediaEntity } from '@/core/entities';
import { Result } from '@/core/types';

export class FindVerseMediaUseCase {
  constructor(private readonly repository: IVerseMediaRepository) {}

  async execute(id: number): Promise<Result<VerseMediaEntity>> {
    return this.repository.getById(id);
  }
}
