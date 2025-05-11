import { z as zod } from "zod";
import { UserStep } from "@prisma/client";

export const CreateUserSchema = zod.object({
  body: zod.object({
    chatId: zod.coerce.bigint(),
    username: zod.string().optional().nullable(),
    nickname: zod.string().optional().nullable(),
    groupId: zod.coerce.number().int().positive(),
    step: zod.enum([UserStep.ChooseNickname, UserStep.ChooseGroup, UserStep.MainMenu]),
  }),
});
