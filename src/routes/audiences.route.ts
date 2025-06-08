import { Router } from "express";

import { limiter } from "../middlewares/limiter.middleware";
import { validate } from "../middlewares/validate.middleware";
import { catchHandler } from "../middlewares/catch.middleware";
import { timeConstant } from "../constants/time.constant";
import { AudienceController } from "../controllers/audience.controller";
import { AddAudienceSchema } from "../validators/add-audience.validator";

export const AudiencesRouter = Router();

const audienceController = new AudienceController();

/**
 * @swagger
 * /api/audiences:
 *   get:
 *     summary: Get all audiences
 *     tags: [Audiences]
 *     responses:
 *       200:
 *         description: Audiences retrieved successfully
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
 *                   example: "AUDIENCES_FETCHED"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Audience'
 *       404:
 *         description: Audiences not found
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
AudiencesRouter.get(
  "/",
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(audienceController.getAllAudiences.bind(audienceController)),
);

/**
 * @swagger
 * /api/audiences/{audienceId}:
 *   get:
 *     summary: Get a specific audience by id
 *     tags: [Audiences]
 *     parameters:
 *       - in: path
 *         name: audienceId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: id of the audience to retrieve
 *       - in: query
 *         name: includeRelations
 *         required: false
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Whether to include related data
 *     responses:
 *       200:
 *         description: Audience retrieved successfully
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
 *                   example: "AUDIENCE_FETCHED"
 *                 data:
 *                   $ref: '#/components/schemas/Audience'
 *       404:
 *         description: Audience not found
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
AudiencesRouter.get(
  "/:audienceId",
  limiter(timeConstant.ONE_SECOND, 3, true),
  catchHandler(audienceController.getAudienceById.bind(audienceController)),
);

/**
 * @swagger
 * /api/audiences:
 *   post:
 *     summary: Add new audience
 *     tags: [Audiences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddAudience'
 *     responses:
 *       201:
 *         description: Audience added successfully
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
 *                   example: AUDIENCE_CREATED
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Audience'
 *       400:
 *         description: Invalid request body or audience creation failed
 *       429:
 *         description: Too many requests - rate limit exceeded
 *       500:
 *         description: Internal server error
 */
AudiencesRouter.post(
  "/",
  limiter(timeConstant.ONE_SECOND, 3, true),
  validate(AddAudienceSchema),
  catchHandler(audienceController.createAudience.bind(audienceController)),
);
