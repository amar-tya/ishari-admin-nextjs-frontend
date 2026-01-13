import { Result } from "@/core/types";

/**
 * Request Options untuk HTTP Client
 */
export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
}

/**
 * HTTP Response wrapper
 */
export interface HttpResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

/**
 * HTTP Client Interface
 * Abstraksi untuk HTTP requests yang bisa di-implement berbagai cara
 */
export interface HttpClient {
  get<T>(
    url: string,
    options?: RequestOptions
  ): Promise<Result<HttpResponse<T>>>;
  post<T>(
    url: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<Result<HttpResponse<T>>>;
  put<T>(
    url: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<Result<HttpResponse<T>>>;
  patch<T>(
    url: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<Result<HttpResponse<T>>>;
  delete<T>(
    url: string,
    options?: RequestOptions
  ): Promise<Result<HttpResponse<T>>>;
}

/**
 * HTTP Client Config
 */
export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  defaultHeaders?: Record<string, string>;
}
