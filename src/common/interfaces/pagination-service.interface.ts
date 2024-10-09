import { ApiPaginationRequest } from "#common/requests";
import { PaginationData, RelationOptions, WhereOptions } from "#common/types";

export interface PaginationService<Entity> {

  /**
   *
   *
   * @param req - data request
   * @param where - `SELECT` where clause
   * @param rel - relational options
   * @param withDeleted - include deleted data. Optional (default = false)
   *
   * @returns query result
   * */
  findPagination<R extends ApiPaginationRequest>(
    req: R,
    where: WhereOptions<Entity>,
    rel?: RelationOptions<Entity>,
    withDeleted?: boolean): Promise<PaginationData<Entity>>

}

