/**
 * @swagger
 * components:
 *   schemas:
 *     LessonResponse:
 *       type: object
 *       properties:
 *         date:
 *           $ref: '#/components/schemas/DateDto'
 *           description: Date information for the lesson
 *         lesson:
 *           $ref: '#/components/schemas/Lesson'
 *           description: Lesson details
 *       required:
 *         - date
 *         - lesson
 */
