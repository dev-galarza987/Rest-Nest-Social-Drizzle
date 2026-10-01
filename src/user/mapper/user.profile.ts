import { createMap, type Mapper, type MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { PojosMetadataMap } from "@automapper/pojos";
import { Injectable } from "@nestjs/common";
import type { UserSelect } from "../schema/user.schema";
import { CreateUserRequest, UpdateUserRequest } from "../dto/user.request";
import { UserResponse } from "../dto/user.response";

export const USER_ENTITY_KEY = "UserEntity";
export const CREATE_USER_REQUEST_KEY = "CreateUserRequest";
export const UPDATE_USER_REQUEST_KEY = "UpdateUserRequest";
export const USER_RESPONSE_KEY = "UserResponse";

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      PojosMetadataMap.create<UserSelect>(USER_ENTITY_KEY, {
        id: Number,
        name: String,
        email: String,
        metadata: Object,
        createdAt: Date,
        updatedAt: Date,
      });

      PojosMetadataMap.create<UserResponse>(USER_RESPONSE_KEY, {
        id: Number,
        name: String,
        email: String,
        metadata: Object,
        createdAt: Date,
        updatedAt: Date,
      });

      PojosMetadataMap.create<CreateUserRequest>(CREATE_USER_REQUEST_KEY, {
        name: String,
        email: String,
        metadata: Object,
      });

      PojosMetadataMap.create<UpdateUserRequest>(UPDATE_USER_REQUEST_KEY, {
        name: String,
        email: String,
        metadata: Object,
      });

      createMap<UserSelect, UserResponse>(mapper, USER_ENTITY_KEY, USER_RESPONSE_KEY);
      createMap<CreateUserRequest, UserSelect>(mapper, CREATE_USER_REQUEST_KEY, USER_ENTITY_KEY);
      createMap<UpdateUserRequest, UserSelect>(mapper, UPDATE_USER_REQUEST_KEY, USER_ENTITY_KEY);
    };
  }
}
