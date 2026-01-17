/**
 * API Response Types - Standard wrapper untuk komunikasi dengan external API
 * Digunakan secara global untuk semua API response
 */

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

/**
 * Type guard untuk check apakah response adalah success
 */
export function isApiSuccess<T>(
  response: ApiResponse<T>
): response is ApiSuccessResponse<T> {
  return response.status === "success";
}

/**
 * Type guard untuk check apakah response adalah error
 */
export function isApiError<T>(
  response: ApiResponse<T>
): response is ApiErrorResponse {
  return response.status === "error";
}
