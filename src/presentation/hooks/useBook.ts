"use client";

import { CreateBookDTO, ListBookDTO, UpdateBookDTO } from "@/application";
import { BookEntity, BookEntityList } from "@/core/entities";
import { Result } from "@/core/types";
import { container } from "@/di";
import { useCallback } from "react";

export interface UseBook {
  createBook: (dto: CreateBookDTO) => Promise<Result<BookEntity>>;
  updateBook: (id: number, dto: UpdateBookDTO) => Promise<Result<BookEntity>>;
  listBook: (dto: ListBookDTO) => Promise<Result<BookEntityList>>;
  deleteBook: (id: number) => Promise<Result<void>>;
}

export function useBook(): UseBook {
  const {
    createBookUseCase,
    updateBookUseCase,
    getAllBooksUseCase,
    deleteBookUseCase,
  } = container;

  const createBook = useCallback(
    async (dto: CreateBookDTO): Promise<Result<BookEntity>> => {
      return createBookUseCase.execute(dto);
    },
    [createBookUseCase],
  );

  const updateBook = useCallback(
    async (id: number, dto: UpdateBookDTO): Promise<Result<BookEntity>> => {
      return updateBookUseCase.execute(id, dto);
    },
    [updateBookUseCase],
  );

  const listBook = useCallback(
    async (dto: ListBookDTO): Promise<Result<BookEntityList>> => {
      return getAllBooksUseCase.execute(dto);
    },
    [getAllBooksUseCase],
  );

  const deleteBook = useCallback(
    async (id: number): Promise<Result<void>> => {
      return deleteBookUseCase.execute(id);
    },
    [deleteBookUseCase],
  );

  return {
    createBook,
    updateBook,
    listBook,
    deleteBook,
  };
}
