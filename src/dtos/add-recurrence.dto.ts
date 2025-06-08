import { z as zod } from "zod";
import { AddRecurrenceSchema } from "../validators/add-recurrence.validator";

export type AddRecurrenceDto = zod.infer<typeof AddRecurrenceSchema>;
