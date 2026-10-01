import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "../services/user.service";
import { CreateUserRequest, UpdateUserRequest } from "../dto/user.request";
import { UserResponse } from "../dto/user.response";

@ApiTags("users")
@Controller("users")
export class UserController {
  private readonly service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  @Get()
  @ApiOperation({ summary: "Obtener la lista completa de usuarios" })
  @ApiResponse({
    status: 200,
    description: "Lista de usuarios obtenida exitosamente",
    type: [UserResponse],
  })
  async findAll(): Promise<UserResponse[]> {
    return await this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Obtener un usuario por su ID" })
  @ApiResponse({
    status: 200,
    description: "Usuario encontrado",
    type: UserResponse,
  })
  @ApiResponse({ status: 404, description: "Usuario no encontrado" })
  async findById(@Param("id", ParseIntPipe) id: number): Promise<UserResponse> {
    const user = await this.service.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  @Post()
  @ApiOperation({ summary: "Crear un nuevo usuario" })
  @ApiResponse({
    status: 201,
    description: "Usuario creado exitosamente",
    type: UserResponse,
  })
  @ApiResponse({ status: 400, description: "Datos de solicitud no válidos" })
  async save(@Body() request: CreateUserRequest): Promise<UserResponse> {
    const result = await this.service.save(request);
    if (result instanceof Error) {
      throw result;
    }
    return result;
  }

  @Put(":id")
  @ApiOperation({ summary: "Actualizar un usuario por su ID" })
  @ApiResponse({
    status: 200,
    description: "Usuario actualizado exitosamente",
    type: UserResponse,
  })
  @ApiResponse({ status: 404, description: "Usuario no encontrado" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() request: UpdateUserRequest,
  ): Promise<UserResponse> {
    const result = await this.service.update(id, request);
    if (result instanceof Error) {
      throw result;
    }
    return result;
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eliminar un usuario por su ID" })
  @ApiResponse({
    status: 200,
    description: "Usuario eliminado exitosamente",
    type: Boolean,
  })
  @ApiResponse({ status: 404, description: "Usuario no encontrado" })
  async delete(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
    const result = await this.service.delete(id);
    if (result instanceof Error) {
      throw result;
    }
    return result;
  }
}
