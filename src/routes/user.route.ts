import { Router } from "express";

import { limiter } from "../middlewares/limiter.middleware";
import { validate } from "../middlewares/validate.middleware";
import { catchHandler } from "../middlewares/catch.middleware";
import { timeConstant } from "../constants/time.constant";
import { CreateUserSchema } from "../validators/create-user.validator";
import { UserController } from "../controllers/user.controller";
import { UpdateUserSchema } from "../validators/update-user.validator";

export const UserRouter = Router();

const userController = new UserController();

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user in telegram bot chat
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "CREATED"
 *                     user:
 *                       $ref: '#/components/schemas/CurrentUser'
 *       400:
 *         description: Invalid request body or user creation failed
 *       429:
 *         description: Too many requests - rate limit exceeded
 *       500:
 *         description: Internal server error
 */
UserRouter.post(
  "/",
  limiter(timeConstant.ONE_SECOND, 3, true),
  validate(CreateUserSchema),
  catchHandler(userController.createUser.bind(userController)),
);

UserRouter.patch(
  "/:chatId",
  limiter(timeConstant.ONE_SECOND, 3, true),
  validate(UpdateUserSchema),
  catchHandler(userController.updateUser.bind(userController)),
);

UserRouter.delete(
  "/:chatId",
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(userController.deleteUser.bind(userController)),
);
