/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       properties:
 *         chatId:
 *           type: integer
 *           format: int64
 *           description: Unique identifier for the telegram chat
 *           example: 123456789012345678
 *         username:
 *           type: string
 *           description: User's telegram username
 *           nullable: true
 *           example: "wastardy"
 *         nickname:
 *           type: string
 *           description: User's telegram nickname
 *           nullable: true
 *           example: "Andrew"
 *         groupId:
 *           type: integer
 *           description: Unique identifier for the group
 *           example: 1
 *       required:
 *         - chatId
 *         - groupId
 */
