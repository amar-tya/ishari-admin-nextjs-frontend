import { ChapterCreateRequest } from "@/application/dto";
import { IChapterRepository } from "@/application/ports";
import { ChapterEntity } from "@/core/entities";
import { Result } from "@/core/types";

export class CreateChapterUseCase {
    private readonly chapterRepository: IChapterRepository;

    constructor(chapterRepository: IChapterRepository) {
        this.chapterRepository = chapterRepository;
    }

    async execute(request: ChapterCreateRequest): Promise<Result<ChapterEntity>> {
        return this.chapterRepository.create(request);
    }
}