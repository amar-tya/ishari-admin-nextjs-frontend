import { PaginationResponse } from '@/application/dto/pagination.dto';
import { VerseEntity } from '@/core/entities';
import {
  ListVerseApiResponse,
  VerseApiMeta,
  VerseApiResponse,
} from '@/infrastructure/models';

export class VerseMapper {
  static toDomain(apiData: VerseApiResponse): VerseEntity {
    return {
      id: Number(apiData.id),
      chapterId: apiData.chapter_id,
      verseNumber: apiData.verse_number,
      arabicText: apiData.arabic_text,
      transliterationText: apiData.transliteration_text,
      createdAt: apiData.created_at,
      updatedAt: apiData.updated_at,
    };
  }

  static toDomainList(apiDataList: VerseApiResponse[]): VerseEntity[] {
    return apiDataList.map((item) => VerseMapper.toDomain(item));
  }

  static toMeta(apiMeta: VerseApiMeta): PaginationResponse {
    return {
      total: apiMeta.total,
      totalPages: apiMeta.total_pages,
      page: apiMeta.page,
      limit: apiMeta.limit,
      count: apiMeta.count,
    };
  }

  static toResponse(apiData: ListVerseApiResponse): {
    data: VerseEntity[];
    meta: PaginationResponse;
  } {
    return {
      data: VerseMapper.toDomainList(apiData.data),
      meta: VerseMapper.toMeta(apiData.meta),
    };
  }
}
