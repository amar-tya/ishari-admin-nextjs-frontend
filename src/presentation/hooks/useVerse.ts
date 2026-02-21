import { VerseRequest, VerseResponse } from '@/application/dto/verse.dto';
import { mapResult, Result } from '@/core/types';
import { container } from '@/di';
import { useCallback } from 'react';

export interface UseVerse {
  findVerse: (criteria: VerseRequest) => Promise<Result<VerseResponse>>;
}

export function useVerse(): UseVerse {
  const { findVerseUseCase } = container;

  const findVerse = useCallback(
    async (criteria: VerseRequest): Promise<Result<VerseResponse>> => {
      const result = await findVerseUseCase.execute(criteria);

      return mapResult(result, (res) => ({
        data: res.data,
        meta: res.meta,
      }));
    },
    [findVerseUseCase]
  );

  return {
    findVerse,
  };
}
