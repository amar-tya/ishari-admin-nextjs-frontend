/**
 * Book Entity
 */
export interface BookEntity {
  id: number;
  title: string;
  author: string;
  description: string;
  isbn: string;
  published_year: Date;
  cover_image_url: string;
  created_at: Date;
  updated_at: Date;
}
