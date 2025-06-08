import { z as zod } from "zod";
import { AddGroupSchema } from "../validators/add-group.validator";

export type AddGroupDto = zod.infer<typeof AddGroupSchema>;
