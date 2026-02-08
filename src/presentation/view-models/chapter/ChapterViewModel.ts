"use client";

import { useCallback, useState } from "react";
import { useChapter } from "@/presentation/hooks/useChapter";
import { ChapterRequest, ChapterResponse } from "@/application/dto/chapter.dto";
import { ChapterViewModel } from "./ChapterViewModel.types";
import { getErrorMessage } from "@/shared/utils";

export type {
    ChapterViewModel,
    ChapterViewModelState,
    ChapterViewModelActions
} from "./ChapterViewModel.types";


export function useChapterViewModel(): ChapterViewModel {
    const {
        findChapter: findChapterHook
    } = useChapter();

    // state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [chapterList, setChapterList] = useState<ChapterResponse | null>(null);
    const [criteria, setCriteria] = useState<ChapterRequest>({
        page: 1,
        limit: 10,
        bookId: 0,
        search: "",
        category: "",
        chapterId: 0,
    });

    // Action
    const findChapter = useCallback(
        async () => {
            setIsLoading(true);
            setError(null);

            try {
                const result = await findChapterHook(criteria);
                if (result.success) {
                    setChapterList(result.data);
                } else {
                    setError(getErrorMessage(result.error));
                }
            } catch (err) {
                setError(getErrorMessage(err));
            } finally {
                setIsLoading(false);
            }
        },
        [findChapterHook, criteria],
    );

    return {
        isLoading,
        error,
        chapterList,
        findChapter,
        setCriteria,
    }
}