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

const { USER_FETCHED, USER_CREATED, USER_UPDATED, USER_SETTINGS_UPDATED, USER_DELETED } =
  successConstant;

export class UserController {
  constructor(private readonly userService: UserService = new UserService()) {}

  async getUserById(req: Request, res: Response) {
    const userId = Number(req.params["userId"]!);

    const userWithSettings = await this.userService.getUserWithSettingsById(userId);

    res
      .status(USER_FETCHED.statusCode)
      .json(new SuccessResponseDto(userWithSettings, USER_FETCHED.message));
  }

  async createUser(req: Request, res: Response) {
    const data: CreateUserDto = {
      body: req.body,
    };

    const newUser: User = await this.userService.createUser(data);

    res
      .status(USER_CREATED.statusCode)
      .json(new SuccessResponseDto(new CurrentUserDto(newUser), USER_CREATED.message));
  }

  async updateUser(req: Request, res: Response) {
    const userId = Number(req.params["userId"]!);

    const updateUserDto: UpdateUserDto = {
      nickname: req.body.nickname,
      email: req.body.email,
    };

    const updatedUser: User = await this.userService.updateUser(userId, updateUserDto);

    res
      .status(USER_UPDATED.statusCode)
      .json(new SuccessResponseDto(new CurrentUserDto(updatedUser), USER_UPDATED.message));
  }

  async upsertUserSettings(req: Request, res: Response) {
    const userId = Number(req.params["userId"]!);

    const updateUserSettingsDto: UpdateUserSettingsDto = {
      notifications: req.body.notifications,
      reminderTime: req.body.reminderTime,
    };

    const userWithSettings: UserWithSettingsDto = await this.userService.upsertUserSettings(
      userId,
      updateUserSettingsDto,
    );

    res
      .status(USER_SETTINGS_UPDATED.statusCode)
      .json(new SuccessResponseDto(userWithSettings, USER_SETTINGS_UPDATED.message));
  }

  async deleteUser(req: Request, res: Response) {
    const userId = Number(req.params["userId"]!);

    await this.userService.deleteUser(userId);

    res.status(USER_DELETED.statusCode).json(new SuccessResponseDto(USER_DELETED.message));
  }
}
