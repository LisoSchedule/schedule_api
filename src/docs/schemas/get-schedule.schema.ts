/**
 * @swagger
 * components:
 *   schemas:
 *     GetScheduleQuery:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           format: int64
 *           description: user's id
 *           example: 1
 *         date:
 *           type: string
 *           format: date-time
 *           description: date to retrieve schedule for, defaults is `now` if not provided
 *           example: "2025-05-11T10:15:02.000Z"
 *         type:
 *           type: string
 *           enum: ["today", "tomorrow", "week"]
 *           default: "today"
 *           description: type of schedule to retrieve
 *           example: "today"
 *       required:
 *         - chatId
 *   parameters:
 *     userId:
 *       in: path
 *       name: userId
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *       description: user's id
 *       example: 1
 *     date:
 *       in: query
 *       name: date
 *       schema:
 *         type: string
 *         format: date-time
 *       description: date to retrieve schedule for, defaults is `now` if not provided
 *       required: false
 *       example: "2025-05-11T10:15:02.000Z"
 *     type:
 *       in: query
 *       name: type
 *       schema:
 *         type: string
 *         enum: ["today", "tomorrow", "week"]
 *         default: "today"
 *       description: Type of schedule to retrieve
 *       required: false
 *       example: "today"
 */
