/**
 * API Response types dari backend (snake_case format)
 * Types ini merepresentasikan shape data dari server
 */

/**
 * Book API Response - format dari backend
 */
export interface BookApiResponse {
  id: number;
  title: string;
  author: string | null;
  description: string | null;
  published_year: number | string | null;
  cover_image_url?: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * List Book API Response - untuk paginated list
 * Backend returns snake_case format
 */
export interface ListBookApiResponse {
  data: BookApiResponse[];
  meta: {
    total: number;
    total_pages: number;
    page: number;
    limit: number;
    count: number;
  };
}
