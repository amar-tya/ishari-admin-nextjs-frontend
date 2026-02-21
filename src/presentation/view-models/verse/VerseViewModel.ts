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
  const {
    findVerse: findVerseHook,
    createVerse: createVerseHook,
    updateVerse: updateVerseHook,
    deleteVerse: deleteVerseHook,
    bulkDeleteVerse: bulkDeleteVerseHook,
  } = useVerse();

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
    transliteration: '',
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

  const createVerse = useCallback(
    async (data: VerseCreateRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await createVerseHook(data);
        if (result.success) {
          await findVerse();
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
    [createVerseHook, findVerse]
  );

  const updateVerse = useCallback(
    async (data: VerseUpdateRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await updateVerseHook(data);
        if (result.success) {
          await findVerse();
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
    [updateVerseHook, findVerse]
  );

  const deleteVerse = useCallback(
    async (id: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await deleteVerseHook(id);
        if (result.success) {
          await findVerse();
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
    [deleteVerseHook, findVerse]
  );

  const bulkDeleteVerse = useCallback(
    async (ids: number[]) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await bulkDeleteVerseHook(ids);
        if (result.success) {
          await findVerse();
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
    [bulkDeleteVerseHook, findVerse]
  );

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
