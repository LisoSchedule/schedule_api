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
 *           example: "1"
 *         startDate:
 *           type: integer
 *           format: int32
 *           minimum: 1
 *           description: Sub-group number
 *           example: 1
 *         endDate:
 *           type: integer
 *           format: int32
 *           minimum: 1
 *           description: Sub-group number
 *         repeatType:
 *           type: string
 *           description: Repeat type
 *           enum: [Daily, Weekly, Monthly]
 *           example: "Daily"
 *         repeatValue:
 *           type: integer
 *           format: int32
 *           minimum: 1
 *           description: Repeat value
 *           example: 1
 *           example: 1
 *       required:
 *         - lessonId
 *         - startDate
 *         - endDate
 *         - repeatType
 *         - repeatValue
 */
