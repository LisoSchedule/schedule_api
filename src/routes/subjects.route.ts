import { Router } from "express";

import { limiter } from "../middlewares/limiter.middleware";
import { timeConstant } from "../constants/time.constant";
import { validate } from "../middlewares/validate.middleware";
import { catchHandler } from "../middlewares/catch.middleware";
import { SubjectController } from "../controllers/subject.controller";

export const SubjectsRouter = Router();

const subjectController: SubjectController = new SubjectController();

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     summary: Get all subjects
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: Subjects retrieved successfully
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
 *                   example: "SUBJECTS_FETCHED"
 *                 data:
 *                   type: object
 *                   properties:
 *                     groups:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Subject'
 *       404:
 *         description: Subjects not found
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
SubjectsRouter.get(
  "/",
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(subjectController.getAllSubjects.bind(subjectController)),
);
