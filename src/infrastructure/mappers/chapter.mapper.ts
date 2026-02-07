import { PaginationResponse } from '@/application/dto/pagination.dto';
import { ChapterEntity } from '@/core/entities';
import {
  ChaperApiMeta,
  ChapterApiResponse,
  ListChapterApiResponse,
} from '@/infrastructure/models';

export class ChapterMapper {
  static toDomain(apiData: ChapterApiResponse): ChapterEntity {
    return {
      id: Number(apiData.id),
      bookId: Number(apiData.bookId),
      chapterNumber: apiData.chapterNumber,
      title: apiData.title,
      category: apiData.category,
      description: apiData.description,
      totalVerses: apiData.totalVerses,
      createdAt: apiData.createdAt,
      updatedAt: apiData.updatedAt,
    };
  }

  static toDomainList(apiDataList: ChapterApiResponse[]): ChapterEntity[] {
    return apiDataList.map((item) => ChapterMapper.toDomain(item));
  }

  static toMeta(apiMeta: ChaperApiMeta): PaginationResponse {
    return {
      total: apiMeta.total,
      totalPages: apiMeta.total_pages,
      page: apiMeta.page,
      limit: apiMeta.limit,
      count: apiMeta.count,
    };
  }

  static toResponse(apiData: ListChapterApiResponse): {
    data: ChapterEntity[];
    meta: PaginationResponse;
  } {
    return {
      data: ChapterMapper.toDomainList(apiData.data),
      meta: ChapterMapper.toMeta(apiData.meta),
    };
  }
}
