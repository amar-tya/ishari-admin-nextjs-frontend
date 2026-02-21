import { IVerseRepositoryPort } from '@/application/ports';
import { ApiSuccessResponse, failure, Result, success } from '@/core/types';
import {
  CreateVerseApiResponse,
  ListVerseApiResponse,
  UpdateVerseApiResponse,
} from '../models';
import {
  VerseCreateRequest,
  VerseUpdateRequest,
  VerseRequest,
} from '@/application/dto/verse.dto';
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

  async create(request: VerseCreateRequest): Promise<Result<VerseEntity>> {
    const apiRequest = VerseMapper.toCreateRequest(request);
    const result = await this.httpClient.post<
      ApiSuccessResponse<CreateVerseApiResponse>
    >(`/verses`, apiRequest);

    if (!result.success) {
      return failure(result.error);
    }

    const resultData = VerseMapper.toDomain(result.data.data.data);
    return success(resultData);
  }

  async update(request: VerseUpdateRequest): Promise<Result<VerseEntity>> {
    const apiRequest = VerseMapper.toUpdateRequest(request);
    const result = await this.httpClient.put<
      ApiSuccessResponse<UpdateVerseApiResponse>
    >(`/verses/${request.verseId}`, apiRequest);

    if (!result.success) {
      return failure(result.error);
    }

    const resultData = VerseMapper.toDomain(result.data.data.data);
    return success(resultData);
  }

  async delete(id: number): Promise<Result<boolean>> {
    const result = await this.httpClient.delete<ApiSuccessResponse<void>>(
      `/verses/${id}`
    );

    if (!result.success) {
      return failure(result.error);
    }

    return success(true);
  }

  async bulkDelete(ids: number[]): Promise<Result<boolean>> {
    const result = await this.httpClient.post<ApiSuccessResponse<void>>(
      `/verses/bulk-delete`,
      { ids }
    );

    if (!result.success) {
      return failure(result.error);
    }

    return success(true);
  }
}
