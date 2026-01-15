import { Result } from "@/core/types";
import { AuthResponse, LoginCredentials } from "@/core/entities";

/**
 * IAuthRepository - Port untuk auth API calls
 *
 * Interface ini mendefinisikan kontrak untuk operasi auth ke backend.
 * Implementasi bisa menggunakan fetch, axios, atau library HTTP lainnya.
 */
export interface IAuthRepository {
  /**
   * Login dengan credentials
   * @param credentials - username dan password
   * @returns Result dengan AuthResponse jika success
   */
  login(credentials: LoginCredentials): Promise<Result<AuthResponse>>;

  /**
   * Logout - invalidate session di server
   */
  logout(): Promise<Result<void>>;

  /**
   * Refresh access token menggunakan refresh token
   * @param refreshToken - refresh token yang valid
   * @returns Result dengan AuthResponse baru
   */
  refreshToken(refreshToken: string): Promise<Result<AuthResponse>>;
}
