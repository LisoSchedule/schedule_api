import { Router } from "express";

import { limiter } from "../middlewares/limiter.middleware";
import { validate } from "../middlewares/validate.middleware";
import { catchHandler } from "../middlewares/catch.middleware";
import { timeConstant } from "../constants/time.constant";
import { RecurrenceController } from "../controllers/recurrence.controller";
import { AddRecurrenceSchema } from "../validators/add-recurrence.validator";

export const RecurrencesRouter = Router();

const recurrenceController = new RecurrenceController();

/**
 * @swagger
 * /api/recurrences:
 *   get:
 *     summary: Get all recurrences
 *     tags: [Recurrences]
 *     responses:
 *       200:
 *         description: Recurrences retrieved successfully
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
 *                   example: "RECURRENCES_FETCHED"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Recurrence'
 *       404:
 *         description: Recurrences not found
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
RecurrencesRouter.get(
  "/",
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(recurrenceController.getAllRecurrences.bind(recurrenceController)),
);

/**
 * @swagger
 * /api/recurrences/{recurrenceId}:
 *   get:
 *     summary: Get a specific recurrence by id
 *     tags: [Recurrences]
 *     parameters:
 *       - in: path
 *         name: recurrenceId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: id of the recurrence to retrieve
 *       - in: query
 *         name: includeRelations
 *         required: false
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Whether to include related data
 *     responses:
 *       200:
 *         description: Recurrence retrieved successfully
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
 *                   example: "RECURRENCE_FETCHED"
 *                 data:
 *                   $ref: '#/components/schemas/Recurrence'
 *       404:
 *         description: Recurrence not found
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
RecurrencesRouter.get(
  "/:recurrenceId",
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(recurrenceController.getRecurrenceById.bind(recurrenceController)),
);

/**
 * @swagger
 * /api/recurrences:
 *   post:
 *     summary: Add new recurrence
 *     tags: [Recurrences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddRecurrence'
 *     responses:
 *       201:
 *         description: Recurrence added successfully
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
 *                   example: "RECURRENCE_CREATED"
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Recurrence'
 *       400:
 *         description: Invalid request body or recurrence creation failed
 *       429:
 *         description: Too many requests - rate limit exceeded
 *       500:
 *         description: Internal server error
 */
RecurrencesRouter.post(
  "/",
  limiter(timeConstant.ONE_SECOND, 3, true),
  validate(AddRecurrenceSchema),
  catchHandler(recurrenceController.createRecurrence.bind(recurrenceController)),
);
