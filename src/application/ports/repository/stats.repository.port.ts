import { DashboardStatsEntity } from '@/core/entities';
import { Result } from '@/core/types';

export interface IStatsRepository {
  getDashboardStats(): Promise<Result<DashboardStatsEntity>>;
}
