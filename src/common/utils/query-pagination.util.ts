import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "#common/constants";
import { ApiPaginationRequest } from "#common/requests";

export function getQueryLimitOffset<R extends ApiPaginationRequest>(req: R): { limit: number; offset: number } {
  const limit = req.pageSize || DEFAULT_PAGE_SIZE;
  const offset = (req.pageNumber || DEFAULT_PAGE_NUMBER) - 1;

  return {
    limit: limit,
    offset: offset * limit,
  };
}

