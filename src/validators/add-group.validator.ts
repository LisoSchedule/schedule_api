import { z as zod } from "zod";

import validationConstant from "../constants/validation.constant";

export const AddGroupSchema = zod.object({
  body: zod.object({
    name: zod.string().trim().min(1, validationConstant.CANNOT_BE_EMPTY),
    subGroup: zod.coerce.number().int().positive(validationConstant.MUST_BE_POSITIVE_INTEGER),
  }),
});
