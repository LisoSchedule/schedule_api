/**
 * @swagger
 * components:
 *   schemas:
 *     Lesson:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the class
 *           example: 1
 *         subject:
 *           $ref: '#/components/schemas/Subject'
 *           description: Subject information
 *         teacher:
 *           $ref: '#/components/schemas/Teacher'
 *           description: Teacher information
 *         audience:
 *           $ref: '#/components/schemas/Audience'
 *           description: Audience information
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: Start time of the class
 *           example: "2025-05-15T14:30:00Z"
 *         duration:
 *           type: integer
 *           description: Duration of the class in minutes
 *           example: 95
 *         recurrence:
 *           $ref: '#/components/schemas/LessonRecurrence'
 *           description: Recurrence information for the class
 *       required:
 *         - id
 *         - subject
 *         - teacher
 *         - audience
 *         - startTime
 *         - duration
 *         - recurrence
 */
