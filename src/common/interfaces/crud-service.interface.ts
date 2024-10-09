import { RelationOptions, WhereOptions } from "#common/types";

/**
 * Generic crud interface contract
 * */
export interface CrudService<Entity> {

  /**
   * Returns the result of query `exists` with the given where clause
   * 
   * @param where - where clause options
   * @returns true if data exists else false
   * */
  existsBy(where: WhereOptions<Entity>): Promise<boolean>;

  /**
   * Perform `SELECT` query from `Entity` with given where and relation options.
   * Returns the result of query.
   * 
   * @param where - where clause options
   * @param rel - relations options
   * @param withDeleted - include deleted data. Optional (default = false)
   * @returns `Entity`
   * */
  findOneBy(where: WhereOptions<Entity>, rel?: RelationOptions<Entity>, withDeleted?: boolean): Promise<Entity>;

  /**
   * Insert data to `Entity` table
   *
   * @param entity - data to be inserted
   * @returns `Entity`
   * */
  create(entity: Partial<Entity>): Promise<Entity>;

  /**
   * Update data in the `Entity` table
   *
   * @param where - update conditions
   * @param entity - data
   * @returns `Entity`
   * */
  update(where: WhereOptions<Entity>, entity: Partial<Entity>): Promise<Entity>;

  /**
   * Restore soft deleted data from `Entity` table
   *
   * @param where - restore conditions
   * @param skipValidation - validation flag. Optional (default = false)
   * */
  restore(where: WhereOptions<Entity>, skipValidation?: boolean): Promise<void>;

  /**
   * Soft/Hard delete data from `Entity` table
   *
   * @param where - Delete conditions
   * @param hardDelete - Permanent delete flag. Optional (default = false).
   * */
  delete(where: WhereOptions<Entity>, hardDelete?: boolean): Promise<void>;

}

