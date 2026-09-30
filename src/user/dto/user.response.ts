import { Expose, plainToInstance } from "class-transformer";
import { UserSelect } from "../schema/user.schema";

export class UserResponse {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  metadata!: { age?: number; preferences?: string[] } | null;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

  static fromEntity(entity: UserSelect): UserResponse {
    return plainToInstance(UserResponse, entity, {
      excludeExtraneousValues: true,
    });
  }

  static fromEntities(entities: UserSelect[]): UserResponse[] {
    return entities.map((entity) => UserResponse.fromEntity(entity));
  }
}
