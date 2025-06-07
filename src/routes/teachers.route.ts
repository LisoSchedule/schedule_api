import { Router } from "express";

import { limiter } from "../middlewares/limiter.middleware";
import { validate } from "../middlewares/validate.middleware";
import { catchHandler } from "../middlewares/catch.middleware";
import { timeConstant } from "../constants/time.constant";
import { TeacherController } from "../controllers/teacher.controller";
import { AddTeacherSchema } from "../validators/add-teacher.validator";

export const TeachersRouter = Router();

const teacherController = new TeacherController();

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     summary: Get all teachers
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Teachers retrieved successfully
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
 *                   example: "TEACHERS_FETCHED"
 *                 data:
 *                   type: object
 *                   properties:
 *                     groups:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: Teachers not found
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
TeachersRouter.get(
  "/",
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(teacherController.getAllTeachers.bind(teacherController)),
);

/**
 * @swagger
 * /api/teachers/{teacherId}:
 *   get:
 *     summary: Get a specific teacher by id
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: id of the teacher to retrieve
 *       - in: query
 *         name: includeRelations
 *         required: false
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Whether to include related data (subjects, schedules, etc.)
 *     responses:
 *       200:
 *         description: Teacher retrieved successfully
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
 *                   example: "TEACHER_FETCHED"
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: Teacher not found
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
TeachersRouter.get(
  "/:teacherId",
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(teacherController.getTeacherById.bind(teacherController)),
);

/**
 * @swagger
 * /api/teachers:
 *   post:
 *     summary: Add new teacher
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddTeacher'
 *     responses:
 *       201:
 *         description: Teacher added successfully
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
 *                   example: TEACHER_CREATED
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Teacher'
 *       400:
 *         description: Invalid request body or user creation failed
 *       429:
 *         description: Too many requests - rate limit exceeded
 *       500:
 *         description: Internal server error
 */
TeachersRouter.post(
  "/",
  limiter(timeConstant.ONE_SECOND, 3, true),
  validate(AddTeacherSchema),
  catchHandler(teacherController.createTeacher.bind(teacherController)),
);
