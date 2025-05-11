import { z as zod } from "zod";
import { CreateUserSchema } from "../validators/create-user.validator";

export type CreateUserDto = zod.infer<typeof CreateUserSchema>;
