/**
 * @swagger
 * components:
 *   schemas:
 *     UserWithSettings:
 *       type: object
 *       properties:
 *         id:
 *           $ref: '#/components/schemas/CurrentUser/properties/id'
 *         chatId:
 *           $ref: '#/components/schemas/CurrentUser/properties/chatId'
 *         username:
 *           $ref: '#/components/schemas/CurrentUser/properties/username'
 *         nickname:
 *           $ref: '#/components/schemas/CurrentUser/properties/nickname'
 *         settings:
 *           $ref: '#/components/schemas/UserSettings'
 */
