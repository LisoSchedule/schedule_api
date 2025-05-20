import { z as zod } from "zod";
import validationConstant from "../constants/validation.constant";

export const UpdateUserSchema = zod.object({
  body: zod.object({
    nickname: zod
      .string()
      .nonempty({ message: validationConstant.CANNOT_BE_EMPTY })
      .min(2, { message: validationConstant.FIELD_TOO_SHORT })
      .max(30, { message: validationConstant.FIELD_TOO_LONG }),
  }),
});
