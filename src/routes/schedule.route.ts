import { Router } from "express";

import { limiter } from "../middlewares/limiter.middleware";
import { validate } from "../middlewares/validate.middleware";
import { catchHandler } from "../middlewares/catch.middleware";
import { timeConstant } from "../constants/time.constant";
import { GetScheduleSchema } from "../validators/get-schedule-query.validator";
import { ScheduleController } from "../controllers/schedule.controller";

export const ScheduleRouter = Router();

const scheduleController = new ScheduleController();

/**
 * @swagger
 * /api/schedule/{userId}:
 *   get:
 *     summary: Get schedule for user's group by userId
 *     description: Retrieves the class schedule for a user based on the provided userId, date, and type.
 *     tags: [Schedule]
 *     parameters:
 *       - $ref: '#/components/parameters/userId'
 *       - $ref: '#/components/parameters/date'
 *       - $ref: '#/components/parameters/type'
 *     responses:
 *       200:
 *         description: Successful schedule retrieval
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
 *                   example: SCHEDULE_FETCHED
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/ScheduleResponse'
 *       400:
 *         description: Bad request - invalid parameters
 *       404:
 *         description: User not found
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
ScheduleRouter.get(
  "/:userId",
  validate(GetScheduleSchema),
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(scheduleController.getScheduleByParams.bind(scheduleController)),
);
