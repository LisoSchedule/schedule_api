/**
 * @swagger
 * components:
 *   schemas:
 *     Subject:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the subject
 *           example: 1
 *         name:
 *           type: string
 *           description: Name of the subject
 *           example: "Методи та засоби ООАП"
 *         type:
 *           type: string
 *           description: Type of the subject
 *           enum: [Lecture, Practice]
 *           example: "Lecture"
 *       required:
 *         - id
 *         - name
 *         - type
 */
