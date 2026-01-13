/**
 * Core Error Classes
 * Centralized error handling untuk semua datasource
 */

// Error codes untuk identifikasi error secara programmatik
export const ErrorCode = {
  NETWORK: "NETWORK_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  VALIDATION: "VALIDATION_ERROR",
  SERVER: "SERVER_ERROR",
  TIMEOUT: "TIMEOUT",
  UNKNOWN: "UNKNOWN_ERROR",
} as const;

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];

/**
 * Base Application Error
 * Semua custom error inherit dari class ini
 */
export class AppError extends Error {
  constructor(
    public readonly code: ErrorCodeType,
    message: string,
    public readonly statusCode: number = 500,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

/**
 * Network Error - Gagal terhubung ke server
 */
export class NetworkError extends AppError {
  constructor(
    message = "Tidak dapat terhubung ke server",
    originalError?: unknown
  ) {
    super(ErrorCode.NETWORK, message, 0, originalError);
  }
}

/**
 * Timeout Error - Request melebihi batas waktu
 */
export class TimeoutError extends AppError {
  constructor(message = "Request timeout", originalError?: unknown) {
    super(ErrorCode.TIMEOUT, message, 408, originalError);
  }
}

/**
 * Unauthorized Error - Token tidak valid atau expired
 */
export class UnauthorizedError extends AppError {
  constructor(
    message = "Sesi Anda telah berakhir, silakan login kembali",
    originalError?: unknown
  ) {
    super(ErrorCode.UNAUTHORIZED, message, 401, originalError);
  }
}

/**
 * Forbidden Error - Tidak memiliki akses
 */
export class ForbiddenError extends AppError {
  constructor(
    message = "Anda tidak memiliki akses ke resource ini",
    originalError?: unknown
  ) {
    super(ErrorCode.FORBIDDEN, message, 403, originalError);
  }
}

/**
 * Not Found Error - Resource tidak ditemukan
 */
export class NotFoundError extends AppError {
  constructor(message = "Data tidak ditemukan", originalError?: unknown) {
    super(ErrorCode.NOT_FOUND, message, 404, originalError);
  }
}

/**
 * Validation Error - Data tidak valid
 */
export class ValidationError extends AppError {
  constructor(
    message = "Data yang dikirim tidak valid",
    public readonly errors?: Record<string, string[]>,
    originalError?: unknown
  ) {
    super(ErrorCode.VALIDATION, message, 422, originalError);
  }

  override toJSON() {
    return {
      ...super.toJSON(),
      errors: this.errors,
    };
  }
}

/**
 * Server Error - Kesalahan pada server
 */
export class ServerError extends AppError {
  constructor(
    message = "Terjadi kesalahan pada server",
    originalError?: unknown
  ) {
    super(ErrorCode.SERVER, message, 500, originalError);
  }
}

/**
 * ErrorFactory - Membuat error berdasarkan HTTP status code
 */
export function createErrorFromStatus(
  statusCode: number,
  message?: string,
  errors?: Record<string, string[]>,
  originalError?: unknown
): AppError {
  switch (statusCode) {
    case 401:
      return new UnauthorizedError(message, originalError);
    case 403:
      return new ForbiddenError(message, originalError);
    case 404:
      return new NotFoundError(message, originalError);
    case 408:
      return new TimeoutError(message, originalError);
    case 422:
      return new ValidationError(message, errors, originalError);
    case 500:
    case 502:
    case 503:
    case 504:
      return new ServerError(message, originalError);
    default:
      if (statusCode >= 400 && statusCode < 500) {
        return new AppError(
          ErrorCode.UNKNOWN,
          message || "Client error",
          statusCode,
          originalError
        );
      }
      return new ServerError(message, originalError);
  }
}
