'use client';

import { useCallback, useState } from 'react';
import { useChapter } from '@/presentation/hooks/useChapter';
import {
  ChapterCreateRequest,
  ChapterRequest,
  ChapterResponse,
  ChapterUpdateRequest,
} from '@/application/dto';
import { ChapterViewModel } from './ChapterViewModel.types';
import { getErrorMessage } from '@/shared/utils';

export type {
  ChapterViewModel,
  ChapterViewModelState,
  ChapterViewModelActions,
} from './ChapterViewModel.types';

export function useChapterViewModel(): ChapterViewModel {
  const {
    findChapter: findChapterHook,
    createChapter: createChapterHook,
    updateChapter: updateChapterHook,
  } = useChapter();

  // state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chapterList, setChapterList] = useState<ChapterResponse | null>(null);
  const [criteria, setCriteria] = useState<ChapterRequest>({
    page: 1,
    limit: 10,
    bookId: 0,
    search: '',
    category: '',
    chapterId: 0,
  });

  // Action
  const findChapter = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await findChapterHook(criteria);
      if (result.success) {
        setChapterList(result.data);
      } else {
        setError(getErrorMessage(result.error));
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [findChapterHook, criteria]);

  const createChapter = useCallback(
    async (criteria: ChapterCreateRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await createChapterHook(criteria);
        if (result.success) {
          await findChapter();
          return true;
        } else {
          setError(getErrorMessage(result.error));
          return false;
        }
      } catch (err) {
        setError(getErrorMessage(err));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [createChapterHook, findChapter]
  );

  const updateChapter = useCallback(
    async (criteria: ChapterUpdateRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await updateChapterHook(criteria);
        if (result.success) {
          await findChapter();
          return true;
        } else {
          setError(getErrorMessage(result.error));
          return false;
        }
      } catch (err) {
        setError(getErrorMessage(err));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [updateChapterHook, findChapter]
  );

  return {
    isLoading,
    error,
    chapterList,
    findChapter,
    setCriteria,
    createChapter,
    updateChapter,
  };
}
