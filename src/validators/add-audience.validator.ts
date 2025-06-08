import { z as zod } from "zod";

import validationConstant from "../constants/validation.constant";

export const AddAudienceSchema = zod.object({
  body: zod.object({
    name: zod.string().trim().min(1, validationConstant.CANNOT_BE_EMPTY),
  }),
});
