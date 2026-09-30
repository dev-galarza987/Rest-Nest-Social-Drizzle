import { Injectable } from "@nestjs/common";
import { InjectDrizzle } from "@nestjs/drizzle";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq, inArray } from "drizzle-orm";
import { IRepository } from "../../shared/repository/base.repository";
import { users, UserSelect } from "../schema/user.schema";

@Injectable()
export class UserPostgresRepository implements IRepository<UserSelect> {
  private readonly db: NodePgDatabase;

  constructor(@InjectDrizzle() database: NodePgDatabase) {
    this.db = database;
  }

  async findAll(): Promise<UserSelect[]> {
    return await this.db.select().from(users);
  }

  async findById(id: number): Promise<UserSelect | null> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0] ?? null;
  }

  async exist(id: number): Promise<boolean> {
    const user = await this.findById(id);
    return user !== null;
  }

  async save(entity: UserSelect): Promise<UserSelect | Error> {
    try {
      const result = await this.db.insert(users).values(entity).returning();
      return result[0];
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }

  async saveAll(entities: UserSelect[]): Promise<UserSelect | Error> {
    try {
      const result = await this.db.insert(users).values(entities).returning();
      return result[0];
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }

  async update(id: number, entity: UserSelect): Promise<UserSelect | Error> {
    try {
      const result = await this.db
        .update(users)
        .set(entity)
        .where(eq(users.id, id))
        .returning();
      return result[0];
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }

  async delete(id: number): Promise<boolean | Error> {
    try {
      const result = await this.db.delete(users).where(eq(users.id, id)).returning();
      return result.length > 0;
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }

  async deleteAll(ids: number[]): Promise<boolean | Error> {
    try {
      if (ids.length === 0) return true;
      const result = await this.db.delete(users).where(inArray(users.id, ids)).returning();
      return result.length > 0;
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }
}
