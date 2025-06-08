/**
 * @swagger
 * components:
 *   schemas:
 *     AddGroup:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Group's name
 *           example: "КН-11"
 *         subGroup:
 *           type: integer
 *           format: int32
 *           minimum: 1
 *           description: Sub-group number
 *           example: 1
 *       required:
 *         - name
 *         - subGroup
 */
