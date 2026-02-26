import { IStatsRepository } from '../../ports';
import { DashboardStatsEntity } from '@/core/entities';
import { Result } from '@/core/types';

export class GetDashboardStatsUseCase {
  constructor(private readonly repository: IStatsRepository) {}

  async execute(): Promise<Result<DashboardStatsEntity>> {
    return this.repository.getDashboardStats();
  }
}
