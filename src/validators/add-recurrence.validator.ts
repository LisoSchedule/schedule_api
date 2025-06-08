import { z as zod } from "zod";

import { RepeatType } from "@prisma/client";
import validationConstant from "../constants/validation.constant";

export const AddRecurrenceSchema = zod.object({
  body: zod.object({
    lessonId: zod.number().int(validationConstant.CANNOT_BE_EMPTY),
    startDate: zod.string().datetime(validationConstant.INVALID_DATE_TIME_FORMAT),
    endDate: zod.string().datetime(),
    repeatType: zod.nativeEnum(RepeatType, { message: validationConstant.INVALID_ENUM_VALUE }),
    repeatValue: zod.coerce.number().int().positive(validationConstant.MUST_BE_POSITIVE_INTEGER),
  }),
});
