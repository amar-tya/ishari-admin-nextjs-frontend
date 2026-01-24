import {
  CreateBookDTO,
  IBookRepository,
  ListBookDTO,
  UpdateBookDTO,
} from "@/application";
import { BookEntity, BookEntityList } from "@/core/entities";
import { ServerError } from "@/core/errors";
import { ApiSuccessResponse, failure, Result, success } from "@/core/types";
import { HttpClient } from "@/infrastructure/http";
import {
  BookApiResponse,
  BookMapper,
  ListBookApiResponse,
} from "@/infrastructure/mappers";

export class BookRepository implements IBookRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async create(dto: CreateBookDTO): Promise<Result<BookEntity>> {
    const result = await this.httpClient.post<BookApiResponse>("/books", dto);

    if (!result.success) {
      return failure(result.error);
    }

    const apiResponse = result.data.data;

    if (apiResponse && typeof apiResponse === "object" && "id" in apiResponse) {
      return success(BookMapper.toDomain(apiResponse));
    }

    return failure(new ServerError("Unexpected response format"));
  }

  async update(id: number, dto: UpdateBookDTO): Promise<Result<BookEntity>> {
    const result = await this.httpClient.put<BookApiResponse>(
      `/books/${id}`,
      dto,
    );

    if (!result.success) {
      return failure(result.error);
    }

    const apiResponse = result.data.data;

    if (apiResponse && typeof apiResponse === "object" && "id" in apiResponse) {
      return success(BookMapper.toDomain(apiResponse));
    }

    return failure(new ServerError("Unexpected response format"));
  }

  async delete(id: number): Promise<Result<void>> {
    const result = await this.httpClient.delete<void>(`/books/${id}`);

    if (!result.success) {
      return failure(result.error);
    }

    // Delete berhasil, return success dengan void
    return success(undefined);
  }

  async getById(id: number): Promise<Result<BookEntity>> {
    const result = await this.httpClient.get<BookApiResponse>(`/books/${id}`);

    if (!result.success) {
      return failure(result.error);
    }

    const apiResponse = result.data.data;

    if (apiResponse && typeof apiResponse === "object" && "id" in apiResponse) {
      return success(BookMapper.toDomain(apiResponse));
    }

    return failure(new ServerError("Unexpected response format"));
  }

  async getAll(dto: ListBookDTO): Promise<Result<BookEntityList>> {
    const params = new URLSearchParams();
    params.append("page", dto.page.toString());
    if (dto.limit) params.append("limit", dto.limit.toString());
    if (dto.search) params.append("search", dto.search);

    // Backend returns ListBookApiResponse directly (no ApiSuccessResponse wrapper)
    const result = await this.httpClient.get<ListBookApiResponse>(
      `/books?${params.toString()}`,
    );

    if (!result.success) {
      return failure(result.error);
    }

    // result.data is HttpResponse<ListBookApiResponse>
    // result.data.data is the actual JSON body: { data: [...], meta: {...} }
    const apiResponse = result.data.data;

    if (apiResponse && Array.isArray(apiResponse.data) && apiResponse.meta) {
      return success(BookMapper.toEntityList(apiResponse));
    }

    return failure(new ServerError("Unexpected response format"));
  }
}
