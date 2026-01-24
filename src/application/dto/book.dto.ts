import { BookEntity } from "@/core/entities";

/**
 * Book DTOs - Data Transfer Objects untuk Book operations
 * DTOs digunakan untuk input/output antara layers
 */

/**
 * DTO untuk create book - hanya fields yang user input
 * Fields seperti id, created_at, updated_at di-generate oleh system
 */
export interface CreateBookDTO {
  title: string;
  author?: string;
  description?: string;
  published_year?: Date;
  cover_image_url?: string;
}

/**
 * DTO untuk update book - semua fields optional
 * Hanya update fields yang diberikan
 */
export interface UpdateBookDTO {
  title?: string;
  author?: string;
  description?: string;
  published_year?: Date;
  cover_image_url?: string;
}

/**
 * DTO untuk request list book
 * parameters:
 * - page: number | mandatory
 * - limit: number | optional
 * - search: string | optional
 */
export interface ListBookDTO {
  page: number;
  limit?: number;
  search?: string;
}

/**
 * DTO untuk response list book
 */
export interface ListBookResponseDTO {
  data: BookEntity[];
  meta: {
    total: number;
    total_pages: number;
    page: number;
    limit: number;
    count: number;
  };
}
