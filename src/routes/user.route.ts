import { Router } from "express";

import { limiter } from "../middlewares/limiter.middleware";
import { validate } from "../middlewares/validate.middleware";
import { catchHandler } from "../middlewares/catch.middleware";
import { timeConstant } from "../constants/time.constant";
import { CreateUserSchema } from "../validators/create-user.validator";
import { UserController } from "../controllers/user.controller";
import { UpdateUserSchema } from "../validators/update-user.validator";
import { UpdateUserSettingsSchema } from "../validators/update-user-settings.validator";

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

/**
 * @swagger
 * /api/user/{chatId}:
 *   patch:
 *     summary: Update a user's nickname
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/chatId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User updated successfully
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
 *                       example: "USER_UPDATED"
 *                     user:
 *                       $ref: '#/components/schemas/CurrentUser'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: User not found
 *       429:
 *         description: Too many requests - rate limit exceeded
 *       500:
 *         description: Internal server error
 */
UserRouter.patch(
  "/:chatId",
  limiter(timeConstant.ONE_SECOND, 3, true),
  validate(UpdateUserSchema),
  catchHandler(userController.updateUser.bind(userController)),
);

/**
 * @swagger
 * /api/user/{chatId}/settings:
 *   patch:
 *     summary: Update a user's settings
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/chatId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserSettings'
 *     responses:
 *       200:
 *         description: User settings updated successfully
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
 *                       example: "USER_SETTINGS_UPDATED"
 *                     user:
 *                       $ref: '#/components/schemas/UserWithSettings'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: User not found
 *       429:
 *         description: Too many requests - rate limit exceeded
 *       500:
 *         description: Internal server error
 */
UserRouter.patch(
  "/:chatId/settings",
  limiter(timeConstant.ONE_SECOND, 3, true),
  validate(UpdateUserSettingsSchema),
  catchHandler(userController.upsertUserSettings.bind(userController)),
);

/**
 * @swagger
 * /api/user/{chatId}:
 *   delete:
 *     summary: Delete a user by chatId
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/chatId'
 *     responses:
 *       200:
 *         description: User deleted successfully
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
 *                       example: "DELETED"
 *       404:
 *         description: User not found
 *       429:
 *         description: Too many requests - rate limit exceeded
 *       500:
 *         description: Internal server error
 */
UserRouter.delete(
  "/:chatId",
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(userController.deleteUser.bind(userController)),
);
