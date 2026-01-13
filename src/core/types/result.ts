import { AppError } from "../errors";

/**
 * Result Type - Type-safe error handling pattern
 * Menghindari throw/catch dan memberikan explicit error handling
 */
export type Result<T, E = AppError> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Helper untuk membuat success result
 */
export function success<T>(data: T): Result<T, never> {
  return { success: true, data };
}

/**
 * Helper untuk membuat failure result
 */
export function failure<E>(error: E): Result<never, E> {
  return { success: false, error };
}

/**
 * Type guard untuk check apakah result adalah success
 */
export function isSuccess<T, E>(
  result: Result<T, E>
): result is { success: true; data: T } {
  return result.success === true;
}

/**
 * Type guard untuk check apakah result adalah failure
 */
export function isFailure<T, E>(
  result: Result<T, E>
): result is { success: false; error: E } {
  return result.success === false;
}

/**
 * Unwrap result dengan throw jika error
 * Berguna untuk cases dimana kita ingin propagate error ke atas
 */
export function unwrap<T>(result: Result<T>): T {
  if (result.success) {
    return result.data;
  }
  throw result.error;
}

/**
 * Unwrap result dengan default value jika error
 */
export function unwrapOr<T>(result: Result<T>, defaultValue: T): T {
  if (result.success) {
    return result.data;
  }
  return defaultValue;
}

/**
 * Map over success value
 */
export function mapResult<T, U, E>(
  result: Result<T, E>,
  fn: (data: T) => U
): Result<U, E> {
  if (result.success) {
    return success(fn(result.data));
  }
  return result;
}

/**
 * FlatMap/chain untuk composing Results
 */
export function flatMap<T, U, E>(
  result: Result<T, E>,
  fn: (data: T) => Result<U, E>
): Result<U, E> {
  if (result.success) {
    return fn(result.data);
  }
  return result;
}
