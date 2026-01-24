import { failure, Result } from "@/core/types";
import { BookEntity } from "@/core/entities";
import { IBookRepository } from "@/application/ports";
import { UpdateBookDTO } from "@/application/dto";
import { ValidationError } from "@/core/errors";

/**
 * UpdateBookUseCase - Handle update book business logic
 *
 * Mengikuti Clean Architecture:
 * - Depend on abstractions (ports), not implementations
 * - Single responsibility: hanya handle update book flow
 * - Testable: dependencies bisa di-mock
 */
export class UpdateBookUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  /**
   * Execute update book
   * @param id - Book ID to update
   * @param dto - UpdateBookDTO dengan data yang ingin diupdate
   * @returns Result dengan BookEntity jika success
   */
  async execute(id: number, dto: UpdateBookDTO): Promise<Result<BookEntity>> {
    // Validasi: minimal ada satu field yang diupdate
    if (Object.keys(dto).length === 0) {
      return failure(new ValidationError("Tidak ada data yang diupdate"));
    }

    return this.bookRepository.update(id, dto);
  }
}
