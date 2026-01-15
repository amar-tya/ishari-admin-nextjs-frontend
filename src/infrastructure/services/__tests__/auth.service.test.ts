import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { AuthService } from "../auth.service";
import { AuthResponse } from "@/core/entities";

// Mock document.cookie
const mockCookies: Record<string, string> = {};

// Mock document object
const mockDocument = {
  get cookie() {
    return Object.entries(mockCookies)
      .map(([key, value]) => `${key}=${value}`)
      .join("; ");
  },
  set cookie(value: string) {
    const [cookiePart] = value.split(";");
    const [key, val] = cookiePart.split("=");
    if (val === "" || value.includes("expires=Thu, 01 Jan 1970")) {
      delete mockCookies[key];
    } else {
      mockCookies[key] = val;
    }
  },
};

const mockAuthResponse: AuthResponse = {
  user: {
    id: 1,
    username: "testuser",
    email: "test@example.com",
    is_active: true,
    last_login_at: "2026-01-16T00:00:00Z",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-16T00:00:00Z",
  },
  access_token: "mock-access-token",
  refresh_token: "mock-refresh-token",
  expires_at: "2026-01-17T00:00:00Z",
};

describe("AuthService", () => {
  let authService: AuthService;
  let originalDocument: typeof globalThis.document;

  beforeEach(() => {
    // Clear mock cookies
    Object.keys(mockCookies).forEach((key) => delete mockCookies[key]);

    // Mock global document
    originalDocument = globalThis.document;
    // @ts-expect-error - mocking document
    globalThis.document = mockDocument;

    authService = new AuthService();
  });

  afterEach(() => {
    // Restore original document
    globalThis.document = originalDocument;
  });

  describe("storeTokens()", () => {
    it("harus simpan access_token dan refresh_token ke cookies", () => {
      authService.storeTokens(mockAuthResponse);

      expect(mockCookies["access_token"]).toBe(
        encodeURIComponent("mock-access-token")
      );
      expect(mockCookies["refresh_token"]).toBe(
        encodeURIComponent("mock-refresh-token")
      );
    });
  });

  describe("getAccessToken()", () => {
    it("harus return access_token dari cookies", () => {
      mockCookies["access_token"] = encodeURIComponent("test-access-token");

      const token = authService.getAccessToken();

      expect(token).toBe("test-access-token");
    });

    it("harus return null jika access_token tidak ada", () => {
      const token = authService.getAccessToken();

      expect(token).toBeNull();
    });
  });

  describe("getRefreshToken()", () => {
    it("harus return refresh_token dari cookies", () => {
      mockCookies["refresh_token"] = encodeURIComponent("test-refresh-token");

      const token = authService.getRefreshToken();

      expect(token).toBe("test-refresh-token");
    });

    it("harus return null jika refresh_token tidak ada", () => {
      const token = authService.getRefreshToken();

      expect(token).toBeNull();
    });
  });

  describe("clearTokens()", () => {
    it("harus hapus semua tokens dari cookies", () => {
      mockCookies["access_token"] = "test-access-token";
      mockCookies["refresh_token"] = "test-refresh-token";

      authService.clearTokens();

      expect(mockCookies["access_token"]).toBeUndefined();
      expect(mockCookies["refresh_token"]).toBeUndefined();
    });
  });

  describe("hasValidSession()", () => {
    it("harus return true jika ada access_token", () => {
      mockCookies["access_token"] = encodeURIComponent("test-access-token");

      const hasSession = authService.hasValidSession();

      expect(hasSession).toBe(true);
    });

    it("harus return false jika tidak ada access_token", () => {
      const hasSession = authService.hasValidSession();

      expect(hasSession).toBe(false);
    });
  });
});
