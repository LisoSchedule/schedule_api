import { z as zod } from "zod";
import { AddSubjectSchema } from "../validators/add-subject.validator";

export type AddSubjectDto = zod.infer<typeof AddSubjectSchema>;
