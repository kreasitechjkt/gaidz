import { FindOptionsRelations, FindOptionsWhere } from "typeorm";

export type WhereOptions<Entity> = FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[];

export type RelationOptions<Entity> = FindOptionsRelations<Entity>;

