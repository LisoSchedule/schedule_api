/**
 * @swagger
 * components:
 *   schemas:
 *     AddRecurrence:
 *       type: object
 *       properties:
 *         lessonId:
 *           type: integer
 *           format: int32
 *           description: id of the lesson to create recurrence
 *           example: 1
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: First date lesson proceeds
 *           example: "2024-09-01T08:30:00Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: Last date lesson proceeds
 *           example: "2025-06-15T10:55:00Z"
 *         repeatType:
 *           type: string
 *           description: Type of recurrence pattern (Daily, Weekly, Monthly)
 *           enum: [Daily, Weekly, Monthly]
 *           example: "Weekly"
 *         repeatValue:
 *           type: integer
 *           format: int32
 *           minimum: 1
 *           description: For Daily - every `X` days, for Weekly - every `X` weeks, for Monthly - every `X` months
 *           example: 2
 *       required:
 *         - lessonId
 *         - startDate
 *         - endDate
 *         - repeatType
 *         - repeatValue
 */
