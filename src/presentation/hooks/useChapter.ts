"use client";

import { ChapterRequest, ChapterResponse } from "@/application/dto/chapter.dto";
import { mapResult, Result } from "@/core/types";
import { container } from "@/di";
import { useCallback } from "react";

export interface UseChapter {
    findChapter: (criteria: ChapterRequest) => Promise<Result<ChapterResponse>>
}

export function useChapter(): UseChapter {
    const { findChapterUseCase } = container;

    const fincChapter = useCallback(
        async (criteria: ChapterRequest): Promise<Result<ChapterResponse>> => {
            const result = await findChapterUseCase.execute(criteria);

            return mapResult(result, (res) => ({
                data: res.data,
                meta: res.meta,
            }));
        },
        [findChapterUseCase]
    )

    return {
        findChapter: fincChapter
    }
}