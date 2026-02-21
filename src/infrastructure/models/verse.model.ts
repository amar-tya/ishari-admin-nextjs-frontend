export interface ListVerseApiResponse {
  data: VerseApiResponse[];
  meta: VerseApiMeta;
}

export interface VerseApiMeta {
  total: number;
  total_pages: number;
  page: number;
  limit: number;
  count: number;
}

export interface VerseApiResponse {
  id: string;
  chapter_id: number;
  verse_number: number;
  arabic_text: string;
  transliteration_text: string;
  created_at: string;
  updated_at: string;
}
