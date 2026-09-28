import { IEntity } from "../entity/base.entity";

export interface IReadRepository<TEntity extends IEntity> {
  findAll(): Promise<TEntity[]>;
  findById(id: TEntity['id']): Promise<TEntity | null>;
  exist(id: TEntity['id']): Promise<boolean>;
}
