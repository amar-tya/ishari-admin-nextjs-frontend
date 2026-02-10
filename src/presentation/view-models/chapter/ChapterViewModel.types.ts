import { ChapterCreateRequest, ChapterRequest, ChapterResponse } from "@/application/dto";

export interface ChapterViewModelState {
    isLoading: boolean;
    error: string | null;
    chapterList: ChapterResponse | null;
}

export interface ChapterViewModelActions {
    findChapter: () => Promise<void>;
    setCriteria: (criteria: ChapterRequest) => void;
    createChapter: (criteria: ChapterCreateRequest) => Promise<boolean>;
}

export type ChapterViewModel = ChapterViewModelState & ChapterViewModelActions;
