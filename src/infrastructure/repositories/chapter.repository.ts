import { ChapterRequest } from '@/application/dto/chapter.dto';
import { IChapterRepository } from '@/application/ports/repository/chapter.repository.port';
import { ApiSuccessResponse, failure, Result, success } from '@/core/types';
import { HttpClient } from '@/infrastructure/http';
import { ListChapterApiResponse } from '../models';
import { ChapterEntity } from '@/core/entities';
import { PaginationResponse } from '@/application/dto/pagination.dto';
import { ChapterMapper } from '@/infrastructure/mappers';

export class ChapterRepository implements IChapterRepository {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async findChapter(
    criteria: ChapterRequest
  ): Promise<Result<{ data: ChapterEntity[]; meta: PaginationResponse }>> {
    const queryParams = new URLSearchParams();
    Object.entries(criteria).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    const result = await this.httpClient.get<ListChapterApiResponse>(`/chapters?${queryParams.toString()}`);

    if (!result.success) {
      return failure(result.error);
    }

    // mapper data respont to domain
    const resultData = ChapterMapper.toResponse(result.data.data)
    return success({
      data: resultData.data,
      meta: resultData.meta,
    });
  }
}
