import {
  VerseCreateRequest,
  VerseRequest,
  VerseResponse,
  VerseUpdateRequest,
} from '@/application/dto/verse.dto';
import { VerseEntity } from '@/core/entities';
import { mapResult, Result } from '@/core/types';
import { container } from '@/di';
import { useCallback } from 'react';

export interface UseVerse {
  findVerse: (criteria: VerseRequest) => Promise<Result<VerseResponse>>;
  createVerse: (request: VerseCreateRequest) => Promise<Result<VerseEntity>>;
  updateVerse: (request: VerseUpdateRequest) => Promise<Result<VerseEntity>>;
  deleteVerse: (id: number) => Promise<Result<boolean>>;
  bulkDeleteVerse: (ids: number[]) => Promise<Result<boolean>>;
}

export function useVerse(): UseVerse {
  const {
    findVerseUseCase,
    createVerseUseCase,
    updateVerseUseCase,
    deleteVerseUseCase,
    deleteBulkVerseUseCase,
  } = container;

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

  const createVerse = useCallback(
    async (request: VerseCreateRequest): Promise<Result<VerseEntity>> => {
      const result = await createVerseUseCase.execute(request);
      return result;
    },
    [createVerseUseCase]
  );

  const updateVerse = useCallback(
    async (request: VerseUpdateRequest): Promise<Result<VerseEntity>> => {
      const result = await updateVerseUseCase.execute(request);
      return result;
    },
    [updateVerseUseCase]
  );

  const deleteVerse = useCallback(
    async (id: number): Promise<Result<boolean>> => {
      const result = await deleteVerseUseCase.execute(id);
      return result;
    },
    [deleteVerseUseCase]
  );

  const bulkDeleteVerse = useCallback(
    async (ids: number[]): Promise<Result<boolean>> => {
      const result = await deleteBulkVerseUseCase.execute(ids);
      return result;
    },
    [deleteBulkVerseUseCase]
  );

  return {
    findVerse,
    createVerse,
    updateVerse,
    deleteVerse,
    bulkDeleteVerse,
  };
}
