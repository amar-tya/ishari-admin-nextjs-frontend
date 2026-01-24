import { Result } from "@/core/types";
import { BookEntityList } from "@/core/entities";
import { IBookRepository } from "@/application/ports";
import { ListBookDTO } from "@/application/dto";

/**
 * GetAllBooksUseCase - Handle get all books business logic
 *
 * Mengikuti Clean Architecture:
 * - Depend on abstractions (ports), not implementations
 * - Single responsibility: hanya handle get all books flow
 * - Testable: dependencies bisa di-mock
 */
export class GetAllBooksUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  /**
   * Execute get all books
   * @returns Result dengan array of BookEntity jika success
   */
  async execute(dto: ListBookDTO): Promise<Result<BookEntityList>> {
    const result = await this.bookRepository.getAll(dto);

    // Sort by ID ascending
    if (result.success && result.data.data) {
      result.data.data.sort((a, b) => a.id - b.id);
    }

    return result;
  }
}
