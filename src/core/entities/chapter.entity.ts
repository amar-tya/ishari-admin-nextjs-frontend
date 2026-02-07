export interface ChapterEntity {
  id: number;
  bookId: number;
  chapterNumber: number;
  title: string;
  category: string;
  description: string;
  totalVerses: number;
  createdAt: string;
  updatedAt: string;
}
