'use client';

import {
  ChapterCreateRequest,
  ChapterRequest,
  ChapterResponse,
  ChapterUpdateRequest,
} from '@/application/dto';
import { ChapterEntity } from '@/core/entities';
import { mapResult, Result } from '@/core/types';
import { container } from '@/di';
import { useCallback } from 'react';

export interface UseChapter {
  findChapter: (criteria: ChapterRequest) => Promise<Result<ChapterResponse>>;
  createChapter: (
    criteria: ChapterCreateRequest
  ) => Promise<Result<ChapterEntity>>;
  updateChapter: (
    criteria: ChapterUpdateRequest
  ) => Promise<Result<ChapterEntity>>;
  deleteChapter: (id: number) => Promise<Result<boolean>>;
  bulkDeleteChapter: (ids: number[]) => Promise<Result<boolean>>;
}

export function useChapter(): UseChapter {
  const {
    findChapterUseCase,
    createChapterUseCase,
    updateChapterUseCase,
    deleteChapterUseCase,
    bulkDeleteChapterUseCase,
  } = container;

  const findChapter = useCallback(
    async (criteria: ChapterRequest): Promise<Result<ChapterResponse>> => {
      const result = await findChapterUseCase.execute(criteria);

      return mapResult(result, (res) => ({
        data: res.data,
        meta: res.meta,
      }));
    },
    [findChapterUseCase]
  );

  const createChapter = useCallback(
    async (criteria: ChapterCreateRequest): Promise<Result<ChapterEntity>> => {
      const result = await createChapterUseCase.execute(criteria);

      return result;
    },
    [createChapterUseCase]
  );

  const updateChapter = useCallback(
    async (criteria: ChapterUpdateRequest): Promise<Result<ChapterEntity>> => {
      const result = await updateChapterUseCase.execute(criteria);

      return result;
    },
    [updateChapterUseCase]
  );

  const deleteChapter = useCallback(
    async (id: number): Promise<Result<boolean>> => {
      const result = await deleteChapterUseCase.execute(id);

      return result;
    },
    [deleteChapterUseCase]
  );

  const bulkDeleteChapter = useCallback(
    async (ids: number[]): Promise<Result<boolean>> => {
      const result = await bulkDeleteChapterUseCase.execute(ids);

      return result;
    },
    [bulkDeleteChapterUseCase]
  );

  return {
    findChapter,
    createChapter,
    updateChapter,
    deleteChapter,
    bulkDeleteChapter,
  };
}
