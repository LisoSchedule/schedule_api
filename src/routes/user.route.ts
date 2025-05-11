import { Router } from "express";

import { limiter } from "../middlewares/limiter.middleware";
import { validate } from "../middlewares/validate.middleware";
import { catchHandler } from "../middlewares/catch.middleware";
import { timeConstant } from "../constants/time.constant";
import { CreateUserSchema } from "../validators/create-user.validator";
import { UserController } from "../controllers/user.controller";

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
 *                     user:
 *                       $ref: '#/components/schemas/CurrentUser'
 *                     message:
 *                       type: string
 *                       example: "CREATED"
 *       400:
 *         description: Invalid request body or user creation failed
 *       429:
 *         description: Too many requests - rate limit exceeded
 *       500:
 *         description: Internal server error
 */
UserRouter.post(
  "/",
  validate(CreateUserSchema),
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(userController.createUser.bind(userController)),
);
