/**
 * @swagger
 * components:
 *   schemas:
 *     DateDto:
 *       type: object
 *       properties:
 *         raw:
 *           type: string
 *           format: date-time
 *           description: Raw date object in ISO format
 *           example: "2025-05-18T10:00:00Z"
 *         formatted:
 *           type: string
 *           description: Formatted date string representation
 *           example: "May 18, 2025"
 *       required:
 *         - raw
 *         - formatted
 */