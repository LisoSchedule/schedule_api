import { BadRequest, NotFound } from "http-errors";

import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { UserSettingsRepository } from "../repositories/user-settings.repository";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UpdateUserSettingsDto } from "../dtos/update-user-settings.dto";
import { UserWithSettings } from "../types/user-with-settings.type";
import { UserWithSettingsMapper } from "../mappers/user-with-settings.mapper";
import errorConstant from "../constants/error.constant";

export class UserService {
  constructor(
    private readonly userRepository: UserRepository = new UserRepository(),
    private readonly userSettingsRepository: UserSettingsRepository = new UserSettingsRepository(),
    private readonly userWithSettingsMapper: UserWithSettingsMapper = new UserWithSettingsMapper(),
  ) {}

  async createUser(data: CreateUserDto) {
    const { chatId, username, nickname, groupId } = data.body || data;

    const existingUser = await this.userRepository.findUserByChatId(chatId);

    if (existingUser) {
      throw new BadRequest(errorConstant.USER_ALREADY_EXISTS);
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
      throw new BadRequest(errorConstant.BAD_REQUEST);
    }

    return newUser;
  }

  async updateUser(chatId: bigint, data: UpdateUserDto) {
    const { nickname } = data;

    const existingUser = await this.userRepository.findUserByChatId(chatId);

    if (!existingUser) {
      throw new NotFound(errorConstant.USER_NOT_FOUND);
    }

    const updatedUser: User = await this.userRepository.updateUser(existingUser.id, {
      nickname: nickname,
    });

    if (!updatedUser) {
      throw new BadRequest(errorConstant.BAD_REQUEST);
    }

    return updatedUser;
  }

  async updateUserSettings(chatId: bigint, data: UpdateUserSettingsDto) {
    const existingUser = await this.userRepository.findUserByChatId(chatId);

    if (!existingUser) {
      throw new NotFound(errorConstant.USER_NOT_FOUND);
    }

    await this.userSettingsRepository.updateUserSettings(existingUser.id, data);

    const userWithSettings: UserWithSettings = await this.userRepository.getUserWithSettings(
      existingUser.id,
    );

    return this.userWithSettingsMapper.toDto(userWithSettings);
  }
}
