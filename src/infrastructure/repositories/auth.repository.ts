import { Result, success, failure } from '@/core/types';
import { IAuthRepository } from '@/application/ports';
import { AuthResponse, LoginCredentials } from '@/core/entities';
import { SupabaseClient } from '@supabase/supabase-js';
import { ServerError, UnauthorizedError } from '@/core/errors';

/**
 * AuthRepository - Supabase Auth implementation
 *
 * Menggunakan Supabase Auth SDK untuk:
 * - Email/password login via signInWithPassword
 * - Google OAuth via signInWithOAuth
 * - Logout via signOut
 * Token refresh ditangani otomatis oleh Supabase @supabase/ssr middleware.
 */
export class AuthRepository implements IAuthRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async login(credentials: LoginCredentials): Promise<Result<AuthResponse>> {
    const email = credentials.username_or_email;
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password: credentials.password,
    });

    if (error) {
      if (error.status === 400 || error.status === 401) {
        return failure(new UnauthorizedError(error.message));
      }
      return failure(new ServerError(error.message));
    }

    if (!data.session || !data.user) {
      return failure(new ServerError('Login gagal, tidak ada session'));
    }

    // Map ke AuthResponse entity
    const authResponse: AuthResponse = {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: String(data.session.expires_at ?? ''),
      user: {
        id: data.user.id,
        email: data.user.email ?? '',
        username: data.user.user_metadata?.username ?? data.user.email ?? '',
        role: data.user.user_metadata?.role ?? 'user',
        is_active: true,
        last_login_at: new Date().toISOString(),
        created_at: data.user.created_at,
        updated_at: data.user.updated_at ?? data.user.created_at,
      },
    };

    return success(authResponse);
  }

  async loginWithGoogle(): Promise<Result<void>> {
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      return failure(new ServerError(error.message));
    }

    // OAuth redirect akan otomatis terjadi, return success
    return success(undefined);
  }

  async logout(): Promise<Result<void>> {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      return failure(new ServerError(error.message));
    }

    return success(undefined);
  }
}
