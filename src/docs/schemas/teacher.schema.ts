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
 *       required:
 *         - id
 *         - name
 *         - position
 */
