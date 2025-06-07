import { z as zod } from "zod";
import validationConstant from "../constants/validation.constant";
import { TeacherPosition } from "@prisma/client";

export const AddTeacherSchema = zod.object({
  body: zod.object({
    name: zod.string().trim().min(1, validationConstant.CANNOT_BE_EMPTY),
    position: zod.nativeEnum(TeacherPosition, { message: validationConstant.INVALID_ENUM_VALUE }),
  }),
});
