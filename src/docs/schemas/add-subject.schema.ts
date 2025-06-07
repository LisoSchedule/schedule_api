/**
 * @swagger
 * components:
 *   schemas:
 *     AddSubject:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Subject's name
 *           example: "Методи та засоби ООАП"
 *         type:
 *           type: string
 *           description: Type of the subject
 *           enum: [Lecture, Practice]
 *           example: "Lecture"
 *       required:
 *         - name
 *         - type
 */
