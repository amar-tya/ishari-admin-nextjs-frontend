import { DashboardStatsEntity } from '@/core/entities';
import { StatsApiResponse } from '../models/stats.model';

export class StatsMapper {
  static toDomain(apiData: StatsApiResponse): DashboardStatsEntity {
    return {
      totalUsers: apiData.total_users,
      totalHadis: apiData.total_hadis,
      totalChapter: apiData.total_chapters,
      totalVerses: apiData.total_verses,
      totalVerseMedia: apiData.total_verse_media,
      calculatedAt: apiData.calculated_at,
    };
  }
}
