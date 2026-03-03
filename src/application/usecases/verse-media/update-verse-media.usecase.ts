import { IVerseMediaRepository } from '../../ports';
import { UpdateVerseMediaDTO } from '../../dto';
import { VerseMediaEntity } from '@/core/entities';
import { Result } from '@/core/types';

export class UpdateVerseMediaUseCase {
  constructor(private readonly repository: IVerseMediaRepository) {}

  async execute(
    id: number,
    dto: UpdateVerseMediaDTO
  ): Promise<Result<VerseMediaEntity>> {
    return this.repository.update(id, dto);
  }
}
