/**
 * User Entity
 */
export interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  last_login_at: string;
  created_at: string;
  updated_at: string;
}

/**
 * Login Credentials - input untuk login
 */
export interface LoginCredentials {
  username_or_email: string;
  password: string;
}

/**
 * Auth Response - response dari API login
 */
export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_at: string;
}

/**
 * API Response wrapper untuk success
 */
export interface ApiSuccessResponse<T> {
  status: "success";
  message: string;
  data: T;
}

/**
 * API Response wrapper untuk error
 */
export interface ApiErrorResponse {
  status: "error";
  message: string;
  error: string;
}

/**
 * Union type untuk API response
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
