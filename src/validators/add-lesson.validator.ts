import { z as zod } from "zod";

import validationConstant from "../constants/validation.constant";

export const AddLessonSchema = zod.object({
  body: zod.object({
    subjectId: zod.number().int(validationConstant.CANNOT_BE_EMPTY),
    teacherId: zod.number().int(validationConstant.CANNOT_BE_EMPTY),
    audienceId: zod.number().int(validationConstant.CANNOT_BE_EMPTY),
    groupId: zod.number().int(validationConstant.CANNOT_BE_EMPTY),
    startTime: zod.string().datetime(validationConstant.INVALID_DATE_TIME_FORMAT),
    duration: zod.number().int().positive(validationConstant.MUST_BE_POSITIVE_INTEGER),
  }),
});
