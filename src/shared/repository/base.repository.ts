import { IEntity } from "../entity/base.entity";
import { IReadRepository } from "./read.repository";
import { IWriteRepository } from "./write.repository";

export interface IRepository<TEntity extends IEntity> extends IReadRepository<TEntity>, IWriteRepository<TEntity> { }
