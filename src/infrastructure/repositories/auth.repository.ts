import { Result, success, failure } from "@/core/types";
import { IAuthRepository } from "@/application/ports";
import {
  AuthResponse,
  LoginCredentials,
  ApiSuccessResponse,
} from "@/core/entities";
import { HttpClient } from "@/infrastructure/http";
import { ServerError } from "@/core/errors";

/**
 * AuthRepository - Auth API calls implementation
 *
 * Implementasi IAuthRepository menggunakan HttpClient.
 * Hanya bertanggung jawab untuk HTTP calls, tidak menangani token storage.
 */
export class AuthRepository implements IAuthRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async login(credentials: LoginCredentials): Promise<Result<AuthResponse>> {
    const result = await this.httpClient.post<ApiSuccessResponse<AuthResponse>>(
      "/auth/login",
      credentials
    );

    if (!result.success) {
      return failure(result.error);
    }

    // Extract data dari response wrapper
    const apiResponse = result.data.data;

    if (apiResponse.status === "success") {
      return success(apiResponse.data);
    }

    // Handle unexpected response format
    return failure(new ServerError("Unexpected response format"));
  }

  async logout(): Promise<Result<void>> {
    // Use dedicated logout route instead of proxy
    // This route handles backend call and clears cookies server-side
    const result = await this.httpClient.post<void>(
      "/api/auth/logout",
      undefined,
      {
        // Use absolute path to avoid proxy prefix
      }
    );

    if (!result.success) {
      return failure(result.error);
    }

    return success(undefined);
  }

  async refreshToken(refreshToken: string): Promise<Result<AuthResponse>> {
    const result = await this.httpClient.post<ApiSuccessResponse<AuthResponse>>(
      "/auth/refresh",
      { refresh_token: refreshToken }
    );

    if (!result.success) {
      return failure(result.error);
    }

    const apiResponse = result.data.data;

    if (apiResponse.status === "success") {
      return success(apiResponse.data);
    }

    return failure(new ServerError("Unexpected response format"));
  }
}
