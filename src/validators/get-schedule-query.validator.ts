import { z as zod } from "zod";
import { ScheduleType } from "../enums/schedule-type.enum";

export const GetScheduleSchema = zod.object({
  params: zod.object({
    userId: zod.coerce.number(),
  }),
  query: zod.object({
    date: zod.string().optional(),
    type: zod.nativeEnum(ScheduleType).optional(),
  }),
});
