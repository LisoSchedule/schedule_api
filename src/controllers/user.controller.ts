import { Request, Response } from "express";

import { UserService } from "../services/user.service";
import { User } from "@prisma/client";
import { SuccessResponseDto } from "../dtos/success-response.dto";
import { CreateUserDto } from "../dtos/create-user.dto";
import { CurrentUserDto } from "../dtos/current-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UpdateUserSettingsDto } from "../dtos/update-user-settings.dto";
import { UserWithSettingsDto } from "../dtos/user-with-settings.dto";
import successConstant from "../constants/success.constant";

export class UserController {
  constructor(private readonly userService: UserService = new UserService()) {}

  // ! At the moment, userId is just telegram bigint chatId

  async getUserById(req: Request, res: Response) {
    const userId = BigInt(req.params["userId"]!);

    const userWithSettings = await this.userService.getUserWithSettingsById(userId);

    res.status(201).json(
      new SuccessResponseDto({
        message: successConstant.USER_FETCHED,
        user: userWithSettings,
      }),
    );
  }

  async createUser(req: Request, res: Response) {
    const data: CreateUserDto = {
      body: req.body,
    };

    const newUser: User = await this.userService.createUser(data);

    res.status(201).json(
      new SuccessResponseDto({
        message: successConstant.CREATED,
        user: new CurrentUserDto(newUser),
      }),
    );
  }

  async updateUser(req: Request, res: Response) {
    const userId = BigInt(req.params["userId"]!);

    const updateUserDto: UpdateUserDto = {
      nickname: req.body.nickname,
    };

    const updatedUser: User = await this.userService.updateUser(userId, updateUserDto);

    res.status(200).json(
      new SuccessResponseDto({
        message: successConstant.USER_UPDATED,
        user: new CurrentUserDto(updatedUser),
      }),
    );
  }

  async upsertUserSettings(req: Request, res: Response) {
    const userId = BigInt(req.params["userId"]!);

    const updateUserSettingsDto: UpdateUserSettingsDto = {
      notifications: req.body.notifications,
      reminderTime: req.body.reminderTime,
    };

    const userWithSettings: UserWithSettingsDto = await this.userService.upsertUserSettings(
      userId,
      updateUserSettingsDto,
    );

    res.status(200).json(
      new SuccessResponseDto({
        message: successConstant.USER_SETTINGS_UPDATED,
        user: userWithSettings,
      }),
    );
  }

  async deleteUser(req: Request, res: Response) {
    const userId = BigInt(req.params["userId"]!);

    await this.userService.deleteUser(userId);

    res.status(200).json(
      new SuccessResponseDto({
        message: successConstant.USER_DELETED,
      }),
    );
  }
}
