import { Router } from "express";

import { limiter } from "../middlewares/limiter.middleware";
import { validate } from "../middlewares/validate.middleware";
import { catchHandler } from "../middlewares/catch.middleware";
import { timeConstant } from "../constants/time.constant";
import { LessonController } from "../controllers/lesson.controller";
import { AddLessonSchema } from "../validators/add-lesson.validator";

export const LessonsRouter = Router();

const lessonController = new LessonController();

/**
 * @swagger
 * /api/lessons:
 *   get:
 *     summary: Get all lessons
 *     tags: [Lessons]
 *     responses:
 *       200:
 *         description: Lessons retrieved successfully
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
 *                   example: "LESSONS_FETCHED"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Lesson'
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
LessonsRouter.get(
  "/",
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(lessonController.getAllLessons.bind(lessonController)),
);

/**
 * @swagger
 * /api/lessons/{lessonId}:
 *   get:
 *     summary: Get a specific lesson by id
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: id of the lesson to retrieve
 *       - in: query
 *         name: includeRelations
 *         required: false
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Whether to include related data
 *     responses:
 *       200:
 *         description: Lesson retrieved successfully
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
 *                   example: "LESSON_FETCHED"
 *                 data:
 *                   $ref: '#/components/schemas/Lesson'
 *       404:
 *         description: Lesson not found
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
LessonsRouter.get(
  "/:lessonId",
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(lessonController.getLessonById.bind(lessonController)),
);

/**
 * @swagger
 * /api/lessons:
 *   post:
 *     summary: Add new lesson
 *     tags: [Lessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddLesson'
 *     responses:
 *       201:
 *         description: Lesson added successfully
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
 *                   example: "LESSON_CREATED"
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Lesson'
 *       400:
 *         description: Invalid request body or lesson creation failed
 *       429:
 *         description: Too many requests - rate limit exceeded
 *       500:
 *         description: Internal server error
 */
LessonsRouter.post(
  "/",
  limiter(timeConstant.ONE_SECOND, 3, true),
  validate(AddLessonSchema),
  catchHandler(lessonController.createLesson.bind(lessonController)),
);
