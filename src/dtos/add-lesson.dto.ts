import { z as zod } from "zod";
import { AddLessonSchema } from "../validators/add-lesson.validator";

export type AddLessonDto = zod.infer<typeof AddLessonSchema>;
