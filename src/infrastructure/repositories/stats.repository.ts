import { IStatsRepository } from '@/application/ports';
import { DashboardStatsEntity } from '@/core/entities';
import { ServerError } from '@/core/errors';
import { ApiSuccessResponse, failure, Result, success } from '@/core/types';
import { HttpClient } from '@/infrastructure/http';
import { StatsApiResponse } from '@/infrastructure/models';
import { StatsMapper } from '@/infrastructure/mappers/stats.mapper';

export class StatsRepository implements IStatsRepository {
  constructor(private readonly httpClient: HttpClient) {}

  // GET /dashboard/stats
  async getDashboardStats(): Promise<Result<DashboardStatsEntity>> {
    const result =
      await this.httpClient.get<ApiSuccessResponse<StatsApiResponse>>(
        '/dashboard/stats'
      );

    if (!result.success) {
      return failure(result.error);
    }

    const apiResponse = result.data.data.data as unknown as StatsApiResponse;

    if (apiResponse) {
      return success(StatsMapper.toDomain(apiResponse));
    }

    return failure(new ServerError('Unexpected response format'));
  }
}
