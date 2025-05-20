import { z as zod } from "zod";
import { UpdateUserSchema } from "../validators/update-user.validator";

export type UpdateUserDto = zod.infer<typeof UpdateUserSchema>["body"];
