import createHttpError from "http-errors";

import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { UserSettingsRepository } from "../repositories/user-settings.repository";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UpdateUserSettingsDto } from "../dtos/update-user-settings.dto";
import { UserWithSettings } from "../types/user-with-settings.type";
import { UserWithSettingsMapper } from "../mappers/user-with-settings.mapper";
import errorConstant from "../constants/error.constant";
import { UpdateUserBuilder } from "../utils/update-user.builder";

const { USER_NOT_FOUND, USER_ALREADY_EXISTS, BAD_REQUEST } = errorConstant;

export class UserService {
  constructor(
    private readonly userRepository: UserRepository = new UserRepository(),
    private readonly userSettingsRepository: UserSettingsRepository = new UserSettingsRepository(),
    private readonly userWithSettingsMapper: UserWithSettingsMapper = new UserWithSettingsMapper(),
  ) {}

  async getUserWithSettingsById(userId: number) {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw createHttpError(USER_NOT_FOUND.statusCode, USER_NOT_FOUND.message);
    }

    const userWithSettings: UserWithSettings = await this.userRepository.getUserWithSettings(
      user.id,
    );

    return this.userWithSettingsMapper.toDto(userWithSettings);
  }

  async createUser(data: CreateUserDto) {
    const { chatId, username, nickname, groupId } = data.body || data;

    const existingUser = await this.userRepository.findUserByChatId(chatId);

    if (existingUser) {
      throw createHttpError(USER_ALREADY_EXISTS.statusCode, USER_ALREADY_EXISTS.message);
    }

    const userToCreate: Prisma.UserCreateInput = {
      chatId: BigInt(chatId),
      username: username ?? null,
      nickname: nickname ?? null,
      group: {
        connect: {
          id: groupId,
        },
      },
    };

    const newUser = await this.userRepository.createUser(userToCreate);

    if (!newUser) {
      throw createHttpError(BAD_REQUEST.statusCode, BAD_REQUEST.message);
    }

    return newUser;
  }

  async updateUser(userId: number, data: UpdateUserDto) {
    const dataToUpdate = new UpdateUserBuilder(data).build();

    const existingUser = await this.userRepository.findUserById(userId);

    if (!existingUser) {
      throw createHttpError(USER_NOT_FOUND.statusCode, USER_NOT_FOUND.message);
    }

    const updatedUser: User = await this.userRepository.updateUser(existingUser.id, dataToUpdate);

    if (!updatedUser) {
      throw createHttpError(BAD_REQUEST.statusCode, BAD_REQUEST.message);
    }

    return updatedUser;
  }

  async upsertUserSettings(userId: number, data: UpdateUserSettingsDto) {
    const existingUser = await this.userRepository.findUserById(userId);

    if (!existingUser) {
      throw createHttpError(USER_NOT_FOUND.statusCode, USER_NOT_FOUND.message);
    }

    await this.userSettingsRepository.upsertUserSettings(existingUser.id, data);

    const userWithSettings: UserWithSettings = await this.userRepository.getUserWithSettings(
      existingUser.id,
    );

    return this.userWithSettingsMapper.toDto(userWithSettings);
  }

  async deleteUser(userId: number) {
    const existingUser = await this.userRepository.findUserById(userId);

    if (!existingUser) {
      throw createHttpError(USER_NOT_FOUND.statusCode, USER_NOT_FOUND.message);
    }

    await this.userRepository.deleteUser(existingUser.id);
  }
}
