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
