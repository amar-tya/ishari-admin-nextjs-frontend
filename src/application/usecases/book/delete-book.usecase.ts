import { Result } from "@/core/types";
import { IBookRepository } from "@/application/ports";

/**
 * DeleteBookUseCase - Handle delete book business logic
 *
 * Mengikuti Clean Architecture:
 * - Depend on abstractions (ports), not implementations
 * - Single responsibility: hanya handle delete book flow
 * - Testable: dependencies bisa di-mock
 */
export class DeleteBookUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  /**
   * Execute delete book
   * @param id - Book ID to delete
   * @returns Result jika success
   */
  async execute(id: number): Promise<Result<void>> {
    return this.bookRepository.delete(id);
  }
}
