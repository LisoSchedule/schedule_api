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
 *           description: Unique identifier for the telegram chat
 *           example: 123456789012345678
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date from which to calculate schedule. If null, server uses current date.
 *           nullable: true
 *           example: "2025-05-11T10:15:02.000Z"
 *         type:
 *           type: string
 *           enum: ["today", "tomorrow", "week"]
 *           description: Type of schedule to retrieve
 *           nullable: true
 *           default: "today"
 *           example: "today"
 *       required:
 *         - chatId
 */
