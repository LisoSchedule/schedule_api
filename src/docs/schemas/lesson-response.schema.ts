/**
 * @swagger
 * components:
 *   schemas:
 *     LessonResponse:
 *       type: object
 *       properties:
 *         id:
 *           $ref: '#/components/schemas/Lesson/properties/id'
 *         lessonDate:
 *           $ref: '#/components/schemas/DateDto/properties/raw'
 *         subject:
 *           $ref: '#/components/schemas/Subject'
 *         teacher:
 *           $ref: '#/components/schemas/Teacher'
 *         audience:
 *           $ref: '#/components/schemas/Audience'
 *         startTime:
 *           $ref: '#/components/schemas/Lesson/properties/startTime'
 *         duration:
 *           $ref: '#/components/schemas/Lesson/properties/duration'
 *         recurrence:
 *           $ref: '#/components/schemas/LessonRecurrence'
 *
 */
