import { PaginationResponse } from '@/application/dto';
import {
  VerseCreateRequest,
  VerseRequest,
  VerseUpdateRequest,
} from '@/application/dto/verse.dto';
import { VerseEntity } from '@/core/entities';
import { Result } from '@/core/types';

export interface IVerseRepositoryPort {
  create(request: VerseCreateRequest): Promise<Result<VerseEntity>>;
  update(request: VerseUpdateRequest): Promise<Result<VerseEntity>>;
  delete(id: number): Promise<Result<boolean>>;
  bulkDelete(ids: number[]): Promise<Result<boolean>>;
  find(
    criteria: VerseRequest
  ): Promise<Result<{ data: VerseEntity[]; meta: PaginationResponse }>>;
}
