import { ChapterRequest, ChapterResponse } from "@/application/dto/chapter.dto";

export interface ChapterViewModelState {
    isLoading: boolean;
    error: string | null;
    chapterList: ChapterResponse | null;
}

export interface ChapterViewModelActions {
    findChapter: () => Promise<void>;
    setCriteria: (criteria: ChapterRequest) => void;
}

export type ChapterViewModel = ChapterViewModelState & ChapterViewModelActions;
