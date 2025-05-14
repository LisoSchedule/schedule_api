import { z as zod } from "zod";

export const CreateUserSchema = zod.object({
  body: zod.object({
    chatId: zod.coerce.bigint(),
    username: zod.string().optional().nullable(),
    nickname: zod.string().optional().nullable(),
    groupId: zod.coerce.number().int().positive(),
  }),
});
