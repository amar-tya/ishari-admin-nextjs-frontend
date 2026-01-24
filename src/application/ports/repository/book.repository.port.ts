import { BookEntity, BookEntityList } from "@/core/entities/book.entity";
import { Result } from "@/core/types";
import { CreateBookDTO, ListBookDTO, UpdateBookDTO } from "@/application/dto";

export interface IBookRepository {
  create(dto: CreateBookDTO): Promise<Result<BookEntity>>;
  update(id: number, dto: UpdateBookDTO): Promise<Result<BookEntity>>;
  delete(id: number): Promise<Result<void>>;
  getById(id: number): Promise<Result<BookEntity>>;
  getAll(dto: ListBookDTO): Promise<Result<BookEntityList>>;
}
