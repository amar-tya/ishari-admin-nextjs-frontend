import { IVerseMediaRepository } from '../../ports';
import { CreateVerseMediaDTO } from '../../dto';
import { VerseMediaEntity } from '@/core/entities';
import { Result } from '@/core/types';

export class UploadVerseMediaUseCase {
  constructor(private readonly repository: IVerseMediaRepository) {}

  async execute(dto: CreateVerseMediaDTO): Promise<Result<VerseMediaEntity>> {
    return this.repository.upload(dto);
  }
}
