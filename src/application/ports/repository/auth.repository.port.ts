import { Result } from '@/core/types';
import { AuthResponse, LoginCredentials } from '@/core/entities';

/**
 * IAuthRepository - Port untuk auth API calls
 *
 * Interface ini mendefinisikan kontrak untuk operasi auth ke backend.
 * Implementasi menggunakan Supabase Auth.
 */
export interface IAuthRepository {
  /**
   * Login dengan email dan password via Supabase Auth
   */
  login(credentials: LoginCredentials): Promise<Result<AuthResponse>>;

  /**
   * Login dengan Google OAuth via Supabase
   * Akan redirect browser ke Google consent screen
   */
  loginWithGoogle(): Promise<Result<void>>;

  /**
   * Logout - invalidate session Supabase
   */
  logout(): Promise<Result<void>>;
}
