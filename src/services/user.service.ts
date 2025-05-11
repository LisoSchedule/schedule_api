import { Request } from "express";
import { BadRequest, NotFound } from "http-errors";

import { Prisma } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto } from "../dtos/create-user.dto";
import errorConstant from "../constants/error.constant";

export class UserService {
  private readonly userRepository: UserRepository = new UserRepository();

  async createUser(data: CreateUserDto) {
    const { chatId, username, nickname, step, groupId } = data.body || data;

    const existingUser = await this.userRepository.findUserByChatId(chatId);

    if (existingUser) {
      throw new BadRequest(errorConstant.USER_ALREADY_EXISTS);
    }

    const userToCreate: Prisma.UserCreateInput = {
      chatId: BigInt(chatId),
      username: username ?? null,
      nickname: nickname ?? null,
      step,
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
}
