import { LoginUseCase } from "@/application/usecases";
import { AuthRepository } from "@/infrastructure/repositories";
import { AuthService } from "@/infrastructure/services";
import { createHttpClient } from "@/infrastructure/http";

/**
 * Dependency Injection Container
 *
 * Factory untuk membuat instances dengan dependencies yang di-inject.
 * Centralized wiring untuk seluruh aplikasi.
 */

// Infrastructure
const httpClient = createHttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
});

// Services
const authService = new AuthService();

// Repositories
const authRepository = new AuthRepository(httpClient);

// Use Cases
const loginUseCase = new LoginUseCase(authRepository, authService);

/**
 * Container exports
 */
export const container = {
  // Use Cases
  loginUseCase,

  // Services
  authService,

  // Repositories
  authRepository,
} as const;

export type Container = typeof container;
