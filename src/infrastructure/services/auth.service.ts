import { AuthResponse, User } from "@/core/entities";
import { IAuthService } from "@/application/ports";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "user_data";

/**
 * Set cookie dengan options
 */
function setCookie(name: string, value: string, days: number = 7): void {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

/**
 * Get cookie value
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
}

/**
 * Delete cookie
 */
function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

/**
 * AuthService - JWT/Token management implementation
 *
 * Implementasi IAuthService menggunakan cookies untuk storage.
 * Cookies dipilih karena:
 * - Compatible dengan Next.js middleware/proxy
 * - Lebih aman dari XSS (httpOnly option available)
 * - Automatic sent dengan setiap request
 */
export class AuthService implements IAuthService {
  storeTokens(authResponse: AuthResponse): void {
    setCookie(ACCESS_TOKEN_KEY, authResponse.access_token, 7); // 7 days
    setCookie(REFRESH_TOKEN_KEY, authResponse.refresh_token, 30); // 30 days
    // Store user data in localStorage
    this.storeUser(authResponse.user);
  }

  private storeUser(user: User): void {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getAccessToken(): string | null {
    return getCookie(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return getCookie(REFRESH_TOKEN_KEY);
  }

  clearTokens(): void {
    deleteCookie(ACCESS_TOKEN_KEY);
    deleteCookie(REFRESH_TOKEN_KEY);
    this.clearUser();
  }

  hasValidSession(): boolean {
    return !!this.getAccessToken();
  }

  getUser(): User | null {
    if (typeof localStorage === "undefined") return null;
    const userData = localStorage.getItem(USER_KEY);
    if (!userData) return null;
    try {
      return JSON.parse(userData) as User;
    } catch {
      return null;
    }
  }

  clearUser(): void {
    if (typeof localStorage === "undefined") return;
    localStorage.removeItem(USER_KEY);
  }
}
