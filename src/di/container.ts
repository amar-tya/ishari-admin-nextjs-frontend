import {
  CreateBookUseCase,
  DeleteBookUseCase,
  GetAllBooksUseCase,
  LoginUseCase,
  UpdateBookUseCase,
} from "@/application/usecases";
import { IBookRepository } from "@/application/ports";
import { AuthRepository } from "@/infrastructure/repositories";
import { AuthService } from "@/infrastructure/services";
import { createHttpClient } from "@/infrastructure/http";
import { BookRepository } from "@/infrastructure/repositories/book.repository";

/**
 * Dependency Injection Container
 *
 * Factory untuk membuat instances dengan dependencies yang di-inject.
 * Centralized wiring untuk seluruh aplikasi.
 */

// Infrastructure
// Use /api/proxy as baseURL so all requests go through the proxy route
// which handles bearer token injection from HttpOnly cookies
const httpClient = createHttpClient({
  baseURL: "/api/proxy",
});

// Services
const authService = new AuthService();

// Repositories
const authRepository = new AuthRepository(httpClient);
const bookRepository: IBookRepository = new BookRepository(httpClient);

// Use Cases - Auth
const loginUseCase = new LoginUseCase(authRepository, authService);

// Use Cases - Book
const createBookUseCase = new CreateBookUseCase(bookRepository);
const updateBookUseCase = new UpdateBookUseCase(bookRepository);
const deleteBookUseCase = new DeleteBookUseCase(bookRepository);
// const getBookByIdUseCase = new GetBookByIdUseCase(bookRepository);
const getAllBooksUseCase = new GetAllBooksUseCase(bookRepository);

/**
 * Container exports
 */
export const container = {
  // Use Cases - Auth
  loginUseCase,

  // Use Cases - Book
  createBookUseCase,
  updateBookUseCase,
  deleteBookUseCase,
  // getBookByIdUseCase,
  getAllBooksUseCase,

  // Services
  authService,

  // Repositories
  authRepository,
  bookRepository,
} as const;

export type Container = typeof container;
