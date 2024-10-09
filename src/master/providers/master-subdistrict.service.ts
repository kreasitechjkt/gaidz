import { DataNotFoundError } from "#common/errors";
import { CrudService, PaginationService } from "#common/interfaces";
import { ApiPaginationRequest } from "#common/requests";
import { PaginationData, WhereOptions } from "#common/types";
import { getQueryLimitOffset } from "#common/utils";
import { MasterSubdistrictEntity } from "#db/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, Repository } from "typeorm";

@Injectable()
export class MasterSubdistrictService implements CrudService<MasterSubdistrictEntity>, PaginationService<MasterSubdistrictEntity> {

  constructor(
    @InjectRepository(MasterSubdistrictEntity)
    private readonly repository: Repository<MasterSubdistrictEntity>) {
  }

  async findPagination<R extends ApiPaginationRequest>(req: R, where: WhereOptions<MasterSubdistrictEntity>, rel?: FindOptionsRelations<MasterSubdistrictEntity> | undefined, withDeleted: boolean = false): Promise<PaginationData<MasterSubdistrictEntity>> {
    const { limit, offset } = getQueryLimitOffset(req);

    const [data, count] = await this.repository.findAndCount({
      where: where,
      relations: rel,
      skip: offset,
      take: limit,
      withDeleted: withDeleted,
    });

    return { data, count };
  }

  async existsBy(where: WhereOptions<MasterSubdistrictEntity>): Promise<boolean> {
    return this.repository.existsBy(where);
  }

  async findOneBy(
    where: WhereOptions<MasterSubdistrictEntity>,
    rel?: FindOptionsRelations<MasterSubdistrictEntity> | undefined, withDeleted: boolean = false): Promise<MasterSubdistrictEntity> {
    const data = await this.repository.findOne({
      where: where,
      relations: rel,
      withDeleted: withDeleted,
    });

    if (!data) {
      throw new DataNotFoundError("not found");
    }

    return data;
  }

  create(_entity: Partial<MasterSubdistrictEntity>): Promise<MasterSubdistrictEntity> {
    throw new Error("Method not implemented.");
  }

  update(_where: WhereOptions<MasterSubdistrictEntity>, _entity: Partial<MasterSubdistrictEntity>): Promise<MasterSubdistrictEntity> {
    throw new Error("Method not implemented.");
  }

  async restore(where: WhereOptions<MasterSubdistrictEntity>, skipValidation: boolean = false): Promise<void> {
    const opts = Array.isArray(where) ? where[0] : where;

    if (skipValidation) {
      await this.repository.restore(opts);
      return;
    }

    const isExists = await this.existsBy(opts);
    if (!isExists) {
      throw new DataNotFoundError("not found");
    }

    await this.repository.restore(opts);
  }

  async delete(where: WhereOptions<MasterSubdistrictEntity>, hardDelete: boolean = false): Promise<void> {
    const opts = Array.isArray(where) ? where[0] : where;
    if (hardDelete) {
      await this.repository.delete(opts);
    } else {
      await this.repository.softDelete(opts);
    }
  }

}
