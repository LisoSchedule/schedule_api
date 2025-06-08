import { Router } from "express";

import { limiter } from "../middlewares/limiter.middleware";
import { validate } from "../middlewares/validate.middleware";
import { catchHandler } from "../middlewares/catch.middleware";
import { timeConstant } from "../constants/time.constant";
import { GroupController } from "../controllers/group.controller";
import { AddGroupSchema } from "../validators/add-group.validator";

export const GroupRouter = Router();

const groupController = new GroupController();

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Get all students groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: Groups retrieved successfully
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
 *                   example: "GROUPS_FETCHED"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Group'
 *       404:
 *         description: Groups not found
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
GroupRouter.get(
  "/",
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(groupController.getAllGroups.bind(groupController)),
);

/**
 * @swagger
 * /api/groups/{groupId}:
 *   get:
 *     summary: Get a specific group with relations by group id
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: id of the group
 *     responses:
 *       200:
 *         description: Group retrieved successfully
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
 *                   example: "GROUP_FETCHED"
 *                 data:
 *                   $ref: '#/components/schemas/GroupWithRelations'
 *       404:
 *         description: Group not found
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
GroupRouter.get(
  "/:groupId",
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(groupController.getGroupById.bind(groupController)),
);

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Add new group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddGroup'
 *     responses:
 *       201:
 *         description: Group added successfully
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
 *                   example: GROUP_CREATED
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Group'
 *       400:
 *         description: Invalid request body or group creation failed
 *       429:
 *         description: Too many requests - rate limit exceeded
 *       500:
 *         description: Internal server error
 */
GroupRouter.post(
  "/",
  limiter(timeConstant.ONE_SECOND, 3, true),
  validate(AddGroupSchema),
  catchHandler(groupController.createGroup.bind(groupController)),
);
