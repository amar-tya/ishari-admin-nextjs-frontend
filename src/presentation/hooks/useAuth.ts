"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { container } from "@/di";
import { LoginCredentials, AuthResponse } from "@/core/entities";
import { Result } from "@/core/types";
import { getErrorMessage } from "@/shared/utils";

/**
 * Auth Hook Return Type
 */
export interface UseAuthReturn {
  login: (credentials: LoginCredentials) => Promise<Result<AuthResponse>>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<Result<AuthResponse>>;
  isAuthenticated: () => boolean;
  getAccessToken: () => string | null;
}

/**
 * useAuth Hook
 *
 * Reusable hook untuk auth operations:
 * - Login (LoginPage, re-login modal)
 * - Logout (Navbar, Settings)
 * - Refresh token (auto-refresh)
 * - Check session (protected routes)
 */
export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const { authService, authRepository, loginUseCase } = container;

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<Result<AuthResponse>> => {
      return loginUseCase.execute(credentials);
    },
    [loginUseCase]
  );

  const logout = useCallback(async () => {
    try {
      await authRepository.logout();
    } catch {
      // Ignore API errors, still clear local tokens
    }
    authService.clearTokens();
    router.push("/login");
  }, [authService, authRepository, router]);

  const isAuthenticated = useCallback(() => {
    return authService.hasValidSession();
  }, [authService]);

  const getAccessToken = useCallback(() => {
    return authService.getAccessToken();
  }, [authService]);

  const refreshToken = useCallback(async (): Promise<Result<AuthResponse>> => {
    const currentRefreshToken = authService.getRefreshToken();

    if (!currentRefreshToken) {
      return {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "No refresh token available",
          statusCode: 401,
          name: "UnauthorizedError",
        },
      } as Result<AuthResponse>;
    }

    const result = await authRepository.refreshToken(currentRefreshToken);
    if (result.success) {
      authService.storeTokens(result.data);
    }
    return result;
  }, [authService, authRepository]);

  return {
    login,
    logout,
    refreshToken,
    isAuthenticated,
    getAccessToken,
  };
}
