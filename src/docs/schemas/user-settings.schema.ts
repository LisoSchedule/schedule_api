/**
 * @swagger
 * components:
 *   schemas:
 *     UserSettings:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the settings
 *           example: 12
 *         userId:
 *           type: integer
 *           description: ID of the user these settings belong to
 *           example: 1
 *         notifications:
 *           type: boolean
 *           description: Whether the user has enabled notifications
 *           example: true
 *         reminderTime:
 *           type: string
 *           enum: ["FiveMinutes", "TenMinutes", "FifteenMinutes", "ThirtyMinutes", "OneHour"]
 *           description: How long before events to send reminders
 *           example: "FifteenMinutes"
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the settings were created
 *           example: "2025-04-01T14:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the settings were last updated
 *           example: "2025-04-15T09:15:00Z"
 *       required:
 *         - id
 *         - userId
 *         - notifications
 *         - createdAt
 *         - updatedAt
 */
