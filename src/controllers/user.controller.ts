import { Request, Response } from "express";

import { UserService } from "../services/user.service";
import { User } from "@prisma/client";
import { SuccessResponseDto } from "../dtos/success-response.dto";
import { CreateUserDto } from "../dtos/create-user.dto";
import { CurrentUserDto } from "../dtos/current-user.dto";
import successConstant from "../constants/success.constant";

export class UserController {
  private readonly userService: UserService = new UserService();

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
}
