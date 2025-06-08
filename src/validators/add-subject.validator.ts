import { z as zod } from "zod";

import validationConstant from "../constants/validation.constant";
import { SubjectType } from "@prisma/client";

export const AddSubjectSchema = zod.object({
  body: zod.object({
    name: zod.string().trim().min(1, validationConstant.CANNOT_BE_EMPTY),
    type: zod.nativeEnum(SubjectType, { message: validationConstant.INVALID_ENUM_VALUE }),
  }),
});
