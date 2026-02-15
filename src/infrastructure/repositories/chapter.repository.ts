import {
  ChapterCreateRequest,
  ChapterRequest,
  ChapterUpdateRequest,
} from '@/application/dto/chapter.dto';
import { IChapterRepository } from '@/application/ports/repository/chapter.repository.port';
import { ApiSuccessResponse, failure, Result, success } from '@/core/types';
import { HttpClient } from '@/infrastructure/http';
import {
  ChapterCreateApiResponse,
  ChapterUpdateApiResponse,
  ListChapterApiResponse,
} from '@/infrastructure/models';
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

    const result = await this.httpClient.get<ListChapterApiResponse>(
      `/chapters?${queryParams.toString()}`
    );

    if (!result.success) {
      return failure(result.error);
    }

    // mapper data respont to domain
    const resultData = ChapterMapper.toResponse(result.data.data);
    return success({
      data: resultData.data,
      meta: resultData.meta,
    });
  }

  async create(request: ChapterCreateRequest): Promise<Result<ChapterEntity>> {
    // mapper request to api
    const apiRequest = ChapterMapper.toCreateRequest(request);
    const result = await this.httpClient.post<
      ApiSuccessResponse<ChapterCreateApiResponse>
    >(`/chapters`, apiRequest);

    if (!result.success) {
      return failure(result.error);
    }

    // mapper data respont to domain
    const resultData = ChapterMapper.toDomain2(result.data.data.data);
    return success(resultData);
  }

  async update(request: ChapterUpdateRequest): Promise<Result<ChapterEntity>> {
    // mapper request to api
    const apiRequest = ChapterMapper.toUpdateRequest(request);
    const result = await this.httpClient.put<
      ApiSuccessResponse<ChapterUpdateApiResponse>
    >(`/chapters/${request.chapterId}`, apiRequest);

    if (!result.success) {
      return failure(result.error);
    }

    // mapper data respont to domain
    const resultData = ChapterMapper.toDomain2(result.data.data.data);
    return success(resultData);
  }
}
