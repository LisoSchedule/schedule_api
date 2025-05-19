import { ReminderTime } from "@prisma/client";
import { z as zod } from "zod";

export const UpdateUserSchema = zod.object({
  body: zod.object({
    nickname: zod.string().optional(),
    notifications: zod.boolean().optional(),
    reminderTime: zod.nativeEnum(ReminderTime).optional(),
  }),
});
