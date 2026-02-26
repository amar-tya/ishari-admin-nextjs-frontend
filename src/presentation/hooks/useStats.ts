import { container } from '@/di/container';
import { useCallback } from 'react';

export const useStats = () => {
  const getDashboardStats = useCallback(async () => {
    return await container.getDashboardStatsUseCase.execute();
  }, []);

  return {
    getDashboardStats,
  };
};
