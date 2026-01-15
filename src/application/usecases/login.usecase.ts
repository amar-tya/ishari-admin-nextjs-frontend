import { Result, success, failure } from "@/core/types";
import { AuthResponse, LoginCredentials } from "@/core/entities";
import { IAuthRepository, IAuthService } from "@/application/ports";
import { ValidationError } from "@/core/errors";

/**
 * LoginUseCase - Handle login business logic
 *
 * Mengikuti Clean Architecture:
 * - Depend on abstractions (ports), not implementations
 * - Single responsibility: hanya handle login flow
 * - Testable: dependencies bisa di-mock
 */
export class LoginUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly authService: IAuthService
  ) {}

  /**
   * Execute login
   * @param credentials - username dan password
   * @returns Result dengan AuthResponse jika success
   */
  async execute(credentials: LoginCredentials): Promise<Result<AuthResponse>> {
    // Validasi input
    if (!credentials.username_or_email?.trim()) {
      return failure(new ValidationError("Username atau email harus diisi"));
    }

    if (!credentials.password) {
      return failure(new ValidationError("Password harus diisi"));
    }

    // Panggil repository untuk login ke API
    const result = await this.authRepository.login(credentials);

    if (!result.success) {
      return result;
    }

    // Simpan tokens menggunakan auth service
    this.authService.storeTokens(result.data);

    return success(result.data);
  }
}
