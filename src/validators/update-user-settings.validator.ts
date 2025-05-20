import { ReminderTime } from "@prisma/client";
import { z as zod } from "zod";
import validationConstant from "../constants/validation.constant";

export const UpdateUserSettingsSchema = zod.object({
  body: zod.object({
    notifications: zod
      .boolean({ message: validationConstant.INVALID_BOOLEAN })
      .optional()
      .default(false),
    reminderTime: zod
      .nativeEnum(ReminderTime, { message: validationConstant.INVALID_ENUM_VALUE })
      .optional()
      .default(ReminderTime.FifteenMinutes),
  }),
});
