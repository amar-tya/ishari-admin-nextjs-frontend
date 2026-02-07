export interface ListChapterApiResponse {
  data: ChapterApiResponse[];
  meta: ChaperApiMeta;
}

export interface ChapterApiResponse {
  id: string;
  name: string;
  bookId: string;
  chapterNumber: number;
  title: string;
  category: string;
  description: string;
  totalVerses: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChaperApiMeta {
  total: number;
  total_pages: number;
  page: number;
  limit: number;
  count: number;
}
