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
 * /api/users/{userId}:
 *   get:
 *     summary: Get a user with settings by userId
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/userId'
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: USER_FETCHED
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/UserWithSettings'
 *       404:
 *         description: User not found
 *       429:
 *         description: Too many requests - rate limit exceeded
 *       500:
 *         description: Internal server error
 */
UserRouter.get(
  "/:userId",
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(userController.getUserById.bind(userController)),
);

/**
 * @swagger
 * /api/users:
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
 *                 message:
 *                   type: string
 *                   example: USER_CREATED
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/CurrentUser'
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
 * /api/users/{userId}:
 *   patch:
 *     summary: Update optionally user's information by userId
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/userId'
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
 *                 message:
 *                   type: string
 *                   example: USER_UPDATED
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/CurrentUser'
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
  "/:userId",
  limiter(timeConstant.ONE_SECOND, 3, true),
  validate(UpdateUserSchema),
  catchHandler(userController.updateUser.bind(userController)),
);

/**
 * @swagger
 * /api/users/{userId}/settings:
 *   patch:
 *     summary: Update user settings by userId (telegram chatId)
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/userId'
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
 *                 message:
 *                   type: string
 *                   example: USER_SETTINGS_UPDATED
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/UserWithSettings'
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
  "/:userId/settings",
  limiter(timeConstant.ONE_SECOND, 3, true),
  validate(UpdateUserSettingsSchema),
  catchHandler(userController.upsertUserSettings.bind(userController)),
);

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Delete a user by userId (telegram chatId)
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/userId'
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
 *                 message:
 *                   type: string
 *                   example: USER_DELETED
 *       404:
 *         description: User not found
 *       429:
 *         description: Too many requests - rate limit exceeded
 *       500:
 *         description: Internal server error
 */
UserRouter.delete(
  "/:userId",
  limiter(timeConstant.ONE_SECOND, 1, true),
  catchHandler(userController.deleteUser.bind(userController)),
);
