import { z as zod } from "zod";
import validationConstant from "../constants/validation.constant";

export const UpdateUserSchema = zod.object({
  body: zod.object({
    nickname: zod
      .string()
      .min(1, { message: validationConstant.FIELD_TOO_SHORT })
      .max(50, { message: validationConstant.FIELD_TOO_LONG })
      .optional(),
    email: zod.string().email({ message: validationConstant.INVALID_EMAIL }).optional(),
  }),
});
