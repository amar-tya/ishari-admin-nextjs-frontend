import { PaginationResponse } from '@/application/dto';
import { VerseRequest } from '@/application/dto/verse.dto';
import { VerseEntity } from '@/core/entities';
import { Result } from '@/core/types';

export interface IVerseRepositoryPort {
  // create(): Promise<void>;
  // update(): Promise<void>;
  // delete(): Promise<void>;
  // bulkDelete(): Promise<void>;
  find(
    criteria: VerseRequest
  ): Promise<Result<{ data: VerseEntity[]; meta: PaginationResponse }>>;
}
