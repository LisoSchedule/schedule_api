/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserBody:
 *       type: object
 *       properties:
 *         nickname:
 *           type: string
 *           description: User's nickname
 *           example: "JohnDoe"
 *         notifications:
 *           type: boolean
 *           description: Whether the user wants to receive notifications
 *           example: true
 *         reminderTime:
 *           type: string
 *           enum: ["FiveMinutes", "TenMinutes", "FifteenMinutes", "ThirtyMinutes", "OneHour"]
 *           description: When to send reminders before events
 *           example: "ThirtyMinutes"
 *   parameters:
 *     userId:
 *       in: path
 *       name: userId
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *       description: ID of the user to update
 *       example: 123456789
 */
