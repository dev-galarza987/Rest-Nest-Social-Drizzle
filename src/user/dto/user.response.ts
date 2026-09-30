import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, plainToInstance } from "class-transformer";
import { UserSelect } from "../schema/user.schema";

export class UserResponse {
  @ApiProperty({ description: "Identificador único del usuario", example: 1 })
  @Expose()
  id!: number;

  @ApiProperty({ description: "Nombre del usuario", example: "Juan Pérez" })
  @Expose()
  name!: string;

  @ApiProperty({ description: "Correo electrónico del usuario", example: "juan@example.com" })
  @Expose()
  email!: string;

  @ApiPropertyOptional({
    description: "Metadatos adicionales del usuario",
    example: { age: 25, preferences: ["coding", "reading"] },
  })
  @Expose()
  metadata!: { age?: number; preferences?: string[] } | null;

  @ApiProperty({ description: "Fecha de creación del usuario", example: "2026-09-30T12:00:00.000Z" })
  @Expose()
  createdAt!: Date;

  @ApiProperty({ description: "Fecha de última actualización del usuario", example: "2026-09-30T12:00:00.000Z" })
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
