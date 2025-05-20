import { BadRequest, NotFound } from "http-errors";

import { Prisma, User, UserSettings } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import errorConstant from "../constants/error.constant";

export class UserService {
  constructor(private readonly userRepository: UserRepository = new UserRepository()) {}

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
}
