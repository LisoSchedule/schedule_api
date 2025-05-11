import { Router } from "express";

import { limiter } from "../middlewares/limiter.middleware";
import { validate } from "../middlewares/validate.middleware";
import { catchHandler } from "../middlewares/catch.middleware";
import { timeConstant } from "../constants/time.constant";
import { CreateUserDto } from "";
import { UserController } from "";

export const UserRouter = Router();

const userController = new UserController();

UserRouter.post(
  "/",
  validate(CreateUserDto),
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(userController.createUser.bind(userController)),
);
