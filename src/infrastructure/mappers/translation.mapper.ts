import {
  TranslationCreateRequest,
  TranslationUpdateRequest,
  PaginationResponse,
} from '@/application/dto';
import { TranslationEntity } from '@/core/entities';
import {
  ListTranslationApiResponse,
  TranslationApiMeta,
  TranslationApiResponse,
  TranslationCreateApiRequest,
  TranslationUpdateApiRequest,
} from '@/infrastructure/models';

export class TranslationMapper {
  static toDomain(apiData: TranslationApiResponse): TranslationEntity {
    return {
      id: Number(apiData.id),
      verseId: apiData.verse_id,
      languageCode: apiData.language_code,
      translation: apiData.translation_text,
      translator: apiData.translator_name,
      createdAt: apiData.created_at,
      updatedAt: apiData.updated_at,
      verse: {
        id: apiData.verse.id,
        arabicText: apiData.verse.arabic_text,
      },
    };
  }

  static toDomainList(
    apiDataList: TranslationApiResponse[]
  ): TranslationEntity[] {
    return apiDataList.map((item) => TranslationMapper.toDomain(item));
  }

  static toMeta(apiMeta: TranslationApiMeta): PaginationResponse {
    return {
      total: apiMeta.total,
      totalPages: apiMeta.total_pages,
      page: apiMeta.page,
      limit: apiMeta.limit,
      count: apiMeta.count,
    };
  }

  static toCreateRequest(
    request: TranslationCreateRequest
  ): TranslationCreateApiRequest {
    return {
      verse_id: Number(request.verseId),
      language_code: request.languageCode,
      translation_text: request.translation,
      translator_name: request.translator,
    };
  }

  static toUpdateRequest(
    request: TranslationUpdateRequest
  ): TranslationUpdateApiRequest {
    return {
      id: Number(request.translationId),
      verse_id: request.verseId ? Number(request.verseId) : undefined,
      language_code: request.languageCode,
      translation_text: request.translation,
      translator_name: request.translator,
    };
  }

  static toResponse(apiData: ListTranslationApiResponse): {
    data: TranslationEntity[];
    meta: PaginationResponse;
  } {
    return {
      data: TranslationMapper.toDomainList(apiData.data),
      meta: TranslationMapper.toMeta(apiData.meta),
    };
  }
}
