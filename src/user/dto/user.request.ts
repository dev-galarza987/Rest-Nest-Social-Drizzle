import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class UserMetadataDto {
  @ApiPropertyOptional({ description: "Edad del usuario", example: 25 })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiPropertyOptional({
    description: "Preferencias del usuario",
    example: ["coding", "reading"],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferences?: string[];
}

export class CreateUserRequest {
  @ApiProperty({ description: "Nombre del usuario", example: "Juan Pérez" })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: "Correo electrónico", example: "juan@example.com" })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiPropertyOptional({ description: "Metadatos adicionales del usuario", type: UserMetadataDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UserMetadataDto)
  metadata?: UserMetadataDto;
}

export class UpdateUserRequest {
  @ApiPropertyOptional({ description: "Nombre del usuario", example: "Juan Pérez Modificado" })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({ description: "Correo electrónico", example: "juan.nuevo@example.com" })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ApiPropertyOptional({ description: "Metadatos adicionales del usuario", type: UserMetadataDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UserMetadataDto)
  metadata?: UserMetadataDto;
}
