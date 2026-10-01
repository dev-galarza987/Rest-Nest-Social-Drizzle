import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import type { Mapper } from "@automapper/core";
import { UserPostgresRepository } from "../repositories/user.repository";
import type { UserSelect } from "../schema/user.schema";
import { CreateUserRequest, UpdateUserRequest } from "../dto/user.request";
import { UserResponse } from "../dto/user.response";
import {
  CREATE_USER_REQUEST_KEY,
  UPDATE_USER_REQUEST_KEY,
  USER_ENTITY_KEY,
  USER_RESPONSE_KEY,
} from "../mapper/user.profile";

@Injectable()
export class UserService {
  private readonly repository: UserPostgresRepository;
  private readonly mapper: Mapper;

  constructor(
    repository: UserPostgresRepository,
    @InjectMapper() mapper: Mapper,
  ) {
    this.repository = repository;
    this.mapper = mapper;
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.repository.findAll();
    return this.mapper.mapArray<UserSelect, UserResponse>(
      users,
      USER_ENTITY_KEY,
      USER_RESPONSE_KEY,
    );
  }

  async findById(id: number): Promise<UserResponse | null> {
    const user = await this.repository.findById(id);
    if (!user) return null;
    return this.mapper.map<UserSelect, UserResponse>(
      user,
      USER_ENTITY_KEY,
      USER_RESPONSE_KEY,
    );
  }

  async exist(id: number): Promise<boolean> {
    return await this.repository.exist(id);
  }

  async save(request: CreateUserRequest): Promise<UserResponse | Error> {
    const userEntity = this.mapper.map<CreateUserRequest, UserSelect>(
      request,
      CREATE_USER_REQUEST_KEY,
      USER_ENTITY_KEY,
    );
    const result = await this.repository.save(userEntity);
    if (result instanceof Error) {
      return result;
    }
    return this.mapper.map<UserSelect, UserResponse>(
      result,
      USER_ENTITY_KEY,
      USER_RESPONSE_KEY,
    );
  }

  async update(
    id: number,
    request: UpdateUserRequest,
  ): Promise<UserResponse | Error> {
    const userEntity = this.mapper.map<UpdateUserRequest, UserSelect>(
      request,
      UPDATE_USER_REQUEST_KEY,
      USER_ENTITY_KEY,
    );
    const result = await this.repository.update(id, userEntity);
    if (result instanceof Error) {
      return result;
    }
    return this.mapper.map<UserSelect, UserResponse>(
      result,
      USER_ENTITY_KEY,
      USER_RESPONSE_KEY,
    );
  }

  async delete(id: number): Promise<boolean | Error> {
    return await this.repository.delete(id);
  }

  async deleteAll(ids: number[]): Promise<boolean | Error> {
    return await this.repository.deleteAll(ids);
  }
}
