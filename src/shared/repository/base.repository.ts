import { IEntity } from "../entity/base.entity";
import { IReadRepository } from "./read.repository";

export interface IRepository<TEntity extends IEntity> extends IReadRepository<TEntity> { }

export class BaseRepository<TEntity> implements IRepository<TEntity> {
  async findAll(): Promise<TEntity[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: TEntity["id"]): Promise<TEntity | null> {
    throw new Error("Method not implemented.");
  }

  async exist(id: TEntity["id"]): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
