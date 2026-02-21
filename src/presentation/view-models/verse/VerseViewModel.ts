import {
  VerseRequest,
  VerseResponse,
  VerseCreateRequest,
  VerseUpdateRequest,
} from '@/application/dto';
import { useVerse } from '@/presentation/hooks';
import { useCallback, useState } from 'react';
import {
  VerseViewModel,
  VerseViewModelActions,
  VerseViewModelState,
} from './VerseViewModel.types';
import { getErrorMessage } from '@/shared/utils';

export type { VerseViewModel, VerseViewModelActions, VerseViewModelState };

export function useVerseViewModel(): VerseViewModel {
  const { findVerse: findVerseHook } = useVerse();

  // state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verseList, setVerseList] = useState<VerseResponse | null>(null);
  const [criteria, setCriteria] = useState<VerseRequest>({
    page: 1,
    limit: 10,
    search: '',
    chapterId: 0,
    arabicText: '',
    transliterationText: '',
  });

  // Action
  const findVerse = useCallback(
    async (newCriteria?: Partial<VerseRequest>) => {
      setIsLoading(true);
      setError(null);

      let criteriaToUse = criteria;

      if (newCriteria) {
        criteriaToUse = { ...criteria, ...newCriteria };
        setCriteria(criteriaToUse);
      }

      try {
        const result = await findVerseHook(criteriaToUse);
        if (result.success) {
          setVerseList(result.data);
        } else {
          setError(getErrorMessage(result.error));
        }
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    },
    [findVerseHook, criteria]
  );

  const createVerse = useCallback(async (data: VerseCreateRequest) => {
    console.log('Create Verse', data);
    return true;
  }, []);

  const updateVerse = useCallback(async (data: VerseUpdateRequest) => {
    console.log('Update Verse', data);
    return true;
  }, []);

  const deleteVerse = useCallback(async (id: number) => {
    console.log('Delete Verse', id);
    return true;
  }, []);

  const bulkDeleteVerse = useCallback(async (ids: number[]) => {
    console.log('Bulk Delete Verses', ids);
    return true;
  }, []);

  return {
    isLoading,
    error,
    verseList,
    findVerse,
    setCriteria,
    createVerse,
    updateVerse,
    deleteVerse,
    bulkDeleteVerse,
  };
}
