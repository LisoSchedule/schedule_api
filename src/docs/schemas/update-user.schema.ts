/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUser:
 *       type: object
 *       properties:
 *         nickname:
 *           type: string
 *           description: User's nickname
 *           example: "JohnDoe"
 *           minLength: 1
 *           maxLength: 50
 *         email:
 *           type: string
 *           description: User's email address
 *           example: "john.doe@example.com"
 *           format: email
 *       # Both fields are optional per the validator
 *   parameters:
 *     userId:
 *       in: path
 *       name: userId
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *       description: User's id
 *       example: 1
 */
