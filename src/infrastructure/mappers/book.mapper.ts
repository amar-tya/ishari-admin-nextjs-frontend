import { BookEntity, BookEntityList } from "@/core/entities";
import { BookApiResponse, ListBookApiResponse } from "@/infrastructure/models";

/**
 * Mapper untuk convert API response (snake_case) ke BookEntity (camelCase)
 */
export class BookMapper {
  /**
   * Convert single API response ke BookEntity
   */
  static toDomain(apiData: BookApiResponse): BookEntity {
    return {
      id: apiData.id,
      title: apiData.title,
      author: apiData.author,
      description: apiData.description,
      publishedYear: apiData.published_year
        ? new Date(Number(apiData.published_year), 0, 1)
        : null,
      coverImageUrl: apiData.cover_image_url ?? null,
      createdAt: new Date(apiData.created_at),
      updatedAt: new Date(apiData.updated_at),
    };
  }

  /**
   * Convert array of API response ke array of BookEntity
   */
  static toDomainList(apiDataList: BookApiResponse[]): BookEntity[] {
    return apiDataList.map((item) => BookMapper.toDomain(item));
  }

  /**
   * Convert paginated API response ke BookEntityList
   */
  static toEntityList(apiData: ListBookApiResponse): BookEntityList {
    return {
      data: BookMapper.toDomainList(apiData.data),
      meta: {
        total: apiData.meta.total,
        total_pages: apiData.meta.total_pages,
        page: apiData.meta.page,
        limit: apiData.meta.limit,
        count: apiData.meta.count,
      },
    };
  }

  /**
   * Convert BookEntity ke API request format (snake_case)
   * Untuk POST/PUT requests
   */
  static toApi(
    entity: Partial<BookEntity>,
  ): Partial<Omit<BookApiResponse, "id" | "created_at" | "updated_at">> {
    const result: Record<string, unknown> = {};

    if (entity.title !== undefined) result.title = entity.title;
    if (entity.author !== undefined) result.author = entity.author;
    if (entity.description !== undefined)
      result.description = entity.description;
    if (entity.publishedYear !== undefined)
      result.published_year = entity.publishedYear?.getFullYear() ?? null;
    if (entity.coverImageUrl !== undefined)
      result.cover_image_url = entity.coverImageUrl;

    return result;
  }
}
