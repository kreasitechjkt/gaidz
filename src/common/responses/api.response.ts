import { HttpStatus } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ApiPaginationRequest } from "../requests";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../constants";

class ApiPaginations {
  @ApiProperty()
  total_page: number;
  @ApiProperty()
  current_page: number;
  @ApiProperty()
  page_size: number;
  @ApiProperty()
  next_page: number | null;
  @ApiProperty()
  prev_page: number | null;

  constructor(partial?: ApiPaginations) {
    Object.assign(this, partial ? partial : {});
  }
}

export class Api<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  statusCode: number;

  @ApiPropertyOptional()
  message: string;

  @ApiPropertyOptional({
    type: 'object',
  })
  result: T;

  @ApiPropertyOptional()
  paginations: ApiPaginations;

  @ApiPropertyOptional()
  errors: any;

  private constructor(partial: Partial<Api<T>>) {
    Object.assign(this, partial);
  }

  static success<T>(partial: Partial<Api<T>>): Api<T> {
    partial.success = true;
    partial.statusCode = partial.statusCode || HttpStatus.OK;

    return new Api(partial);
  }

  static error(partial: Partial<Api<null>>): Api<null> {
    partial.success = false;
    partial.statusCode = partial.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

    return new Api(partial);
  }

  static composeApiPagination(
    req: ApiPaginationRequest,
    resultCount: number,
  ): ApiPaginations {
    const page = req.pageNumber || DEFAULT_PAGE_NUMBER;
    const pageSize = req.pageSize || DEFAULT_PAGE_SIZE;

    return {
      total_page: Math.ceil(resultCount / pageSize),
      current_page: page,
      page_size: resultCount > pageSize ? pageSize : resultCount,
      prev_page: page <= 1 ? null : page - 1,
      next_page: resultCount - page * pageSize >= 1 ? page + 1 : null,
    };
  }
}
