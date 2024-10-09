import { DataNotFoundError } from "#common/errors";
import { CrudService, PaginationService } from "#common/interfaces";
import { ApiPaginationRequest } from "#common/requests";
import { PaginationData, WhereOptions } from "#common/types";
import { getQueryLimitOffset } from "#common/utils";
import { MasterVillageEntity } from "#db/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, Repository } from "typeorm";

@Injectable()
export class MasterVillageService implements CrudService<MasterVillageEntity>, PaginationService<MasterVillageEntity> {

  constructor(
    @InjectRepository(MasterVillageEntity)
    private readonly repository: Repository<MasterVillageEntity>) {
  }

  async findPagination<R extends ApiPaginationRequest>(req: R, where: WhereOptions<MasterVillageEntity>, rel?: FindOptionsRelations<MasterVillageEntity> | undefined, withDeleted: boolean = false): Promise<PaginationData<MasterVillageEntity>> {
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

  async existsBy(where: WhereOptions<MasterVillageEntity>): Promise<boolean> {
    return this.repository.existsBy(where);
  }

  async findOneBy(
    where: WhereOptions<MasterVillageEntity>,
    rel?: FindOptionsRelations<MasterVillageEntity> | undefined, withDeleted: boolean = false): Promise<MasterVillageEntity> {
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

  create(_entity: Partial<MasterVillageEntity>): Promise<MasterVillageEntity> {
    throw new Error("Method not implemented.");
  }

  update(_where: WhereOptions<MasterVillageEntity>, _entity: Partial<MasterVillageEntity>): Promise<MasterVillageEntity> {
    throw new Error("Method not implemented.");
  }

  async restore(where: WhereOptions<MasterVillageEntity>, skipValidation: boolean = false): Promise<void> {
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

  async delete(where: WhereOptions<MasterVillageEntity>, hardDelete: boolean = false): Promise<void> {
    const opts = Array.isArray(where) ? where[0] : where;
    if (hardDelete) {
      await this.repository.delete(opts);
    } else {
      await this.repository.softDelete(opts);
    }
  }

}
