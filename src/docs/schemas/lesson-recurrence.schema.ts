/**
 * @swagger
 * components:
 *   schemas:
 *     LessonRecurrence:
 *       type: object
 *       properties:
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date of the recurrence pattern
 *           example: "2025-09-01"
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date of the recurrence pattern
 *           example: "2025-12-31"
 *         repeatType:
 *           type: string
 *           description: Type of recurrence pattern
 *           enum: [Daily, Weekly, Monthly]
 *           example: "Weekly"
 *         repeatValue:
 *           type: integer
 *           description: Value associated with the repeat type
 *           example: 1
 *       required:
 *         - startDate
 *         - endDate
 *         - repeatType
 *         - repeatValue
 */
