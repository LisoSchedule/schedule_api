/**
 * @swagger
 * components:
 *   schemas:
 *     AddTeacher:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Teacher's full name
 *           example: "Лютий Денислав Зенонович"
 *         position:
 *           type: string
 *           description: Teacher's position
 *           enum:
 *             - DepartmentProfessor
 *             - Professor
 *             - AssociateProfessor
 *             - SeniorLecturer
 *             - Assistant
 *           example: "Professor"
 *       required:
 *         - name
 *         - position
 */
