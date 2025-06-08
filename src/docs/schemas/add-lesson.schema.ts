/**
 * @swagger
 * components:
 *   schemas:
 *     AddLesson:
 *       type: object
 *       properties:
 *         subjectId:
 *           type: integer
 *           format: int32
 *           description: id of the subject to create lesson
 *           example: 1
 *         teacherId:
 *           type: integer
 *           format: int32
 *           description: id of the teacher to create lesson
 *           example: 1
 *         audienceId:
 *           type: integer
 *           format: int32
 *           description: id of the audience to create lesson
 *           example: 1
 *         groupId:
 *           type: integer
 *           format: int32
 *           description: id of the group to create lesson
 *           example: 1
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: Lesson's start time
 *           example: "2025-03-03T08:30:00Z"
 *         duration:
 *           type: integer
 *           format: int32
 *           minimum: 1
 *           description: Lesson's duration in minutes
 *           example: 95
 *       required:
 *         - subjectId
 *         - teacherId
 *         - audienceId
 *         - groupId
 *         - startTime
 *         - duration
 */
