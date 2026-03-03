import { IVerseMediaRepository } from '../../ports';
import { ListVerseMediaDTO } from '../../dto';
import { VerseMediaEntityList } from '@/core/entities';
import { Result } from '@/core/types';

export class ListVerseMediaUseCase {
  constructor(private readonly repository: IVerseMediaRepository) {}

  async execute(dto: ListVerseMediaDTO): Promise<Result<VerseMediaEntityList>> {
    return this.repository.getAll(dto);
  }
}
