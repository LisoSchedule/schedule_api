/**
 * @swagger
 * components:
 *   schemas:
 *     GroupWithRelations:
 *       type: object
 *       properties:
 *         id:
 *           $ref: '#/components/schemas/Group/properties/id'
 *         name:
 *           $ref: '#/components/schemas/Group/properties/name'
 *         subGroup:
 *           $ref: '#/components/schemas/Group/properties/subGroup'
 *         createdAt:
 *           $ref: '#/components/schemas/Group/properties/createdAt'
 *         updatedAt:
 *           $ref: '#/components/schemas/Group/properties/updatedAt'
 *         users:
 *           type: array
 *           description: List of users in this group
 *           items:
 *             $ref: '#/components/schemas/CurrentUser'
 *         lessons:
 *           type: array
 *           description: List of lessons for this group
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 $ref: '#/components/schemas/Lesson/properties/id'
 *               subject:
 *                 $ref: '#/components/schemas/Lesson/properties/subject'
 *               teacher:
 *                 $ref: '#/components/schemas/Lesson/properties/teacher'
 *               audience:
 *                 $ref: '#/components/schemas/Lesson/properties/audience'
 *               startTime:
 *                 $ref: '#/components/schemas/Lesson/properties/startTime'
 *               duration:
 *                 $ref: '#/components/schemas/Lesson/properties/duration'
 */
