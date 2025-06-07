import { z as zod } from "zod";
import { AddTeacherSchema } from "../validators/add-teacher.validator";

export type AddTeacherDto = zod.infer<typeof AddTeacherSchema>;
