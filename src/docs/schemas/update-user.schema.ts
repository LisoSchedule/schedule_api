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
 *       required:
 *         - nickname
 *   parameters:
 *     userId:
 *       in: path
 *       name: userId
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *       description: telegram chat id of the user
 *       example: 123456789
 */
