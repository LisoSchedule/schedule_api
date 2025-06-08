import { Router } from "express";

import { limiter } from "../middlewares/limiter.middleware";
import { timeConstant } from "../constants/time.constant";
import { validate } from "../middlewares/validate.middleware";
import { catchHandler } from "../middlewares/catch.middleware";
import { SubjectController } from "../controllers/subject.controller";
import { AddSubjectSchema } from "../validators/add-subject.validator";

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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subject'
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

/**
 * @swagger
 * /api/subjects/{subjectId}:
 *   get:
 *     summary: Get a specific subject by id
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: id of the subject to retrieve
 *       - in: query
 *         name: includeRelations
 *         required: false
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Whether to include related data
 *     responses:
 *       200:
 *         description: Subject retrieved successfully
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
 *                   example: "SUBJECT_FETCHED"
 *                 data:
 *                   $ref: '#/components/schemas/Subject'
 *       404:
 *         description: Subject not found
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
SubjectsRouter.get(
  "/:subjectId",
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(subjectController.getSubjectById.bind(subjectController)),
);

/**
 * @swagger
 * /api/subjects:
 *   post:
 *     summary: Add new subject
 *     tags: [Subjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddSubject'
 *     responses:
 *       201:
 *         description: Subject added successfully
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
 *                   example: "SUBJECT_CREATED"
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Subject'
 *       400:
 *         description: Invalid request body or subject creation failed
 *       429:
 *         description: Too many requests - rate limit exceeded
 *       500:
 *         description: Internal server error
 */
SubjectsRouter.post(
  "/",
  limiter(timeConstant.ONE_SECOND, 3, true),
  validate(AddSubjectSchema),
  catchHandler(subjectController.createSubject.bind(subjectController)),
);
