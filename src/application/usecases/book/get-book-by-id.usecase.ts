import { Result } from "@/core/types";
import { BookEntity } from "@/core/entities";
import { IBookRepository } from "@/application/ports";

/**
 * GetBookByIdUseCase - Handle get book by ID business logic
 *
 * Mengikuti Clean Architecture:
 * - Depend on abstractions (ports), not implementations
 * - Single responsibility: hanya handle get single book flow
 * - Testable: dependencies bisa di-mock
 */
export class GetBookByIdUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  /**
   * Execute get book by ID
   * @param id - Book ID to retrieve
   * @returns Result dengan BookEntity jika success
   */
  async execute(id: number): Promise<Result<BookEntity>> {
    return this.bookRepository.getById(id);
  }
}
