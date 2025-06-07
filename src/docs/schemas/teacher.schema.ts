/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the teacher
 *           example: 1
 *         name:
 *           type: string
 *           description: Teacher's full name
 *           example: "Волинець Євген Олегович"
 *         position:
 *           type: string
 *           description: Teacher's academic position
 *           enum: [DepartmentProfessor, Professor, AssociateProfessor, SeniorLecturer, Assistant]
 *           example: "Assistant"
 *         createdAt:
 *           type: string
 *           description: Timestamp when the teacher was created
 *           format: date-time
 *           example: "2023-10-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the teacher was last updated
 *           example: "2023-10-01T12:00:00Z"
 *       required:
 *         - id
 *         - name
 *         - position
 */
