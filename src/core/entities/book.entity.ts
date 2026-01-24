/**
 * Book Entity
 */
export interface BookEntity {
  id: number;
  title: string;
  author: string | null;
  description: string | null;
  publishedYear: Date | null;
  coverImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Book Entity List
 */
export interface BookEntityList {
  data: BookEntity[];
  meta: {
    total: number;
    total_pages: number;
    page: number;
    limit: number;
    count: number;
  };
}
