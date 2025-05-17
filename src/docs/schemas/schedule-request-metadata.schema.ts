/**
 * @swagger
 * components:
 *   schemas:
 *     ScheduleRequestMetadata:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: User identifier
 *           example: "Andrew"
 *         groupId:
 *           type: integer
 *           description: Group id
 *           example: 1
 *         requestDate:
 *           type: string
 *           format: date-time
 *           description: Date of the request
 *           example: "2025-05-18T10:00:00Z"
 *         type:
 *           type: string
 *           description: Type of the schedule
 *           enum: ["today", "tomorrow", "week"]
 *           example: "today"
 *       required:
 *         - user
 *         - groupId
 *         - requestDate
 *         - type
 */
