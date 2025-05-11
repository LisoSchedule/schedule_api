import { User, UserStep } from "@prisma/client";

/**
 * @swagger
 * components:
 *   schemas:
 *     CurrentUser:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Unique identifier for the user
 *           example: 1
 *         chatId:
 *           type: bigint
 *           description: Unique identifier for the telegram chat
 *           example: 123456789012345678
 *         username:
 *           type: string
 *           description: User's telegram username
 *           example: "wastardy"
 *         nickname:
 *           type: string
 *           description: User's telegram nickname
 *           example: "Andrew"
 *         groupId:
 *           type: number
 *           description: Unique identifier for the group
 *           example: 1
 *         step:
 *           type: string
 *           enum: ["ChooseNickname", "ChooseGroup", "MainMenu"]
 *           description: Current step of the user in the bot
 *           example: "MainMenu"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the user was created
 *           example: "2025-05-11T08:14:10Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the user was last updated
 *           example: "2025-05-11T08:33:15Z"
 */
export class CurrentUserDto {
  id!: number;
  chatId!: bigint;
  username!: string | null;
  nickname!: string | null;
  groupId!: number;
  step!: UserStep;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(user: Partial<User>) {
    this.id = user.id!;
    this.chatId = user.chatId!;
    this.username = user.username || null;
    this.nickname = user.nickname || null;
    this.groupId = user.groupId!;
    this.step = user.step!;
    this.createdAt = user.createdAt!;
    this.updatedAt = user.updatedAt!;
  }
}
