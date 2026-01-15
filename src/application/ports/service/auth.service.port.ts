import { AuthResponse } from "@/core/entities";

/**
 * IAuthService - Port untuk JWT/Token management
 *
 * Interface ini mendefinisikan kontrak untuk operasi token.
 * Terpisah dari repository karena token storage adalah concern yang berbeda
 * dari API calls.
 *
 * Principles:
 * - Separation of Concerns: Token management terpisah dari API
 * - Testability: Mudah di-mock untuk testing
 * - Flexibility: Bisa ganti storage (cookie/localStorage/memory)
 * - Security: Centralized token handling
 */
export interface IAuthService {
  /**
   * Simpan tokens setelah login berhasil
   * @param authResponse - response dari login API
   */
  storeTokens(authResponse: AuthResponse): void;

  /**
   * Ambil access token
   * @returns access token atau null jika tidak ada
   */
  getAccessToken(): string | null;

  /**
   * Ambil refresh token
   * @returns refresh token atau null jika tidak ada
   */
  getRefreshToken(): string | null;

  /**
   * Hapus semua tokens (logout)
   */
  clearTokens(): void;

  /**
   * Cek apakah session valid
   * @returns true jika ada access token
   */
  hasValidSession(): boolean;
}
