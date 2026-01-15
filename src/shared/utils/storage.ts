/**
 * Cookie Storage Utilities
 * Untuk menyimpan/mengambil auth tokens dari cookies
 * (Compatible dengan Next.js middleware)
 */

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

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
 * Storage API untuk auth tokens
 */
export const authStorage = {
  setAccessToken(token: string): void {
    setCookie(ACCESS_TOKEN_KEY, token);
  },

  getAccessToken(): string | null {
    return getCookie(ACCESS_TOKEN_KEY);
  },

  setRefreshToken(token: string): void {
    setCookie(REFRESH_TOKEN_KEY, token, 30); // 30 days for refresh token
  },

  getRefreshToken(): string | null {
    return getCookie(REFRESH_TOKEN_KEY);
  },

  clearTokens(): void {
    deleteCookie(ACCESS_TOKEN_KEY);
    deleteCookie(REFRESH_TOKEN_KEY);
  },

  hasValidSession(): boolean {
    return !!getCookie(ACCESS_TOKEN_KEY);
  },
};
