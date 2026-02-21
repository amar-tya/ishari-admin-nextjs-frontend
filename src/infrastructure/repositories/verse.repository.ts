import { IVerseRepositoryPort } from '@/application/ports';
import { failure, Result, success } from '@/core/types';
import { ListVerseApiResponse } from '../models';
import { VerseRequest } from '@/application/dto/verse.dto';
import { HttpClient } from '@/infrastructure/http';
import { VerseEntity } from '@/core/entities';
import { PaginationResponse } from '@/application';
import { VerseMapper } from '@/infrastructure/mappers';

export class VerseRepository implements IVerseRepositoryPort {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async find(
    criteria: VerseRequest
  ): Promise<Result<{ data: VerseEntity[]; meta: PaginationResponse }>> {
    const queryParams = new URLSearchParams();
    Object.entries(criteria).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    const response = await this.httpClient.get<ListVerseApiResponse>(
      `/verses?${queryParams.toString()}`
    );

    if (!response.success) {
      return failure(response.error);
    }

    // mapper data response to domain
    const resultData = VerseMapper.toResponse(response.data.data);

    return success(resultData);
  }
}
