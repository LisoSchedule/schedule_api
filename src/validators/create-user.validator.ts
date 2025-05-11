import { z as zod } from "zod";
import { UserStep } from "@prisma/client";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       properties:
 *         chatId:
 *           type: string
 *           format: int64
 *           description: Unique identifier for the telegram chat
 *           example: "123456789012345678"
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
 *         step:
 *           type: string
 *           enum: ["ChooseNickname", "ChooseGroup", "MainMenu"]
 *           description: Current step of the user in the bot
 *       required:
 *         - chatId
 *         - groupId
 *         - step
 */
export const CreateUserSchema = zod.object({
  body: zod.object({
    chatId: zod.bigint(),
    username: zod.string().optional().nullable(),
    nickname: zod.string().optional().nullable(),
    groupId: zod.coerce.number().int().positive(),
    step: zod.nativeEnum(UserStep),
  }),
});
