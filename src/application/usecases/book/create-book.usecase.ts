import { failure, Result } from "@/core/types";
import { BookEntity } from "@/core/entities";
import { IBookRepository } from "@/application/ports";
import { CreateBookDTO } from "@/application/dto";
import { ValidationError } from "@/core/errors";

/**
 * CreateBookUseCase - Handle create book business logic
 *
 * Mengikuti Clean Architecture:
 * - Depend on abstractions (ports), not implementations
 * - Single responsibility: hanya handle create book flow
 * - Testable: dependencies bisa di-mock
 */
export class CreateBookUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  /**
   * Execute create book
   * @param dto - CreateBookDTO dari user input
   * @returns Result dengan BookEntity jika success
   */
  async execute(dto: CreateBookDTO): Promise<Result<BookEntity>> {
    // Validasi input
    if (!dto.title?.trim()) {
      return failure(new ValidationError("Judul buku tidak boleh kosong"));
    }

    return await this.bookRepository.create(dto);
  }
}
