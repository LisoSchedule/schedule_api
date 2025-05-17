/**
 * @swagger
 * components:
 *   schemas:
 *     ScheduleResponse:
 *       type: object
 *       properties:
 *         metadata:
 *           $ref: '#/components/schemas/ScheduleRequestMetadata'
 *           description: Metadata about the schedule request
 *         lessons:
 *           type: array
 *           description: List of lessons in the schedule
 *           items:
 *             $ref: '#/components/schemas/LessonResponse'
 *       required:
 *         - metadata
 *         - lessons
 */
