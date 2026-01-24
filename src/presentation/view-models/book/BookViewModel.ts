"use client";

import { useState, useCallback } from "react";
import { BookEntityList } from "@/core/entities";
import { useBook } from "@/presentation/hooks";
import { getErrorMessage } from "@/shared/utils";
import type { BookViewModel } from "./BookViewModel.types";
import { CreateBookDTO, UpdateBookDTO } from "@/application";

// Re-export types
export type {
  BookViewModel,
  BookViewModelState,
  BookViewModelActions,
} from "./BookViewModel.types";

/**
 * useBookViewModel
 *
 * Presenter/ViewModel untuk Book List Screen.
 * Menggunakan useBook hook untuk fetch data.
 */
export function useBookViewModel(): BookViewModel {
  const {
    createBook,
    updateBook: updateBookHook,
    listBook,
    deleteBook,
  } = useBook();

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookList, setBookList] = useState<BookEntityList | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Actions
  const getBookList = useCallback(
    async (pageParam?: number, searchParam?: string) => {
      setIsLoading(true);
      setError(null);

      const currentPage = pageParam ?? page;
      const currentSearch = searchParam ?? search;

      try {
        const result = await listBook({
          page: currentPage,
          search: currentSearch || undefined,
        });

        if (result.success) {
          setBookList(result.data);
        } else {
          setError(getErrorMessage(result.error));
        }
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    },
    [listBook],
  );

  const storeBook = useCallback(
    async (dto: CreateBookDTO) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await createBook(dto);
        if (result.success) {
          await getBookList();
          return true;
        } else {
          setError(getErrorMessage(result.error));
          return false;
        }
      } catch (error) {
        setError(getErrorMessage(error));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [createBook, getBookList],
  );

  const updateBook = useCallback(
    async (id: number, dto: UpdateBookDTO) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await updateBookHook(id, dto);
        if (result.success) {
          await getBookList();
          return true;
        } else {
          setError(getErrorMessage(result.error));
          return false;
        }
      } catch (error) {
        setError(getErrorMessage(error));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [updateBookHook, getBookList],
  );

  const removeBook = useCallback(
    async (id: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await deleteBook(id);
        if (result.success) {
          await getBookList();
          return true;
        } else {
          setError(getErrorMessage(result.error));
          return false;
        }
      } catch (error) {
        setError(getErrorMessage(error));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [deleteBook, getBookList],
  );

  return {
    isLoading,
    error,
    bookList,
    getBookList,
    setPage,
    setSearch,
    storeBook,
    updateBook,
    removeBook,
  };
}
