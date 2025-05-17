/**
 * @swagger
 * components:
 *   schemas:
 *     GetScheduleQuery:
 *       type: object
 *       properties:
 *         chatId:
 *           type: integer
 *           format: int64
 *           description: Telegram chat ID of the user
 *           example: 123456789
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date from which to calculate schedule. If null, server uses current date
 *           example: "2025-05-11T10:15:02.000Z"
 *         type:
 *           type: string
 *           enum: ["today", "tomorrow", "week"]
 *           default: "today"
 *           description: Type of schedule to retrieve
 *           example: "today"
 *       required:
 *         - chatId
 *   parameters:
 *     chatId:
 *       in: path
 *       name: chatId
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *       description: Telegram chat ID of the user
 *       example: 123456789
 *     date:
 *       in: query
 *       name: date
 *       schema:
 *         type: string
 *         format: date-time
 *       description: Date from which to calculate schedule. If null, server uses current date
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
