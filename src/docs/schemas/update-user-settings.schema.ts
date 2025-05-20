/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserSettings:
 *       type: object
 *       properties:
 *         notifications:
 *           type: boolean
 *           description: Whether the user wants to receive notifications
 *           example: true
 *           default: false
 *         reminderTime:
 *           type: string
 *           enum: ["FiveMinutes", "TenMinutes", "FifteenMinutes", "ThirtyMinutes", "OneHour"]
 *           description: When to send reminders before events
 *           example: "ThirtyMinutes"
 *           default: "FifteenMinutes"
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
