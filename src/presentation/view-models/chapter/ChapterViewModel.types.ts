import {
  ChapterCreateRequest,
  ChapterRequest,
  ChapterResponse,
  ChapterUpdateRequest,
} from '@/application/dto';

export interface ChapterViewModelState {
  isLoading: boolean;
  error: string | null;
  chapterList: ChapterResponse | null;
}

export interface ChapterViewModelActions {
  findChapter: (criteria?: Partial<ChapterRequest>) => Promise<void>;
  setCriteria: (criteria: ChapterRequest) => void;
  createChapter: (criteria: ChapterCreateRequest) => Promise<boolean>;
  updateChapter: (criteria: ChapterUpdateRequest) => Promise<boolean>;
  deleteChapter: (id: number) => Promise<boolean>;
  bulkDeleteChapter: (ids: number[]) => Promise<boolean>;
}

export type ChapterViewModel = ChapterViewModelState & ChapterViewModelActions;
