import { IEntity } from "../entity/base.entity";

export interface IWriteRepository<TEntity extends IEntity> {
  save(entity: TEntity): Promise<TEntity | Error>;
  saveAll(entities: TEntity[]): Promise<TEntity | Error>;
  update(id: TEntity['id'], entity: TEntity): Promise<TEntity | Error>;
  //updateAll(id: TEntity['id'], entity: TEntity): Promise<TEntity | Error>;
  delete(id: TEntity['id']): Promise<boolean | Error>;
  deleteAll(ids: Array<TEntity['id']>): Promise<boolean | Error>;
}
